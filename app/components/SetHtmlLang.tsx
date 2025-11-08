'use client'

import { useEffect } from 'react'
import { useLanguageCtx } from '@/contexts/LanguageCtx'

export function SetHtmlLang() {
  const { locale } = useLanguageCtx()

  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', locale)
      }
    } catch {}
  }, [locale])

  return null
}
