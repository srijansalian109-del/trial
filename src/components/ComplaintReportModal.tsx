import React, { useState } from 'react';
import { AnalysisResult } from '../types/threat';
import { generateComplaintReport } from '../../server/reportGenerator';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  ShieldAlert, 
  AlertTriangle, 
  PhoneCall, 
  ExternalLink,
  Edit3
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ComplaintReportModalProps {
  result: AnalysisResult;
  onClose: () => void;
}

export const ComplaintReportModal: React.FC<ComplaintReportModalProps> = ({ result, onClose }) => {
  const { language, tCategory } = useLanguage();
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedIocs, setCopiedIocs] = useState(false);

  // Complainant customization fields
  const [complainantName, setComplainantName] = useState('');
  const [incidentDate, setIncidentDate] = useState(new Date().toISOString().split('T')[0]);
  const [financialLoss, setFinancialLoss] = useState('₹0 (Attempted Scam - Prevented)');
  const [transactionRef, setTransactionRef] = useState('');
  const [cityState, setCityState] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  // Generate current draft text
  const reportDraft = generateComplaintReport(result, {
    name: complainantName || undefined,
    incidentDate,
    financialLoss,
    transactionRef: transactionRef || undefined,
    cityState: cityState || undefined,
  });

  const handleCopyFull = () => {
    navigator.clipboard.writeText(reportDraft);
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2500);
  };

  const handleCopyIocs = () => {
    const iocSummary = `SUSPECT INDICATORS EXTRACTED BY SCAMBAIT:
- Scam Category: ${tCategory(result.category) || result.categoryLabel}
- Suspect Phone Numbers: ${result.indicators.phoneNumbers.join(', ') || 'N/A'}
- Suspect UPI IDs: ${result.indicators.upiIds.join(', ') || 'N/A'}
- Suspect Bank / Accounts: ${result.indicators.bankAccounts.join(', ') || 'N/A'}
- Suspect URLs / Domains: ${result.indicators.urls.join(', ') || 'N/A'}
- Impersonated Entities: ${result.indicators.brandsImpersonated.join(', ') || 'N/A'}
- Evidence Recorded: ${result.baitConversation.length} conversational turns`;

    navigator.clipboard.writeText(iocSummary);
    setCopiedIocs(true);
    setTimeout(() => setCopiedIocs(false), 2500);
  };

  const handleDownload = () => {
    const filename = `NCRP-Cybercrime-Complaint-Draft-${result.category}-${incidentDate}.txt`;
    const blob = new Blob([reportDraft], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#0b1019] border border-cyan-800/80 rounded-2xl shadow-2xl overflow-hidden font-mono">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#070b12]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-100 tracking-wide">
                  {language === 'hi' 
                    ? 'NCRP / 1930 साइबर अपराध शिकायत ड्राफ्ट' 
                    : language === 'kn' 
                    ? 'NCRP / 1930 ಸೈಬರ್ ಕ್ರೈಮ್ ದೂರು ಡ್ರಾಫ್ಟ್' 
                    : 'NCRP / 1930 CYBERCRIME COMPLAINT DRAFT'}
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  DRAFT — REVIEW BEFORE SUBMITTING
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                {language === 'hi'
                  ? 'नेशनल साइबर क्राइम रिपोर्टिंग पोर्टल (cybercrime.gov.in) पर सीधे जमा करने हेतु ऑटो-फॉर्मेटेड रिपोर्ट।'
                  : language === 'kn'
                  ? 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ರಿಪೋರ್ಟಿಂಗ್ ಪೋರ್ಟಲ್‌ಗೆ (cybercrime.gov.in) ನೇರವಾಗಿ ಸಲ್ಲಿಸಲು ಸ್ವಯಂಚಾಲಿತ ವರದಿ.'
                  : 'Auto-structured incident dossier prepared for direct submission to the National Cyber Crime Reporting Portal.'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mandatory Legal & Procedural Notice */}
        <div className="px-4 py-3 bg-amber-950/30 border-b border-amber-800/40 text-[11px] text-amber-300/90 flex items-start gap-2.5 font-sans">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-200 uppercase font-mono">
              {language === 'hi' ? 'आधिकारिक सूचना: ' : language === 'kn' ? 'ಅಧಿಕೃತ ಸಲಹೆ: ' : 'Official Filing Advisory: '}
            </span>
            {language === 'hi'
              ? 'यह दस्तावेज एक प्री-फॉर्मेटेड ड्राफ्ट है। ScamBait सीधे cybercrime.gov.in या पुलिस को रिपोर्ट नहीं भेजता। आपको इसे कॉपी या डाउनलोड करके National Cyber Crime Reporting Portal (cybercrime.gov.in) पर या हेल्पलाइन 1930 पर दर्ज करना होगा।'
              : language === 'kn'
              ? 'ಇದು ಪೂರ್ವ-ರಚಿಸಿದ ಡ್ರಾಫ್ಟ್ ಆಗಿದೆ. ScamBait ನೇರವಾಗಿ cybercrime.gov.in ಅಥವಾ ಪೊಲೀಸರಿಗೆ ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸುವುದಿಲ್ಲ. ನೀವು ಇದನ್ನು ನಕಲಿಸಿ ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ ಅಧಿಕೃತವಾಗಿ cybercrime.gov.in ನಲ್ಲಿ ಅಥವಾ 1930 ಗೆ ಕರೆ ಮಾಡಿ ಸಲ್ಲಿಸಬೇಕು.'
              : 'This document is a pre-formatted draft. ScamBait does NOT directly submit reports to cybercrime.gov.in or law enforcement. You must copy or download this draft and lodge it officially via the National Cyber Crime Reporting Portal (cybercrime.gov.in) or dial the national financial fraud helpline 1930.'}
          </div>
        </div>

        {/* Content Body: Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-slate-200">
          {/* Quick Action Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">FINANCIAL FRAUD HELPLINE</div>
                <div className="text-sm font-bold text-slate-100 font-mono">Dial 1930 (Golden Hour)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400">TARGET CATEGORY</div>
                <div className="text-xs font-bold text-cyan-300 truncate">
                  {tCategory(result.category) || result.categoryLabel}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400">COMPLAINANT DETAILS</div>
                <div className="text-xs font-bold text-slate-300">
                  {complainantName ? complainantName : (language === 'hi' ? 'विवरण जोड़ें' : language === 'kn' ? 'ವಿವರ ಸೇರಿಸಿ' : 'Add Personal Details')}
                </div>
              </div>
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400 text-[10px] flex items-center gap-1 border border-slate-700 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>{showEditor ? 'Hide' : (language === 'hi' ? 'बदलें' : language === 'kn' ? 'ಬದಲಾಯಿಸಿ' : 'Customize')}</span>
              </button>
            </div>
          </div>

          {/* Complainant Customization Accordion */}
          {showEditor && (
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-800/60 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-cyan-400 font-mono">
                {language === 'hi'
                  ? 'शिकायतकर्ता का विवरण (वैकल्पिक)'
                  : language === 'kn'
                  ? 'ದೂರುದಾರರ ವಿವರಗಳು (ಐಚ್ಛಿಕ)'
                  : 'CUSTOMIZE COMPLAINANT INCIDENT PARTICULARS (OPTIONAL)'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-sans">
                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {language === 'hi' ? 'आपका पूरा नाम:' : language === 'kn' ? 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು:' : 'Your Full Name:'}
                  </label>
                  <input
                    type="text"
                    value={complainantName}
                    onChange={(e) => setComplainantName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full bg-black/60 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {language === 'hi' ? 'घटना की तारीख:' : language === 'kn' ? 'ಘಟನೆಯ ದಿನಾಂಕ:' : 'Incident Date:'}
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full bg-black/60 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {language === 'hi' ? 'नुकसान की राशि:' : language === 'kn' ? 'ನಷ್ಟದ ಮೊತ್ತ:' : 'Financial Loss Amount:'}
                  </label>
                  <input
                    type="text"
                    value={financialLoss}
                    onChange={(e) => setFinancialLoss(e.target.value)}
                    placeholder="e.g. ₹0 (Prevented) or ₹25,000"
                    className="w-full bg-black/60 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {language === 'hi' ? 'ट्रांजैक्शन संदर्भ / UTR:' : language === 'kn' ? 'ವಹಿವಾಟು ಉಲ್ಲೇಖ / UTR:' : 'Transaction Ref / UTR (if any):'}
                  </label>
                  <input
                    type="text"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    placeholder="e.g. UTR #4012881923"
                    className="w-full bg-black/60 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-mono mb-1">
                    {language === 'hi' ? 'शहर / राज्य:' : language === 'kn' ? 'ನಗರ / ರಾಜ್ಯ:' : 'City / State of Occurrence:'}
                  </label>
                  <input
                    type="text"
                    value={cityState}
                    onChange={(e) => setCityState(e.target.value)}
                    placeholder="e.g. Bengaluru, Karnataka"
                    className="w-full bg-black/60 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Formatted Report Draft Display */}
          <div className="relative">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono font-bold text-slate-300">
                PREVIEW: FORMATTED COMPLAINT TEXT
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                cybercrime.gov.in / 1930
              </span>
            </div>

            <div className="relative rounded-xl border border-slate-800 bg-[#05070c] p-4 text-[11px] font-mono leading-relaxed text-slate-300 whitespace-pre-wrap select-all max-h-96 overflow-y-auto shadow-inner">
              {reportDraft}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#070b12] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Helpline: 1930</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopyIocs}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors border border-slate-700 flex items-center gap-1.5"
              title="Copy extracted suspect phone, UPI, and URLs only"
            >
              {copiedIocs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIocs ? 'IOCs Copied!' : (language === 'hi' ? 'संदिग्ध IOCs कॉपी करें' : language === 'kn' ? 'ಶಂಕಿತ IOC ನಕಲಿಸಿ' : 'Copy Suspect IOCs')}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono transition-colors border border-cyan-800/80 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>

            <button
              onClick={handleCopyFull}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
            >
              {copiedFull ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>
                {copiedFull 
                  ? 'Draft Copied!' 
                  : (language === 'hi' ? 'पूरा 1930 ड्राफ्ट कॉपी करें' : language === 'kn' ? 'ಪೂರ್ಣ 1930 ಡ್ರಾಫ್ಟ್ ನಕಲಿಸಿ' : 'Copy Full Complaint Draft')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
