'use client';

import { useLanguageCtx } from '@/contexts/LanguageCtx';
import { t } from '@/lib/translations';

export default function Footer() {
  const { locale } = useLanguageCtx();
  
  return (
    <footer className="relative border-t border-blue-200/50 mt-24 bg-gradient-to-b from-slate-50 via-blue-50/50 to-slate-50">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-50/20 via-transparent to-blue-50/20 pointer-events-none" />
      <div className="container relative py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="text-sm font-semibold bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-2">
              © 2024 Wojciech Staniszewski
            </p>
            <p className="text-xs text-slate-500">All rights reserved.</p>
          </div>
          <div className="flex gap-8 text-sm font-semibold">
            <a href="https://www.linkedin.com/in/wojciech-staniszewski-136631395/" target="_blank" rel="noreferrer" className="relative text-slate-600 hover:text-brand-600 transition-colors group">
              LinkedIn
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="relative text-slate-600 hover:text-brand-600 transition-colors group">
              GitHub
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="mailto:wojciechstaniszewski80@gmail.com" className="relative text-slate-600 hover:text-brand-600 transition-colors group">
              Email
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-200/30 text-center">
          <p className="text-xs text-slate-500">
            {t('Built with Next.js & TypeScript', locale)}
          </p>
        </div>
      </div>
    </footer>
  )
}

