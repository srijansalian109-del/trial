import React from 'react';
import { QuickDetectResult } from '../types/threat';
import { Zap, AlertTriangle, UserCheck, Languages, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface QuickRiskDetectCardProps {
  result: QuickDetectResult;
  onDeployBait: () => void;
  onDismiss: () => void;
}

export const QuickRiskDetectCard: React.FC<QuickRiskDetectCardProps> = ({
  result,
  onDeployBait,
  onDismiss,
}) => {
  const { t, tCategory } = useLanguage();
  const { 
    scam_type, 
    scam_category_label, 
    language, 
    risk_score, 
    risk_level, 
    reasons = [], 
    matched_persona_name, 
    matched_persona_avatar, 
    suggested_action 
  } = result;

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'hi':
        return 'Hindi / Hinglish (हिंग्लिश)';
      case 'kn':
        return 'Kannada / Kanglish (ಕನ್ನಡ)';
      case 'en':
      default:
        return 'English (Global / Indian)';
    }
  };

  const isCritical = risk_score >= 80;
  const isHigh = risk_score >= 60 && risk_score < 80;

  return (
    <div className="bg-[#0b121e]/95 border-2 border-cyan-500/60 rounded-2xl p-5 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Glow pulse border accent */}
      <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-red-500"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                {t.quickDetect.title}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {t.quickDetect.badge}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-100 font-mono">
              {tCategory(scam_type) || scam_category_label || scam_type.toUpperCase()}
            </h3>
          </div>
        </div>

        {/* Score & Urgency */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-mono">{t.quickDetect.preTriageRisk}</div>
            <div className="flex items-center gap-1.5">
              <span className={`text-2xl font-black font-mono ${isCritical ? 'text-red-400' : isHigh ? 'text-amber-400' : 'text-yellow-400'}`}>
                {risk_score}/100
              </span>
            </div>
          </div>
          <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase border ${
            risk_level === 'HIGH' || isCritical
              ? 'bg-red-500/20 text-red-400 border-red-500/40'
              : risk_level === 'MEDIUM'
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
          }`}>
            {risk_level || 'HIGH'} {t.quickDetect.priorityLabel}
          </div>
        </div>
      </div>

      {/* Grid of Highlights */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Language & Dialect */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <Languages className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-slate-400 font-mono">{t.quickDetect.detectedLang}</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">
              {getLanguageLabel(language)}
            </div>
          </div>
        </div>

        {/* Recommended Trap Persona */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <UserCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="min-w-0">
            <div className="text-[10px] text-slate-400 font-mono">{t.quickDetect.autoSelectedPersona}</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5 truncate flex items-center gap-1.5">
              <span>{matched_persona_avatar || '🕵️'}</span>
              <span className="truncate">{matched_persona_name || 'ScamBait Counter-Trap'}</span>
            </div>
          </div>
        </div>

        {/* Key Red Flags / Reasons */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-400 font-mono">{t.quickDetect.extractedFlags}</div>
            <ul className="text-xs text-slate-300 mt-1 space-y-0.5">
              {reasons.slice(0, 3).map((flag, idx) => (
                <li key={idx} className="flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                  <span className="truncate">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {suggested_action && (
        <div className="mt-3 px-3 py-2 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2">
          <span className="text-cyan-400 font-bold">{t.quickDetect.recommendedAction}:</span>
          <span>{suggested_action}</span>
        </div>
      )}

      {/* Footer Controls */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <button
          onClick={onDismiss}
          className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
        >
          {t.quickDetect.dismiss}
        </button>

        <button
          onClick={onDeployBait}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
        >
          <span>{t.quickDetect.proceedToTrap}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
