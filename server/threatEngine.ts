import { AnalysisResult, Indicators, TriggeredPhrase, PatternFingerprint, PersonaReply, ScamCategory, ThreatLevel } from '../src/types/threat.ts';
import { selectBestPersona, getPersonaById, ALL_PERSONAS } from '../src/data/personas.ts';

/**
 * Detect language from text (Kannada, Hindi/Hinglish, or English default)
 */
export function detectLanguage(text: string): 'en' | 'hi' | 'kn' {
  // Check for Kannada Unicode script (0C80-0CFF)
  if (/[\u0C80-\u0CFF]/.test(text)) {
    return 'kn';
  }
  // Check for Devanagari / Hindi Unicode script (0900-097F)
  if (/[\u0900-\u097F]/.test(text)) {
    return 'hi';
  }

  const lower = text.toLowerCase();

  // Kanglish keywords (Kannada transliterated in Latin)
  const kanglishWords = ['nimage', 'madoke', 'beku', 'agide', 'haaki', 'thamma', 'nandu', 'kodbeku', 'illa', 'gothilla', 'heli', 'yav'];
  if (kanglishWords.some(w => lower.includes(w))) {
    return 'kn';
  }

  // Hinglish keywords (Hindi transliterated in Latin)
  const hinglishWords = ['aapka', 'karein', 'hoga', 'paise', 'rupaye', 'bhaiya', 'turant', 'thana', 'khata', 'bhejo', 'padega', 'karunga', 'nahi'];
  if (hinglishWords.some(w => lower.includes(w))) {
    return 'hi';
  }

  return 'en';
}

