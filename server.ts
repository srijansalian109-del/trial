import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { supabase } from './db.ts';
import { INITIAL_BLOCKLIST } from './src/data/seedBlocklist.ts';
import { PRECOMPUTED_DEMO_RESULTS, DEMO_CASES } from './src/data/demoCases.ts';
import { extractIndicatorsLocally, classifyThreatHeuristically, generateBaitDialogue, detectLanguage } from './server/threatEngine.ts';
import { AnalysisResult, BlocklistEntry, QuickDetectResult } from './src/types/threat.ts';
import { normalizeIdentifier, evaluateVerificationStatus } from './server/verificationService.ts';
import { generateComplaintReport } from './server/reportGenerator.ts';
import { selectBestPersona, getPersonaById, ALL_PERSONAS } from './src/data/personas.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// Shared in-memory community threat store
let blocklistStore: BlocklistEntry[] = [...INITIAL_BLOCKLIST];
let totalScammerMinutesWasted = 1842;
let totalAnalyzedMessages = 156;

// Sessions store for report retrieval & multi-session verification
const sessionsStore = new Map<string, AnalysisResult>();

// Pre-seed demo results into sessionsStore
Object.values(PRECOMPUTED_DEMO_RESULTS).forEach((res) => {
  if (res.id) sessionsStore.set(res.id, res);
  if (res.session_id) sessionsStore.set(res.session_id, res);
});

/**
 * Register extracted indicators to the shared blocklist.
 * Applies multi-session verification:
 * If an identifier is observed in >= 2 distinct sessions, it is verified.
 */
