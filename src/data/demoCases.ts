import { DemoCase, AnalysisResult } from '../types/threat';

export const DEMO_CASES: DemoCase[] = [
  {
    id: 'demo-kyc-bank',
    title: '1. Fake Bank KYC Update (SBI / HDFC)',
    category: 'kyc_banking',
    categoryLabel: 'Banking KYC Suspension',
    badgeColor: 'text-red-400 border-red-500/30 bg-red-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'Dear customer, your SBI account will be BLOCKED in 24 hours. Update KYC immediately...',
    fullMessage: `[URGENT ALERT] Dear SBI Customer, your bank account no. ending in **4821 will be PERMANENTLY BLOCKED within 24 hours due to non-compliance of RBI KYC regulations. 

To avoid legal freeze and penalty fee of Rs. 4,500/-, immediately update your PAN & Aadhaar documents by visiting our secure verification portal:
http://sbi-kyc-portal-update24.live/verify-login.php

If portal fails, call Senior Nodal Verification Officer Mr. Rajesh Sharma immediately at +91 98762 14389. To fast-track bypass penalty, deposit Rs. 1 token to verification UPI: sbi.nodaldesk@ybl for security clearance.

Failure to act today will result in total freeze of funds.
- SBI Regulatory Compliance Cell`,
    suggestedPersonaId: 'martha',
  },
  {
    id: 'demo-job-offer',
    title: '2. Part-Time YouTube / Telegram Job Offer',
    category: 'job_scam',
    categoryLabel: 'Remote Task / Job Scam',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    threatLevel: 'HIGH',
    previewText: 'Earn ₹3,500 - ₹8,000/day just by liking YouTube videos and rating Google Maps...',
    fullMessage: `Hello dear! I am Priya Sharma, HR Director at Amazon Global Media Partner Services. We reviewed your resume online and you are selected for our part-time Work-From-Home Job!

Your daily duty is simple: Like YouTube video songs, subscribe to movie trailers, and rate Google Maps locations.
* Daily payout: Rs. 3,500 to Rs. 8,500 daily instant settlement.
* Time needed: Only 20-30 minutes per day on mobile phone.

To activate your Employee Work ID and reserve your daily task slot, you must pay a 100% refundable security registration deposit of Rs. 1,499/- to our Corporate Vendor Account:
Bank Name: Axis Bank Ltd
Account Number: 923010048192837
IFSC: UTIB0002194
Beneficiary: CloudMedia Tech Enterprises

Send payment receipt screenshot immediately to our Telegram Mentor: @HR_Priya_Amazon_VIP or WhatsApp +91 88261 90412. Limited 5 slots remaining today!`,
    suggestedPersonaId: 'clueless_intern',
  },
  {
    id: 'demo-lottery-prize',
    title: '3. KBC / WhatsApp Cash Lottery Win',
    category: 'lottery_prize',
    categoryLabel: 'Lottery / Prize Fraud',
    badgeColor: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    threatLevel: 'HIGH',
    previewText: 'CONGRATULATIONS! Your mobile number won 25 Lakhs in KBC All India SIM Lucky Draw...',
    fullMessage: `CONGRATULATIONS!! 🎊🎉
Dear WhatsApp User, your mobile SIM number has been selected as the 1st PRIZE WINNER of Rs. 25,00,000/- (Twenty Five Lakhs) in the All India SIM Card Lucky Draw 2026 organized by KBC (Kaun Banega Crorepati) & Jio-Airtel Mega Contest!

Your Lucky Draw File No: KBC-9921/WIN
Winner Code: KBC#782

To claim your 25 Lakh cash prize directly into your bank account without tax deduction, do NOT call regular customer care. You must contact KBC Head Office Claim Manager Mr. Vikram Rathore on official WhatsApp only:
WhatsApp: +91 70442 81923
Official Claim Certificate link: http://kbc-lottery-winner2026.online/claim-cert.html

Note: Beware of fake lottery calls. Only our WhatsApp manager +91 70442 81923 is authorized to release cheque disbursement code. Processing fee must be cleared before 6:00 PM.`,
    suggestedPersonaId: 'retiree',
  },
  {
    id: 'demo-tech-support',
    title: '4. Microsoft / Windows Critical Virus Alert',
    category: 'tech_support',
    categoryLabel: 'Tech Support Impersonation',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'CRITICAL ALERT from Microsoft Windows Defender: Zeus Trojan Virus detected! Call immediately...',
    fullMessage: `** CRITICAL SYSTEM SECURITY ALERT - ERROR #0x80070422 **
Microsoft Windows Defender has detected a malicious Trojan Horse 'Zeus.Spyware.v4' on your computer system!

Your personal banking passwords, credit card credentials, webcam feed, and social media accounts are being transmitted to an unauthorized Russian IP address (185.220.101.5).

YOUR COMPUTER HAS BEEN BLOCKED FOR SAFETY.
DO NOT RESTART OR TURN OFF YOUR PC. DOING SO WILL CAUSE PERMANENT HARD DRIVE CORRUPTION AND IDENTITY THEFT.

Call Certified Microsoft Senior Security Engineering Desk immediately at our 24/7 Toll-Free Helpline:
Toll-Free Helpline: +1 888-492-3104 or Direct Line: +1 800-241-9981

Our technician will guide you to connect via secure remote tool http://anydesk-support-agent.net/connect-remote to disinfect your Windows registry and issue a lifetime firewall certificate.`,
    suggestedPersonaId: 'martha',
  },
  {
    id: 'demo-romance-investment',
    title: '5. Crypto Liquidity Pool / Romance Scam',
    category: 'romance_investment',
    categoryLabel: 'Romance / Crypto Ponzi',
    badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'Hello darling, my uncle in Singapore trading house gave me insider arbitrage nodes...',
    fullMessage: `Hello my dear, I hope you are having a wonderful evening ❤️. I was looking at our chat from yesterday and thinking about our future travel plans together. 

I really want us to be financially free so you don't have to work long stress hours anymore. My uncle who is vice president at Singapore Quantitative Capital just told me the private liquidity arbitrage node for Tether (USDT) opened up for 48 hours only. It generates 18.5% guaranteed profit every 8 hours with zero market risk.

I already deposited $50,000 and earned $9,250 this morning! I want you to make money with me too. You don't need much to start, just transfer 1,000 USDT to the private node smart contract:
USDT (TRC20) Wallet: TX9rW7uM4VbEq81xPnK28yL45jZq11v9B7

Once you send the transaction hash, open our private VIP dapp http://defi-arbitrage-vault-yield.org and connect your wallet. I promise I will guide you step by step my love.`,
    suggestedPersonaId: 'compliance_officer',
  },
  {
    id: 'demo-digital-arrest',
    title: '6. Digital Arrest / CBI Video Warrant',
    category: 'digital_arrest',
    categoryLabel: 'Digital Arrest / Police Extortion',
    badgeColor: 'text-red-400 border-red-500/30 bg-red-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'This is Crime Branch Mumbai. Your Aadhaar is linked to 16 laundering accounts. You are under Digital Arrest...',
    fullMessage: `[OFFICIAL NOTICE - CRIME BRANCH MUMBAI & CBI]
ATTENTION: Citizen ID linked to Aadhaar ending in 9012.

An arrest warrant #CBI-ND-2026/8812 has been sanctioned against you under PMLA (Prevention of Money Laundering Act) and Section 302/120B. A suspicious parcel containing 5 fake passports and 300g illegal narcotics was seized in your name at Mumbai International Terminal.

You are placed under immediate DIGITAL ARREST.
You are strictly ordered NOT to disconnect this communication, NOT to leave your room camera, and NOT to inform family members under National Security secrecy rules.

Immediately connect to our Nodal Verification Desk via WhatsApp Video Call at +91 99881 22334 or open secure court bond portal: http://cbi-cybercell-mumbaicourt.live/digital-warrant.php

To avoid immediate armed police raid at your residential address, deposit refundable court verification security bond of ₹50,000 to RBI Clearance Desk UPI: cbi.nodaldesk@sbi immediately.

- Shri Vikramaditya Singh, Senior Superintendent of Police (Cyber Crime)`,
    suggestedPersonaId: 'rameshwar_digital_arrest_hi',
    language: 'hi',
  },
  {
    id: 'demo-courier-customs',
    title: '7. Fake FedEx / Customs Parcel (Drugs Found)',
    category: 'courier_customs',
    categoryLabel: 'Fake Courier / Customs Clearance',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'ನಿಮ್ಮ parcel customs ನಲ್ಲಿ stuck ಆಗಿದೆ. 140g MDMA drugs found. Pay ₹2000 clearance fee...',
    fullMessage: `[FEDEX INTERNATIONAL EXPRESS & INDIAN CUSTOMS]
Tracking ID: FDX-IN-98219402

Dear Customer, ನಿಮ್ಮ international parcel (Airway Bill #778219) Mumbai International Airport Customs ನಲ್ಲಿ stuck ಆಗಿದೆ.
Inside the package, customs officers have detected 140 grams MDMA contraband chemicals along with 3 forged credit cards addressed to your mobile number.

Narcotics Control Bureau (NCB) has filed formal FIR against you. 
To immediately clear customs penalty and stop NCB arrest team from coming to Bengaluru, you must pay ₹2,000 Customs Clearance Verification Fee immediately to our Customs Nodal UPI:
UPI ID: customs.clearance.mumbai@okaxis

If not paid within 2 hours, your bank account will be frozen and local police will be dispatched to your address.
Contact Customs Nodal Officer: +91 97721 88301.`,
    suggestedPersonaId: 'manjunath_customs_kn',
    language: 'kn',
  },
  {
    id: 'demo-upi-refund',
    title: '8. UPI Refund / "Sent ₹25,000 by Mistake"',
    category: 'upi_refund',
    categoryLabel: 'UPI Reverse-Charge Fraud',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    threatLevel: 'HIGH',
    previewText: 'Bhaiya galti se aapke phonepe pe 25,000 transfer ho gaya! Please refund link pe click karke...',
    fullMessage: `Hello bhaiya, main Rohit bol raha hoon Pune se. 
Maine apni behen ke hospital treatment ke liye ₹25,000 bhejna tha, par galti se aapke phone number pe Google Pay ho gaya hai! 🙏😭

Aapke phone par Google Pay notification aaya hoga. Please check karo! Main gareeb aadmi hoon bhaiya, meri behen ICU me admit hai. 
Aapko paise wapas karne ke liye bas neeche diye gaye instant UPI refund link par click karna hai aur apna 6-digit UPI MPIN daalna hai:

Refund link: phonepe-refund-direct.live/collect?ref=25000&id=pay
UPI VPA: refunddesk24x7@icici

Sir please jaldi accept karo, otherwise mere paas police me complaint darj karne ke siva koi rasta nahi bachega. Hospital doctor wait kar rahe hain!`,
    suggestedPersonaId: 'chintu_upi_hi',
    language: 'hi',
  },
  {
    id: 'demo-loan-app',
    title: '9. Predatory 7-Day Loan App Blackmail',
    category: 'loan_app',
    categoryLabel: 'Loan-App Harassment Scam',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    threatLevel: 'CRITICAL',
    previewText: 'FINAL WARNING: Your loan of ₹8,500 is OVERDUE! We have hacked your contact list and will send morphed photos...',
    fullMessage: `[FINAL WARNING - LEGAL RECOVERY ACTION]
Loan Reference ID: FASTCASH-882190

Your 7-day micro-cash loan of ₹8,500 is OVERDUE by 48 hours! 
Our automated system has already synchronized your entire mobile contact list (412 contacts), gallery photos, and Aadhaar card.

IF YOU DO NOT REPAY ₹8,500 + ₹2,400 PENALTY WITHIN 30 MINUTES:
1. We will circulate your morphed obscene photo with "DEFAULTER & FRAUDSTER" stamp to your WhatsApp family group, father, and employer.
2. We will blast calls to all your female contacts stating you are a thief.
3. Your CIBIL score will be permanently reduced to 300.

Transfer immediately to Recovery Manager UPI:
UPI ID: quickloan.settle@ybl
WhatsApp proof to recovery agent: +91 88771 99002

DO NOT BLOCK THIS NUMBER OR CALLS WILL START TO YOUR CONTACTS NOW!`,
    suggestedPersonaId: 'pillai_loan_en',
    language: 'en',
  },
];

