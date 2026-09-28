import personasJson from './personas.json';
import { ScamCategory } from '../types/threat';

export interface PersonaDefinition {
  persona_id: string;
  name: string;
  trait: string;
  language: 'en' | 'hi' | 'kn';
  scam_types: string[];
  avatar: string;
  role: string;
  strategy: string;
  badge: string;
}

export const ALL_PERSONAS: PersonaDefinition[] = personasJson as PersonaDefinition[];

// Fallback default persona
export const DEFAULT_ENGLISH_PERSONA: PersonaDefinition =
  ALL_PERSONAS.find(p => p.persona_id === 'martha') || ALL_PERSONAS[0];

/**
 * Select the best persona based on detected scam_type and language.
 * Falls back gracefully to English if no language-specific persona exists.
 */
export function selectBestPersona(
  scamType: string,
  language: 'en' | 'hi' | 'kn' = 'en'
): PersonaDefinition {
  const normScam = (scamType || '').toLowerCase();

  // 1. Try exact match of scam_type and language
  const exactMatch = ALL_PERSONAS.find(
    p => p.language === language && p.scam_types.includes(normScam)
  );
  if (exactMatch) return exactMatch;

  // 2. Try match of scam_type in English
  const englishScamMatch = ALL_PERSONAS.find(
    p => p.language === 'en' && p.scam_types.includes(normScam)
  );
  if (englishScamMatch) return englishScamMatch;

  // 3. Try match by language alone
  const languageMatch = ALL_PERSONAS.find(p => p.language === language);
  if (languageMatch) return languageMatch;

  // 4. Default fallback
  return DEFAULT_ENGLISH_PERSONA;
}

export function getPersonaById(id: string): PersonaDefinition {
  return ALL_PERSONAS.find(p => p.persona_id === id) || DEFAULT_ENGLISH_PERSONA;
}
