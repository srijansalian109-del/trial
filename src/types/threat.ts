export type ScamCategory = 
  | 'digital_arrest'
  | 'courier_customs'
  | 'upi_refund'
  | 'loan_app'
  | 'kyc_banking'
  | 'job_scam'
  | 'lottery_prize'
  | 'tech_support'
  | 'romance_investment'
  | 'utility_bill'
  | 'other';

export type ThreatLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface TriggeredPhrase {
  phrase: string;
  reason: string;
  severity: 'high' | 'medium' | 'low';
}

export interface Indicators {
  upiIds: string[];
  phoneNumbers: string[];
  urls: string[];
  bankAccounts: string[];
  brandsImpersonated: string[];
  cryptoWallets: string[];
  emailAddresses?: string[];
}

export interface PatternFingerprint {
  clusterId: string;
  clusterName: string;
  similarityMatchPercent: number;
  knownVictimsTargeted: number;
  firstSeenDaysAgo: number;
  variantFamily: string;
  behaviorTactic: string;
}

export interface PersonaReply {
  speaker: 'scammer' | 'persona';
  personaName: string;
  avatar: string;
  message: string;
  timestamp: string;
  tacticUsed?: string;
  timeDelaySec?: number;
}

export interface AnalysisResult {
  id: string;
  session_id?: string;
  originalMessage: string;
  category: ScamCategory;
  categoryLabel: string;
  scam_type?: string;
  riskScore: number; // 0 - 100
  threatLevel: ThreatLevel;
  justification: string;
  indicators: Indicators;
  triggeredPhrases: TriggeredPhrase[];
  fingerprint: PatternFingerprint;
  psychologicalTriggers: string[];
  urgencyTactics: string[];
  recommendedAction: string;
  selectedPersona: {
    id: string;
    name: string;
    role: string;
    strategy: string;
    avatar: string;
    language?: 'en' | 'hi' | 'kn';
  };
  baitConversation: PersonaReply[];
  estimatedTimeWastedMinutes: number;
  detectedLanguage?: string;
  language?: 'en' | 'hi' | 'kn';
  analyzedAt: string;
  complaintDraft?: string;
}

export interface BlocklistEntry {
  id: string;
  type: 'upi' | 'phone' | 'url' | 'bank' | 'wallet';
  value: string;
  normalizedValue?: string;
  category: ScamCategory;
  categoryLabel: string;
  threatLevel: ThreatLevel;
  flagCount: number;
  firstReported: string;
  lastSeen: string;
  impersonatedBrand?: string;
  status: 'active_trap' | 'confirmed_malicious' | 'flagged' | 'pending' | 'verified';
  verificationStatus?: 'pending' | 'verified';
  sessionIds?: string[];
  notes?: string;
}

export interface DemoCase {
  id: string;
  title: string;
  category: ScamCategory;
  categoryLabel: string;
  badgeColor: string;
  threatLevel: ThreatLevel;
  previewText: string;
  fullMessage: string;
  suggestedPersonaId: string;
  language?: 'en' | 'hi' | 'kn';
}

export interface QuickDetectResult {
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  risk_score: number;
  scam_type: ScamCategory;
  scam_category_label: string;
  language: 'en' | 'hi' | 'kn';
  reasons: string[];
  suggested_action: string;
  matched_persona_id: string;
  matched_persona_name: string;
  matched_persona_avatar: string;
  indicators_count: number;
  detected_indicators: Indicators;
}