function registerIndicatorsToBlocklist(result: AnalysisResult, sessionId: string) {
  const now = new Date().toISOString().split('T')[0];
  const { indicators, category, categoryLabel, threatLevel, riskScore } = result;

  const addOrUpdate = (type: BlocklistEntry['type'], val: string) => {
    if (!val || val.trim().length === 0) return;
    const cleanVal = val.trim();
    const normVal = normalizeIdentifier(type, cleanVal);

    const existing = blocklistStore.find(
      (b) =>
        (b.normalizedValue && b.normalizedValue === normVal) ||
        b.value.toLowerCase() === cleanVal.toLowerCase()
    );

    if (existing) {
      existing.flagCount += 1;
      existing.lastSeen = now;
      if (!existing.normalizedValue) existing.normalizedValue = normVal;

      existing.sessionIds = existing.sessionIds || [];
      if (!existing.sessionIds.includes(sessionId)) {
        existing.sessionIds.push(sessionId);
      }

      // Multi-session verification rule: COUNT(DISTINCT session_id) >= 2
      const isVerified = evaluateVerificationStatus(existing, riskScore) === 'verified';
      if (isVerified) {
        existing.status = 'verified';
        existing.verificationStatus = 'verified';
      }

      if (threatLevel === 'CRITICAL') existing.threatLevel = 'CRITICAL';
    } else {
      const initialVerification = riskScore >= 92 ? 'verified' : 'pending';
      blocklistStore.unshift({
        id: `blk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        type,
        value: cleanVal,
        normalizedValue: normVal,
        category,
        categoryLabel,
        threatLevel,
        flagCount: 1,
        firstReported: now,
        lastSeen: now,
        impersonatedBrand: indicators.brandsImpersonated[0] || undefined,
        status: initialVerification,
        verificationStatus: initialVerification,
        sessionIds: [sessionId],
        notes: `Extracted via ScamBait analysis (${categoryLabel}).`,
      });
    }
  };

  indicators.upiIds.forEach((u) => addOrUpdate('upi', u));
  indicators.phoneNumbers.forEach((p) => addOrUpdate('phone', p));
  indicators.urls.forEach((u) => addOrUpdate('url', u));
  indicators.bankAccounts.forEach((b) => addOrUpdate('bank', b));
  indicators.cryptoWallets.forEach((w) => addOrUpdate('wallet', w));
}
async function saveBlocklistToDatabase() {
  const rows = blocklistStore.map((entry) => ({
    id: entry.id,
    type: entry.type,
    value: entry.value,
    normalized_value: entry.normalizedValue || null,
    category: entry.category,
    category_label: entry.categoryLabel,
    threat_level: entry.threatLevel,
    flag_count: entry.flagCount,
    first_reported: entry.firstReported,
    last_seen: entry.lastSeen,
    impersonated_brand: entry.impersonatedBrand || null,
    status: entry.status,
    verification_status: entry.verificationStatus,
    session_ids: entry.sessionIds || [],
    notes: entry.notes || null
  }));

  if (rows.length === 0) return;

  const { error } = await supabase
    .from('blocklist')
    .upsert(rows);

  if (error) {
    console.error('[ScamBait DB Error]', error);
  } else {
    console.log(`[ScamBait DB] Saved ${rows.length} blocklist records`);
  }
}
async function loadBlocklistFromDatabase() {
  const { data, error } = await supabase
    .from('blocklist')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[ScamBait DB Load Error]', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('[ScamBait DB] No saved blocklist records found.');
    return;
  }

  blocklistStore = data.map((row: any) => ({
    id: row.id,
    type: row.type,
    value: row.value,
    normalizedValue: row.normalized_value,
    category: row.category,
    categoryLabel: row.category_label,
    threatLevel: row.threat_level,
    flagCount: row.flag_count,
    firstReported: row.first_reported,
    lastSeen: row.last_seen,
    impersonatedBrand: row.impersonated_brand || undefined,
    status: row.status,
    verificationStatus: row.verification_status,
    sessionIds: row.session_ids || [],
    notes: row.notes || undefined,
  }));

  console.log(
    `[ScamBait DB] Loaded ${blocklistStore.length} blocklist records`
  );
}

// 0. FEATURE 4: /api/quick-detect (Detect-First instant risk assessment)
app.post('/api/quick-detect', async (req: Request, res: Response) => {
  const { message, language: reqLang } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'Message content is required for quick detection.',
      code: 'EMPTY_INPUT',
    });
  }

  const cleanMessage = message.trim();
  const detectedLang = reqLang || detectLanguage(cleanMessage);
  const localIndicators = extractIndicatorsLocally(cleanMessage);
  const heuristic = classifyThreatHeuristically(cleanMessage, localIndicators);
  const bestPersona = selectBestPersona(heuristic.category, detectedLang);

  const totalIndicatorsCount =
    localIndicators.upiIds.length +
    localIndicators.phoneNumbers.length +
    localIndicators.urls.length +
    localIndicators.bankAccounts.length +
    localIndicators.cryptoWallets.length;

  // Build high-impact reasons array
  const reasons: string[] = [];
  if (heuristic.urgencyTactics.length > 0) {
    reasons.push(`Creates high-pressure urgency ("${heuristic.urgencyTactics[0]}")`);
  } else {
    reasons.push('Uses coercive urgency pacing to bypass rational verification');
  }

  if (localIndicators.upiIds.length > 0) {
    reasons.push(`Demands unverified UPI payment (${localIndicators.upiIds[0]})`);
  } else if (localIndicators.bankAccounts.length > 0) {
    reasons.push('Directs funds to third-party mule bank accounts');
  } else if (localIndicators.urls.length > 0) {
    reasons.push(`Links to suspicious unverified domain (${localIndicators.urls[0]})`);
  }

  if (localIndicators.brandsImpersonated.length > 0) {
    reasons.push(`Impersonates official authority (${localIndicators.brandsImpersonated.join(', ')})`);
  } else if (heuristic.psychologicalTriggers.length > 0) {
    reasons.push(`Exploits psychological triggers: ${heuristic.psychologicalTriggers[0]}`);
  } else {
    reasons.push('Employs unverified social engineering pretext');
  }

  let riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
  if (heuristic.riskScore >= 70) riskLevel = 'HIGH';
  else if (heuristic.riskScore >= 40) riskLevel = 'MEDIUM';

  const quickResult: QuickDetectResult = {
    risk_level: riskLevel,
    risk_score: heuristic.riskScore,
    scam_type: heuristic.category,
    scam_category_label: heuristic.categoryLabel,
    language: detectedLang,
    reasons: reasons.slice(0, 4),
    suggested_action:
      riskLevel === 'HIGH'
        ? 'Do not transfer money, share OTPs, click suspicious links, or join video calls. Deploy ScamBait countermeasure to neutralize suspect.'
        : 'Exercise extreme caution. Verify sender through official bank / law enforcement channels before interacting.',
    matched_persona_id: bestPersona.persona_id,
    matched_persona_name: bestPersona.name,
    matched_persona_avatar: bestPersona.avatar,
    indicators_count: totalIndicatorsCount,
    detected_indicators: localIndicators,
  };

  return res.json(quickResult);
});

// 1. /api/analyze route with 10s timeout, retry once, and fail-safe fallback
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { message, personaId, demoCaseId, language: reqLang } = req.body;

  // Validation
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: 'Message content is required and cannot be empty.',
      code: 'EMPTY_INPUT',
    });
  }

  const cleanMessage = message.trim();
  if (cleanMessage.length > 4000) {
    return res.status(400).json({
      error: 'Message exceeds maximum allowed limit of 4,000 characters.',
      code: 'INPUT_TOO_LONG',
    });
  }

  const detectedLanguage = reqLang || detectLanguage(cleanMessage);
  const sessionId = `sess-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  // Check if this matches a demo case ID directly for instant presentation
  if (demoCaseId && PRECOMPUTED_DEMO_RESULTS[demoCaseId]) {
    const demoResult = { ...PRECOMPUTED_DEMO_RESULTS[demoCaseId] };
    demoResult.session_id = sessionId;
    demoResult.complaintDraft = generateComplaintReport(demoResult);
    sessionsStore.set(demoResult.id, demoResult);
    sessionsStore.set(sessionId, demoResult);
    registerIndicatorsToBlocklist(demoResult, sessionId);
    await saveBlocklistToDatabase();
    totalScammerMinutesWasted += demoResult.estimatedTimeWastedMinutes;
    totalAnalyzedMessages += 1;
    return res.json(demoResult);
  }

  // Also check if text matches any demo cases
  for (const dc of DEMO_CASES) {
    if (cleanMessage.includes(dc.fullMessage.slice(0, 80)) || cleanMessage === dc.fullMessage) {
      const demoResult = { ...PRECOMPUTED_DEMO_RESULTS[dc.id] };
      if (demoResult) {
        demoResult.session_id = sessionId;
        demoResult.complaintDraft = generateComplaintReport(demoResult);
        sessionsStore.set(demoResult.id, demoResult);
        sessionsStore.set(sessionId, demoResult);
        registerIndicatorsToBlocklist(demoResult, sessionId);
        await saveBlocklistToDatabase();
        totalScammerMinutesWasted += demoResult.estimatedTimeWastedMinutes;
        totalAnalyzedMessages += 1;
        return res.json(demoResult);
      }
    }
  }

  // Local fallback indicators and heuristic classification as baseline
  const localIndicators = extractIndicatorsLocally(cleanMessage);
  const heuristic = classifyThreatHeuristically(cleanMessage, localIndicators);
  const heuristicDialogue = generateBaitDialogue(
    heuristic.category,
    cleanMessage,
    personaId,
    detectedLanguage
  );

  const apiKey = process.env.GEMINI_API_KEY;

  // If no Gemini API key or offline, use deterministic threat engine
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.log('[ScamBait] Running local deterministic threat analysis engine (API key not configured).');
    const localResult: AnalysisResult = {
      id: `analysis-${Date.now()}`,
      session_id: sessionId,
      originalMessage: cleanMessage,
      category: heuristic.category,
      categoryLabel: heuristic.categoryLabel,
      scam_type: heuristic.category,
      riskScore: heuristic.riskScore,
      threatLevel: heuristic.threatLevel,
      justification: heuristic.justification,
      indicators: localIndicators,
      triggeredPhrases: heuristic.triggeredPhrases,
      fingerprint: heuristic.fingerprint,
      psychologicalTriggers: heuristic.psychologicalTriggers,
      urgencyTactics: heuristic.urgencyTactics,
      recommendedAction: heuristic.recommendedAction,
      selectedPersona: heuristicDialogue.persona,
      baitConversation: heuristicDialogue.conversation,
      estimatedTimeWastedMinutes: heuristicDialogue.estimatedTimeWastedMinutes,
      detectedLanguage: detectedLanguage === 'kn' ? 'Kannada / Kanglish' : detectedLanguage === 'hi' ? 'Hindi / Hinglish' : 'English',
      language: detectedLanguage,
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    localResult.complaintDraft = generateComplaintReport(localResult);
    sessionsStore.set(localResult.id, localResult);
    sessionsStore.set(sessionId, localResult);
    registerIndicatorsToBlocklist(localResult, sessionId);
    await saveBlocklistToDatabase();
    totalScammerMinutesWasted += localResult.estimatedTimeWastedMinutes;
    totalAnalyzedMessages += 1;
    return res.json(localResult);
  }

  // AI-powered analysis with Gemini (gemini-3.8-flash)
  const callModelWithTimeout = async (attempt: number = 1): Promise<AnalysisResult> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const personaChoice = personaId ? getPersonaById(personaId) : heuristicDialogue.persona;

      const systemPrompt = `You are ScamBait, an elite cybersecurity defense threat intelligence engine specializing in Indian & Global cyber fraud taxonomy.
Analyze this suspicious/scam message and return a strictly valid JSON response.
Categories: "digital_arrest", "courier_customs", "upi_refund", "loan_app", "kyc_banking", "job_scam", "lottery_prize", "tech_support", "romance_investment", "utility_bill", "other".
Language: Detect if text is "en", "hi" (Hindi/Hinglish), or "kn" (Kannada/Kanglish).
Extract actionable indicators of compromise (IOCs): UPI IDs, phone numbers, suspicious URLs/domains, bank accounts, impersonated brands, and crypto wallets.
Assign a risk score (0-100), threat level (CRITICAL, HIGH, MEDIUM, LOW), and generate a multi-turn in-character scam-baiting conversation where the AI persona (${personaChoice.name}) strings the scammer along with believable, hilarious, distracting excuses.
If the language is Hindi or Kannada, the persona MUST reply in natural conversational Hinglish or Kanglish (mixed Indian texting style) without breaking character!`;

      const userPrompt = `Message to analyze:
"""
${cleanMessage}
"""

Respond ONLY with a JSON object adhering to this schema:
{
  "category": "digital_arrest" | "courier_customs" | "upi_refund" | "loan_app" | "kyc_banking" | "job_scam" | "lottery_prize" | "tech_support" | "romance_investment" | "utility_bill" | "other",
  "categoryLabel": string,
  "language": "en" | "hi" | "kn",
  "riskScore": number (0 to 100),
  "threatLevel": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "justification": string (2-3 sentences explaining the risk),
  "indicators": {
    "upiIds": string[],
    "phoneNumbers": string[],
    "urls": string[],
    "bankAccounts": string[],
    "brandsImpersonated": string[],
    "cryptoWallets": string[]
  },
  "triggeredPhrases": [
    { "phrase": string, "reason": string, "severity": "high" | "medium" | "low" }
  ],
  "psychologicalTriggers": string[],
  "urgencyTactics": string[],
  "recommendedAction": string,
  "fingerprint": {
    "clusterId": string,
    "clusterName": string,
    "similarityMatchPercent": number,
    "knownVictimsTargeted": number,
    "firstSeenDaysAgo": number,
    "variantFamily": string,
    "behaviorTactic": string
  },
  "selectedPersona": {
    "id": string,
    "name": string,
    "role": string,
    "strategy": string,
    "avatar": string
  },
  "baitConversation": [
    {
      "speaker": "scammer" | "persona",
      "personaName": string,
      "avatar": string,
      "message": string,
      "timestamp": string,
      "tacticUsed": string,
      "timeDelaySec": number
    }
  ],
  "estimatedTimeWastedMinutes": number
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          temperature: 0.3,
        },
      });

      clearTimeout(timeoutId);

      const text = response.text?.trim() || '{}';
      const parsed = JSON.parse(text);

      // Merge with locally detected indicators so nothing is missed
      const mergedUpi = Array.from(new Set([...(parsed.indicators?.upiIds || []), ...localIndicators.upiIds]));
      const mergedPhones = Array.from(new Set([...(parsed.indicators?.phoneNumbers || []), ...localIndicators.phoneNumbers]));
      const mergedUrls = Array.from(new Set([...(parsed.indicators?.urls || []), ...localIndicators.urls]));
      const mergedBanks = Array.from(new Set([...(parsed.indicators?.bankAccounts || []), ...localIndicators.bankAccounts]));
      const mergedBrands = Array.from(new Set([...(parsed.indicators?.brandsImpersonated || []), ...localIndicators.brandsImpersonated]));
      const mergedWallets = Array.from(new Set([...(parsed.indicators?.cryptoWallets || []), ...localIndicators.cryptoWallets]));

      const finalResult: AnalysisResult = {
        id: `analysis-${Date.now()}`,
        session_id: sessionId,
        originalMessage: cleanMessage,
        category: parsed.category || heuristic.category,
        categoryLabel: parsed.categoryLabel || heuristic.categoryLabel,
        scam_type: parsed.category || heuristic.category,
        riskScore: typeof parsed.riskScore === 'number' ? parsed.riskScore : heuristic.riskScore,
        threatLevel: parsed.threatLevel || heuristic.threatLevel,
        justification: parsed.justification || heuristic.justification,
        indicators: {
          upiIds: mergedUpi,
          phoneNumbers: mergedPhones,
          urls: mergedUrls,
          bankAccounts: mergedBanks,
          brandsImpersonated: mergedBrands,
          cryptoWallets: mergedWallets,
        },
        triggeredPhrases: parsed.triggeredPhrases && parsed.triggeredPhrases.length > 0
          ? parsed.triggeredPhrases
          : heuristic.triggeredPhrases,
        psychologicalTriggers: parsed.psychologicalTriggers || heuristic.psychologicalTriggers,
        urgencyTactics: parsed.urgencyTactics || heuristic.urgencyTactics,
        recommendedAction: parsed.recommendedAction || heuristic.recommendedAction,
        fingerprint: parsed.fingerprint || heuristic.fingerprint,
        selectedPersona: parsed.selectedPersona || heuristicDialogue.persona,
        baitConversation: parsed.baitConversation && parsed.baitConversation.length > 0
          ? parsed.baitConversation
          : heuristicDialogue.conversation,
        estimatedTimeWastedMinutes: parsed.estimatedTimeWastedMinutes || heuristicDialogue.estimatedTimeWastedMinutes,
        detectedLanguage: detectedLanguage === 'kn' ? 'Kannada / Kanglish' : detectedLanguage === 'hi' ? 'Hindi / Hinglish' : 'English',
        language: detectedLanguage,
        analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      finalResult.complaintDraft = generateComplaintReport(finalResult);
      return finalResult;
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error(`[ScamBait AI Analysis Error - Attempt ${attempt}]:`, err?.message || err);

      if (attempt === 1) {
        // Retry once with exponential backoff (800ms)
        await new Promise((resolve) => setTimeout(resolve, 800));
        return callModelWithTimeout(2);
      }

      throw err;
    }
  };

  try {
    const result = await callModelWithTimeout(1);
    sessionsStore.set(result.id, result);
    sessionsStore.set(sessionId, result);
    registerIndicatorsToBlocklist(result, sessionId);
    await saveBlocklistToDatabase();
    totalScammerMinutesWasted += result.estimatedTimeWastedMinutes;
    totalAnalyzedMessages += 1;
    return res.json(result);
  } catch (error: any) {
    console.warn('[ScamBait] AI call failed after retry, seamlessly using deterministic threat engine fallback.');

    const fallbackResult: AnalysisResult = {
      id: `analysis-fallback-${Date.now()}`,
      session_id: sessionId,
      originalMessage: cleanMessage,
      category: heuristic.category,
      categoryLabel: heuristic.categoryLabel,
      scam_type: heuristic.category,
      riskScore: heuristic.riskScore,
      threatLevel: heuristic.threatLevel,
      justification: heuristic.justification,
      indicators: localIndicators,
      triggeredPhrases: heuristic.triggeredPhrases,
      fingerprint: heuristic.fingerprint,
      psychologicalTriggers: heuristic.psychologicalTriggers,
      urgencyTactics: heuristic.urgencyTactics,
      recommendedAction: heuristic.recommendedAction,
      selectedPersona: heuristicDialogue.persona,
      baitConversation: heuristicDialogue.conversation,
      estimatedTimeWastedMinutes: heuristicDialogue.estimatedTimeWastedMinutes,
      detectedLanguage: detectedLanguage === 'kn' ? 'Kannada / Kanglish' : detectedLanguage === 'hi' ? 'Hindi / Hinglish' : 'English',
      language: detectedLanguage,
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    fallbackResult.complaintDraft = generateComplaintReport(fallbackResult);
    sessionsStore.set(fallbackResult.id, fallbackResult);
    sessionsStore.set(sessionId, fallbackResult);
    registerIndicatorsToBlocklist(fallbackResult, sessionId);
    await saveBlocklistToDatabase();
    totalScammerMinutesWasted += fallbackResult.estimatedTimeWastedMinutes;
    totalAnalyzedMessages += 1;
    return res.json(fallbackResult);
  }
});

// 2. /api/interact: conversational next-turn scam-baiting with vernacular support
app.post('/api/interact', async (req: Request, res: Response) => {
  const { persona, conversationHistory, nextMessage, language: reqLang } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const historyText = (conversationHistory || [])
    .map((c: any) => `${c.speaker === 'scammer' ? 'Scammer' : persona?.name || 'Persona'}: ${c.message}`)
    .join('\n');

  const lang = reqLang || persona?.language || 'en';

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Deterministic vernacular witty responses
    let chosen = '';
    if (lang === 'hi') {
      const hiReplies = [
        "अरे भैया, मैंने गूगल पे खोला तो स्क्रीन पर 'Payment Failed' आ गया! क्या मैं मोहल्ले के साइबर कैफे जाकर 50 रुपये दूं?",
        "साहब एक मिनट रुकिए! मेरे दामाद वकील साहब अभी-अभी घर के गेट पर आए हैं, वो कह रहे हैं कि पहले आपका पुलिस स्टेशन का लैंडलाइन नंबर पूछूं!",
        "अरे भैया, मेरी सासू माँ ने फोन छीन लिया और बोलीं कि किसी अनजान को ओटीपी मत देना! क्या आप सासू माँ को समझाएंगे?",
        "साहब फोन की बैटरी 2% बची है और चार्जर नहीं मिल रहा! क्या मैं कल सुबह थाने आकर हलफनामा दे दूँ?",
      ];
      chosen = hiReplies[Math.floor(Math.random() * hiReplies.length)];
    } else if (lang === 'kn') {
      const knReplies = [
        "ಅಯ್ಯೋ ಸಾಹೇಬ್ರೇ, ನನ್ ಮೊಬೈಲ್ ಅಲ್ಲಿ ಇಂಟರ್ನೆಟ್ ಖಾಲಿಯಾಗಿದೆ! ನಮ್ಮ ಪಕ್ಕದ ಮನೆ ಹುಡುಗನಿಗೆ ವೈಫೈ ಪಾಸ್‌ವರ್ಡ್ ಕೇಳ್ತಾ ಇದೀನಿ, 10 ನಿಮಿಷ ಲೈನ್ ಅಲ್ಲಿ ಇರಿ!",
        "ರೀ ತಮ್ಮಾ, ನನ್ ಕಣ್ಣಿಗೆ ಕನ್ನಡಕ ಕಾಣ್ತಿಲ್ಲ! ನನ್ ಮೊಮ್ಮಗ ಬಂದು ಓದೋವರೆಗೂ ವೇಟ್ ಮಾಡ್ತೀಯಾ?",
        "ಸಾಹೇಬ್ರೇ, ನಮ್ಮ ಊರಿನ ಸೈಬರ್ ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಗೆ ನಾನೇ ನಡ್ಕೊಂಡು ಹೋಗಿ ನಿಮ್ಮ ಬಗ್ಗೆ ಕಂಪ್ಲೈಂಟ್ ವೆರಿಫೈ ಮಾಡ್ತೀನಿ ಅಂತ ನನ್ ಹೆಂಡ್ತಿ ಹೇಳ್ತಿದ್ದಾಳೆ!",
      ];
      chosen = knReplies[Math.floor(Math.random() * knReplies.length)];
    } else {
      const enReplies = [
        "Oh goodness, I tapped the screen and my camera took a photo of my ceiling fan! Does the Reserve Bank need to see my ceiling fan?",
        "My nephew said I should never give my OTP to strangers, but you seem so very polite! Are you related to the Guptas on Elm Street?",
        "I am trying to find the button you mentioned, but my tea just boiled over on the stove. Hold on for just 10 minutes while I wipe the milk!",
        "I took my telephone to the local post office and the clerk told me to ask you for your badge identification number. What is your badge number dear?",
      ];
      chosen = enReplies[Math.floor(Math.random() * enReplies.length)];
    }

    totalScammerMinutesWasted += 6;
    return res.json({
      reply: {
        speaker: 'persona',
        personaName: persona?.name || 'Grandma Martha',
        avatar: persona?.avatar || '👵',
        message: chosen,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticUsed: 'Distraction and deliberate technical incompetence',
        timeDelaySec: 320,
      },
      timeAddedMinutes: 6,
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const langInstruction =
      lang === 'hi'
        ? 'Reply in natural conversational Hinglish / Hindi-English mix (the way urban Indians text on WhatsApp). Keep it believable, hilarious, and frustrating for the scammer.'
        : lang === 'kn'
        ? 'Reply in natural conversational Kanglish / Kannada-English mix (the way people text in Bengaluru/Karnataka). Keep it believable and distracting.'
        : 'Reply in character, believable, and intentionally frustrating for the scammer.';

    const prompt = `You are playing the scam-baiting persona "${persona?.name || 'Grandma Martha'}".
Persona role: ${persona?.role || 'Elderly citizen'}.
Persona strategy: ${persona?.strategy || 'Pretend to be helpless, waste time, ask absurd questions, misunderstand technology'}.
Language style: ${langInstruction}

Conversation history:
${historyText}

The scammer just said:
"${nextMessage || 'Did you make the payment yet?'}"

Generate the persona's next in-character reply. Waste their time without tipping them off that you are onto them. Do not break character. Keep it under 60 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { temperature: 0.8 },
    });

    const personaText = response.text?.trim() || 'Oh dear, let me find my glasses first!';
    totalScammerMinutesWasted += 7;

    return res.json({
      reply: {
        speaker: 'persona',
        personaName: persona?.name || 'Grandma Martha',
        avatar: persona?.avatar || '👵',
        message: personaText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticUsed: 'In-character conversational stall',
        timeDelaySec: 280,
      },
      timeAddedMinutes: 7,
    });
  } catch (err: any) {
    console.error('[ScamBait Interact Error]:', err?.message || err);
    return res.json({
      reply: {
        speaker: 'persona',
        personaName: persona?.name || 'Grandma Martha',
        avatar: persona?.avatar || '👵',
        message: 'Oh my, I dropped my reading glasses behind the sofa! Hold on while I find my walking stick to fish them out...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticUsed: 'Physical world distraction delay',
        timeDelaySec: 300,
      },
      timeAddedMinutes: 5,
    });
  }
});