export const PRECOMPUTED_DEMO_RESULTS: Record<string, AnalysisResult> = {
  'demo-kyc-bank': {
    id: 'res-kyc-bank-sbi',
    originalMessage: DEMO_CASES[0].fullMessage,
    category: 'kyc_banking',
    categoryLabel: 'Banking KYC Suspension',
    riskScore: 98,
    threatLevel: 'CRITICAL',
    justification: 'Critical threat. Impersonates State Bank of India (SBI) with synthetic urgency ("blocked in 24 hours"), a fake phishing portal, malicious phone number, and demands unverified UPI token payments to bypass nonexistent regulatory penalties.',
    indicators: {
      upiIds: ['sbi.nodaldesk@ybl'],
      phoneNumbers: ['+91 98762 14389'],
      urls: ['http://sbi-kyc-portal-update24.live/verify-login.php'],
      bankAccounts: ['SBI A/C ending in 4821 (Impersonated target)'],
      brandsImpersonated: ['State Bank of India (SBI)', 'Reserve Bank of India (RBI)'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'PERMANENTLY BLOCKED within 24 hours', reason: 'High-pressure manufactured urgency tactic designed to cause panic', severity: 'high' },
      { phrase: 'penalty fee of Rs. 4,500/-', reason: 'Coercive extortion threat to incentivize compliance', severity: 'high' },
      { phrase: 'sbi-kyc-portal-update24.live', reason: 'Deceptive typo-squatted phishing domain registered on cheap TLD', severity: 'high' },
      { phrase: 'deposit Rs. 1 token to verification UPI: sbi.nodaldesk@ybl', reason: 'Classic UPI reverse-charge / account harvesting trap', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-KYC-942',
      clusterName: 'Jamtara-Mewat KYC Extortion Grid',
      similarityMatchPercent: 96,
      knownVictimsTargeted: 432,
      firstSeenDaysAgo: 19,
      variantFamily: 'SBI-RBI Regulatory Impersonation Script v4.2',
      behaviorTactic: 'SMS blast with phishing login URL + secondary Vishing helpline + UPI reverse token capture',
    },
    psychologicalTriggers: [
      'Panic & Account Freeze Fear',
      'Artificial 24-Hour Time Limit',
      'Authority Impersonation (RBI/SBI Nodal Officer)',
      'Threat of Monetary Penalty (Rs 4,500)'
    ],
    urgencyTactics: [
      '24-Hour Account Freeze Warning',
      'Threat of Legal Action',
      'Immediate Token Payment Demand'
    ],
    recommendedAction: 'DO NOT click the link or send 1 Re to the UPI ID. Forward this SMS to 1930 (Indian National Cyber Crime Reporting Portal) and block the phone number immediately.',
    selectedPersona: {
      id: 'martha',
      name: 'Grandma Martha (73 yrs)',
      role: 'Confused, overly polite grandmother',
      strategy: 'Struggles with smartphone controls, asks endless questions about grandchildren, pretends UPI PIN is knitting pattern number.',
      avatar: '👵',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake SBI Officer)',
        avatar: '🚨',
        message: 'Dear SBI Customer, your bank account no. ending in **4821 will be PERMANENTLY BLOCKED within 24 hours. Update KYC immediately or pay Rs. 1 token to sbi.nodaldesk@ybl!',
        timestamp: '10:14 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'Oh heavens, Mr. Rajesh! I nearly dropped my reading glasses in my tea. My late husband Harold always handled the passbooks at the branch with Mr. Gupta. Is the bank on Station Road flooded again? Which button do I press on this glass telephone?',
        timestamp: '10:17 AM',
        tacticUsed: 'Feigned helplessness & distraction with irrelevant backstory',
        timeDelaySec: 180
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake SBI Officer)',
        avatar: '🚨',
        message: 'Madam don’t waste time! Click http://sbi-kyc-portal-update24.live or open Google Pay right now and send 1 rupee to sbi.nodaldesk@ybl! Otherwise police complaint will freeze all your fixed deposits!',
        timestamp: '10:19 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'Police complaint?! Lord have mercy! I opened the Google Pay icon you said, but it asks for a 6-digit Secret PIN. Harold wrote down 1-9-5-1 which is our wedding year, but the screen said "Payment Failed: Insufficient Bank Balance in Pension Account". Can I send you a physical post office money order instead dear? I have 25 postal stamps here.',
        timestamp: '10:24 AM',
        tacticUsed: 'Fake payment attempt failure, wasting scammer cycles on troubleshooting',
        timeDelaySec: 300
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake SBI Officer)',
        avatar: '🚨',
        message: 'No stamps madam! What other bank card do you have? Check your purse! Read me the 16 digit number on front of your debit card and the expiry date quickly!!',
        timestamp: '10:26 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'Let me look in my crochet bag... Ah yes, I found a shiny plastic card! It says "More Supermarket Loyalty Savings Club", card number 4920 1182 3901 8842, valid until December 2029. Does this work for the Reserve Bank dear? The print is so small, let me fetch my magnifying loupe.',
        timestamp: '10:32 AM',
        tacticUsed: 'Sending worthless supermarket loyalty number to exhaust attacker patience',
        timeDelaySec: 360
      }
    ],
    estimatedTimeWastedMinutes: 18,
    detectedLanguage: 'English (Indian Banking Context)',
    analyzedAt: 'Just now',
  },
  'demo-job-offer': {
    id: 'res-job-offer-amazon',
    originalMessage: DEMO_CASES[1].fullMessage,
    category: 'job_scam',
    categoryLabel: 'Remote Task / Job Scam',
    riskScore: 94,
    threatLevel: 'CRITICAL',
    justification: 'High-risk task/recruitment scam. Impersonates Amazon HR, lures victim with unrealistically inflated part-time wages (₹3500-₹8500/day for liking videos), demands an advance "refundable security fee" to a third-party Axis Bank account, and redirects to Telegram.',
    indicators: {
      upiIds: [],
      phoneNumbers: ['+91 88261 90412'],
      urls: [],
      bankAccounts: ['Axis Bank Ltd A/C: 923010048192837, IFSC: UTIB0002194 (Beneficiary: CloudMedia Tech Enterprises)'],
      brandsImpersonated: ['Amazon Global Media Partner Services', 'YouTube', 'Google Maps'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'Rs. 3,500 to Rs. 8,500 daily instant settlement', reason: 'Unrealistic return-on-effort typical of task-deposit pyramid schemes', severity: 'high' },
      { phrase: '100% refundable security registration deposit of Rs. 1,499/-', reason: 'Advance fee fraud (victim deposits money and never recovers it)', severity: 'high' },
      { phrase: 'Axis Bank Account Number: 923010048192837', reason: 'Mule account used for funneling fraudulent deposits', severity: 'high' },
      { phrase: '@HR_Priya_Amazon_VIP', reason: 'Off-platform steering to unmonitored Telegram channel', severity: 'medium' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-ASIA-TASK-108',
      clusterName: 'Southeast Asia "Like & Subscribe" Task Syndicate',
      similarityMatchPercent: 94,
      knownVictimsTargeted: 890,
      firstSeenDaysAgo: 45,
      variantFamily: 'Amazon HR Task Fee Funnel v2.8',
      behaviorTactic: 'Lure via WhatsApp -> Task trial on Telegram -> Fake bonus dashboard -> Large crypto/bank lock-in',
    },
    psychologicalTriggers: [
      'Easy Wealth & Greed Lure',
      'Artificial Scarcity ("Limited 5 slots remaining")',
      'False Assurance ("100% refundable")',
      'Big Tech Brand Borrowing (Amazon/Google)'
    ],
    urgencyTactics: [
      'Only 5 slots remaining today',
      'Immediate payment receipt requirement'
    ],
    recommendedAction: 'Do NOT transfer money. Legitimate companies never charge candidates an onboarding or registration fee. Report the Axis Bank account to cybercrime.gov.in and block the recruiter.',
    selectedPersona: {
      id: 'clueless_intern',
      name: 'Rohan - Clueless College Fresher',
      role: 'Overeager, technologically confused applicant',
      strategy: 'Eager to work, constantly asks absurd administrative questions, uploads corrupted screenshots, asks for official tax invoice.',
      avatar: '🧑‍💻',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (HR Priya)',
        avatar: '💼',
        message: 'Hello! I am Priya Sharma from Amazon. You are selected for Rs 5,000/day job liking YouTube videos! Pay Rs 1,499 registration fee to Axis Bank 923010048192837 immediately to begin.',
        timestamp: '11:02 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Rohan (Intern)',
        avatar: '🧑‍💻',
        message: 'Respected Priya Ma’am! Wow, Amazon is my dream company! My college placement officer said Amazon gives free laptops and blue t-shirts. Will the blue t-shirt come in size Medium? Also I already went ahead and subscribed to 47 Bhojpuri music videos on YouTube to show my dedication!',
        timestamp: '11:05 AM',
        tacticUsed: 'Enthusiastic diversion with irrelevant corporate perk requests',
        timeDelaySec: 180
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (HR Priya)',
        avatar: '💼',
        message: 'Yes yes t-shirt will come later! First send Rs 1499 to Axis Bank account right now and send screenshot on Telegram @HR_Priya_Amazon_VIP. Only 2 slots left!',
        timestamp: '11:07 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Rohan (Intern)',
        avatar: '🧑‍💻',
        message: 'Ma\'am I tried doing NEFT transfer from my Father’s account, but his bank manager says CloudMedia Tech Enterprises is registered as a poultry feed trading firm in Surat. Should I put GST number in the remark field? My dad is asking for your Corporate Identification Number (CIN) for his income tax audit.',
        timestamp: '11:12 AM',
        tacticUsed: 'Exposing mismatch in mule account company registration to rattle scammer',
        timeDelaySec: 300
      }
    ],
    estimatedTimeWastedMinutes: 15,
    detectedLanguage: 'English (Job Recruitment Context)',
    analyzedAt: 'Just now',
  },
  'demo-lottery-prize': {
    id: 'res-lottery-kbc',
    originalMessage: DEMO_CASES[2].fullMessage,
    category: 'lottery_prize',
    categoryLabel: 'Lottery / Prize Fraud',
    riskScore: 95,
    threatLevel: 'CRITICAL',
    justification: 'Classic advance-fee lottery scam. Impersonates popular TV show Kaun Banega Crorepati (KBC) and telecom operators with fake 25 Lakh prize claim, routing to an unverified WhatsApp number and phishing link to extract "processing fees".',
    indicators: {
      upiIds: [],
      phoneNumbers: ['+91 70442 81923'],
      urls: ['http://kbc-lottery-winner2026.online/claim-cert.html'],
      bankAccounts: [],
      brandsImpersonated: ['Kaun Banega Crorepati (KBC)', 'Reliance Jio', 'Bharti Airtel'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: '1st PRIZE WINNER of Rs. 25,00,000/-', reason: 'Unsolicited windfall reward lure without user participation', severity: 'high' },
      { phrase: 'kbc-lottery-winner2026.online', reason: 'Freshly registered suspicious TLD pretending to be Sony/KBC media portal', severity: 'high' },
      { phrase: 'Processing fee must be cleared before 6:00 PM', reason: 'Advance fee demand disguised as administrative processing', severity: 'high' },
      { phrase: 'contact KBC Head Office Claim Manager Mr. Vikram Rathore on official WhatsApp only', reason: 'Bypassing telecom logs by pushing user to WhatsApp encrypted chat', severity: 'medium' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-KBC-319',
      clusterName: 'KBC SIM Lottery Syndicate',
      similarityMatchPercent: 98,
      knownVictimsTargeted: 1240,
      firstSeenDaysAgo: 120,
      variantFamily: 'KBC 25 Lakh SIM Draw Audio-Poster v9.1',
      behaviorTactic: 'Fake WhatsApp audio note + forged certificate graphic + GST / Customs processing fee demand',
    },
    psychologicalTriggers: [
      'Euphoric Greed & Windfall Bias',
      'Celebrity / Trusted Media Authority (Amitabh Bachchan / KBC)',
      'Fear of Missing Out (FOMO before 6:00 PM)',
      'False Secrecy ("do not call regular customer care")'
    ],
    urgencyTactics: [
      'Processing fee deadline at 6:00 PM today',
      'Prize file forfeiture warning'
    ],
    recommendedAction: 'Never pay money to claim a prize you did not enter. True lotteries do not ask for WhatsApp communications or upfront fees. Block +91 70442 81923 immediately.',
    selectedPersona: {
      id: 'retiree',
      name: 'Balwant Singh (68 yrs)',
      role: 'Over-excited retired railway clerk',
      strategy: 'Pretends he wants to donate the 25 lakhs to village cow shelter, asks for Amitabh Bachchan’s voice message confirmation.',
      avatar: '👴🏽',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (KBC Manager Vikram)',
        avatar: '🎉',
        message: 'Congratulations! Your SIM won Rs. 25,00,000 in KBC Lucky Draw! Contact WhatsApp manager +91 70442 81923 and pay processing fee Rs 12,500 before 6 PM!',
        timestamp: '02:20 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Balwant Singh',
        avatar: '👴🏽',
        message: 'Jai Sri Krishna Vikram Ji! Oh my God, 25 Lakhs! I have watched every episode of Amitabh Bachchan Sir since 2000! My wife is currently distributing laddoos in our entire railway colony! Will Amitabh ji come to our house in Kanpur with the big cardboard cheque?',
        timestamp: '02:23 PM',
        tacticUsed: 'Enthusiastic buy-in that leads scammer to believe the mark is 100% hooked',
        timeDelaySec: 180
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (KBC Manager Vikram)',
        avatar: '🎉',
        message: 'Yes yes Amitabh Bachchan will do video call once government tax of Rs 12,500 is paid! Pay quickly to our account otherwise lottery file will be cancelled!',
        timestamp: '02:25 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Balwant Singh',
        avatar: '👴🏽',
        message: 'Vikram Ji, you are like my son. Since you have my 25,00,000 rupees sitting right there in front of you, please deduct the 12,500 rupees from that pile, keep an extra 10,000 for your sweets and tea, and transfer the remaining 24,77,500 to my State Bank passbook! Isn’t that so much simpler?',
        timestamp: '02:29 PM',
        tacticUsed: 'The classic "deduct it from the winnings" trap that scammers cannot logically counter',
        timeDelaySec: 240
      }
    ],
    estimatedTimeWastedMinutes: 22,
    detectedLanguage: 'English / Hindi Hinglish Context',
    analyzedAt: 'Just now',
  },
  'demo-tech-support': {
    id: 'res-tech-support-msft',
    originalMessage: DEMO_CASES[3].fullMessage,
    category: 'tech_support',
    categoryLabel: 'Tech Support Impersonation',
    riskScore: 99,
    threatLevel: 'CRITICAL',
    justification: 'Severe tech support scareware scam. Uses fabricated system error codes (#0x80070422), fake malware threats ("Zeus.Spyware.v4"), toll-free impersonation numbers, and tries to coerce victims into installing remote access tools (AnyDesk/TeamViewer).',
    indicators: {
      upiIds: [],
      phoneNumbers: ['+1 888-492-3104', '+1 800-241-9981'],
      urls: ['http://anydesk-support-agent.net/connect-remote'],
      bankAccounts: [],
      brandsImpersonated: ['Microsoft Windows Defender', 'Microsoft Corporation'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'CRITICAL SYSTEM SECURITY ALERT - ERROR #0x80070422', reason: 'Fabricated BSOD/error code designed to mimic operating system alarms', severity: 'high' },
      { phrase: 'DO NOT RESTART OR TURN OFF YOUR PC', reason: 'High-coercion instruction to stop user from rebooting (which would dismiss the browser popup)', severity: 'high' },
      { phrase: 'http://anydesk-support-agent.net/connect-remote', reason: 'Trojanized / phishing domain spoofing AnyDesk remote management software', severity: 'high' },
      { phrase: 'Toll-Free Helpline: +1 888-492-3104', reason: 'Inbound VoIP toll-free number connected to boiler-room call center', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-GLOBAL-TECH-771',
      clusterName: 'Kolkata/NCR Tech Support Boiler Room Network',
      similarityMatchPercent: 97,
      knownVictimsTargeted: 2150,
      firstSeenDaysAgo: 180,
      variantFamily: 'Zeus Defender ScreenLocker v11',
      behaviorTactic: 'Browser fullscreen lockup -> Audio siren -> VoIP remote desktop session -> Fake syskey lock -> $500 Target gift cards',
    },
    psychologicalTriggers: [
      'Acute Tech Phobia & Data Loss Terror',
      'Webcam & Identity Blackmail Threat',
      'Urgency through "Do Not Turn Off Your PC" Command',
      'Microsoft Brand Authority'
    ],
    urgencyTactics: [
      'Permanent hard drive corruption threat',
      'Banking credentials actively leaking'
    ],
    recommendedAction: 'Close the browser tab using Task Manager (Ctrl+Shift+Esc or Cmd+Option+Esc). Never call the phone number or grant remote access. Microsoft will NEVER pop up a phone number to call.',
    selectedPersona: {
      id: 'martha',
      name: 'Grandma Martha (73 yrs)',
      role: 'Non-technical senior citizen',
      strategy: 'Mistakes the CD-ROM tray for a cup holder, asks if the mouse pointer is an actual rodent, reads random cereal box barcodes instead of serial numbers.',
      avatar: '👵',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Tech Agent "David")',
        avatar: '🖥️',
        message: 'Microsoft Defender Alert! Zeus virus detected. Call +1 888-492-3104 immediately and go to anydesk-support-agent.net to connect remote session!',
        timestamp: '03:10 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'Hello David? Oh thank heavens you called. My screen is flashing bright red and making a beeping sound like my microwave when the baked potatoes are finished. Is Zeus the Greek god who does lightning? Did lightning strike my telephone wires?',
        timestamp: '03:13 PM',
        tacticUsed: 'Absurd literal interpretation of malware terminology',
        timeDelaySec: 180
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Tech Agent "David")',
        avatar: '🖥️',
        message: 'No ma\'am! Hackers are inside your PC! Look at your keyboard, find the Windows key between Ctrl and Alt, and press the letter R! Tell me what you see!',
        timestamp: '03:15 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'Between Ctrl and Alt? Dear, I am looking at my keyboard right now. Between the C and the A there is only cookie crumbs and some Earl Grey tea residue. Wait, let me blow on it... *cough cough*. Oh, now my spacebar came off in my hand. Do I put superglue on it?',
        timestamp: '03:19 PM',
        tacticUsed: 'Pretending hardware is physically falling apart to stall keyboard shortcuts',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Tech Agent "David")',
        avatar: '🖥️',
        message: 'DON’T GLUE THE SPACEBAR! Just open the internet browser! The blue E or the circle with green and red and yellow!',
        timestamp: '03:21 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Grandma Martha',
        avatar: '👵',
        message: 'I see a round green thing... oh wait, that’s my tin of Vicks VapoRub on the desk. Let me move it aside. Okay, now I typed "w-w-w-dot-any-desk" into Google, and it is showing me pictures of mahogany writing desks at IKEA for $149. Is that the desk you want me to buy for Microsoft?',
        timestamp: '03:26 PM',
        tacticUsed: 'Deliberate semantic confusion between software and physical furniture',
        timeDelaySec: 300
      }
    ],
    estimatedTimeWastedMinutes: 28,
    detectedLanguage: 'English (US/UK Technical Context)',
    analyzedAt: 'Just now',
  },
  'demo-romance-investment': {
    id: 'res-romance-crypto',
    originalMessage: DEMO_CASES[4].fullMessage,
    category: 'romance_investment',
    categoryLabel: 'Romance / Crypto Ponzi (Sha Zhu Pan)',
    riskScore: 97,
    threatLevel: 'CRITICAL',
    justification: 'Severe "Pig Butchering" (Sha Zhu Pan) romance/crypto fraud. Exploits emotional bonding and false intimacy, claims non-existent insider arbitrage yields (18.5% every 8 hrs), provides a malicious TRC20 wallet address and illegitimate DeFi portal URL.',
    indicators: {
      upiIds: [],
      phoneNumbers: [],
      urls: ['http://defi-arbitrage-vault-yield.org'],
      bankAccounts: [],
      brandsImpersonated: ['Singapore Quantitative Capital (Fictitious)', 'Tether (USDT)'],
      cryptoWallets: ['TX9rW7uM4VbEq81xPnK28yL45jZq11v9B7 (TRON TRC20)'],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'thinking about our future travel plans together', reason: 'Emotional manipulation priming victim through romantic rapport', severity: 'high' },
      { phrase: 'generates 18.5% guaranteed profit every 8 hours with zero market risk', reason: 'Impossible financial yield claim characteristic of crypto Ponzi scams', severity: 'high' },
      { phrase: 'USDT (TRC20) Wallet: TX9rW7uM4VbEq81xPnK28yL45jZq11v9B7', reason: 'Unregulated anonymous crypto deposit address', severity: 'high' },
      { phrase: 'defi-arbitrage-vault-yield.org', reason: 'Fraudulent smart-contract drainer web app', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-SEA-PIGBUTCHER-501',
      clusterName: 'Mekong Cyber Compound "Golden Triangle" Syndicate',
      similarityMatchPercent: 95,
      knownVictimsTargeted: 670,
      firstSeenDaysAgo: 60,
      variantFamily: 'Sha Zhu Pan Wealth Grooming v6.4',
      behaviorTactic: 'Weeks of romantic grooming -> Fake high-yield liquidity pool -> Fake small withdrawal allowed -> Complete wallet drain',
    },
    psychologicalTriggers: [
      'Romantic Affection & Future Love Promise',
      'Greed & Exaggerated Wealth Independence',
      'Exclusive "Insider Information" Framing',
      'Artificial Safe Haven Claim ("zero market risk")'
    ],
    urgencyTactics: [
      'Node open for 48 hours only',
      'Limited arbitrage cycle expiration'
    ],
    recommendedAction: 'Never send cryptocurrency to anyone you have only met online. Disconnect any Web3 wallet that interacted with the domain. Report the TRC20 address to Chainabuse / ScamAdviser and cease all contact.',
    selectedPersona: {
      id: 'compliance_officer',
      name: 'Agent Vance - Compliance Auditor',
      role: 'Bureaucratic financial compliance officer pretender',
      strategy: 'Pretends to love the scammer, but insists on sending official FinCEN Form 8300 and anti-money-laundering questionnaires before every transaction.',
      avatar: '🕵️‍♂️',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer ("Elena")',
        avatar: '🌹',
        message: 'Hello my love ❤️ My uncle opened the 18.5% liquidity node! Send 1,000 USDT to TX9rW7uM4VbEq81xPnK28yL45jZq11v9B7 so we can buy our beach house!',
        timestamp: '08:45 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Agent Vance',
        avatar: '🕵️‍♂️',
        message: 'Dearest Elena! My heart fluttered when I read about the beach house with palm trees. However, as Chief Risk Auditor at my firm, SEC Rule 17a-8 requires me to perform formal Know-Your-Customer (KYC) counterparty due diligence on your uncle’s Cayman offshore trust entity. Could you please send his LEI (Legal Entity Identifier) number and Form W-8BEN-E?',
        timestamp: '08:49 PM',
        tacticUsed: 'Counter-compliance trap demanding authentic financial regulatory disclosures',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer ("Elena")',
        avatar: '🌹',
        message: 'Honey why are you talking so complicated with business papers?! Don’t you trust me and our love?! The node closes in 6 hours, just transfer the USDT quickly, my uncle will take care of tax!',
        timestamp: '08:52 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Agent Vance',
        avatar: '🕵️‍♂️',
        message: 'Darling, I trust you with all my soul! That’s why I have drafted a 42-page Notarized Power of Attorney document naming you the sole beneficiary of my $850,000 retirement 401(k). I just need your uncle’s corporate tax residency certificate from the Singapore Monetary Authority so my wire officer can release the $850,000. Can he email that by noon tomorrow?',
        timestamp: '08:58 PM',
        tacticUsed: 'Dangling an enormous $850,000 fake prize to bait the scammer into wasting days waiting for documents',
        timeDelaySec: 360
      }
    ],
    estimatedTimeWastedMinutes: 34,
    detectedLanguage: 'English (Romantic Manipulation Context)',
    analyzedAt: 'Just now',
  },
  'demo-digital-arrest': {
    id: 'res-digital-arrest-mumbai',
    session_id: 'sess-da-01',
    originalMessage: DEMO_CASES[5].fullMessage,
    category: 'digital_arrest',
    categoryLabel: 'Digital Arrest / Police Extortion',
    scam_type: 'digital_arrest',
    riskScore: 99,
    threatLevel: 'CRITICAL',
    justification: 'Severe national-scale cybercrime syndicate extortion. Impersonates CBI and Mumbai Police Crime Branch using fabricated arrest warrants, demanding victims remain on continuous WhatsApp video surveillance ("Digital Arrest"), and demanding ₹50,000 court security bond to a fraudulent UPI.',
    indicators: {
      upiIds: ['cbi.nodaldesk@sbi'],
      phoneNumbers: ['+91 99881 22334'],
      urls: ['http://cbi-cybercell-mumbaicourt.live/digital-warrant.php'],
      bankAccounts: [],
      brandsImpersonated: ['Crime Branch Mumbai', 'Central Bureau of Investigation (CBI)', 'Supreme Court of India'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'placed under immediate DIGITAL ARREST', reason: 'Unlawful intimidation using nonexistent legal terminology to psychologically trap citizen', severity: 'high' },
      { phrase: 'NOT to leave your room camera', reason: 'High-pressure isolation tactic preventing victim from consulting real police or family', severity: 'high' },
      { phrase: 'deposit refundable court verification security bond of ₹50,000', reason: 'Extortion demand routed through money-mule UPI', severity: 'high' },
      { phrase: 'cbi-cybercell-mumbaicourt.live', reason: 'Deceptive phishing portal spoofing judicial warrant repository', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-DIGITAL-ARREST-912',
      clusterName: 'Cambodia/Mewat Digital Arrest Boiler Room Syndicate',
      similarityMatchPercent: 98,
      knownVictimsTargeted: 1840,
      firstSeenDaysAgo: 90,
      variantFamily: 'CBI PMLA Video Interrogation Scam v4.8',
      behaviorTactic: 'Fake Skype/WhatsApp Police Uniform backdrop -> Forged Supreme Court letterhead -> Immediate RTGS/UPI court bond deposit',
    },
    psychologicalTriggers: [
      'Panic & Terror of Imprisonment',
      'Artificial Secrecy & Total Social Isolation',
      'Authority Intimidation (CBI/Police Uniforms)',
      'Time-Sensitive Police Raid Threat'
    ],
    urgencyTactics: [
      'Immediate Police Raid Warning',
      'Strict Prohibition against Disconnecting Camera',
      'Instant ₹50,000 Security Bond Demand'
    ],
    recommendedAction: 'DO NOT stay on video call. Indian law has NO provision for "Digital Arrest". Disconnect immediately, report to National Cyber Crime Helpline 1930, and inform local police station.',
    selectedPersona: {
      id: 'rameshwar_digital_arrest_hi',
      name: 'Rameshwar Prasad (Patna Headmaster)',
      role: 'Retired Government School Teacher',
      strategy: 'अत्यधिक घबराहट का नाटक करते हुए पुलिस वाले से उसका बैज नंबर मांगता है, दामाद वकील को बुलाने का बहाना बनाकर समय बर्बाद करता है',
      avatar: '👴',
      language: 'hi',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake CBI Officer)',
        avatar: '🚨',
        message: 'You are placed under immediate DIGITAL ARREST! Do not disconnect this WhatsApp video call! Pay ₹50,000 security clearance bond to cbi.nodaldesk@sbi right now!',
        timestamp: '11:15 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Rameshwar Prasad',
        avatar: '👴',
        message: 'अरे साहब नमस्ते! CBI का नाम सुनके मेरा BP 180 हो गया है! मैं 40 साल से स्कूल में बच्चों को राष्ट्रगान सिखा रहा हूँ साहब, मैंने कभी किसी का एक पैसा नहीं लिया! आप थानेदार साहब का बैज नंबर और अपना आई-कार्ड व्हाट्सएप कर दीजिए, मैं अभी अपने दामाद वकील को फोन लगाता हूँ!',
        timestamp: '11:19 AM',
        tacticUsed: 'Hinglish BP panic stall & lawyer relative deflection',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake CBI Officer)',
        avatar: '🚨',
        message: 'नो वकील! दिस इज़ नेशनल सीक्रेसी केस! स्काइप वीडियो कॉल ऑन रखो और कमरे का दरवाजा बंद कर लो वरना स्पेशल कमांडो भेजकर अरेस्ट कर लेंगे!',
        timestamp: '11:21 AM'
      },
      {
        speaker: 'persona',
        personaName: 'Rameshwar Prasad',
        avatar: '👴',
        message: 'साहब स्काइप का कैमरा ऑन कर रहा हूँ लेकिन हमारे मोहल्ले में बिजली का तार टूट गया है! इनवर्टर की बीप-बीप बज रही है। क्या मैं लाल बत्ती वाले पुलिस थाने में आकर 500 रुपये की स्टांप पेपर पर अर्जी दे दूँ? मेरे पास गंगाजल की कसम खाने का हलफनामा भी है साहब!',
        timestamp: '11:26 AM',
        tacticUsed: 'Power-cut excuse and physical stamp paper distraction',
        timeDelaySec: 300
      }
    ],
    estimatedTimeWastedMinutes: 25,
    detectedLanguage: 'Hindi / Hinglish (Indian Cyber Police Context)',
    language: 'hi',
    analyzedAt: 'Just now',
  },
  'demo-courier-customs': {
    id: 'res-courier-customs-kn',
    session_id: 'sess-cc-01',
    originalMessage: DEMO_CASES[6].fullMessage,
    category: 'courier_customs',
    categoryLabel: 'Fake Courier / Customs Clearance',
    scam_type: 'courier_customs',
    riskScore: 96,
    threatLevel: 'CRITICAL',
    justification: 'High-severity contraband courier scam impersonating FedEx and Indian Customs Narcotics Cell. Fabricates an international parcel containing narcotics and MDMA, demanding rapid ₹2,000 payment via UPI under threat of imminent police dispatch.',
    indicators: {
      upiIds: ['customs.clearance.mumbai@okaxis'],
      phoneNumbers: ['+91 97721 88301'],
      urls: [],
      bankAccounts: [],
      brandsImpersonated: ['FedEx International', 'Indian Customs', 'Narcotics Control Bureau (NCB)'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: '140 grams MDMA contraband chemicals along with 3 forged credit cards', reason: 'Fabricated grave contraband accusation to induce panic', severity: 'high' },
      { phrase: 'customs.clearance.mumbai@okaxis', reason: 'Fraudulent private UPI impersonating customs department', severity: 'high' },
      { phrase: 'If not paid within 2 hours', reason: 'Strict coercive countdown deadline', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-COURIER-704',
      clusterName: 'Mumbai Airport Narcotics Phishing Network',
      similarityMatchPercent: 95,
      knownVictimsTargeted: 920,
      firstSeenDaysAgo: 40,
      variantFamily: 'FedEx Customs Drug Interception v3.2',
      behaviorTactic: 'Fake IVR call -> Transferred to bogus customs officer -> Demands clearance token to fraudulent UPI',
    },
    psychologicalTriggers: [
      'Contraband & Narcotics Drug Terror',
      'Airport Customs Seizure Panic',
      '2-Hour Countdown Pressure',
      'Threat of Police Home Dispatch'
    ],
    urgencyTactics: [
      '2-Hour Deadline for Customs Penalty',
      'Immediate Police Dispatch to Bengaluru Address'
    ],
    recommendedAction: 'Customs and police NEVER collect fines or duties via personal UPI IDs or WhatsApp. Forward message to 1930 and block +91 97721 88301.',
    selectedPersona: {
      id: 'manjunath_customs_kn',
      name: 'Manjunath (Mysuru Provision Store)',
      role: 'Grocery Shop Merchant',
      strategy: 'ಯಾವ ಪಾರ್ಸೆಲ್ ನಂದು ಅಂತ ಬಿಲ್ ಕೇಳುತ್ತಾ, ಪಾರ್ಸೆಲ್ ಬಿಚ್ಚಿ ಫೋಟೋ ವಾಟ್ಸಾಪ್ ಮಾಡಿ ಆಮೇಲೆ 2000 ರೂಪಾಯಿ ಕೊಡ್ತೀನಿ ಅಂತ ವಾದ ಮಾಡುತ್ತಾನೆ',
      avatar: '🛍️',
      language: 'kn',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Customs Desk)',
        avatar: '📦',
        message: 'ನಿಮ್ಮ FedEx parcel ನಲ್ಲಿ 140g MDMA ಸಿಕ್ಕಿದೆ! NCB arrest team ಬರ್ತಿದೆ! Pay ₹2,000 customs clearance fee to customs.clearance.mumbai@okaxis immediately!',
        timestamp: '04:15 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Manjunath',
        avatar: '🛍️',
        message: 'ಯಾವ ಪಾರ್ಸೆಲ್ ಸರ್? ನಾನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಏನು ತರಿಸಿಲ್ಲ. ನನ್ ದಿನಸಿ ಅಂಗಡಿಗೆ ಉಪ್ಪಿನಕಾಯಿ ಬಾಟಲ್ ಬಂದಿರಬೇಕು. ಅದ್ರಲ್ಲಿ ಕಸ್ಟಮ್ಸ್ ಡ್ಯೂಟಿ ಕಟ್ಟೋಕೆ ಏನಿದೆ? ಪಾರ್ಸೆಲ್ ಕವರ್ ಮೇಲೆ ನನ್ ಹೆಸರು ಸ್ಪೆಲ್ಲಿಂಗ್ ಕರೆಕ್ಟ್ ಆಗಿ ಇದೆಯಾ ನೋಡಿ!',
        timestamp: '04:19 PM',
        tacticUsed: 'Kanglish pickle parcel confusion',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Customs Desk)',
        avatar: '📦',
        message: 'ಇದು ಇಂಟರ್ನ್ಯಾಷನಲ್ ಪಾರ್ಸೆಲ್! ₹2,000 ಕಸ್ಟಮ್ಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಫೀಸ್ ಗೂಗಲ್ ಪೇ ಮಾಡದಿದ್ರೆ ಕೇಸ್ ಹಾಕ್ತೀವಿ!',
        timestamp: '04:21 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Manjunath',
        avatar: '🛍️',
        message: 'ರೀ ತಮ್ಮಾ, 2000 ರೂಪಾಯಿ ಅಂದ್ರೆ 4 ಚೀಲ ಅಕ್ಕಿ ಬರ್ತದೆ! ನೀನು ಪಾರ್ಸೆಲ್ ಬಿಚ್ಚಿ ಒಳಗೆ ಏನಿದೆ ಅಂತ ವಿಡಿಯೋ ಕಾಲ್ ನಲ್ಲಿ ತೋರ್ಸು, ಆಮೇಲೆ ಕಾಸು ಹಾಕ್ತೀನಿ. ಇಲ್ಲಾಂದ್ರೆ ಪಾರ್ಸೆಲ್ ನೀನೇ ಇಟ್ಕೊ!',
        timestamp: '04:27 PM',
        tacticUsed: 'Demanding video inspection before payment',
        timeDelaySec: 360
      }
    ],
    estimatedTimeWastedMinutes: 24,
    detectedLanguage: 'Kannada / Kanglish',
    language: 'kn',
    analyzedAt: 'Just now',
  },
  'demo-upi-refund': {
    id: 'res-upi-refund-hi',
    session_id: 'sess-upi-01',
    originalMessage: DEMO_CASES[7].fullMessage,
    category: 'upi_refund',
    categoryLabel: 'UPI Reverse-Charge Fraud',
    scam_type: 'upi_refund',
    riskScore: 93,
    threatLevel: 'HIGH',
    justification: 'Classic social engineering UPI reverse-payment trap. Fabricates an emotional sob story regarding an accidental hospital transfer, sending a deceptive reverse-charge collect link and instructing the victim to input their confidential UPI MPIN.',
    indicators: {
      upiIds: ['refunddesk24x7@icici'],
      phoneNumbers: [],
      urls: ['http://phonepe-refund-direct.live/collect?ref=25000&id=pay'],
      bankAccounts: [],
      brandsImpersonated: ['Google Pay', 'PhonePe', 'ICICI Bank'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'galti se aapke phone number pe Google Pay ho gaya hai', reason: 'Fabricated pretext of accidental funds transfer', severity: 'high' },
      { phrase: 'apna 6-digit UPI MPIN daalna hai', reason: 'Deception: Entering MPIN always debits money, never credits it', severity: 'high' },
      { phrase: 'phonepe-refund-direct.live', reason: 'Deceptive phishing collect link', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-UPI-REFUND-301',
      clusterName: 'Bharat QR / UPI Reverse-Collect Ring',
      similarityMatchPercent: 96,
      knownVictimsTargeted: 780,
      firstSeenDaysAgo: 30,
      variantFamily: 'Hospital Emergency Accidental Transfer v2.4',
      behaviorTactic: 'Emotional plea -> Collect request generated on PhonePe -> Victims enters MPIN -> Account debited',
    },
    psychologicalTriggers: [
      'Guilt & Empathy Exploitation (Dying Sister in ICU)',
      'Artificial Fear of Police Case',
      'Technical Confusion around MPIN Functions'
    ],
    urgencyTactics: [
      'Sister in ICU emergency deadline',
      'Immediate police complaint threat'
    ],
    recommendedAction: 'NEVER enter your UPI MPIN to receive money! Receiving money into bank accounts requires NO PIN entry. Block the sender and report to 1930.',
    selectedPersona: {
      id: 'chintu_upi_hi',
      name: 'Chintu Kumar (College Student)',
      role: 'First-year College Student',
      strategy: 'बार-बार पूछता है कि "पिन डालने से मेरा पैसा तो नहीं कटेगा?", गलत स्क्रीनशॉट भेजता है',
      avatar: '🧑‍🎓',
      language: 'hi',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake Accidental Payer)',
        avatar: '💸',
        message: 'Bhaiya galti se ₹25,000 transfer ho gaya! Click http://phonepe-refund-direct.live and enter your UPI PIN to refund immediately, sister is in ICU!',
        timestamp: '05:30 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Chintu Kumar',
        avatar: '🧑‍🎓',
        message: 'भैया आपने गलती से 25,000 भेज दिया? लेकिन मेरे फोनपे में तो नोटिफिकेशन आ रहा है कि "Pay ₹25,000 to merchant". पापा बोले थे कि पैसा आने पर हरा टिक आता है, पिन नहीं डालना पड़ता! क्या मैं पहले बैंक मैनेजर से पूछ लूं?',
        timestamp: '05:34 PM',
        tacticUsed: 'Hinglish reversal awareness challenging PIN request',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Fake Accidental Payer)',
        avatar: '💸',
        message: 'अरे वो रिफंड लिंक है! जल्दी पे दबाओ और 6 डिजिट पिन डालो तभी 25000 तुम्हारे खाते में क्रेडिट होगा!',
        timestamp: '05:36 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Chintu Kumar',
        avatar: '🧑‍🎓',
        message: 'भैया मैंने पिन डाला "000000", लेकिन स्क्रीन लाल हो गई और लिखा आया "Incorrect MPIN". क्या मैं अपने एटीएम कार्ड का सीवीवी नंबर भेज दूं? पापा बाहर गए हैं, 10 मिनट रुकिए वो आ रहे हैं!',
        timestamp: '05:42 PM',
        tacticUsed: 'Intentional wrong PIN and waiting for dad delay',
        timeDelaySec: 360
      }
    ],
    estimatedTimeWastedMinutes: 18,
    detectedLanguage: 'Hindi / Hinglish',
    language: 'hi',
    analyzedAt: 'Just now',
  },
  'demo-loan-app': {
    id: 'res-loan-app-en',
    session_id: 'sess-la-01',
    originalMessage: DEMO_CASES[8].fullMessage,
    category: 'loan_app',
    categoryLabel: 'Loan-App Harassment Scam',
    scam_type: 'loan_app',
    riskScore: 97,
    threatLevel: 'CRITICAL',
    justification: 'Illegal predatory loan recovery blackmail. Criminal syndicate harvested unauthorized phonebook contacts and photos through a rogue APK, utilizing extortion threats to circulate morphed images and harass family members.',
    indicators: {
      upiIds: ['quickloan.settle@ybl'],
      phoneNumbers: ['+91 88771 99002'],
      urls: [],
      bankAccounts: [],
      brandsImpersonated: ['FastCash Micro Loans (Illegal App)'],
      cryptoWallets: [],
      emailAddresses: [],
    },
    triggeredPhrases: [
      { phrase: 'circulate your morphed obscene photo with "DEFAULTER & FRAUDSTER" stamp', reason: 'Direct extortion and character assassination blackmail violating IT Act Sec 67A', severity: 'high' },
      { phrase: 'blast calls to all your female contacts', reason: 'Unlawful intimidation and harassment', severity: 'high' },
      { phrase: 'synchronized your entire mobile contact list (412 contacts)', reason: 'Unauthorized spyware exfiltration of personal phonebook', severity: 'high' }
    ],
    fingerprint: {
      clusterId: 'CLUSTER-IN-LOAN-HARASS-550',
      clusterName: 'Rogue Chinese/Southeast Asia Instant Loan Grid',
      similarityMatchPercent: 97,
      knownVictimsTargeted: 3100,
      firstSeenDaysAgo: 180,
      variantFamily: '7-Day Instant Loan Morphed Photo Extortion v5.0',
      behaviorTactic: 'Third-party APK installs contacts/photo spy agent -> 7 days later demands 200% interest -> Blackmails with contact blasts',
    },
    psychologicalTriggers: [
      'Severe Social Defamation & Shaming Terror',
      'Female Contact Harassment Threat',
      '30-Minute Rapid Extortion Ultimatum',
      'Permanent Credit Destruction Threat'
    ],
    urgencyTactics: [
      '30-Minute Repayment Countdown',
      'Immediate Contact Blasting Threat'
    ],
    recommendedAction: 'DO NOT pay blackmail money. Report immediately to 1930 and file complaint at cybercrime.gov.in under Section 67A. Block suspect numbers and alert your family contacts that messages from this number are malicious fraud.',
    selectedPersona: {
      id: 'pillai_loan_en',
      name: 'Advocate Pillai (Cyber Legal Advisor)',
      role: 'Financial Consumer Rights Advocate',
      strategy: 'Cites RBI Master Directions 2022, demands Recovery Agent ID card, promises defamation counter-suit',
      avatar: '👨‍⚖️',
      language: 'en',
    },
    baitConversation: [
      {
        speaker: 'scammer',
        personaName: 'Scammer (Loan Recovery Agent)',
        avatar: '⚡',
        message: 'Repay ₹8,500 + ₹2,400 to quickloan.settle@ybl in 30 mins or we send morphed obscene photos to all 412 contacts!',
        timestamp: '12:00 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Advocate Pillai',
        avatar: '👨‍⚖️',
        message: 'Under the Reserve Bank of India (RBI) Digital Lending Guidelines 2022, recovery agents are strictly prohibited from contacting personal phonebook contacts, using abusive language, or threatening defamation. Please furnish your registered NBFC name, Company CIN, and recovery agency authorization certificate before proceeding.',
        timestamp: '12:04 PM',
        tacticUsed: 'RBI regulatory counter-disclosure demands',
        timeDelaySec: 240
      },
      {
        speaker: 'scammer',
        personaName: 'Scammer (Loan Recovery Agent)',
        avatar: '⚡',
        message: 'Shut up with your rules! Repay immediately or your photos are going to your WhatsApp family group in 5 minutes!',
        timestamp: '12:06 PM'
      },
      {
        speaker: 'persona',
        personaName: 'Advocate Pillai',
        avatar: '👨‍⚖️',
        message: 'Thank you for documenting this extortion attempt in writing. This complete chat transcript, alongside your cellular number +91 88771 99002, has been directly integrated into our National Cyber Crime Reporting Portal (1930) complaint file under Sections 384, 506, and 67A of the IT Act. Please continue typing.',
        timestamp: '12:11 PM',
        tacticUsed: 'Formal legal recording notice terrifying abusive collector',
        timeDelaySec: 300
      }
    ],
    estimatedTimeWastedMinutes: 26,
    detectedLanguage: 'English (Legal & Financial Context)',
    language: 'en',
    analyzedAt: 'Just now',
  },
};
