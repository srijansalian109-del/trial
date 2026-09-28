import React, { useState, useEffect } from 'react';
import { DEMO_CASES } from '../data/demoCases';
import { DemoCase } from '../types/threat';
import { ALL_PERSONAS } from '../data/personas';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Shield, 
  UserCheck, 
  Clipboard, 
  Trash2, 
  ArrowRight, 
  Zap,
  Radio,
  Cpu,
  Target,
  ChevronRight,
  ChevronDown,
  Flame,
  Globe2,
  Clock
} from 'lucide-react';

interface IntakeSectionProps {
  message: string;
  setMessage: (msg: string) => void;
  selectedPersonaId: string;
  setSelectedPersonaId: (id: string) => void;
  selectedLanguage: 'auto' | 'en' | 'hi' | 'kn';
  setSelectedLanguage: (lang: 'auto' | 'en' | 'hi' | 'kn') => void;
  selectedDemoCaseId: string | null;
  onSelectDemoCase: (demoCase: DemoCase) => void;
  onAnalyze: () => void;
  onQuickDetect: () => void;
  isLoading: boolean;
  isQuickDetectLoading?: boolean;
}

export const IntakeSection: React.FC<IntakeSectionProps> = ({
  message,
  setMessage,
  selectedPersonaId,
  setSelectedPersonaId,
  selectedLanguage,
  setSelectedLanguage,
  selectedDemoCaseId,
  onSelectDemoCase,
  onAnalyze,
  onQuickDetect,
  isLoading,
  isQuickDetectLoading = false,
}) => {
  const { language: uiLang, t, tCategory } = useLanguage();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [personaLangFilter, setPersonaLangFilter] = useState<'all' | 'en' | 'hi' | 'kn'>('all');
  const [demoCategoryTab, setDemoCategoryTab] = useState<'all' | 'india' | 'global'>('all');
  const [isCopiedAnim, setIsCopiedAnim] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>(() => {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  });

  // Real-time ticking clock for live status telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Synchronize persona filtering when UI language changes
  useEffect(() => {
    if (uiLang === 'hi' || uiLang === 'kn' || uiLang === 'en') {
      setPersonaLangFilter(uiLang);
    }
  }, [uiLang]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setMessage(text);
        setIsCopiedAnim(true);
        setTimeout(() => setIsCopiedAnim(false), 1200);
      }
    } catch {
      // Ignore if permission denied
    }
  };

  const handleClear = () => {
    setMessage('');
  };

  const selectedPersona = ALL_PERSONAS.find((p) => p.persona_id === selectedPersonaId) || ALL_PERSONAS[0];

  const filteredPersonas = ALL_PERSONAS.filter((p) => {
    if (personaLangFilter === 'all') return true;
    return p.language === personaLangFilter;
  });

  const filteredDemos = DEMO_CASES.filter((d) => {
    if (demoCategoryTab === 'india') {
      return ['digital_arrest', 'courier_customs', 'upi_refund', 'loan_app', 'kyc_banking'].includes(d.category);
    }
    if (demoCategoryTab === 'global') {
      return ['job_scam', 'lottery_prize', 'tech_support', 'romance_investment'].includes(d.category);
    }
    return true;
  });

  const charPercentage = Math.min(Math.round((message.length / 4000) * 100), 100);

  return (
    <div className="bg-[#0b1019]/95 border-2 border-cyan-500/40 rounded-3xl p-5 sm:p-7 shadow-2xl relative font-sans">
      {/* Dynamic Cyber Tech Accents & Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-900/40 relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/60 shadow-md shadow-cyan-500/30">
              <Target className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-100 font-mono tracking-wider flex items-center gap-2">
              <span>{t.intake.consoleTitle}</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            {t.intake.consoleDesc}
          </p>
        </div>

        {/* Real-time Telemetry Status Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-300">LIVE DEFENSE</span>
            <span className="text-[10px] text-cyan-300/90 font-mono border-l border-cyan-800 pl-1.5 hidden sm:inline">
              {currentTime} IST
            </span>
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-300 flex items-center gap-1.5 hidden sm:flex">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px]">{t.intake.zeroTrustBadge}</span>
          </span>
        </div>
      </div>

      {/* Demo Cases Dropdown / Quick Select Buttons */}
      <div className="mt-4 pt-1 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide">
              {t.intake.demoCasesTitle}
            </span>
          </div>

          {/* Demo Category Switcher - small and fits neatly into the line */}
          <div className="flex items-center gap-0.5 bg-[#070b12] border border-cyan-900/60 rounded-lg p-0.5 text-[10px] font-mono shadow-inner shrink-0">
            <button
              onClick={() => setDemoCategoryTab('all')}
              type="button"
              className={`px-2 py-0.5 rounded transition-all ${
                demoCategoryTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({DEMO_CASES.length})
            </button>
            <button
              onClick={() => setDemoCategoryTab('india')}
              type="button"
              className={`px-2 py-0.5 rounded transition-all ${
                demoCategoryTab === 'india'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇮🇳 India
            </button>
            <button
              onClick={() => setDemoCategoryTab('global')}
              type="button"
              className={`px-2 py-0.5 rounded transition-all ${
                demoCategoryTab === 'global'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🌐 Global
            </button>
          </div>
        </div>

        {/* Demo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {filteredDemos.map((demo) => {
            const isSelected = selectedDemoCaseId === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => onSelectDemoCase(demo)}
                type="button"
                className={`text-left p-3 rounded-2xl border text-xs transition-all relative group overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/80 to-[#07131e] text-cyan-100 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50 scale-[1.01]'
                    : 'border-slate-800/80 bg-slate-900/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/70 hover:shadow-md'
                }`}
              >
                {/* Active Indicator Top Accent Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"></div>
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-lg border ${demo.badgeColor}`}>
                    {tCategory(demo.category)}
                  </span>
                  {isSelected ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  )}
                </div>

                <div className="font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                  {demo.title}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-mono">
                  {demo.previewText}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cyber Textarea Input Console */}
      <div className="mt-4 relative z-10">
        <div className="relative rounded-2xl border-2 border-slate-700/80 bg-[#06090f] focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/30 transition-all shadow-inner">
          {/* Subtle Top Terminal Line */}
          <div className="flex items-center justify-between px-3.5 py-1.5 border-b border-slate-800/80 bg-slate-900/60 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
              <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
              <span className="text-slate-400 ml-2">INPUT_BUFFER // SCAM_INTERCEPT</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-400 font-bold">READY TO BAIT</span>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 4000))}
            placeholder={t.intake.textareaPlaceholder}
            rows={5}
            className="w-full bg-transparent p-4 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none font-mono leading-relaxed"
          />

          {/* Quick Tools & Live Capacity Inside Textarea */}
          <div className="flex items-center justify-between px-3.5 py-2 border-t border-slate-800/80 bg-slate-900/40 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePaste}
                type="button"
                className={`hover:text-cyan-400 flex items-center gap-1.5 transition-colors px-2 py-0.5 rounded-lg border border-slate-700/80 bg-slate-800/50 ${
                  isCopiedAnim ? 'text-emerald-400 border-emerald-500/50' : 'text-slate-300'
                }`}
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>{isCopiedAnim ? 'PASTED!' : t.intake.pasteBtn}</span>
              </button>
              {message && (
                <button
                  onClick={handleClear}
                  type="button"
                  className="hover:text-red-400 flex items-center gap-1.5 transition-colors px-2 py-0.5 rounded-lg border border-slate-700/80 bg-slate-800/50 text-slate-300"
                  title="Clear text"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{t.intake.clearBtn}</span>
                </button>
              )}
            </div>

            {/* Character meter with visual micro-bar */}
            <div className="flex items-center gap-2.5">
              <div className="w-20 sm:w-28 h-1.5 bg-black rounded-full overflow-hidden border border-slate-800 hidden sm:block">
                <div
                  className={`h-full transition-all duration-300 ${
                    charPercentage > 85 ? 'bg-red-400' : charPercentage > 50 ? 'bg-amber-400' : 'bg-cyan-400'
                  }`}
                  style={{ width: `${charPercentage}%` }}
                ></div>
              </div>
              <span className={`text-[11px] font-mono ${message.length > 3800 ? 'text-amber-400' : 'text-slate-400'}`}>
                {message.length} / 4,000 {t.intake.charsCount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Active Counter-Persona Dossier Console (Full Width & Slide-Down Menu) */}
      <div className="mt-4 relative z-30">
        <div className="bg-gradient-to-r from-slate-900/95 via-[#0a111c] to-slate-900/95 border-2 border-cyan-800/70 rounded-2xl shadow-xl transition-all">
          {/* Main Persona Dossier Row */}
          <div className="p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative">
            {/* Subtle Cyber Radar Sweep Background */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-cyan-500/5 blur-2xl pointer-events-none rounded-r-2xl"></div>

            {/* Left: Persona Details & Hologram Avatar */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative shrink-0">
                <div className="text-2xl sm:text-3xl p-2 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 shadow-md shadow-cyan-500/20">
                  {selectedPersona.avatar}
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {t.intake.personaPrefix}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-100 font-mono truncate">
                    {selectedPersona.name}
                  </span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded-md font-mono shrink-0 font-semibold shadow-sm">
                    {selectedPersona.badge}
                  </span>
                  <span className="text-[10px] bg-purple-950/70 text-purple-300 border border-purple-800 px-2 py-0.5 rounded-md font-mono shrink-0">
                    {selectedPersona.language.toUpperCase()} DIALECT
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 truncate font-sans">
                  <span className="text-slate-400 font-mono">Strategy: </span>
                  {selectedPersona.trait}
                </p>
              </div>
            </div>

            {/* Right: Change Persona Trigger Button */}
            <div className="shrink-0 flex items-center justify-end w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setShowPersonaMenu((prev) => !prev)}
                className={`w-full sm:w-auto px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all border flex items-center justify-center gap-2 shadow-md ${
                  showPersonaMenu
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border-cyan-800/80 hover:border-cyan-500'
                }`}
                title="Open slide-down persona menu"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t.intake.changePersona}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showPersonaMenu ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* SLIDE-DOWN PERSONA MENU (Fully visible, smooth slide down, clear options) */}
          {showPersonaMenu && (
            <div className="border-t border-cyan-800/60 bg-[#070d18]/98 p-4 rounded-b-2xl font-mono animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-bold">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>{t.intake.selectPersonaModal}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({filteredPersonas.length} active bait profiles)</span>
                </div>

                {/* Language filter pills inside the slide-down menu */}
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500 mr-1 text-[10px]">Filter:</span>
                  {(['all', 'en', 'hi', 'kn'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setPersonaLangFilter(l)}
                      className={`px-2.5 py-1 rounded-lg uppercase font-bold transition-all ${
                        personaLangFilter === l
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                      }`}
                    >
                      {l === 'all' ? 'ALL' : l === 'en' ? 'EN' : l === 'hi' ? 'HI' : 'KN'}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowPersonaMenu(false)}
                    className="ml-2 px-2 py-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 text-xs transition-colors"
                    title="Close persona drawer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Persona Grid: 2 columns on desktop, 1 on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {filteredPersonas.map((p) => {
                  const isSelected = selectedPersonaId === p.persona_id;
                  return (
                    <button
                      key={p.persona_id}
                      type="button"
                      onClick={() => {
                        setSelectedPersonaId(p.persona_id);
                        setShowPersonaMenu(false);
                      }}
                      className={`text-left p-3 rounded-xl flex items-start gap-3 transition-all border ${
                        isSelected
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-md ring-1 ring-cyan-400/40'
                          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/80 hover:border-cyan-800 text-slate-300'
                      }`}
                    >
                      <span className="text-2xl p-1.5 bg-black/50 rounded-xl shrink-0 border border-slate-800">
                        {p.avatar}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate text-slate-100">{p.name}</span>
                          <span className="text-[9px] uppercase px-1.5 py-0.5 rounded font-bold shrink-0 bg-slate-800 border border-slate-700 text-cyan-300">
                            {p.language}
                          </span>
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono mt-0.5 truncate">{p.badge}</div>
                        <p className="text-[11px] text-slate-400 font-sans line-clamp-2 mt-1 leading-snug">{p.trait}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Controls: Quick Detect + Full Analyze */}
      <div className="mt-5 flex flex-col sm:flex-row items-center justify-end gap-3 font-mono relative z-10">
        {/* Quick Triage Pre-Check Button */}
        <button
          onClick={onQuickDetect}
          disabled={isQuickDetectLoading || isLoading || !message.trim()}
          type="button"
          className={`w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
            isQuickDetectLoading || !message.trim()
              ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed'
              : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-500/50 hover:border-cyan-400 shadow-md shadow-cyan-950/50 hover:scale-[1.01] active:scale-[0.99]'
          }`}
          title="Instant pre-triage scan without initiating conversational chat turns"
        >
          {isQuickDetectLoading ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              <span>{t.intake.quickScanning}</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>{t.intake.quickScanBtn}</span>
            </>
          )}
        </button>

        {/* Full Analysis & Counter-Bait Initiation Button */}
        <button
          onClick={onAnalyze}
          disabled={isLoading || isQuickDetectLoading || !message.trim()}
          type="button"
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2.5 transition-all ${
            isLoading || !message.trim()
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/30 hover:scale-[1.01] active:scale-[0.99] font-black tracking-wide'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              <span>{t.intake.analyzing}</span>
            </>
          ) : (
            <>
              <span>{t.intake.analyzeBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
