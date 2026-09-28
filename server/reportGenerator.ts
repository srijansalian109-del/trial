import { AnalysisResult } from '../src/types/threat.ts';

export interface ComplainantDetails {
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
  incidentDate?: string;
  financialLoss?: string;
  transactionRef?: string;
  cityState?: string;
}

/**
 * Generates an auto-prefilled NCRP / 1930 Cybercrime Complaint Draft.
 * Strictly labeled: "DRAFT — REVIEW BEFORE SUBMITTING".
 * Note: ScamBait does NOT directly submit complaints; user reviews, copies, or downloads it.
 */
export function generateComplaintReport(analysis: AnalysisResult, customComplainant?: ComplainantDetails): string {
  const dateStr = customComplainant?.incidentDate || new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const complainantName = customComplainant?.name || '__________________________ [Enter Full Name]';
  const complainantPhone = customComplainant?.phone || '__________________________ [Enter Mobile Number]';
  const complainantEmail = customComplainant?.email || '__________________________ [Enter Email Address]';
  const complainantState = customComplainant?.cityState || customComplainant?.state || '__________________________ [Enter State / District]';
  const financialLoss = customComplainant?.financialLoss || '₹0 (Attempted Scam - Prevented by ScamBait)';
  const transactionRef = customComplainant?.transactionRef || 'N/A (No funds transferred / Prevented)';

  const upiList = analysis.indicators.upiIds.length > 0 
    ? analysis.indicators.upiIds.map(u => `  • ${u}`).join('\n') 
    : '  • None detected in communication';

  const phoneList = analysis.indicators.phoneNumbers.length > 0
    ? analysis.indicators.phoneNumbers.map(p => `  • ${p}`).join('\n')
    : '  • None detected in communication';

  const urlList = analysis.indicators.urls.length > 0
    ? analysis.indicators.urls.map(u => `  • ${u}`).join('\n')
    : '  • None detected in communication';

  const bankList = analysis.indicators.bankAccounts.length > 0
    ? analysis.indicators.bankAccounts.map(b => `  • ${b}`).join('\n')
    : '  • None detected in communication';

  const walletList = analysis.indicators.cryptoWallets.length > 0
    ? analysis.indicators.cryptoWallets.map(w => `  • ${w}`).join('\n')
    : '  • None detected in communication';

  const brands = analysis.indicators.brandsImpersonated.length > 0
    ? analysis.indicators.brandsImpersonated.join(', ')
    : 'Unidentified Cyber Fraud Syndicate';

  // Format conversation summary
  const conversationSummary = (analysis.baitConversation || [])
    .map(turn => `[${turn.timestamp}] ${turn.speaker === 'scammer' ? 'SUSPECT' : 'VICTIM / PERSONA (' + turn.personaName + ')'}: ${turn.message}`)
    .join('\n\n');

  const triggeredPhrases = (analysis.triggeredPhrases || [])
    .map(tp => `  • "${tp.phrase}" — ${tp.reason} [Severity: ${tp.severity.toUpperCase()}]`)
    .join('\n');

  return `================================================================================
NATIONAL CYBER CRIME REPORTING PORTAL (NCRP / 1930) — COMPLAINT DRAFT
*** DRAFT — REVIEW BEFORE SUBMITTING ***
================================================================================

Reference Case ID: SCAMBAIT-NCRP-${analysis.id || Date.now()}
Draft Generated On: ${dateStr} at ${timeStr} IST
Portal Destination: cybercrime.gov.in / National Helpline 1930
Target Agency: State Cyber Crime Police Station / Financial Fraud Cell

--------------------------------------------------------------------------------
1. COMPLAINANT PARTICULARS
--------------------------------------------------------------------------------
Full Name         : ${complainantName}
Mobile Number     : ${complainantPhone}
Email Address     : ${complainantEmail}
State & District  : ${complainantState}
Estimated Loss    : ${financialLoss}
Transaction ID/UTR: ${transactionRef}
Identity Proof    : [Attach copy of Aadhaar / PAN / Voter ID]

--------------------------------------------------------------------------------
2. INCIDENT PARTICULARS
--------------------------------------------------------------------------------
Incident Category : Financial Fraud / Social Engineering / Cyber Impersonation
Scam Classification: ${analysis.categoryLabel} (${analysis.category})
Impersonated Brand: ${brands}
Assessment Score  : ${analysis.riskScore}/100 [Threat Level: ${analysis.threatLevel}]
Incident Date/Time: ${dateStr} ~ ${analysis.analyzedAt || timeStr}
Suspect Platform  : WhatsApp / SMS / Telegram / Cellular Call

--------------------------------------------------------------------------------
3. INCIDENT NARRATIVE & CHRONOLOGY
--------------------------------------------------------------------------------
On ${dateStr}, the complainant received an unsolicited communication originating
from suspicious contact(s). The suspect claimed to represent ${brands}
and employed coercive social engineering techniques including:
${(analysis.urgencyTactics || []).map(u => `  • ${u}`).join('\n') || '  • Manufactured urgency and financial demand'}

Suspect's Original Message Received:
"""
${analysis.originalMessage}
"""

Summary of Alleged Offense:
${analysis.justification}

Recommended Police Action:
Freeze recipient bank/UPI accounts, issue notice under Section 91 of CrPC / BNSS,
and block fraudulent domains and cellular SIM cards immediately.

--------------------------------------------------------------------------------
4. EXTRACTED ACTIONABLE EVIDENCE (IOCs)
--------------------------------------------------------------------------------
A. Fraudulent UPI Identifiers (for immediate freeze via NPCI / Banker):
${upiList}

B. Suspect / Caller Phone Numbers (for CDR & IMEI tower lookup):
${phoneList}

C. Phishing URLs & Deceptive Domains (for CERT-In / DoT takedown):
${urlList}

D. Mule Bank Accounts & IFSC Codes:
${bankList}

E. Cryptocurrency Wallets / Addresses:
${walletList}

--------------------------------------------------------------------------------
5. FORENSIC LINGUISTIC INDICATORS (FLAGS DETECTED)
--------------------------------------------------------------------------------
${triggeredPhrases || '  • Coercive financial transfer demand observed.'}

Pattern Syndicate Fingerprint:
  • Cluster ID : ${analysis.fingerprint?.clusterId || 'CLUSTER-IN-GEN'}
  • Cluster Name: ${analysis.fingerprint?.clusterName || 'Coordinated Cyber Scam Network'}
  • Variant Family: ${analysis.fingerprint?.variantFamily || 'Social Engineering Template'}
  • Modus Operandi: ${analysis.fingerprint?.behaviorTactic || 'Mass SMS / VoIP outreach targeting retail banking customers.'}

--------------------------------------------------------------------------------
6. TRANSCRIPT / SUMMARY OF SCAM CONVERSATION
--------------------------------------------------------------------------------
${conversationSummary || 'No interactive turns logged.'}

--------------------------------------------------------------------------------
7. RECOMMENDED EVIDENCE ATTACHMENTS FOR CITIZEN TO SUBMIT
--------------------------------------------------------------------------------
[ ] 1. Screenshots of suspect SMS / WhatsApp / Telegram messages showing timestamp & sender number
[ ] 2. Bank / UPI Statement showing transaction reference / UTR (if payment occurred)
[ ] 3. Call history log showing incoming call timestamps from suspect numbers
[ ] 4. Screen-grab of fraudulent website or phishing link
[ ] 5. Copy of official complaint acknowledgment after submitting on cybercrime.gov.in

================================================================================
IMPORTANT LEGAL NOTICE & CITIZEN DISCLAIMER:
This document is an automated AI-generated draft prepared by ScamBait for
evidence consolidation purposes. Review all details for accuracy before submitting.
ScamBait does NOT directly submit complaints to any government portal or helpline.
The complainant must submit this document personally at https://cybercrime.gov.in
or by dialing the 1930 National Cyber Crime Helpline.
================================================================================`;
}
