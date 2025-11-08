// AI Translation Configuration
export const translationConfig = {
  // Primary language (source)
  defaultLocale: 'en',
  
  // Supported languages  
  supportedLocales: ['en', 'es', 'fr', 'de', 'pl'] as const,
  
  // Language names for UI
  languageNames: {
    en: 'English',
    es: 'Español', 
    fr: 'Français',
    de: 'Deutsch',
    pl: 'Polski'
  },
  
  // Language flags
  languageFlags: {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷', 
    de: '🇩🇪',
    pl: '🇵🇱'
  },
  
  // Translation API endpoints (you could use any service)
  translationServices: {
    // Google Translate (free tier available)
    google: 'https://translate.googleapis.com/translate_a/single',
    
    // OpenAI (for better context-aware translations)
    openai: 'https://api.openai.com/v1/chat/completions',
    
    // LibreTranslate (open source, self-hosted option)  
    libre: 'https://libretranslate.de/translate',
    
    // Azure Translator (Microsoft)
    azure: 'https://api.cognitive.microsofttranslator.com/translate'
  }
};

export type SupportedLocale = typeof translationConfig.supportedLocales[number];