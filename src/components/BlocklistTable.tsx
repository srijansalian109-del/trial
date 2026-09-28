import React, { useState } from 'react';
import { BlocklistEntry } from '../types/threat';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Copy, 
  Check, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BlocklistTableProps {
  entries: BlocklistEntry[];
  onRefresh: () => void;
}

export const BlocklistTable: React.FC<BlocklistTableProps> = ({ entries }) => {
  const { t, tCategory } = useLanguage();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [verificationFilter, setVerificationFilter] = useState<'all' | 'verified' | 'pending'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const verifiedCount = entries.filter((e) => e.verificationStatus === 'verified' || e.status === 'verified').length;
  const pendingCount = entries.filter((e) => e.verificationStatus === 'pending' || e.status === 'pending').length;

  const filtered = entries.filter((e) => {
    const matchesSearch =
      e.value.toLowerCase().includes(search.toLowerCase()) ||
      (e.normalizedValue && e.normalizedValue.toLowerCase().includes(search.toLowerCase())) ||
      e.categoryLabel.toLowerCase().includes(search.toLowerCase()) ||
      (e.impersonatedBrand && e.impersonatedBrand.toLowerCase().includes(search.toLowerCase())) ||
      (e.notes && e.notes.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === 'all' || e.type === typeFilter;
    
    const isEntryVerified = e.verificationStatus === 'verified' || e.status === 'verified';
    const matchesVerification = 
      verificationFilter === 'all' ||
      (verificationFilter === 'verified' && isEntryVerified) ||
      (verificationFilter === 'pending' && !isEntryVerified);

    return matchesSearch && matchesType && matchesVerification;
  });

  return (
    <div className="bg-[#0d131f]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl font-mono">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-slate-100 tracking-wide">
              {t.blocklist.title}
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              {t.blocklist.verifiedBadge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            {t.blocklist.subtitle}
          </p>
        </div>

        {/* Verification Status Stats Chips */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{verifiedCount} {t.blocklist.verifiedCount}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{pendingCount} {t.blocklist.pendingCount}</span>
          </div>
        </div>
      </div>

      {/* Multi-Session Consensus Informational Banner */}
      <div className="my-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 font-sans">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          {t.blocklist.consensusBanner}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Verification Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-black/60 border border-slate-700 rounded-xl p-1 text-xs">
            <button
              onClick={() => setVerificationFilter('all')}
              className={`px-2.5 py-1 rounded-lg ${
                verificationFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.blocklist.allTab} ({entries.length})
            </button>
            <button
              onClick={() => setVerificationFilter('verified')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                verificationFilter === 'verified'
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>{t.blocklist.verifiedTab} ({verifiedCount})</span>
            </button>
            <button
              onClick={() => setVerificationFilter('pending')}
              className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                verificationFilter === 'pending'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>{t.blocklist.pendingTab} ({pendingCount})</span>
            </button>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-black/60 border border-slate-700 rounded-xl p-1 text-xs">
            {['all', 'upi', 'phone', 'url', 'bank', 'wallet'].map((tType) => (
              <button
                key={tType}
                onClick={() => setTypeFilter(tType)}
                className={`px-2 py-0.5 rounded-lg uppercase ${
                  typeFilter === tType
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tType}
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.blocklist.searchPlaceholder}
            className="bg-black/60 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-full sm:w-72"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-2 overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-3 px-3">{t.blocklist.colVerification}</th>
              <th className="py-3 px-3">{t.blocklist.colType}</th>
              <th className="py-3 px-3">{t.blocklist.colValue}</th>
              <th className="py-3 px-3">{t.blocklist.colCategory}</th>
              <th className="py-3 px-3">{t.blocklist.colThreatLevel}</th>
              <th className="py-3 px-3 text-center">{t.blocklist.colSessions}</th>
              <th className="py-3 px-3">{t.blocklist.colLastSeen}</th>
              <th className="py-3 px-3 text-right">{t.blocklist.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  {t.blocklist.noResults}
                </td>
              </tr>
            ) : (
              filtered.map((entry) => {
                const isVerified = entry.verificationStatus === 'verified' || entry.status === 'verified';
                const sessionCount = entry.sessionIds?.length || (isVerified ? 3 : 1);

                return (
                  <tr key={entry.id} className="hover:bg-slate-800/30 transition-colors">
                    {/* Verification Status Badge */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{t.blocklist.verifiedStatus}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-500/30">
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{t.blocklist.pendingStatus}</span>
                        </span>
                      )}
                    </td>

                    {/* Type */}
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-400 border border-slate-700">
                        {entry.type}
                      </span>
                    </td>

                    {/* Value + Normalized */}
                    <td className="py-3 px-3 font-semibold text-slate-200 select-all max-w-[240px]">
                      <div className="truncate">{entry.value}</div>
                      {entry.normalizedValue && entry.normalizedValue !== entry.value && (
                        <div className="text-[10px] text-slate-400 font-normal truncate">
                          Norm: {entry.normalizedValue}
                        </div>
                      )}
                    </td>

                    {/* Category & Brand */}
                    <td className="py-3 px-3">
                      <span className="text-slate-300 block">{tCategory(entry.category) || entry.categoryLabel}</span>
                      {entry.impersonatedBrand && (
                        <span className="text-[10px] text-slate-400 block truncate">
                          {entry.impersonatedBrand}
                        </span>
                      )}
                    </td>

                    {/* Threat Level */}
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                          entry.threatLevel === 'CRITICAL'
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : entry.threatLevel === 'HIGH'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
                        }`}
                      >
                        {entry.threatLevel}
                      </span>
                    </td>

                    {/* Session Count / Flagged */}
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded font-bold border ${
                        sessionCount >= 2 
                          ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800' 
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}>
                        {sessionCount} ({entry.flagCount}x)
                      </span>
                    </td>

                    {/* Last Seen */}
                    <td className="py-3 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                      {entry.lastSeen}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleCopy(entry.id, entry.value)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-flex items-center gap-1"
                        title="Copy indicator value"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
