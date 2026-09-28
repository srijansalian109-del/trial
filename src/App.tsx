import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { IntakeSection } from './components/IntakeSection';
import { AnalysisSkeleton } from './components/AnalysisSkeleton';
import { RiskScoreCard } from './components/RiskScoreCard';
import { IndicatorsCard } from './components/IndicatorsCard';
import { ConversationReplay } from './components/ConversationReplay';
import { FingerprintCard } from './components/FingerprintCard';
import { ExplainabilityCard } from './components/ExplainabilityCard';
import { ShareWarningCardModal } from './components/ShareWarningCardModal';
import { ComplaintReportModal } from './components/ComplaintReportModal';
import { QuickRiskDetectCard } from './components/QuickRiskDetectCard';
import { BlocklistTable } from './components/BlocklistTable';
import { CheckLookupView } from './components/CheckLookupView';
import { ThreatHeatmapView } from './components/ThreatHeatmapView';
import { DEMO_CASES, PRECOMPUTED_DEMO_RESULTS } from './data/demoCases';
import { INITIAL_BLOCKLIST } from './data/seedBlocklist';
import { AnalysisResult, BlocklistEntry, DemoCase, QuickDetectResult } from './types/threat';
import { useLanguage } from './context/LanguageContext';
import { AlertTriangle, RefreshCw, Terminal, FileText } from 'lucide-react';

