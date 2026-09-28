export type SupportedLanguage = 'en' | 'hi' | 'kn';

export interface Translations {
  navbar: {
    appTitle: string;
    appSubtitle: string;
    versionBadge: string;
    navAnalyzer: string;
    navBlocklist: string;
    navLookup: string;
    navTrends: string;
    timeWasted: string;
    defenseActive: string;
    langSelect: string;
  };
  intake: {
    consoleTitle: string;
    consoleDesc: string;
    zeroTrustBadge: string;
    demoCasesTitle: string;
    tabAll: string;
    tabIndia: string;
    tabGlobal: string;
    textareaPlaceholder: string;
    pasteBtn: string;
    clearBtn: string;
    charsCount: string;
    dialectLabel: string;
    autoDetect: string;
    langEn: string;
    langHi: string;
    langKn: string;
    personaPrefix: string;
    changePersona: string;
    selectPersonaModal: string;
    quickScanBtn: string;
    quickScanning: string;
    analyzeBtn: string;
    analyzing: string;
  };
  quickDetect: {
    title: string;
    badge: string;
    preTriageRisk: string;
    detectedLang: string;
    autoSelectedPersona: string;
    extractedFlags: string;
    recommendedAction: string;
    dismiss: string;
    proceedToTrap: string;
    priorityLabel: string;
  };
  complaintBanner: {
    bannerTitle: string;
    bannerBadge: string;
    bannerDesc: string;
    reviewDraftBtn: string;
  };
  riskCard: {
    riskLabel: string;
    threatVerdict: string;
    actionLabel: string;
    ncrpDraftBtn: string;
    warningCardBtn: string;
    threatCritical: string;
    threatHigh: string;
    threatMedium: string;
    threatLow: string;
  };
  conversation: {
    replayTitle: string;
    personaEngaged: string;
    timeWastedSub: string;
    simulateNext: string;
    replyPlaceholder: string;
    sendReply: string;
    sending: string;
    scammerLabel: string;
    victimLabel: string;
  };
  indicators: {
    iocTitle: string;
    neutralizedCount: string;
    emptyText: string;
    upiTitle: string;
    phoneTitle: string;
    urlTitle: string;
    bankTitle: string;
    brandTitle: string;
    cryptoTitle: string;
    copyBtn: string;
    copiedBtn: string;
    trapBadge: string;
  };
  fingerprint: {
    title: string;
    clusterBadge: string;
    clusterName: string;
    variantFamily: string;
    modusOperandi: string;
    technicalFingerprint: string;
    sourceVector: string;
  };
  explainability: {
    title: string;
    subtitle: string;
    triggeredPhrases: string;
    psychologicalTriggers: string;
    urgencyTactics: string;
  };
  blocklist: {
    title: string;
    subtitle: string;
    verifiedBadge: string;
    verifiedCount: string;
    pendingCount: string;
    consensusBanner: string;
    searchPlaceholder: string;
    allTab: string;
    verifiedTab: string;
    pendingTab: string;
    colVerification: string;
    colType: string;
    colValue: string;
    colCategory: string;
    colThreatLevel: string;
    colSessions: string;
    colLastSeen: string;
    colAction: string;
    noResults: string;
    verifiedStatus: string;
    pendingStatus: string;
  };
  lookup: {
    title: string;
    subtitle: string;
    placeholder: string;
    checkBtn: string;
    checking: string;
    verifiedAlert: string;
    safeAlert: string;
    riskScore: string;
    firstSeen: string;
    category: string;
    recommendedAction: string;
    verifiedDesc: string;
    safeDesc: string;
  };
  trends: {
    title: string;
    subtitle: string;
    threatsTracked: string;
    totalWasted: string;
    hotspots: string;
    topSectors: string;
    incidentVolume: string;
  };
  categories: Record<string, string>;
  footer: {
    platformNote: string;
    credits: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    navbar: {
      appTitle: 'SCAMBAIT',
      appSubtitle: 'Autonomous Threat Intelligence & Countermeasure Engine',
      versionBadge: 'Cyber Defense v2.4',
      navAnalyzer: 'Analyzer & Bait',
      navBlocklist: 'Threat Blocklist',
      navLookup: 'Check Lookup',
      navTrends: 'Threat Heatmap',
      timeWasted: 'Scammer Time Wasted',
      defenseActive: 'DEFENSE ACTIVE',
      langSelect: 'UI Language',
    },
    intake: {
      consoleTitle: 'THREAT INTAKE & VERNACULAR BAITING CONSOLE',
      consoleDesc: 'Paste suspicious SMS, WhatsApp, or phishing email to trap the scammer and extract threat indicators.',
      zeroTrustBadge: 'Zero-Trust Sandbox',
      demoCasesTitle: 'TESTED HACKATHON DEMO CASES:',
      tabAll: 'All',
      tabIndia: '🇮🇳 India Focus (5)',
      tabGlobal: '🌐 Global & Cyber (4)',
      textareaPlaceholder: 'Paste suspicious SMS, Telegram, WhatsApp chat, or phishing email here... (e.g. Digital Arrest warrant, Customs drug notice, SBI account block, or ₹25,000 mistaken refund...)',
      pasteBtn: 'Paste',
      clearBtn: 'Clear',
      charsCount: 'chars',
      dialectLabel: 'DIALECT:',
      autoDetect: 'Auto-Detect',
      langEn: 'English',
      langHi: 'Hindi / Hinglish',
      langKn: 'Kannada / Kanglish',
      personaPrefix: 'Persona:',
      changePersona: 'Change',
      selectPersonaModal: 'SELECT SCAM-BAITING PERSONA',
      quickScanBtn: '⚡ QUICK RISK SCAN',
      quickScanning: 'SCANNING TRIAGE...',
      analyzeBtn: '⚡ ANALYZE & DEPLOY BAIT',
      analyzing: 'ANALYZING & ENGAGING...',
    },
    quickDetect: {
      title: 'RAPID TRIAGE INTELLIGENCE',
      badge: '⚡ Instant Pre-Classification',
      preTriageRisk: 'PRE-TRIAGE RISK',
      detectedLang: 'DETECTED LANGUAGE / DIALECT',
      autoSelectedPersona: 'AUTO-SELECTED COUNTER-PERSONA',
      extractedFlags: 'EXTRACTED RED FLAGS',
      recommendedAction: 'Recommended Action',
      dismiss: 'Dismiss Pre-Check',
      proceedToTrap: 'PROCEED TO CONVERSATIONAL BAITING TRAP',
      priorityLabel: 'PRIORITY',
    },
    complaintBanner: {
      bannerTitle: 'AUTO-PREFILLED NCRP / 1930 COMPLAINT DOSSIER READY',
      bannerBadge: 'DRAFT — REVIEW BEFORE SUBMITTING',
      bannerDesc: 'Complete incident report pre-formatted with suspect UPIs, phone numbers, and baiting evidence log for cybercrime.gov.in.',
      reviewDraftBtn: 'Review & Copy 1930 Draft',
    },
    riskCard: {
      riskLabel: '/ 100 RISK',
      threatVerdict: 'Threat Intelligence Verdict',
      actionLabel: 'Action:',
      ncrpDraftBtn: 'NCRP / 1930 Draft',
      warningCardBtn: 'Warning Card',
      threatCritical: 'CRITICAL THREAT LEVEL',
      threatHigh: 'HIGH THREAT LEVEL',
      threatMedium: 'MEDIUM THREAT LEVEL',
      threatLow: 'LOW THREAT LEVEL',
    },
    conversation: {
      replayTitle: 'LIVE SCAM-BAIT CONVERSATION REPLAY',
      personaEngaged: 'Engaged Persona',
      timeWastedSub: 'Scammer Time Wasted in Trap',
      simulateNext: 'Scammer Follow-up / Simulated Next Turn',
      replyPlaceholder: 'Type what the scammer replies next (e.g. "Send money immediately or police will arrive!")...',
      sendReply: 'Send Scammer Reply & Continue Trap',
      sending: 'Simulating Persona Counter...',
      scammerLabel: 'Scammer',
      victimLabel: 'ScamBait Counter-Trap',
    },
    indicators: {
      iocTitle: 'ACTIONABLE INDICATORS OF COMPROMISE (IOCs)',
      neutralizedCount: 'IOCs Neutralized',
      emptyText: 'No specific machine-readable indicators detected in this sample.',
      upiTitle: 'FRAUDULENT UPI IDENTIFIERS',
      phoneTitle: 'SUSPECT CALLER PHONE NUMBERS',
      urlTitle: 'DECEPTIVE PHISHING URLS',
      bankTitle: 'MULE BANK ACCOUNTS / IFSC',
      brandTitle: 'IMPERSONATED BRANDS & AGENCIES',
      cryptoTitle: 'SUSPECT CRYPTOCURRENCY WALLETS',
      copyBtn: 'Copy',
      copiedBtn: 'Copied!',
      trapBadge: 'CRITICAL TRAP',
    },
    fingerprint: {
      title: 'SCAM PATTERN FINGERPRINT & SYNDICATE CLUSTERING',
      clusterBadge: 'Syndicate Attribution',
      clusterName: 'Threat Cluster:',
      variantFamily: 'Script / Variant:',
      modusOperandi: 'Modus Operandi:',
      technicalFingerprint: 'Cluster ID:',
      sourceVector: 'Primary Channel:',
    },
    explainability: {
      title: 'TRANSPARENCY & EXPLAINABILITY REASONING',
      subtitle: 'Why ScamBait flagged this communication as malicious',
      triggeredPhrases: 'Triggered Phrases & Lexical Markers',
      psychologicalTriggers: 'Psychological Manipulation Vectors',
      urgencyTactics: 'Manufactured Urgency Tactics',
    },
    blocklist: {
      title: 'SHARED COMMUNITY THREAT BLOCKLIST',
      subtitle: 'Anonymized indicators extracted by ScamBait traps to protect citizens before transactions occur.',
      verifiedBadge: 'Multi-Session Verified',
      verifiedCount: 'Verified Threats',
      pendingCount: 'Pending Verification',
      consensusBanner: 'Multi-Session Verification Engine: Threat indicators are normalized and automatically upgraded from Pending to Verified Threat once observed across ≥ 2 distinct incident sessions.',
      searchPlaceholder: 'Search normalized UPI, Phone, URL, Brand...',
      allTab: 'All',
      verifiedTab: 'Verified',
      pendingTab: 'Pending',
      colVerification: 'VERIFICATION',
      colType: 'TYPE',
      colValue: 'INDICATOR VALUE',
      colCategory: 'CATEGORY / BRAND',
      colThreatLevel: 'THREAT LEVEL',
      colSessions: 'SESSIONS',
      colLastSeen: 'LAST SEEN',
      colAction: 'ACTION',
      noResults: 'No matching threat indicators found for current filter.',
      verifiedStatus: 'VERIFIED',
      pendingStatus: 'PENDING (1 incident)',
    },
    lookup: {
      title: 'CHECK-BEFORE-YOU-TRUST LOOKUP',
      subtitle: 'Verify unknown UPI IDs, phone numbers, or domains against verified fraud records before paying.',
      placeholder: 'Enter UPI ID (e.g. refunddesk24x7@icici), phone number, or URL...',
      checkBtn: 'Verify Indicator',
      checking: 'Checking Threat Intel...',
      verifiedAlert: 'MATCH FOUND — VERIFIED MALICIOUS INDICATOR',
      safeAlert: 'NO PRIOR REPORT FOUND IN BLOCKLIST',
      riskScore: 'Community Risk Rating',
      firstSeen: 'First Reported',
      category: 'Associated Scam Category',
      recommendedAction: 'Recommended Safety Action',
      verifiedDesc: 'This indicator has been confirmed malicious in community threat records. DO NOT transfer funds or interact.',
      safeDesc: 'This indicator does not match known threat records, but always exercise caution before sharing money or OTPs.',
    },
    trends: {
      title: 'NATIONAL THREAT INTELLIGENCE HEATMAP',
      subtitle: 'Real-time telemetry on scam variants, hotspots, and financial extortion vectors.',
      threatsTracked: 'Total Threat Indicators',
      totalWasted: 'Minutes Scammers Wasted',
      hotspots: 'Top Regional Syndicates',
      topSectors: 'Most Targeted Modus Operandi',
      incidentVolume: 'Incident Telemetry Stream',
    },
    categories: {
      digital_arrest: 'Digital Arrest / Police Extortion',
      courier_customs: 'Fake Courier / Customs Clearance',
      upi_refund: 'UPI Reverse-Charge / Mistaken Transfer',
      loan_app: 'Predatory Instant Loan App Extortion',
      kyc_banking: 'Banking KYC / Account Freeze Fraud',
      job_scam: 'Part-Time Task / Telegram Job Scam',
      lottery_prize: 'Lottery Prize / KBC Fraud',
      tech_support: 'Tech Support / Remote Access Trojan',
      romance_investment: 'Romance / Crypto Arbitrage Ponzi',
    },
    footer: {
      platformNote: 'ScamBait Threat Intel Node #a513 — Cybersecurity & Defense Edition',
      credits: 'Autonomous Vernacular Baiting Engine • Zero-Trust Threat Sandboxing',
    },
  },

