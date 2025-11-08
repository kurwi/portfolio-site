'use client';

import { useState, useEffect } from 'react';
import { translationConfig, SupportedLocale } from '@/lib/translation-config';
import { demoTranslations } from '@/lib/demo-translations';

// Translation cache to avoid repeated API calls
const translationCache = new Map<string, string>();

interface TranslationHookResult {
  t: (text: string) => string;
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isTranslating: boolean;
}

export function useSmartTranslation(): TranslationHookResult {
  const [locale, setLocaleState] = useState<SupportedLocale>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('preferred-locale') as SupportedLocale;
    if (savedLocale && translationConfig.supportedLocales.includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  // Simple translation function using built-in mappings for now
  const translateText = async (text: string, targetLang: SupportedLocale): Promise<string> => {
    // Return original text for English
    if (targetLang === 'en') return text;
    
    // Check cache first
    const cacheKey = `${text}:${targetLang}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Use comprehensive demo translations
    const translatedText = (demoTranslations as any)[targetLang]?.[text] || text;
    
    // Cache the result
    translationCache.set(cacheKey, translatedText);
    return translatedText;
  };

  // Smart translation function with caching
  const t = (text: string): string => {
    if (locale === 'en') return text;
    
    const cacheKey = `${text}:${locale}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Trigger async translation and cache result
    translateText(text, locale).then(translated => {
      // Force re-render when translation is ready
      setLocaleState(locale);
    });

    // Return original text while translation is pending
    return text;
  };

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
    
    // Pre-translate common texts for better UX
    const commonTexts = [
      'Home', 'About', 'Skills', 'Projects', 'Contact', 'Technical', 'Demos',
      'Overview', 'Evaluation', 'Similarity', 'A/B Test', 'Loading...', 
      'Submit', 'Cancel', 'Save', 'Edit', 'Delete', 'All', 'Category'
    ];
    
    commonTexts.forEach(text => translateText(text, newLocale));
  };

  return { t, locale, setLocale, isTranslating };
}