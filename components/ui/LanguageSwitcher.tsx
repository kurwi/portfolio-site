'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const { locale, setLocale, availableLocales } = useLanguage();
  const t = useTranslations('common');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  const getLanguageName = (localeCode: string) => {
    switch (localeCode) {
      case 'en':
        return t('english');
      case 'es':
        return t('spanish');
      default:
        return localeCode;
    }
  };

  const getFlag = (localeCode: string) => {
    switch (localeCode) {
      case 'en':
        return '🇺🇸';
      case 'es':
        return '🇪🇸';
      default:
        return '🌐';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 bg-white hover:bg-slate-50 transition-colors"
        aria-label={t('language')}
      >
        <span>{getFlag(locale)}</span>
        <span className="text-sm font-medium text-slate-700">
          {getLanguageName(locale)}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg border border-slate-200 z-50">
          {availableLocales.map((localeCode) => (
            <button
              key={localeCode}
              onClick={() => handleLanguageChange(localeCode)}
              className={`flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors ${
                locale === localeCode ? 'bg-blue-50 text-blue-700' : 'text-slate-700'
              }`}
            >
              <span>{getFlag(localeCode)}</span>
              <span className="text-sm font-medium">
                {getLanguageName(localeCode)}
              </span>
              {locale === localeCode && (
                <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}