export default function App() {
  const { language: uiLang, setLanguage: setUiLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'analyzer' | 'blocklist' | 'lookup' | 'trends'>('analyzer');
  
  // Intake state
  const [message, setMessage] = useState<string>('');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('martha');
  const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'en' | 'hi' | 'kn'>('auto');
  const [selectedDemoCaseId, setSelectedDemoCaseId] = useState<string | null>(null);

  // Analysis status: 'idle' | 'loading' | 'error' | 'success'
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isContinuingBait, setIsContinuingBait] = useState<boolean>(false);

  // Quick detect state (Feature 3)
  const [quickDetectResult, setQuickDetectResult] = useState<QuickDetectResult | null>(null);
  const [isQuickDetectLoading, setIsQuickDetectLoading] = useState<boolean>(false);

  // Community store state (Feature 4: Multi-session verification)
  const [blocklist, setBlocklist] = useState<BlocklistEntry[]>(INITIAL_BLOCKLIST);
  const [totalMinutesWasted, setTotalMinutesWasted] = useState<number>(1842);

  // Modal states
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Fetch blocklist & stats on mount
  useEffect(() => {
    fetch('/api/blocklist')
      .then((res) => res.json())
      .then((data) => {
        if (data.blocklist && Array.isArray(data.blocklist)) {
          setBlocklist(data.blocklist);
        }
      })
      .catch(() => {
        // Fall back to seed blocklist
        setBlocklist(INITIAL_BLOCKLIST);
      });

    fetch('/api/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.totalScammerMinutesWasted) {
          setTotalMinutesWasted(data.totalScammerMinutesWasted);
        }
      })
      .catch(() => {});
  }, []);

  // Demo case selection: when a vernacular demo is clicked, also align UI language!
  const handleSelectDemoCase = (demo: DemoCase) => {
    setMessage(demo.fullMessage);
    setSelectedDemoCaseId(demo.id);
    setSelectedPersonaId(demo.suggestedPersonaId);
    if (demo.language) {
      setSelectedLanguage(demo.language);
      if (demo.language === 'hi' || demo.language === 'kn' || demo.language === 'en') {
        setUiLang(demo.language);
      }
    } else {
      setSelectedLanguage('auto');
    }
    setErrorMessage(null);
    setQuickDetectResult(null);
  };

  // Feature 3: Quick Pre-Triage Scan
  const handleQuickDetect = async () => {
    if (!message.trim() || isQuickDetectLoading) return;

    setIsQuickDetectLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/quick-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          language: selectedLanguage !== 'auto' ? selectedLanguage : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Quick detection service temporarily unavailable');
      }

      const data: QuickDetectResult = await response.json();
      setQuickDetectResult(data);
      if (data.matched_persona_id) {
        setSelectedPersonaId(data.matched_persona_id);
      }
      if (data.language && selectedLanguage === 'auto') {
        setSelectedLanguage(data.language);
        if (data.language === 'hi' || data.language === 'kn') {
          setUiLang(data.language);
        }
      }
    } catch (err: any) {
      console.warn('Quick detect failed:', err);
    } finally {
      setIsQuickDetectLoading(false);
    }
  };

  // Perform Full Analysis with 12-second client timeout and robust retry/fallback
  const handleAnalyze = async () => {
    if (!message.trim()) return;

    setAnalysisStatus('loading');
    setErrorMessage(null);
    setQuickDetectResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          personaId: selectedPersonaId,
          language: selectedLanguage !== 'auto' ? selectedLanguage : undefined,
          demoCaseId: selectedDemoCaseId,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server returned error status ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
      setAnalysisStatus('success');
      setTotalMinutesWasted((prev) => prev + (data.estimatedTimeWastedMinutes || 15));

      // If detected language is hi or kn and user is on auto, adapt UI language
      if (selectedLanguage === 'auto' && (data.detectedLanguage === 'hi' || data.detectedLanguage === 'kn')) {
        setUiLang(data.detectedLanguage);
      }

      // Refresh community blocklist to show newly added/verified indicators
      fetch('/api/blocklist')
        .then((r) => r.json())
        .then((bData) => {
          if (bData.blocklist) setBlocklist(bData.blocklist);
        })
        .catch(() => {});
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('[ScamBait Frontend Error]:', err);

      // Check if we can fallback to precomputed demo result if available
      if (selectedDemoCaseId && PRECOMPUTED_DEMO_RESULTS[selectedDemoCaseId]) {
        console.warn('Using client-side precomputed demo case result.');
        const fallback = PRECOMPUTED_DEMO_RESULTS[selectedDemoCaseId];
        setAnalysisResult(fallback);
        setAnalysisStatus('success');
        return;
      }

      setErrorMessage(
        err.name === 'AbortError'
          ? 'Analysis timed out after 12 seconds. The server may be congested.'
          : err.message || 'An unexpected communication error occurred. Please click Retry.'
      );
      setAnalysisStatus('error');
    }
  };

  // Conversational next turn in scam-baiting thread
  const handleContinueBaiting = async (nextScammerMsg: string) => {
    if (!analysisResult || isContinuingBait) return;

    setIsContinuingBait(true);

    try {
      const response = await fetch('/api/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: analysisResult.selectedPersona,
          conversationHistory: analysisResult.baitConversation,
          nextMessage: nextScammerMsg,
          language: analysisResult.detectedLanguage || analysisResult.language,
        }),
      });

      const data = await response.json();
      const updatedConversation = [
        ...analysisResult.baitConversation,
        {
          speaker: 'scammer' as const,
          personaName: 'Scammer',
          avatar: '🚨',
          message: nextScammerMsg,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        data.reply,
      ];

      setAnalysisResult({
        ...analysisResult,
        baitConversation: updatedConversation,
        estimatedTimeWastedMinutes:
          analysisResult.estimatedTimeWastedMinutes + (data.timeAddedMinutes || 6),
      });

      setTotalMinutesWasted((prev) => prev + (data.timeAddedMinutes || 6));
    } catch (err) {
      console.error('Interact error:', err);
    } finally {
      setIsContinuingBait(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-slate-100 cyber-grid flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        minutesWasted={totalMinutesWasted}
        threatsCount={blocklist.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* TAB 1: THREAT ANALYZER & SCAM-BAIT */}
        {activeTab === 'analyzer' && (
          <div className="space-y-8">
            {/* Intake Card with Vernacular Personas & Language Selector */}
            <IntakeSection
              message={message}
              setMessage={setMessage}
              selectedPersonaId={selectedPersonaId}
              setSelectedPersonaId={setSelectedPersonaId}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedDemoCaseId={selectedDemoCaseId}
              onSelectDemoCase={handleSelectDemoCase}
              onAnalyze={handleAnalyze}
              onQuickDetect={handleQuickDetect}
              isLoading={analysisStatus === 'loading'}
              isQuickDetectLoading={isQuickDetectLoading}
            />

            {/* Feature 3: Quick Risk Detect Card */}
            {quickDetectResult && (
              <QuickRiskDetectCard
                result={quickDetectResult}
                onDeployBait={handleAnalyze}
                onDismiss={() => setQuickDetectResult(null)}
              />
            )}

            {/* Explicit 3-State Async Handling: LOADING */}
            {analysisStatus === 'loading' && <AnalysisSkeleton />}

            {/* Explicit 3-State Async Handling: ERROR */}
            {analysisStatus === 'error' && (
              <div className="bg-red-950/40 border border-red-500/50 rounded-2xl p-6 text-center shadow-xl cyber-glow-red">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-900/60 text-red-400 mb-3 border border-red-700">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-100 font-mono">
                  ANALYSIS PIPELINE FAILURE
                </h3>
                <p className="text-xs text-red-300 mt-1 max-w-lg mx-auto font-mono">
                  {errorMessage || 'Failed to analyze threat message. The engine caught a network interrupt.'}
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <button
                    onClick={handleAnalyze}
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-lg shadow-red-600/30"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>RETRY ANALYSIS</span>
                  </button>
                  {selectedDemoCaseId && PRECOMPUTED_DEMO_RESULTS[selectedDemoCaseId] && (
                    <button
                      onClick={() => {
                        setAnalysisResult(PRECOMPUTED_DEMO_RESULTS[selectedDemoCaseId]);
                        setAnalysisStatus('success');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
                    >
                      Use Verified Demo Cache
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Explicit 3-State Async Handling: SUCCESS */}
            {analysisStatus === 'success' && analysisResult && (
              <div className="space-y-8 animate-fadeIn">
                {/* Feature 2: High-Visibility Banner for NCRP / 1930 Cybercrime Complaint Draft */}
                <div className="bg-gradient-to-r from-[#0d1c2b] to-[#121626] border border-cyan-800/80 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-100 tracking-wide">
                          {t.complaintBanner.bannerTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {t.complaintBanner.bannerBadge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 font-sans">
                        {t.complaintBanner.bannerDesc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => setShowReportModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-all shadow-lg shadow-red-500/20 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t.complaintBanner.reviewDraftBtn}</span>
                    </button>
                  </div>
                </div>

                {/* 1. Risk Score Gauge Card */}
                <RiskScoreCard
                  result={analysisResult}
                  onOpenShareModal={() => setShowShareModal(true)}
                  onOpenReportModal={() => setShowReportModal(true)}
                />

                {/* 2. Live Conversation Replay (Unique Feature #1) */}
                <ConversationReplay
                  conversation={analysisResult.baitConversation}
                  persona={analysisResult.selectedPersona}
                  estimatedTimeWastedMinutes={analysisResult.estimatedTimeWastedMinutes}
                  onContinueBaiting={handleContinueBaiting}
                  isContinuing={isContinuingBait}
                />

                {/* 3. Indicators of Compromise (IOCs) */}
                <IndicatorsCard
                  indicators={analysisResult.indicators}
                  threatLevel={analysisResult.threatLevel}
                />

                {/* 4. Scam Pattern Fingerprinting (Unique Feature #2) */}
                <FingerprintCard fingerprint={analysisResult.fingerprint} />

                {/* 5. Transparency & Explainability Reasoning */}
                <ExplainabilityCard
                  triggeredPhrases={analysisResult.triggeredPhrases}
                  psychologicalTriggers={analysisResult.psychologicalTriggers}
                  urgencyTactics={analysisResult.urgencyTactics}
                />
              </div>
            )}

            {/* Empty State Banner (Shown when no analysis run yet) */}
            {analysisStatus === 'idle' && !quickDetectResult && (
              <div className="bg-[#0b1019]/60 border border-slate-800/80 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                <div className="inline-flex p-3 rounded-2xl bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 mb-3">
                  <Terminal className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-200 font-mono">
                  {uiLang === 'hi' 
                    ? 'स्वायत्त स्कैम-जाल और साइबर रक्षा मंच' 
                    : uiLang === 'kn' 
                    ? 'ಸ್ವಾಯತ್ತ ಸ್ಕ್ಯಾಮ್-ಟ್ರ್ಯಾಪ್ & ಸೈಬರ್ ರಕ್ಷಣಾ ಎಂಜಿನ್' 
                    : 'Autonomous Scam-Baiting & Cyber Defense Engine'}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 max-w-md mx-auto leading-relaxed">
                  {uiLang === 'hi'
                    ? 'ScamBait ठगों को वास्तविक बहुभाषी बातचीत (अंग्रेजी, हिन्दी/हिंग्लिश, कन्नड़) में उलझाता है, उनके UPI और फोन नंबर ब्लॉकलिस्ट में दर्ज करता है, और 1930 / cybercrime.gov.in शिकायत ड्राफ्ट तैयार करता है।'
                    : uiLang === 'kn'
                    ? 'ScamBait ವಂಚಕರನ್ನು ಬಹುಭಾಷಾ ಸಂಭಾಷಣೆಗಳಲ್ಲಿ (ಇಂಗ್ಲಿಷ್, ಹಿಂದಿ/ಹಿಂಗ್ಲಿಷ್, ಕನ್ನಡ) ಸಿಲುಕಿಸುತ್ತದೆ, ಅವರ UPI ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಗಳನ್ನು ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿಸುತ್ತದೆ ಮತ್ತು 1930 ದೂರು ಡ್ರಾಫ್ಟ್ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.'
                    : 'ScamBait traps scammers in realistic multilingual conversations (English, Hindi/Hinglish, Kannada), extracts their UPI IDs & phone numbers into a verified blocklist, and auto-drafts your 1930 / cybercrime.gov.in complaint.'}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-xs font-mono text-cyan-400">
                    {uiLang === 'hi' ? 'ऊपर दिए गए किसी डेमो केस पर क्लिक करें:' : uiLang === 'kn' ? 'ಮೇಲಿನ ಡೆಮೊ ಪ್ರಕರಣಗಳಲ್ಲಿ ಒಂದನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ:' : 'Try clicking a Demo Case above:'}
                  </span>
                  {DEMO_CASES.slice(0, 3).map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => handleSelectDemoCase(demo)}
                      className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:border-cyan-500 hover:text-cyan-300 transition-colors"
                    >
                      {demo.categoryLabel}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: THREAT BLOCKLIST (Multi-Session Verified) */}
        {activeTab === 'blocklist' && (
          <BlocklistTable
            entries={blocklist}
            onRefresh={() => {
              fetch('/api/blocklist')
                .then((r) => r.json())
                .then((d) => d.blocklist && setBlocklist(d.blocklist));
            }}
          />
        )}

        {/* TAB 3: CHECK-BEFORE-YOU-TRUST LOOKUP */}
        {activeTab === 'lookup' && <CheckLookupView blocklist={blocklist} />}

        {/* TAB 4: THREAT HEATMAP & TRENDS */}
        {activeTab === 'trends' && (
          <ThreatHeatmapView
            blocklist={blocklist}
            totalMinutesWasted={totalMinutesWasted}
          />
        )}
      </main>

      {/* Shareable Warning Card Modal */}
      {showShareModal && analysisResult && (
        <ShareWarningCardModal
          result={analysisResult}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {/* Feature 2: Auto-Prefilled NCRP / 1930 Complaint Report Modal */}
      {showReportModal && analysisResult && (
        <ComplaintReportModal
          result={analysisResult}
          onClose={() => setShowReportModal(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070b12] py-4 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{t.footer.platformNote}</span>
          </div>
          <div>
            {t.footer.credits}
          </div>
        </div>
      </footer>
    </div>
  );
}