  hi: {
    navbar: {
      appTitle: 'SCAMBAIT',
      appSubtitle: 'स्वायत्त साइबर खतरा आसूचना और रक्षा इंजन',
      versionBadge: 'साइबर रक्षा v2.4',
      navAnalyzer: 'विश्लेषक और स्कैम-जाल',
      navBlocklist: 'खतरा ब्लॉकलिस्ट',
      navLookup: 'नंबर / UPI जांचें',
      navTrends: 'साइबर हीटमैप',
      timeWasted: 'ठगों का समय बर्बाद',
      defenseActive: 'सुरक्षा सक्रिय',
      langSelect: 'UI भाषा',
    },
    intake: {
      consoleTitle: 'साइबर खतरा विश्लेषण और भाषा ट्रैप कंसोल',
      consoleDesc: 'संदिग्ध SMS, WhatsApp, या फ़िशिंग संदेश यहाँ पेस्ट करें और ठगों को उलझाकर उनके UPI व फोन नंबर निकालें।',
      zeroTrustBadge: 'ज़ीरो-ट्रस्ट सैंडबॉक्स',
      demoCasesTitle: 'परीक्षण किए गए डेमो केस:',
      tabAll: 'सभी',
      tabIndia: '🇮🇳 भारत केंद्रित (5)',
      tabGlobal: '🌐 वैश्विक व साइबर (4)',
      textareaPlaceholder: 'संदिग्ध SMS, Telegram, WhatsApp चैट या फ़िशिंग संदेश यहाँ पेस्ट करें... (उदा. डिजिटल अरेस्ट वारंट, कस्टम्स ड्रग्स पार्सल, SBI खाता ब्लॉक, या ₹25,000 गलत ट्रांसफर...)',
      pasteBtn: 'पेस्ट करें',
      clearBtn: 'हटाएं',
      charsCount: 'अक्षर',
      dialectLabel: 'भाषा / बोली:',
      autoDetect: 'स्वचालित',
      langEn: 'English',
      langHi: 'हिन्दी / Hinglish',
      langKn: 'ಕನ್ನಡ / Kanglish',
      personaPrefix: 'काउंटर-पर्सोना:',
      changePersona: 'बदलें',
      selectPersonaModal: 'स्कैम-जाल पर्सोना चुनें',
      quickScanBtn: '⚡ त्वरित जोखिम स्कैन',
      quickScanning: 'स्कैन जारी है...',
      analyzeBtn: '⚡ विश्लेषण करें और जाल बिछाएं',
      analyzing: 'विश्लेषण और जाल सक्रिय हो रहा है...',
    },
    quickDetect: {
      title: 'त्वरित आसूचना प्री-स्कैन',
      badge: '⚡ त्वरित प्री-वर्गीकरण',
      preTriageRisk: 'प्री-ट्राइएज जोखिम',
      detectedLang: 'पहचानी गई भाषा / बोली',
      autoSelectedPersona: 'सुझाया गया काउंटर-पर्सोना',
      extractedFlags: 'पहचाने गए खतरे के संकेत',
      recommendedAction: 'सुझाया गया कदम',
      dismiss: 'खारिज करें',
      proceedToTrap: 'स्कैम-जाल बातचीत शुरू करें',
      priorityLabel: 'प्राथमिकता',
    },
    complaintBanner: {
      bannerTitle: 'NCRP / 1930 साइबर अपराध शिकायत ड्राफ्ट तैयार है',
      bannerBadge: 'ड्राफ्ट — जमा करने से पहले समीक्षा करें',
      bannerDesc: 'राष्ट्रीय साइबरक्राइम पोर्टल (cybercrime.gov.in) के लिए संदिग्ध UPI, फोन नंबर और साक्ष्यों सहित पूर्ण रिपोर्ट तैयार है।',
      reviewDraftBtn: '1930 ड्राफ्ट देखें और कॉपी करें',
    },
    riskCard: {
      riskLabel: '/ 100 जोखिम',
      threatVerdict: 'खतरा आसूचना निर्णय',
      actionLabel: 'कदम:',
      ncrpDraftBtn: 'NCRP / 1930 ड्राफ्ट',
      warningCardBtn: 'चेतावनी कार्ड',
      threatCritical: 'अत्यंत गंभीर खतरा स्तर',
      threatHigh: 'उच्च खतरा स्तर',
      threatMedium: 'मध्यम खतरा स्तर',
      threatLow: 'निम्न खतरा स्तर',
    },
    conversation: {
      replayTitle: 'लाइव स्कैम-जाल बातचीत रिकॉर्ड',
      personaEngaged: 'सक्रिय काउंटर-पर्सोना',
      timeWastedSub: 'ठग का बर्बाद हुआ समय',
      simulateNext: 'ठग की ओर से अगला संदेश भेजकर बातचीत आगे बढ़ाएं',
      replyPlaceholder: 'ठग का अगला संदेश यहाँ लिखें (उदा. "जल्दी पैसे भेजो वरना पुलिस आएगी!")...',
      sendReply: 'संदेश भेजें और जाल जारी रखें',
      sending: 'काउंटर-पर्सोना प्रतिक्रिया तैयार हो रही है...',
      scammerLabel: 'ठग / संदिग्ध',
      victimLabel: 'स्कैमबैट काउंटर-जाल',
    },
    indicators: {
      iocTitle: 'निकाले गए संदिग्ध पहचानकर्ता (IOCs)',
      neutralizedCount: 'पहचानकर्ता सुरक्षित किए गए',
      emptyText: 'इस संदेश में कोई विशिष्ट मशीन-पठनीय पहचानकर्ता नहीं मिला।',
      upiTitle: 'धोखाधड़ी वाले UPI पहचानकर्ता',
      phoneTitle: 'संदिग्ध फोन / कॉलर नंबर',
      urlTitle: 'नकली वेबसाइट और फ़िशिंग लिंक',
      bankTitle: 'संदिग्ध बैंक खाते / IFSC',
      brandTitle: 'नकली ब्रांड और सरकारी संस्था',
      cryptoTitle: 'संदिग्ध क्रिप्टोकरेंसी वॉलेट',
      copyBtn: 'कॉपी करें',
      copiedBtn: 'कॉपी हो गया!',
      trapBadge: 'गंभीर ट्रैप',
    },
    fingerprint: {
      title: 'स्कैम पैटर्न फिंगरप्रिंट और सिंडिकेट क्लस्टर',
      clusterBadge: 'सिंडिकेट पहचान',
      clusterName: 'खतरा क्लस्टर:',
      variantFamily: 'स्क्रिप्ट / प्रकार:',
      modusOperandi: 'अपराध का तरीका:',
      technicalFingerprint: 'क्लस्टर आईडी:',
      sourceVector: 'हमले का माध्यम:',
    },
    explainability: {
      title: 'पारदर्शिता और स्पष्टीकरण तर्क',
      subtitle: 'ScamBait ने इस संदेश को दुर्भावनापूर्ण क्यों माना',
      triggeredPhrases: 'संदिग्ध वाक्यांश और शब्द',
      psychologicalTriggers: 'मनोवैज्ञानिक दबाव के तरीके',
      urgencyTactics: 'कृत्रिम तात्कालिकता और डर',
    },
    blocklist: {
      title: 'साझा सामुदायिक साइबर खतरा ब्लॉकलिस्ट',
      subtitle: 'नागरिकों को धोखाधड़ी से बचाने के लिए ScamBait द्वारा निकाले गए सत्यापित पहचानकर्ता।',
      verifiedBadge: 'मल्टी-सेशन सत्यापित',
      verifiedCount: 'सत्यापित खतरे',
      pendingCount: 'सत्यापन लंबित',
      consensusBanner: 'मल्टी-सेशन सत्यापन इंजन: पहचानकर्ताओं को 2 या अधिक स्वतंत्र मामलों में देखे जाने पर स्वचालित रूप से "सत्यापित खतरे" में अपग्रेड किया जाता है।',
      searchPlaceholder: 'सत्यापित UPI, फोन नंबर, URL या ब्रांड खोजें...',
      allTab: 'सभी',
      verifiedTab: 'सत्यापित',
      pendingTab: 'लंबित',
      colVerification: 'सत्यापन स्थिति',
      colType: 'प्रकार',
      colValue: 'पहचानकर्ता मान',
      colCategory: 'श्रेणी / ब्रांड',
      colThreatLevel: 'खतरा स्तर',
      colSessions: 'मामले (सत्र)',
      colLastSeen: 'अंतिम देखा गया',
      colAction: 'कार्रवाई',
      noResults: 'वर्तमान फ़िल्टर के लिए कोई पहचानकर्ता नहीं मिला।',
      verifiedStatus: 'सत्यापित खतरा',
      pendingStatus: 'लंबित (1 मामला)',
    },
    lookup: {
      title: 'लेनदेन से पहले सुरक्षा जांच (Check-Before-You-Trust)',
      subtitle: 'पैसे भेजने या लिंक खोलने से पहले किसी भी UPI ID, फोन नंबर, या वेबसाइट को ब्लॉकलिस्ट में खोजें।',
      placeholder: 'संदिग्ध UPI ID (उदा. refunddesk24x7@icici), 10-अंकीय फोन नंबर, या लिंक दर्ज करें...',
      checkBtn: 'सुरक्षा जांचें',
      checking: 'डेटाबेस में जांच जारी है...',
      verifiedAlert: 'चेतावनी — यह पहचानकर्ता दुर्भावनापूर्ण पाया गया है',
      safeAlert: 'ब्लॉकलिस्ट में कोई रिकॉर्ड नहीं मिला',
      riskScore: 'सामुदायिक जोखिम रेटिंग',
      firstSeen: 'पहली रिपोर्ट',
      category: 'संबंधित धोखाधड़ी श्रेणी',
      recommendedAction: 'सुझाई गई सुरक्षा कार्रवाई',
      verifiedDesc: 'यह पहचानकर्ता सामुदायिक रिकॉर्ड में धोखाधड़ी के रूप में दर्ज है। कृपया पैसे न भेजें और न ही बात करें।',
      safeDesc: 'यह पहचानकर्ता हमारे ब्लॉकलिस्ट में नहीं है, लेकिन पैसे या OTP साझा करने से पहले पूरी सावधानी बरतें।',
    },
    trends: {
      title: 'राष्ट्रीय साइबर खतरा हीटमैप और रुझान',
      subtitle: 'भारत भर में रिपोर्ट किए गए धोखाधड़ी के पैटर्न, सिंडिकेट और वित्तीय जबरन वसूली की जानकारी।',
      threatsTracked: 'कुल ट्रैक किए गए खतरे',
      totalWasted: 'ठगों का बर्बाद हुआ समय (मिनट)',
      hotspots: 'शीर्ष क्षेत्रीय सिंडिकेट',
      topSectors: 'सबसे ज्यादा लक्षित श्रेणियां',
      incidentVolume: 'लाइव घटना प्रवाह',
    },
    categories: {
      digital_arrest: 'डिजिटल अरेस्ट / पुलिस वसूली घोटाला',
      courier_customs: 'फर्जी कूरियर / कस्टम्स ड्रग्स पार्सल घोटाला',
      upi_refund: 'UPI गलत ट्रांसफर / रिफंड रिवर्स-चार्ज धोखा',
      loan_app: 'अवैध लोन ऐप संपर्क ब्लैकमेल व वसूली',
      kyc_banking: 'बैंक KYC निलंबन व खाता ब्लॉक धोखाधड़ी',
      job_scam: 'पार्ट-टाइम टास्क / टेलीग्राम जॉब घोटाला',
      lottery_prize: 'लॉटरी इनाम / KBC पुरस्कार धोखाधड़ी',
      tech_support: 'रिमोट एक्सेस / फर्जी टेक सपोर्ट',
      romance_investment: 'रोमांस / फर्जी क्रिप्टो निवेश पोंजी',
    },
    footer: {
      platformNote: 'ScamBait खतरा आसूचना नोड #a513 — साइबर सुरक्षा और रक्षा संस्करण',
      credits: 'स्वायत्त भारतीय भाषा स्कैम-जाल इंजन • ज़ीरो-ट्रस्ट साइबर सैंडबॉक्सिंग',
    },
  },

