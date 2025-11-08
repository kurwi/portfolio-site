'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/lib/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageCtx = createContext<LanguageContextType | null>(null);

export function LanguageContextProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      // URL override e.g., ?lang=en
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const rawParam = params?.get('lang') || params?.get('locale') || '';
      const allowed: Locale[] = ['en','es','fr','de','pl'];
      const normalize = (val: string): Locale | null => {
        if (!val) return null;
        const base = val.trim().toLowerCase();
        const short = (base.includes('-') ? base.split('-')[0] : base) as Locale;
        return allowed.includes(short) ? short : null;
      };

      const urlLang = normalize(rawParam);
      if (urlLang) {
        setLocaleState(urlLang);
        localStorage.setItem('locale', urlLang);
        return;
      }

      const savedRaw = localStorage.getItem('locale') || '';
      const saved = normalize(savedRaw);
      if (saved) {
        setLocaleState(saved);
        return;
      }

      // Fallback to browser language on first visit
      const browser = normalize(typeof navigator !== 'undefined' ? navigator.language : '');
      if (browser) setLocaleState(browser);
    } catch {}
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return (
    <LanguageCtx.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageCtx.Provider>
  );
}

export function useLanguageCtx() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error('useLanguageCtx must be inside LanguageContextProvider');
  return ctx;
}
