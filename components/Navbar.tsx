'use client';

import Link from 'next/link'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export default function Navbar() {
  const { locale } = useLanguageCtx()
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-blue-200/50">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-50/50 via-transparent to-blue-50/50 pointer-events-none" />
      <nav className="container relative h-16 flex items-center justify-between select-none">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-slate-800 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
            <span className="text-lg font-bold text-slate-800">WS</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent hover:from-brand-500 hover:to-brand-700 transition-all duration-300">
            Wojciech Staniszewski
          </span>
        </Link>
        <div className="flex gap-10 text-sm font-semibold items-center">
          <Link href="/projects" className="relative text-slate-700 hover:text-brand-600 transition-colors group">
            {t('Projects', locale)}
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-600 to-brand-800 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <Link href="/skills" className="relative text-slate-700 hover:text-brand-600 transition-colors group">
            {t('Skills', locale)}
            <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-brand-600 to-brand-800 group-hover:w-full transition-all duration-300 rounded-full"></span>
          </Link>
          <LanguageSwitcher />
          <Link href="/contact" className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold hover:from-brand-500 hover:to-brand-600 hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5 transition-all duration-200 border border-brand-500/20">
            {t('Contact', locale)}
          </Link>
        </div>
      </nav>
    </header>
  )
}