// 3. FEATURE 2: GET /api/sessions/:id/report (NCRP / 1930 Cybercrime Complaint Draft)
app.get('/api/sessions/:id/report', (req: Request, res: Response) => {
  const sessionId = req.params.id;
  const session = sessionsStore.get(sessionId);

  if (!session) {
    return res.status(404).json({
      error: `No analysis session found with ID "${sessionId}". Please run an analysis first.`,
      code: 'SESSION_NOT_FOUND',
    });
  }

  const report = session.complaintDraft || generateComplaintReport(session);
  return res.json({
    session_id: sessionId,
    report,
    meta: {
      generated_at: new Date().toISOString(),
      disclaimer:
        'DRAFT — REVIEW BEFORE SUBMITTING. ScamBait does not directly submit this complaint to any government portal or helpline.',
    },
  });
});

// 4. POST /api/report/generate (Generate custom report with complainant details)
app.post('/api/report/generate', (req: Request, res: Response) => {
  const { analysisResult, complainant } = req.body;
  if (!analysisResult) {
    return res.status(400).json({ error: 'analysisResult is required', code: 'MISSING_DATA' });
  }

  const report = generateComplaintReport(analysisResult, complainant);
  return res.json({
    report,
    disclaimer: 'DRAFT — REVIEW BEFORE SUBMITTING',
  });
});

