'use client';

import { useContext } from 'react';
import translations from '@/data/translations.json';
import { LangContext } from '@/components/LangProvider';

// Type definitions for translations
type TranslationType = typeof translations.fr;

/**
 * Custom hook to access translations
 * @returns Object with translations for current locale
 */
export function useTranslation() {
  // Get the current language from context
  const lang = useContext(LangContext);
  
  // Get translations for current locale, fallback to French if not found
  const currentTranslations = lang === 'fr' || lang === 'en' 
    ? translations[lang]
    : translations.fr;
  
  const t = currentTranslations as unknown as TranslationType;
  
  return {
    t,
    locale: lang,
  };
} 