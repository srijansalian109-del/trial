import { BlocklistEntry } from '../src/types/threat.ts';

/**
 * Normalizes indicators before comparison so formatting differences
 * do not create duplicate entries.
 * E.g.: "+91 98765 43210", "919876543210", "+919876543210" -> "+919876543210"
 */
export function normalizeIdentifier(type: BlocklistEntry['type'], val: string): string {
  if (!val) return '';
  const clean = val.trim();

  if (type === 'phone') {
    // Keep only digits and leading plus
    const digitsOnly = clean.replace(/\D/g, '');
    if (digitsOnly.length === 10 && /^[6-9]/.test(digitsOnly)) {
      return `+91${digitsOnly}`;
    }
    if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
      return `+91${digitsOnly.slice(1)}`;
    }
    if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
      return `+${digitsOnly}`;
    }
    if (clean.startsWith('+')) {
      return `+${digitsOnly}`;
    }
    return digitsOnly;
  }

  if (type === 'upi') {
    return clean.toLowerCase().replace(/\s+/g, '');
  }

  if (type === 'url') {
    return clean
      .toLowerCase()
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .replace(/\/+$/, '')
      .trim();
  }

  if (type === 'bank') {
    return clean.replace(/\s+/g, ' ').toUpperCase();
  }

  if (type === 'wallet') {
    return clean.replace(/\s+/g, '');
  }

  return clean.toLowerCase();
}

/**
 * Applies multi-session verification rule:
 * An identifier becomes VERIFIED when:
 * 1. The same normalized identifier is observed across at least 2 DISTINCT sessions (sessionIds.length >= 2)
 * OR
 * 2. High-confidence extraction/verification event (e.g. riskScore >= 90)
 */
export function evaluateVerificationStatus(entry: BlocklistEntry, riskScore: number = 70): 'pending' | 'verified' {
  const distinctSessionCount = entry.sessionIds ? new Set(entry.sessionIds).size : 0;
  
  if (distinctSessionCount >= 2 || entry.flagCount >= 2 || riskScore >= 92) {
    return 'verified';
  }

  return 'pending';
}