  kn: {
    navbar: {
      appTitle: 'SCAMBAIT',
      appSubtitle: 'ಸ್ವಾಯತ್ತ ಸೈಬರ್ ಬೆದರಿಕೆ ಗುಪ್ತಚರ ಮತ್ತು ರಕ್ಷಣಾ ಎಂಜಿನ್',
      versionBadge: 'ಸೈಬರ್ ಡಿಫೆನ್ಸ್ v2.4',
      navAnalyzer: 'ವಿಶ್ಲೇಷಣೆ & ಟ್ರ್ಯಾಪ್',
      navBlocklist: 'ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್',
      navLookup: 'ಭದ್ರತಾ ತಪಾಸಣೆ',
      navTrends: 'ಸೈಬರ್ ಹೀಟ್‌ಮ್ಯಾಪ್',
      timeWasted: 'ವಂಚಕರ ಸಮಯ ವ್ಯರ್ಥ',
      defenseActive: 'ರಕ್ಷಣೆ ಸಕ್ರಿಯ',
      langSelect: 'UI ಭಾಷೆ',
    },
    intake: {
      consoleTitle: 'ಸೈಬರ್ ಬೆದರಿಕೆ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಭಾಷಾ ಟ್ರ್ಯಾಪ್ ಕನ್ಸೋಲ್',
      consoleDesc: 'ಅನುಮಾನಾಸ್ಪದ SMS, WhatsApp, ಅಥವಾ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ ವಂಚಕರ UPI ಮತ್ತು ಫೋನ್ ಸಂಖ್ಯೆಗಳನ್ನು ಹೊರತೆಗೆಯಿರಿ.',
      zeroTrustBadge: 'ಜೀರೋ-ಟ್ರಸ್ಟ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್',
      demoCasesTitle: 'ಪರೀಕ್ಷಿತ ಡೆಮೊ ಪ್ರಕರಣಗಳು:',
      tabAll: 'ಎಲ್ಲವೂ',
      tabIndia: '🇮🇳 ಭಾರತ ಕೇಂದ್ರೀಕೃತ (5)',
      tabGlobal: '🌐 ಜಾಗತಿಕ ಮತ್ತು ಸೈಬರ್ (4)',
      textareaPlaceholder: 'ಅನುಮಾನಾಸ್ಪದ SMS, WhatsApp ಚಾಟ್, ಅಥವಾ ಫಿಶಿಂಗ್ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ... (ಉದಾ: ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಾರಂಟ್, ಕಸ್ಟಮ್ಸ್ ಡ್ರಗ್ಸ್ ನೋಟಿಸ್, ಬ್ಯಾಂಕ್ ಖಾತೆ ಬ್ಲಾಕ್, ಅಥವಾ ₹25,000 ತಪ್ಪು ವರ್ಗಾವಣೆ...)',
      pasteBtn: 'ಪೇಸ್ಟ್ ಮಾಡಿ',
      clearBtn: 'ಅಳಿಸಿ',
      charsCount: 'ಅಕ್ಷರಗಳು',
      dialectLabel: 'ಭಾಷೆ / ಉಪಭಾಷೆ:',
      autoDetect: 'ಸ್ವಯಂಚಾಲಿತ',
      langEn: 'English',
      langHi: 'हिन्दी / Hinglish',
      langKn: 'ಕನ್ನಡ / Kanglish',
      personaPrefix: 'ಕೌಂಟರ್-ಪರ್ಸೋನಾ:',
      changePersona: 'ಬದಲಾಯಿಸಿ',
      selectPersonaModal: 'ಸ್ಕ್ಯಾಮ್-ಟ್ರ್ಯಾಪ್ ಪರ್ಸೋನಾ ಆಯ್ಕೆಮಾಡಿ',
      quickScanBtn: '⚡ ತ್ವರಿತ ಅಪಾಯ ಸ್ಕ್ಯಾನ್',
      quickScanning: 'ಸ್ಕ್ಯಾನ್ ಆಗುತ್ತಿದೆ...',
      analyzeBtn: '⚡ ವಿಶ್ಲೇಷಿಸಿ & ಟ್ರ್ಯಾಪ್ ನಿಯೋಜಿಸಿ',
      analyzing: 'ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಟ್ರ್ಯಾಪ್ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗುತ್ತಿದೆ...',
    },
    quickDetect: {
      title: 'ತ್ವರಿತ ಟ್ರಯಾಜ್ ಗುಪ್ತಚರ',
      badge: '⚡ ತ್ವರಿತ ಪೂರ್ವ-ವರ್ಗೀಕರಣ',
      preTriageRisk: 'ಪೂರ್ವ-ಟ್ರಯಾಜ್ ಅಪಾಯ',
      detectedLang: 'ಪತ್ತೆಯಾದ ಭಾಷೆ / ಉಪಭಾಷೆ',
      autoSelectedPersona: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೌಂಟರ್-ಪರ್ಸೋನಾ',
      extractedFlags: 'ಪತ್ತೆಯಾದ ಕೆಂಪು ಧ್ವಜಗಳು',
      recommendedAction: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
      dismiss: 'ವಜಾಗೊಳಿಸಿ',
      proceedToTrap: 'ಸ್ಕ್ಯಾಮ್-ಟ್ರ್ಯಾಪ್ ಸಂಭಾಷಣೆಗೆ ಮುಂದುವರಿಯಿರಿ',
      priorityLabel: 'ಆದ್ಯತೆ',
    },
    complaintBanner: {
      bannerTitle: 'NCRP / 1930 ಸೈಬರ್ ಕ್ರೈಮ್ ದೂರು ಡ್ರಾಫ್ಟ್ ಸಿದ್ಧವಾಗಿದೆ',
      bannerBadge: 'ಡ್ರಾಫ್ಟ್ — ಸಲ್ಲಿಸುವ ಮೊದಲು ಪರಿಶೀಲಿಸಿ',
      bannerDesc: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಕ್ರೈಮ್ ಪೋರ್ಟಲ್ (cybercrime.gov.in) ಗಾಗಿ ಶಂಕಿತ UPI, ಫೋನ್ ಸಂಖ್ಯೆಗಳೊಂದಿಗೆ ಸಿದ್ಧಪಡಿಸಲಾದ ಪೂರ್ಣ ವರದಿ.',
      reviewDraftBtn: '1930 ಡ್ರಾಫ್ಟ್ ಪರಿಶೀಲಿಸಿ & ನಕಲಿಸಿ',
    },
    riskCard: {
      riskLabel: '/ 100 ಅಪಾಯ',
      threatVerdict: 'ಬೆದರಿಕೆ ಗುಪ್ತಚರ ತೀರ್ಪು',
      actionLabel: 'ಕ್ರಮ:',
      ncrpDraftBtn: 'NCRP / 1930 ಡ್ರಾಫ್ಟ್',
      warningCardBtn: 'ಎಚ್ಚರಿಕೆ ಕಾರ್ಡ್',
      threatCritical: 'ತೀವ್ರ ಅಪಾಯದ ಮಟ್ಟ',
      threatHigh: 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಮಟ್ಟ',
      threatMedium: 'ಮಧ್ಯಮ ಅಪಾಯದ ಮಟ್ಟ',
      threatLow: 'ಕಡಿಮೆ ಅಪಾಯದ ಮಟ್ಟ',
    },
    conversation: {
      replayTitle: 'ಲೈವ್ ಸ್ಕ್ಯಾಮ್-ಟ್ರ್ಯಾಪ್ ಸಂಭಾಷಣೆ ಲಾಗ್',
      personaEngaged: 'ಸಕ್ರಿಯ ಕೌಂಟರ್-ಪರ್ಸೋನಾ',
      timeWastedSub: 'ವಂಚಕ ವ್ಯರ್ಥ ಮಾಡಿದ ಸಮಯ',
      simulateNext: 'ವಂಚಕನ ಮುಂದಿನ ಸಂದೇಶವನ್ನು ಸಿಮ್ಯುಲೇಟ್ ಮಾಡಿ ಟ್ರ್ಯಾಪ್ ಮುಂದುವರಿಸಿ',
      replyPlaceholder: 'ವಂಚಕನ ಮುಂದಿನ ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ (ಉದಾ: "ತಕ್ಷಣ ಹಣ ಕಳುಹಿಸಿ ಇಲ್ಲದಿದ್ದರೆ ಪೊಲೀಸರು ಬರುತ್ತಾರೆ!")...',
      sendReply: 'ಉತ್ತರಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಪ್ ಮುಂದುವರಿಸಿ',
      sending: 'ಕೌಂಟರ್-ಪರ್ಸೋನಾ ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',
      scammerLabel: 'ವಂಚಕ / ಶಂಕಿತ',
      victimLabel: 'ಸ್ಕ್ಯಾಮ್‌ಬೇಟ್ ಟ್ರ್ಯಾಪ್',
    },
    indicators: {
      iocTitle: 'ಕಾರ್ಯಸಾಧ್ಯ ಬೆದರಿಕೆ ಸೂಚಕಗಳು (IOCs)',
      neutralizedCount: 'ಸೂಚಕಗಳನ್ನು ತಟಸ್ಥಗೊಳಿಸಲಾಗಿದೆ',
      emptyText: 'ಈ ಮಾದರಿಯಲ್ಲಿ ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ಯಂತ್ರ-ಓದಬಲ್ಲ ಸೂಚಕಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.',
      upiTitle: 'ವಂಚನೆಯ UPI ಐಡಿಗಳು',
      phoneTitle: 'ಶಂಕಿತ ಕಾಲರ್ ಫೋನ್ ಸಂಖ್ಯೆಗಳು',
      urlTitle: 'ವಂಚನೆಯ ಫಿಶಿಂಗ್ ಲಿಂಕ್‌ಗಳು',
      bankTitle: 'ಮ್ಯೂಲ್ ಬ್ಯಾಂಕ್ ಖಾತೆಗಳು / IFSC',
      brandTitle: 'ಅನುಕರಿಸಿದ ಬ್ರ್ಯಾಂಡ್‌ಗಳು / ಸಂಸ್ಥೆ',
      cryptoTitle: 'ಶಂಕಿತ ಕ್ರಿಪ್ಟೋಕರೆನ್ಸಿ ವಾಲೆಟ್‌ಗಳು',
      copyBtn: 'ನಕಲಿಸಿ',
      copiedBtn: 'ನಕಲಿಸಲಾಗಿದೆ!',
      trapBadge: 'ತೀವ್ರ ಟ್ರ್ಯಾಪ್',
    },
    fingerprint: {
      title: 'ಸ್ಕ್ಯಾಮ್ ಪ್ಯಾಟರ್ನ್ ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ & ಸಿಂಡಿಕೇಟ್ ಕ್ಲಸ್ಟರಿಂಗ್',
      clusterBadge: 'ಸಿಂಡಿಕೇಟ್ ಗುರುತು',
      clusterName: 'ಬೆದರಿಕೆ ಕ್ಲಸ್ಟರ್:',
      variantFamily: 'ಸ್ಕ್ರಿಪ್ಟ್ / ವಿಧ:',
      modusOperandi: 'ಕಾರ್ಯಾಚರಣೆಯ ವಿಧಾನ:',
      technicalFingerprint: 'ಕ್ಲಸ್ಟರ್ ಐಡಿ:',
      sourceVector: 'ಮೂಲ ಮಾಧ್ಯಮ:',
    },
    explainability: {
      title: 'ಪಾರದರ್ಶಕತೆ ಮತ್ತು ವಿವರಣಾತ್ಮಕ ತಾರ್ಕಿಕತೆ',
      subtitle: 'ScamBait ಈ ಸಂದೇಶವನ್ನು ಏಕೆ ದುರುದ್ದೇಶಪೂರಿತ ಎಂದು ಗುರುತಿಸಿದೆ',
      triggeredPhrases: 'ಪ್ರಚೋದಿತ ನುಡಿಗಟ್ಟುಗಳು & ಪದಗಳು',
      psychologicalTriggers: 'ಮಾನಸಿಕ ಕುಶಲತೆಯ ತಂತ್ರಗಳು',
      urgencyTactics: 'ಕೃತಕ ತುರ್ತು ಮತ್ತು ಒತ್ತಡ',
    },
    blocklist: {
      title: 'ಹಂಚಿಕೆಯ ಸಮುದಾಯ ಬೆದರಿಕೆ ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್',
      subtitle: 'ವಹಿವಾಟುಗಳು ನಡೆಯುವ ಮುನ್ನ ನಾಗರಿಕರನ್ನು ರಕ್ಷಿಸಲು ScamBait ಟ್ರ್ಯಾಪ್‌ಗಳಿಂದ ಪಡೆದ ಸೂಚಕಗಳು.',
      verifiedBadge: 'ಬಹು-ಅಧಿವೇಶನ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
      verifiedCount: 'ದೃಢೀಕರಿಸಿದ ಬೆದರಿಕೆಗಳು',
      pendingCount: 'ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ',
      consensusBanner: 'ಬಹು-ಅಧಿವೇಶನ ಪರಿಶೀಲನಾ ಎಂಜಿನ್: ಸೂಚಕಗಳನ್ನು ≥ 2 ಸ್ವತಂತ್ರ ಘಟನೆಗಳಲ್ಲಿ ಗಮನಿಸಿದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪರಿಶೀಲಿಸಿದ ಬೆದರಿಕೆಗೆ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಲಾಗುತ್ತದೆ.',
      searchPlaceholder: 'ದೃಢೀಕರಿಸಿದ UPI, ಫೋನ್, URL, ಅಥವಾ ಬ್ರ್ಯಾಂಡ್ ಹುಡುಕಿ...',
      allTab: 'ಎಲ್ಲವೂ',
      verifiedTab: 'ದೃಢೀಕರಿಸಿದ',
      pendingTab: 'ಬಾಕಿ ಇದೆ',
      colVerification: 'ಪರಿಶೀಲನೆ',
      colType: 'ವಿಧ',
      colValue: 'ಸೂಚಕ ಮೌಲ್ಯ',
      colCategory: 'ವರ್ಗ / ಬ್ರ್ಯಾಂಡ್',
      colThreatLevel: 'ಅಪಾಯದ ಮಟ್ಟ',
      colSessions: 'ಅಧಿವೇಶನಗಳು',
      colLastSeen: 'ಕೊನೆಯದಾಗಿ ನೋಡಿದ್ದು',
      colAction: 'ಕ್ರಮ',
      noResults: 'ಪ್ರಸ್ತುತ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಹೊಂದಾಣಿಕೆಯ ಬೆದರಿಕೆ ಸೂಚಕಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
      verifiedStatus: 'ದೃಢೀಕರಿಸಿದ ಬೆದರಿಕೆ',
      pendingStatus: 'ಬಾಕಿ ಇದೆ (1 ಘಟನೆ)',
    },
    lookup: {
      title: 'ವ್ಯವಹಾರಕ್ಕೂ ಮುನ್ನ ಭದ್ರತಾ ತಪಾಸಣೆ (Check-Before-You-Trust)',
      subtitle: 'ಹಣ ವರ್ಗಾಯಿಸುವ ಮುನ್ನ ಯಾವುದೇ UPI ID, ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಅಥವಾ ಲಿಂಕ್ ಅನ್ನು ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.',
      placeholder: 'ಅನುಮಾನಾಸ್ಪದ UPI ID (ಉದಾ: refunddesk24x7@icici), ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಅಥವಾ ಲಿಂಕ್ ನಮೂದಿಸಿ...',
      checkBtn: 'ಈಗ ಪರಿಶೀಲಿಸಿ',
      checking: 'ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ತಪಾಸಣೆ ಮಾಡಲಾಗುತ್ತಿದೆ...',
      verifiedAlert: 'ಎಚ್ಚರಿಕೆ — ಇದು ವಂಚನೆಯ ಸೂಚಕ ಎಂದು ದೃಢಪಟ್ಟಿದೆ',
      safeAlert: 'ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್‌ನಲ್ಲಿ ಯಾವುದೇ ದಾಖಲೆ ಕಂಡುಬಂದಿಲ್ಲ',
      riskScore: 'ಸಮುದಾಯದ ಅಪಾಯ ರೇಟಿಂಗ್',
      firstSeen: 'ಮೊದಲು ವರದಿಯಾದ ದಿನ',
      category: 'ಸಂಬಂಧಿತ ವಂಚನೆ ವರ್ಗ',
      recommendedAction: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ',
      verifiedDesc: 'ಈ ಸೂಚಕವು ಸಮುದಾಯದ ದಾಖಲೆಗಳಲ್ಲಿ ವಂಚನೆ ಎಂದು ದೃಢಪಟ್ಟಿದೆ. ದಯವಿಟ್ಟು ಹಣ ವರ್ಗಾವಣೆ ಮಾಡಬೇಡಿ.',
      safeDesc: 'ಈ ಸೂಚಕವು ನಮ್ಮ ಬ್ಲಾಕ್‌ಲಿಸ್ಟ್‌ನಲ್ಲಿಲ್ಲ, ಆದರೆ ಹಣ ಅಥವಾ OTP ಹಂಚಿಕೊಳ್ಳುವ ಮುನ್ನ ಸಂಪೂರ್ಣ ಎಚ್ಚರಿಕೆ ವಹಿಸಿ.',
    },
    trends: {
      title: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಬೆದರಿಕೆ ಹೀಟ್‌ಮ್ಯಾಪ್ & ಪ್ರವೃತ್ತಿಗಳು',
      subtitle: 'ಭಾರತದಾದ್ಯಂತ ದಾಖಲಾದ ಸೈಬರ್ ವಂಚನೆಗಳ ನೈಜ-ಸಮಯದ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು.',
      threatsTracked: 'ಒಟ್ಟು ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ಬೆದರಿಕೆಗಳು',
      totalWasted: 'ವಂಚಕರು ವ್ಯರ್ಥ ಮಾಡಿದ ಸಮಯ (ನಿಮಿಷ)',
      hotspots: 'ಪ್ರಮುಖ ಪ್ರಾದೇಶಿಕ ಸಿಂಡಿಕೇಟ್‌ಗಳು',
      topSectors: 'ಹೆಚ್ಚು ಗುರಿಯಾದ ವಂಚನೆಯ ವಿಧಗಳು',
      incidentVolume: 'ಲೈವ್ ಘಟನಾ ಟೆಲಿಮೆಟ್ರಿ',
    },
    categories: {
      digital_arrest: 'ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ / ಪೊಲೀಸ್ ವಸೂಲಿ ಹಗರಣ',
      courier_customs: 'ನಕಲಿ ಕೊರಿಯರ್ / ಕಸ್ಟಮ್ಸ್ ಡ್ರಗ್ಸ್ ಪಾರ್ಸೆಲ್ ವಂಚನೆ',
      upi_refund: 'UPI ತಪ್ಪು ವರ್ಗಾವಣೆ / ರಿಫಂಡ್ ವಂಚನೆ',
      loan_app: 'ಅಕ್ರಮ ಲೋನ್ ಆ್ಯಪ್ ಸಂಪರ್ಕ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್',
      kyc_banking: 'ಬ್ಯಾಂಕ್ KYC ಖಾತೆ ಬ್ಲಾಕ್ ವಂಚನೆ',
      job_scam: 'ಪಾರ್ಟ್-ಟೈಮ್ ಟಾಸ್ಕ್ / ಟೆಲಿಗ್ರಾಂ ಉದ್ಯೋಗ ವಂಚನೆ',
      lottery_prize: 'ಲಾಟರಿ ಬಹುಮಾನ / KBC ಬಹುಮಾನ ವಂಚನೆ',
      tech_support: 'ರಿಮೋಟ್ ಪ್ರವೇಶ / ತಾಂತ್ರಿಕ ಬೆಂಬಲ ವಂಚನೆ',
      romance_investment: 'ರೋಮ್ಯಾನ್ಸ್ / ಕ್ರಿಪ್ಟೋ ಹೂಡಿಕೆ ವಂಚನೆ',
    },
    footer: {
      platformNote: 'ScamBait ಬೆದರಿಕೆ ಗುಪ್ತಚರ ನೋಡ್ #a513 — ಸೈಬರ್ ಭದ್ರತೆ ಮತ್ತು ರಕ್ಷಣಾ ಆವೃತ್ತಿ',
      credits: 'ಸ್ಥಳೀಯ ಭಾಷಾ ಸ್ಕ್ಯಾಮ್-ಟ್ರ್ಯಾಪ್ ಎಂಜಿನ್ • ಜೀರೋ-ಟ್ರಸ್ಟ್ ಸೈಬರ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸಿಂಗ್',
    },
  },
};