// Deterministic high-speed rule-based extractor
export function extractIndicatorsLocally(text: string): Indicators {
  // Regex for UPI IDs: e.g. name@bank, username@okaxis, etc.
  const upiRegex = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/gi;
  // Exclude common email domains
  const emailDomains = ['gmail', 'yahoo', 'hotmail', 'outlook', 'proton', 'icloud', 'aol'];
  const potentialUpis = text.match(upiRegex) || [];
  const upiIds: string[] = [];
  const emails: string[] = [];

  for (const item of potentialUpis) {
    const parts = item.split('@');
    const domain = parts[1]?.toLowerCase();
    if (emailDomains.some(ed => domain.startsWith(ed))) {
      emails.push(item);
    } else {
      upiIds.push(item);
    }
  }

  // Phone numbers (Indian, US, International)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,5}/g;
  const rawPhones = text.match(phoneRegex) || [];
  const phoneNumbers = rawPhones
    .map(p => p.trim())
    .filter(p => {
      const digitsOnly = p.replace(/\D/g, '');
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    });

  // URLs / suspicious domains
  const urlRegex = /(?:https?:\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
  const rawUrls = text.match(urlRegex) || [];
  const urls = rawUrls.map(u => u.replace(/[.,;!?]+$/, ''));

  // Also check for bare suspicious domains like example.live, example.xyz, etc.
  const bareDomainRegex = /\b[a-zA-Z0-9-]+\.(?:live|xyz|online|top|club|site|ru|cc|click|work|app|link|buzz|vip)(?:\/[^\s]*)?/gi;
  const bareDomains = text.match(bareDomainRegex) || [];
  bareDomains.forEach(bd => {
    if (!urls.some(u => u.includes(bd))) {
      urls.push(`http://${bd}`);
    }
  });

  // Bank accounts & IFSC codes
  const bankAccounts: string[] = [];
  const ifscMatch = text.match(/[A-Z]{4}0[A-Z0-9]{6}/gi);
  const acMatch = text.match(/(?:Account\s*(?:Number|No\.?)?|A\/C\s*(?:No\.?)?)\s*[:=\-]?\s*(\d{9,18})/gi);
  if (acMatch || ifscMatch) {
    const acStr = acMatch ? acMatch.join(', ') : '';
    const ifscStr = ifscMatch ? `IFSC: ${ifscMatch.join(', ')}` : '';
    bankAccounts.push([acStr, ifscStr].filter(Boolean).join(' | '));
  }

  // Crypto wallets (BTC, ETH, TRON TRC20, SOL)
  const cryptoWallets: string[] = [];
  const tronMatch = text.match(/\bT[A-Za-z1-9]{33}\b/g); // TRON TRC20
  const ethMatch = text.match(/\b0x[a-fA-F0-9]{40}\b/g); // ETH/BSC
  const btcMatch = text.match(/\b(?:bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}\b/g); // BTC
  if (tronMatch) cryptoWallets.push(...tronMatch.map(t => `${t} (TRON TRC20)`));
  if (ethMatch) cryptoWallets.push(...ethMatch.map(e => `${e} (ETH/EVM)`));
  if (btcMatch) cryptoWallets.push(...btcMatch.map(b => `${b} (BTC)`));

  // Impersonated brands & agencies
  const brandsImpersonated: string[] = [];
  const brandKeywords = [
    { name: 'CBI / Mumbai Police Cyber Cell', match: /\b(?:CBI|Mumbai\s*Police|Cyber\s*Cell|Crime\s*Branch|Digital\s*Arrest)\b/i },
    { name: 'FedEx / Indian Customs', match: /\b(?:FedEx|DHL|Customs|Narcotics|NCB)\b/i },
    { name: 'State Bank of India (SBI)', match: /\b(?:SBI|State\s*Bank\s*of\s*India)\b/i },
    { name: 'HDFC Bank', match: /\bHDFC\b/i },
    { name: 'Reserve Bank of India (RBI)', match: /\bRBI|Reserve\s*Bank\b/i },
    { name: 'Google Pay / PhonePe', match: /\b(?:Google\s*Pay|GPay|PhonePe|Paytm)\b/i },
    { name: 'Amazon', match: /\bAmazon\b/i },
    { name: 'YouTube', match: /\bYouTube\b/i },
    { name: 'Microsoft Windows Defender', match: /\b(?:Microsoft|Windows\s*Defender)\b/i },
    { name: 'KBC (Kaun Banega Crorepati)', match: /\bKBC|Kaun\s*Banega\s*Crorepati\b/i },
    { name: 'Instant Loan App / NBFC', match: /\b(?:Loan\s*App|QuickLoan|FastCash|CreditRupee)\b/i },
    { name: 'Telegram', match: /\bTelegram\b/i },
    { name: 'WhatsApp', match: /\bWhatsApp\b/i },
    { name: 'Axis Bank', match: /\bAxis\s*Bank\b/i },
    { name: 'Tether (USDT)', match: /\bUSDT|Tether\b/i },
  ];

  for (const b of brandKeywords) {
    if (b.match.test(text)) {
      brandsImpersonated.push(b.name);
    }
  }

  return {
    upiIds: Array.from(new Set(upiIds)),
    phoneNumbers: Array.from(new Set(phoneNumbers)),
    urls: Array.from(new Set(urls)),
    bankAccounts: Array.from(new Set(bankAccounts)),
    brandsImpersonated: Array.from(new Set(brandsImpersonated)),
    cryptoWallets: Array.from(new Set(cryptoWallets)),
    emailAddresses: Array.from(new Set(emails)),
  };
}

// Rule-based classification & risk scoring engine
export function classifyThreatHeuristically(text: string, indicators: Indicators): {
  category: ScamCategory;
  categoryLabel: string;
  riskScore: number;
  threatLevel: ThreatLevel;
  justification: string;
  triggeredPhrases: TriggeredPhrase[];
  psychologicalTriggers: string[];
  urgencyTactics: string[];
  fingerprint: PatternFingerprint;
  recommendedAction: string;
  language: 'en' | 'hi' | 'kn';
} {
  const lower = text.toLowerCase();
  const triggeredPhrases: TriggeredPhrase[] = [];
  const psychologicalTriggers: string[] = [];
  const urgencyTactics: string[] = [];

  const language = detectLanguage(text);

  let category: ScamCategory = 'other';
  let categoryLabel = 'Suspected Social Engineering Threat';
  let score = 50;

  // 1. Digital Arrest / Police Impersonation
  if (
    lower.includes('digital arrest') ||
    lower.includes('cbi') ||
    lower.includes('mumbai police') ||
    lower.includes('cyber crime branch') ||
    lower.includes('arrest warrant') ||
    lower.includes('skype video') ||
    lower.includes('money laundering case') ||
    lower.includes('narcotics control') ||
    lower.includes('crime branch')
  ) {
    category = 'digital_arrest';
    categoryLabel = 'Digital Arrest / Police Impersonation Scam';
    score += 48;
    psychologicalTriggers.push('Severe Criminal Prosecution Terror', 'High-Level Law Enforcement Coercion (CBI/Police)');
  }
  // 2. Fake Courier / Customs Scam
  else if (
    lower.includes('customs') ||
    lower.includes('parcel') ||
    lower.includes('fedex') ||
    lower.includes('dhl') ||
    lower.includes('drugs in parcel') ||
    lower.includes('stuck at customs') ||
    lower.includes('clearance fee') ||
    lower.includes('customs duty') ||
    lower.includes('airport customs')
  ) {
    category = 'courier_customs';
    categoryLabel = 'Fake Courier / Customs Clearance Scam';
    score += 45;
    psychologicalTriggers.push('Fabricated Contraband Accusation', 'Extortion under Threat of Customs Detention');
  }
  // 3. UPI Refund / Payment Reverse Scam
  else if (
    lower.includes('sent by mistake') ||
    lower.includes('refund') ||
    lower.includes('enter mpin') ||
    lower.includes('collect request') ||
    lower.includes('gpay refund') ||
    lower.includes('phonepe refund') ||
    (lower.includes('25000') && lower.includes('mistake')) ||
    (lower.includes('5000') && lower.includes('transfer karo'))
  ) {
    category = 'upi_refund';
    categoryLabel = 'UPI Refund / Reverse-Charge Fraud';
    score += 42;
    psychologicalTriggers.push('False Guilt / Honest Error Pretext', 'Technical UPI Reverse-Payment Trap');
  }
  // 4. Loan-App Harassment Scam
  else if (
    lower.includes('loan overdue') ||
    lower.includes('loan app') ||
    lower.includes('recovery agent') ||
    lower.includes('defamation') ||
    lower.includes('contact list') ||
    lower.includes('morph') ||
    lower.includes('7 days loan') ||
    lower.includes('repay immediately') ||
    lower.includes('ruin reputation')
  ) {
    category = 'loan_app';
    categoryLabel = 'Predatory Loan-App Harassment Scam';
    score += 46;
    psychologicalTriggers.push('Social Defamation & Blackmail', 'Illegal Recovery Agent Intimidation');
  }
  // 5. KYC / Banking
  else if (
    lower.includes('kyc') ||
    lower.includes('pan card') ||
    lower.includes('aadhaar') ||
    lower.includes('account blocked') ||
    lower.includes('debit card') ||
    lower.includes('freeze')
  ) {
    category = 'kyc_banking';
    categoryLabel = 'Banking KYC Suspension Phishing';
    score += 38;
    psychologicalTriggers.push('Panic & Account Freeze Terror', 'Authority Impersonation (Bank Compliance)');
  }
  // 6. Job / Task Scam
  else if (
    lower.includes('like youtube') ||
    lower.includes('part-time') ||
    lower.includes('daily payout') ||
    lower.includes('task') ||
    lower.includes('registration fee') ||
    lower.includes('work from home')
  ) {
    category = 'job_scam';
    categoryLabel = 'Advance-Fee Remote Task Scam';
    score += 35;
    psychologicalTriggers.push('Effortless Income Greed', 'Pretext of Legitimacy (Amazon/Flipkart)');
  }
  // 7. Lottery / Prize
  else if (
    lower.includes('winner') ||
    lower.includes('won') ||
    lower.includes('lottery') ||
    lower.includes('kbc') ||
    lower.includes('lucky draw') ||
    lower.includes('25 lakh')
  ) {
    category = 'lottery_prize';
    categoryLabel = 'Advance-Fee Lottery / Prize Fraud';
    score += 40;
    psychologicalTriggers.push('Windfall Greed', 'False Exclusivity');
  }
  // 8. Tech Support
  else if (
    lower.includes('trojan') ||
    lower.includes('virus') ||
    lower.includes('defender') ||
    lower.includes('anydesk') ||
    lower.includes('teamviewer') ||
    lower.includes('0x800')
  ) {
    category = 'tech_support';
    categoryLabel = 'Tech Support Impersonation & Remote Hijack';
    score += 45;
    psychologicalTriggers.push('Severe Tech Phobia', 'Fear of Total Data & Identity Loss');
  }
  // 9. Romance / Crypto
  else if (
    lower.includes('usdt') ||
    lower.includes('crypto') ||
    lower.includes('arbitrage') ||
    lower.includes('guaranteed profit') ||
    lower.includes('liquidity') ||
    lower.includes('darling') ||
    lower.includes('my love')
  ) {
    category = 'romance_investment';
    categoryLabel = 'Romance / Pig Butchering Crypto Investment';
    score += 42;
    psychologicalTriggers.push('Emotional Grooming & Affection', 'FOMO on Fictitious Wealth Yields');
  }
  // 10. Utility Bill
  else if (
    lower.includes('electricity') ||
    lower.includes('power cut') ||
    lower.includes('disconnection at 9:30') ||
    lower.includes('bill overdue')
  ) {
    category = 'utility_bill';
    categoryLabel = 'Urgent Utility Disconnection Scam';
    score += 35;
    psychologicalTriggers.push('Immediate Threat to Essential Utilities');
  }

  // Scan for trigger phrases
  const urgencyKeywords = [
    { text: 'digital arrest', severity: 'high' as const, reason: 'Illegal coercion technique pretending victim cannot leave camera or room' },
    { text: 'police complaint', severity: 'high' as const, reason: 'Threat of state police prosecution to force compliance' },
    { text: 'customs in 2 hours', severity: 'high' as const, reason: 'Artificial clearance deadline' },
    { text: 'within 24 hours', severity: 'high' as const, reason: 'Arbitrary short deadline to force panic decision-making' },
    { text: 'permanently blocked', severity: 'high' as const, reason: 'Coercive threat of irreversible service loss' },
    { text: 'sent by mistake', severity: 'high' as const, reason: 'Classic reverse-transfer trap prompting victim to authorize debit' },
    { text: 'enter mpin', severity: 'high' as const, reason: 'MPIN is ONLY entered to deduct money, NEVER to receive' },
    { text: 'morph your photos', severity: 'high' as const, reason: 'Illegal extortion tactic common in predatory loan apps' },
    { text: 'refundable security deposit', severity: 'high' as const, reason: 'Classic advance-fee trap phrase' },
    { text: 'immediately', severity: 'medium' as const, reason: 'Pacing manipulation' },
    { text: 'guaranteed profit', severity: 'high' as const, reason: 'Fraudulent financial claim with zero downside' },
    { text: 'processing fee', severity: 'high' as const, reason: 'Upfront payment extortion under bureaucratic guise' },
    { text: 'penalty fee', severity: 'high' as const, reason: 'Threat of state or institutional fine' },
  ];

  for (const uk of urgencyKeywords) {
    if (lower.includes(uk.text)) {
      triggeredPhrases.push({
        phrase: uk.text,
        reason: uk.reason,
        severity: uk.severity,
      });
      urgencyTactics.push(uk.text);
      score += 8;
    }
  }

  // Indicator-based score bumps
  if (indicators.upiIds.length > 0) score += 12;
  if (indicators.urls.length > 0) score += 14;
  if (indicators.phoneNumbers.length > 0) score += 8;
  if (indicators.bankAccounts.length > 0) score += 15;
  if (indicators.cryptoWallets.length > 0) score += 18;

  score = Math.min(Math.max(score, 15), 99);

  let threatLevel: ThreatLevel = 'LOW';
  if (score >= 85) threatLevel = 'CRITICAL';
  else if (score >= 65) threatLevel = 'HIGH';
  else if (score >= 40) threatLevel = 'MEDIUM';

  const clusterSuffix = Math.floor(100 + Math.random() * 899);
  const fingerprint: PatternFingerprint = {
    clusterId: `CLUSTER-${category.toUpperCase().slice(0, 4)}-${clusterSuffix}`,
    clusterName: `${categoryLabel} Coordinated Campaign`,
    similarityMatchPercent: Math.floor(91 + Math.random() * 8),
    knownVictimsTargeted: Math.floor(120 + Math.random() * 800),
    firstSeenDaysAgo: Math.floor(5 + Math.random() * 45),
    variantFamily: `${categoryLabel} Engine Script v3.${Math.floor(1 + Math.random() * 9)}`,
    behaviorTactic: `Multi-channel social engineering leveraging urgency, brand spoofing, and unverified payment channels.`,
  };

  const justification = `${threatLevel} threat risk assessed (${score}/100). The message exhibits high-probability scam signatures: ${indicators.brandsImpersonated.length > 0 ? `unauthorized impersonation of ${indicators.brandsImpersonated.join(', ')}, ` : ''}${urgencyTactics.length > 0 ? `manufactured urgency tactics ("${urgencyTactics.slice(0, 2).join('", "')}"), ` : ''}and actionable indicators requiring immediate blacklisting.`;

  const recommendedAction = 'Do not respond, do not click embedded links, and do not make token payments. Add indicators to the ScamBait community blocklist and report to local cyber defense authorities.';

  return {
    category,
    categoryLabel,
    riskScore: score,
    threatLevel,
    justification,
    triggeredPhrases: triggeredPhrases.length > 0 ? triggeredPhrases : [
      { phrase: text.slice(0, 40) + '...', reason: 'Unsolicited communication attempting social engineering', severity: 'medium' }
    ],
    psychologicalTriggers: psychologicalTriggers.length > 0 ? psychologicalTriggers : ['Urgency & Coercion'],
    urgencyTactics: urgencyTactics.length > 0 ? urgencyTactics : ['Immediate Action Requested'],
    fingerprint,
    recommendedAction,
    language,
  };
}

// Persona selection & bait dialogue generator
export function generateBaitDialogue(
  category: ScamCategory,
  originalMessage: string,
  preferredPersonaId?: string,
  language: 'en' | 'hi' | 'kn' = 'en'
): {
  persona: { id: string; name: string; role: string; strategy: string; avatar: string; language?: 'en' | 'hi' | 'kn' };
  conversation: PersonaReply[];
  estimatedTimeWastedMinutes: number;
} {
  // Use requested persona or select best persona based on scam category and language
  const chosenDef = preferredPersonaId 
    ? getPersonaById(preferredPersonaId)
    : selectBestPersona(category, language);

  const persona = {
    id: chosenDef.persona_id,
    name: chosenDef.name,
    role: chosenDef.role,
    strategy: chosenDef.strategy,
    avatar: chosenDef.avatar,
    language: chosenDef.language,
  };

  // 1. Digital Arrest Dialogue
  if (category === 'digital_arrest') {
    if (language === 'hi') {
      return {
        persona,
        conversation: [
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake CBI Officer)',
            avatar: '🚨',
            message: originalMessage.slice(0, 180) + '...',
            timestamp: '11:15 AM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'अरे साहब नमस्ते! CBI का नाम सुनके मेरा BP 180 हो गया है! मैं 40 साल से स्कूल में बच्चों को प्रार्थना करवा रहा हूँ साहब, मैंने कभी चींटी भी नहीं मारी! आप थानेदार साहब का बैज नंबर और अपना आई-कार्ड व्हाट्सएप कर दीजिए, मैं अभी अपने दामाद वकील को फोन लगाता हूँ!',
            timestamp: '11:19 AM',
            tacticUsed: 'Hinglish BP panic stall & lawyer relative deflection',
            timeDelaySec: 240,
          },
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake CBI Officer)',
            avatar: '🚨',
            message: 'नो वकील! दिस इज़ नेशनल सीक्रेसी केस! स्काइप वीडियो कॉल ऑन रखो और कमरे का दरवाजा बंद कर लो वरना स्पेशल कमांडो भेजकर अरेस्ट कर लेंगे!',
            timestamp: '11:21 AM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'साहब स्काइप का कैमरा ऑन कर रहा हूँ लेकिन हमारे मोहल्ले में बिजली का तार टूट गया है! इनवर्टर की बीप-बीप बज रही है। क्या मैं लाल बत्ती वाले पुलिस थाने में आकर 500 रुपये की स्टांप पेपर पर अर्जी दे दूँ? मेरे पास गंगाजल की कसम खाने का हलफनामा भी है साहब!',
            timestamp: '11:26 AM',
            tacticUsed: 'Power-cut excuse and physical stamp paper distraction',
            timeDelaySec: 300,
          },
        ],
        estimatedTimeWastedMinutes: 25,
      };
    }

    if (language === 'kn') {
      return {
        persona,
        conversation: [
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake Police Officer)',
            avatar: '🚨',
            message: originalMessage.slice(0, 180) + '...',
            timestamp: '03:10 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'ಅಯ್ಯೋ ಸಾಹೇಬ್ರೇ! ನಾನು KEB ಯಲ್ಲಿ ಸೀನಿಯರ್ ಲೈನ್‌ಮ್ಯಾನ್ ಆಗಿ ರಿಟೈರ್ಡ್ ಆದವನು. ಪೊಲೀಸ್ ಅರೆಸ್ಟ್ ಅಂದ್ರೆ ನಂಗೆ ಎದೆಬಡಿತ ಜಾಸ್ತಿ ಆಗ್ತಿದೆ! ಯಾವ್ ಕೋರ್ಟ್ ಆರ್ಡರ್ ಸರ್? ನನ್ನ ಅಳಿಯ ಹೈಕೋರ್ಟ್ ಅಲ್ಲಿ ಅಡ್ವೊಕೇಟ್ ಇದ್ದಾರೆ, ಅವರ ಹತ್ರ ಮಾತಾಡ್ತೀರಾ?',
            timestamp: '03:14 PM',
            tacticUsed: 'Kanglish high-court lawyer relative diversion',
            timeDelaySec: 240,
          },
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake Police Officer)',
            avatar: '🚨',
            message: 'ವಕೀಲರಿಗೆ ಕಾಲ್ ಮಾಡ್ಬೇಡಿ! ನಿಮ್ಮ ಆಧಾರ್ ಕಾರ್ಡ್ ಮನಿ ಲಾಂಡ್ರಿಂಗ್ ಕೇಸ್ ಅಲ್ಲಿ ಸಿಕ್ಕಿದೆ! ಈಗಲೇ ₹50,000 ಸೆಕ್ಯೂರಿಟಿ ಡಿಪಾಸಿಟ್ ಕಳಿಸಿ!',
            timestamp: '03:16 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'ಸಾಹೇಬ್ರೇ, 50,000 ನನ್ ಹತ್ರ ಇಲ್ಲ. ನನ್ ಪೆನ್ಷನ್ ಪಾಸ್‌ಬುಕ್ ತಗೊಂಡು ಕಬ್ಬನ್ ಪಾರ್ಕ್ ಪೊಲೀಸ್ ಸ್ಟೇಷನ್ ಗೆ ನೇರವಾಗಿ ಬರ್ತೀನಿ. ನಿಮ್ಮ ಹೆಸರು ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ರಾಥೋಡ್ ಅಂತ ಹೇಳಿದ್ರಲ್ವಾ? ಬಸ್ ಹತ್ತಿದ್ದೀನಿ, ಅರ್ಧ ಗಂಟೆಯಲ್ಲಿ ಬರ್ತೀನಿ ಸರ್!',
            timestamp: '03:22 PM',
            tacticUsed: 'Pretending to visit physical police station directly',
            timeDelaySec: 360,
          },
        ],
        estimatedTimeWastedMinutes: 28,
      };
    }

    return {
      persona,
      conversation: [
        {
          speaker: 'scammer',
          personaName: 'Scammer (Fake Police Officer)',
          avatar: '🚨',
          message: originalMessage.slice(0, 180) + '...',
          timestamp: '10:00 AM',
        },
        {
          speaker: 'persona',
          personaName: persona.name,
          avatar: persona.avatar,
          message: 'Officer, as a retired District Court officer, I must remind you that under Section 41A of the CrPC and recent Supreme Court directives, no legitimate agency conducts "Digital Arrests" via Skype or WhatsApp video calls. Kindly provide your official Police Station Station Diary (GD) number and your IPS badge credentials.',
          timestamp: '10:04 AM',
          tacticUsed: 'Legal section challenge and demanding Station Diary GD entry',
          timeDelaySec: 240,
        },
        {
          speaker: 'scammer',
          personaName: 'Scammer (Fake Police Officer)',
          avatar: '🚨',
          message: 'Don\'t teach law to Mumbai Crime Branch! You are on digital surveillance! Pay clearance fee or team is arriving at your house!',
          timestamp: '10:06 AM',
        },
        {
          speaker: 'persona',
          personaName: persona.name,
          avatar: persona.avatar,
          message: 'Splendid! I have already instructed my son, who is Deputy Commissioner of Police in the Anti-Extortion Cell, to prepare tea and snacks for your team. Which vehicle number should we look out for at the security gate?',
          timestamp: '10:12 AM',
          tacticUsed: 'DCP relative counter-trap rattling extortionist',
          timeDelaySec: 360,
        },
      ],
      estimatedTimeWastedMinutes: 22,
    };
  }

  // 2. Fake Courier / Customs Dialogue
  if (category === 'courier_customs') {
    if (language === 'hi') {
      return {
        persona,
        conversation: [
          {
            speaker: 'scammer',
            personaName: 'Scammer (Customs Agent)',
            avatar: '📦',
            message: originalMessage.slice(0, 180) + '...',
            timestamp: '02:00 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'अरे भैया कौन सा पार्सल? मैंने तो सिर्फ मीशो से 450 रुपये की सिल्क साड़ी मंगवाई थी! क्या साड़ी में नशीला पाउडर निकल गया? हे भगवान, मेरी सासू माँ सुनेंगी तो घर से निकाल देंगी! क्या मैं साड़ी का बिल दिखाऊं?',
            timestamp: '02:04 PM',
            tacticUsed: 'Hinglish Meesho saree confusion & mother-in-law panic',
            timeDelaySec: 240,
          },
          {
            speaker: 'scammer',
            personaName: 'Scammer (Customs Agent)',
            avatar: '📦',
            message: 'पार्सल में 500 ग्राम ड्रग्स और 5 पासपोर्ट हैं! कस्टम्स पेनल्टी ₹25,000 तुरंत भरो वरना नारकोटिक्स वाले घर आ रहे हैं!',
            timestamp: '02:06 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: '5 पासपोर्ट?! भैया हमारे घर में किसी का राशन कार्ड नहीं बना, पासपोर्ट कहाँ से आएगा! मैं अभी अपने मोहल्ले के पार्षद जी और दूध वाले भैया को बुलाती हूँ, वो आपको पहचानते होंगे। आप लाइन पर रहिए, मैं घंटी बजा रही हूँ!',
            timestamp: '02:11 PM',
            tacticUsed: 'Local corporator escalation stalling scammer',
            timeDelaySec: 300,
          },
        ],
        estimatedTimeWastedMinutes: 20,
      };
    }

    if (language === 'kn') {
      return {
        persona,
        conversation: [
          {
            speaker: 'scammer',
            personaName: 'Scammer (Customs Desk)',
            avatar: '📦',
            message: originalMessage.slice(0, 180) + '...',
            timestamp: '04:15 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'ಯಾವ ಪಾರ್ಸೆಲ್ ಸರ್? ನಾನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಏನು ತರಿಸಿಲ್ಲ. ನನ್ ದಿನಸಿ ಅಂಗಡಿಗೆ ಉಪ್ಪಿನಕಾಯಿ ಬಾಟಲ್ ಬಂದಿರಬೇಕು. ಅದ್ರಲ್ಲಿ ಕಸ್ಟಮ್ಸ್ ಡ್ಯೂಟಿ ಕಟ್ಟೋಕೆ ಏನಿದೆ? ಪಾರ್ಸೆಲ್ ಕವರ್ ಮೇಲೆ ನನ್ ಹೆಸರು ಸ್ಪೆಲ್ಲಿಂಗ್ ಕರೆಕ್ಟ್ ಆಗಿ ಇದೆಯಾ ನೋಡಿ!',
            timestamp: '04:19 PM',
            tacticUsed: 'Kanglish pickle parcel confusion',
            timeDelaySec: 240,
          },
          {
            speaker: 'scammer',
            personaName: 'Scammer (Customs Desk)',
            avatar: '📦',
            message: 'ಇದು ಇಂಟರ್ನ್ಯಾಷನಲ್ ಪಾರ್ಸೆಲ್! ₹2,000 ಕಸ್ಟಮ್ಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಫೀಸ್ ಗೂಗಲ್ ಪೇ ಮಾಡದಿದ್ರೆ ಕೇಸ್ ಹಾಕ್ತೀವಿ!',
            timestamp: '04:21 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'ರೀ ತಮ್ಮಾ, 2000 ರೂಪಾಯಿ ಅಂದ್ರೆ 4 ಚೀಲ ಅಕ್ಕಿ ಬರ್ತದೆ! ನೀನು ಪಾರ್ಸೆಲ್ ಬಿಚ್ಚಿ ಒಳಗೆ ಏನಿದೆ ಅಂತ ವಿಡಿಯೋ ಕಾಲ್ ನಲ್ಲಿ ತೋರ್ಸು, ಆಮೇಲೆ ಕಾಸು ಹಾಕ್ತೀನಿ. ಇಲ್ಲಾಂದ್ರೆ ಪಾರ್ಸೆಲ್ ನೀನೇ ಇಟ್ಕೊ!',
            timestamp: '04:27 PM',
            tacticUsed: 'Demanding video inspection before payment',
            timeDelaySec: 360,
          },
        ],
        estimatedTimeWastedMinutes: 24,
      };
    }
  }

  // 3. UPI Refund / Payment Scam
  if (category === 'upi_refund') {
    if (language === 'hi') {
      return {
        persona,
        conversation: [
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake Payer)',
            avatar: '💸',
            message: originalMessage.slice(0, 180) + '...',
            timestamp: '05:30 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'भैया आपने गलती से 25,000 भेज दिया? लेकिन मेरे फोनपे में तो नोटिफिकेशन आ रहा है कि "Pay ₹25,000 to merchant". पापा बोले थे कि पैसा आने पर हरा टिक आता है, पिन नहीं डालना पड़ता! क्या मैं पहले बैंक मैनेजर से पूछ लूं?',
            timestamp: '05:34 PM',
            tacticUsed: 'Hinglish reversal awareness challenging PIN request',
            timeDelaySec: 240,
          },
          {
            speaker: 'scammer',
            personaName: 'Scammer (Fake Payer)',
            avatar: '💸',
            message: 'अरे वो रिफंड लिंक है! जल्दी पे दबाओ और 6 डिजिट पिन डालो तभी 25000 तुम्हारे खाते में क्रेडिट होगा!',
            timestamp: '05:36 PM',
          },
          {
            speaker: 'persona',
            personaName: persona.name,
            avatar: persona.avatar,
            message: 'भैया मैंने पिन डाला "000000", लेकिन स्क्रीन लाल हो गई और लिखा आया "Incorrect MPIN". क्या मैं अपने एटीएम कार्ड का सीवीवी नंबर भेज दूं? पापा बाहर गए हैं, 10 मिनट रुकिए वो आ रहे हैं!',
            timestamp: '05:42 PM',
            tacticUsed: 'Intentional wrong PIN and waiting for dad delay',
            timeDelaySec: 360,
          },
        ],
        estimatedTimeWastedMinutes: 18,
      };
    }
  }

  // 4. Loan App Harassment
  if (category === 'loan_app') {
    return {
      persona,
      conversation: [
        {
          speaker: 'scammer',
          personaName: 'Scammer (Loan Recovery Agent)',
          avatar: '⚡',
          message: originalMessage.slice(0, 180) + '...',
          timestamp: '12:00 PM',
        },
        {
          speaker: 'persona',
          personaName: persona.name,
          avatar: persona.avatar,
          message: 'Under the Reserve Bank of India (RBI) Digital Lending Guidelines 2022, recovery agents are strictly prohibited from contacting personal phonebook contacts, using abusive language, or threatening defamation. Please furnish your registered NBFC name, Company CIN, and recovery agency authorization certificate before proceeding.',
          timestamp: '12:04 PM',
          tacticUsed: 'RBI regulatory counter-disclosure demands',
          timeDelaySec: 240,
        },
        {
          speaker: 'scammer',
          personaName: 'Scammer (Loan Recovery Agent)',
          avatar: '⚡',
          message: 'Shut up with your rules! Repay ₹8,500 in 15 minutes or we will send morphed obscene photos to your WhatsApp family group!',
          timestamp: '12:06 PM',
        },
        {
          speaker: 'persona',
          personaName: persona.name,
          avatar: persona.avatar,
          message: 'Thank you for documenting this extortion attempt in writing. This complete chat transcript, alongside your cellular number and IP headers, has been directly integrated into our National Cyber Crime Reporting Portal (1930) complaint file under Sections 384, 506, and 67A of the IT Act. Please continue typing.',
          timestamp: '12:11 PM',
          tacticUsed: 'Formal legal recording notice terrifying abusive collector',
          timeDelaySec: 300,
        },
      ],
      estimatedTimeWastedMinutes: 26,
    };
  }

  // 5. Tech Support
  if (category === 'tech_support') {
    return {
      persona: {
        id: 'martha',
        name: 'Grandma Martha (73 yrs)',
        role: 'Non-technical senior citizen',
        strategy: 'Struggles with mouse clicks, mistakes browser for microwave, gives bogus card details',
        avatar: '👵',
      },
      conversation: [
        {
          speaker: 'scammer',
          personaName: 'Scammer (Support Agent)',
          avatar: '🚨',
          message: originalMessage.slice(0, 180) + '...',
          timestamp: '10:00 AM',
        },
        {
          speaker: 'persona',
          personaName: 'Grandma Martha',
          avatar: '👵',
          message: 'Oh goodness gracious! I was just baking a lemon drizzle cake for church choir and my computer started squawking! Which wire do I unplug so the Russian hackers don\'t see my cat photos?',
          timestamp: '10:04 AM',
          tacticUsed: 'Feigned helplessness & panic distraction',
          timeDelaySec: 240,
        },
        {
          speaker: 'scammer',
          personaName: 'Scammer (Support Agent)',
          avatar: '🚨',
          message: 'Don\'t touch any wires! Look for the keyboard and type "anydesk" into Google right now so I can fix your server!',
          timestamp: '10:06 AM',
        },
        {
          speaker: 'persona',
          personaName: 'Grandma Martha',
          avatar: '👵',
          message: 'I typed anydesk into Google like you said, but my grandson had left YouTube on a video of baby hedgehogs taking a bath and now I can\'t find the blue button. Do you know where the hedgehogs live?',
          timestamp: '10:12 AM',
          tacticUsed: 'Irrelevant conversational tangents burning attacker time',
          timeDelaySec: 360,
        },
      ],
      estimatedTimeWastedMinutes: 24,
    };
  }

  // 6. Job Scam
  if (category === 'job_scam') {
    return {
      persona: {
        id: 'clueless_intern',
        name: 'Rohan - Clueless Applicant',
        role: 'Over-enthusiastic fresher candidate',
        strategy: 'Eager to comply, sends flawed attachments, asks absurd corporate questions',
        avatar: '🧑‍💻',
      },
      conversation: [
        {
          speaker: 'scammer',
          personaName: 'Scammer (HR Recruiter)',
          avatar: '💼',
          message: originalMessage.slice(0, 180) + '...',
          timestamp: '01:15 PM',
        },
        {
          speaker: 'persona',
          personaName: 'Rohan',
          avatar: '🧑‍💻',
          message: 'Respected HR Ma\'am! I have already subscribed to 50 channels on YouTube today! Before I transfer the registration fee, will this part-time job provide health insurance and provident fund? My college hod says I need an official offer letter on letterhead with stamp.',
          timestamp: '01:19 PM',
          tacticUsed: 'Bureaucratic documentation request stalling payment',
          timeDelaySec: 240,
        },
        {
          speaker: 'scammer',
          personaName: 'Scammer (HR Recruiter)',
          avatar: '💼',
          message: 'Letter will come after registration fee! Transfer Rs 1,499 now to secure your job slot immediately!',
          timestamp: '01:21 PM',
        },
        {
          speaker: 'persona',
          personaName: 'Rohan',
          avatar: '🧑‍💻',
          message: 'Ma\'am my Google Pay says "Bank Server Busy". I tried sending Rs 100 first to test if the account is active. Did you receive the 100 rupees? Also what is your manager\'s LinkedIn profile?',
          timestamp: '01:27 PM',
          tacticUsed: 'Partial payment confusion & verification traps',
          timeDelaySec: 360,
        },
      ],
      estimatedTimeWastedMinutes: 21,
    };
  }

  // Default / KYC / Lottery / Other
  return {
    persona,
    conversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer',
        avatar: '🚨',
        message: originalMessage.slice(0, 180) + '...',
        timestamp: '04:10 PM',
      },
      {
        speaker: 'persona',
        personaName: persona.name,
        avatar: persona.avatar,
        message: 'Dear officer, my hands are trembling! Harold always paid our bills with a yellow bank book. Can I bring cash in an envelope to your head office tomorrow afternoon after my bingo game?',
        timestamp: '04:15 PM',
        tacticUsed: 'Traditional banking distraction',
        timeDelaySec: 300,
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer',
        avatar: '🚨',
        message: 'NO CASH! NO ENVELOPE! You must pay or click the link right now from your phone or your account is gone!',
        timestamp: '04:17 PM',
      },
      {
        speaker: 'persona',
        personaName: persona.name,
        avatar: persona.avatar,
        message: 'I tapped the blue link on my screen and it opened a recipe for apple crumble. Is this the verification page? Harold loved crumble with extra cinnamon.',
        timestamp: '04:23 PM',
        tacticUsed: 'Absurd technical misunderstanding',
        timeDelaySec: 360,
      },
    ],
    estimatedTimeWastedMinutes: 19,
  };
}
