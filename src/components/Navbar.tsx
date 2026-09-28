import React from 'react';
import { ShieldAlert, Terminal, Database, Search, BarChart3, Clock, Radio, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/translations';

interface NavbarProps {
  activeTab: 'analyzer' | 'blocklist' | 'lookup' | 'trends';
  setActiveTab: (tab: 'analyzer' | 'blocklist' | 'lookup' | 'trends') => void;
  minutesWasted: number;
  threatsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  minutesWasted,
  threatsCount,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-900/40 bg-[#0a0e14]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/50 shadow-lg shadow-cyan-500/20">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-slate-100 font-mono">
                  SCAM<span className="text-cyan-400">BAIT</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded">
                  {t.navbar.versionBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {t.navbar.appSubtitle}
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'analyzer'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>{t.navbar.navAnalyzer}</span>
            </button>

            <button
              onClick={() => setActiveTab('blocklist')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'blocklist'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span>{t.navbar.navBlocklist}</span>
              {threatsCount > 0 && (
                <span className="hidden lg:inline-block px-1.5 py-0.2 text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-800 rounded">
                  {threatsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('lookup')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'lookup'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>{t.navbar.navLookup}</span>
            </button>

            <button
              onClick={() => setActiveTab('trends')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'trends'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>{t.navbar.navTrends}</span>
            </button>
          </nav>

          {/* Right Controls: UI Language Selector + Scammer Time Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global UI Language Selector */}
            <div className="flex items-center bg-[#070b12] border border-cyan-800/80 rounded-xl p-1 shadow-inner">
              <Globe className="w-3.5 h-3.5 text-cyan-400 ml-1 mr-1.5 shrink-0 hidden sm:inline" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch UI to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="यूआई को हिन्दी में बदलें"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('kn')}
                className={`px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
                  language === 'kn'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="UI ಅನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ"
              >
                ಕನ್ನಡ
              </button>
            </div>

            {/* Gamified Live Counter Badge */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Clock className="w-4 h-4 animate-spin-slow shrink-0" />
              <div className="text-left font-mono">
                <span className="text-xs font-bold">{minutesWasted} min</span>
                <span className="text-[10px] block text-emerald-400/80 -mt-0.5">{t.navbar.timeWasted}</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-cyan-400/90 pl-2">
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{t.navbar.defenseActive}</span>
            </div>
          </div>
        </div>

        {/* Mobile Nav Tabs Bar */}
        <div className="flex md:hidden items-center justify-between border-t border-slate-800/80 py-2 overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
              activeTab === 'analyzer' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navbar.navAnalyzer}
          </button>
          <button
            onClick={() => setActiveTab('blocklist')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
              activeTab === 'blocklist' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navbar.navBlocklist}
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
              activeTab === 'lookup' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navbar.navLookup}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-2.5 py-1 rounded-lg whitespace-nowrap ${
              activeTab === 'trends' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {t.navbar.navTrends}
          </button>
        </div>
      </div>
    </header>
  );
};