// 5. /api/blocklist: GET all threat indicators
app.get('/api/blocklist', (_req: Request, res: Response) => {
  return res.json({
    total: blocklistStore.length,
    blocklist: blocklistStore,
    verifiedCount: blocklistStore.filter((b) => b.verificationStatus === 'verified').length,
    pendingCount: blocklistStore.filter((b) => b.verificationStatus === 'pending').length,
  });
});

// 6. /api/lookup: instant check-before-you-trust with normalization
app.get('/api/lookup', (req: Request, res: Response) => {
  const rawQuery = (req.query.query as string || '').trim();
  if (!rawQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const lowerQuery = rawQuery.toLowerCase();
  const normPhone = normalizeIdentifier('phone', rawQuery);
  const normUpi = normalizeIdentifier('upi', rawQuery);
  const normUrl = normalizeIdentifier('url', rawQuery);

  // Exact or normalized match in blocklist
  const matches = blocklistStore.filter((entry) => {
    const val = entry.value.toLowerCase();
    const nVal = entry.normalizedValue || '';

    return (
      val.includes(lowerQuery) ||
      (nVal && (nVal === normPhone || nVal === normUpi || nVal === normUrl || nVal.includes(lowerQuery))) ||
      (entry.impersonatedBrand && entry.impersonatedBrand.toLowerCase().includes(lowerQuery))
    );
  });

  const isFlagged = matches.length > 0;
  const highestThreat = matches.reduce((acc, curr) => {
    if (curr.threatLevel === 'CRITICAL') return 'CRITICAL';
    if (curr.threatLevel === 'HIGH' && acc !== 'CRITICAL') return 'HIGH';
    return acc;
  }, isFlagged ? 'MEDIUM' : 'SAFE');

  const verifiedMatches = matches.filter((m) => m.verificationStatus === 'verified');
  const pendingMatches = matches.filter((m) => m.verificationStatus === 'pending');

  return res.json({
    query: rawQuery,
    isFlagged,
    threatLevel: isFlagged ? highestThreat : 'SAFE',
    matchCount: matches.length,
    verifiedCount: verifiedMatches.length,
    pendingCount: pendingMatches.length,
    matches,
    verdict: isFlagged
      ? `WARNING: This identifier matches ${matches.length} threat record(s) (${verifiedMatches.length} VERIFIED across multiple distinct sessions) in the ScamBait community defense network!`
      : `No prior reports found for "${rawQuery}" in our verified database. Always exercise caution before transferring funds or sharing credentials.`,
  });
});

// 7. /api/stats: community statistics
app.get('/api/stats', (_req: Request, res: Response) => {
  const categoryCounts: Record<string, number> = {};
  blocklistStore.forEach((entry) => {
    categoryCounts[entry.categoryLabel] = (categoryCounts[entry.categoryLabel] || 0) + 1;
  });

  return res.json({
    totalScammerMinutesWasted,
    totalThreatsIndexed: blocklistStore.length,
    totalAnalyzedMessages,
    categoryCounts,
    verifiedCount: blocklistStore.filter((b) => b.verificationStatus === 'verified').length,
    pendingCount: blocklistStore.filter((b) => b.verificationStatus === 'pending').length,
    activeTrapsCount: blocklistStore.filter((b) => b.status === 'active_trap').length,
    confirmedMaliciousCount: blocklistStore.filter((b) => b.status === 'confirmed_malicious' || b.status === 'verified').length,
  });
});

// Start Express server
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ScamBait] Threat Intelligence Server operational on port ${PORT}`);
  });
}

loadBlocklistFromDatabase()
  .then(() => startServer())
  .catch((err) => {
    console.error('[ScamBait Server Startup Error]:', err);
  });
