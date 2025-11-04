'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  availableLocales: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const router = useRouter();
  const availableLocales = ['en', 'es'];

  useEffect(() => {
    // Get locale from cookie on mount
    const savedLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] || 'en';
    
    setLocaleState(savedLocale);
  }, []);

  const setLocale = (newLocale: string) => {
    // Save to cookie
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    setLocaleState(newLocale);
    
    // Refresh the page to apply new translations
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, availableLocales }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}