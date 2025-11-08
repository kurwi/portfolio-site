'use client'

import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'

export default function ContactPage() {
  // i18n
  const { locale } = useLanguageCtx()

  const CONTACT_METHODS: Array<{
    id: 'email' | 'linkedin'
    href: string
    titleKey: string
    subtitleKey?: string
    descriptionKey: string
    icon: 'email' | 'linkedin'
  }> = [
    {
      id: 'email',
      href: 'mailto:wojciechstaniszewski80@gmail.com',
      titleKey: 'contact.email.title',
      descriptionKey: 'contact.email.description',
      icon: 'email',
    },
    {
      id: 'linkedin',
      href: 'https://www.linkedin.com/in/wojciech-staniszewski-136631395/',
      titleKey: 'contact.linkedin.title',
      subtitleKey: 'contact.linkedin.subtitle',
      descriptionKey: 'contact.linkedin.description',
      icon: 'linkedin',
    },
  ]
  
  return (
    <main className="container py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center">
          <span className="gradient-text">{t('contact.title', locale)}</span>
        </h1>
        <p className="text-lg text-slate-600 text-center mb-4">
          {t('contact.subtitle', locale)}
        </p>
        <p className="text-base text-slate-600 text-center mb-12 font-medium">
          <span className="text-brand-600">{t('contact.note', locale)}</span>
        </p>
        
        <div className="grid gap-6">
          {CONTACT_METHODS.map((m) => (
            <a
              key={m.id}
              href={m.href}
              target={m.id === 'linkedin' ? '_blank' : undefined}
              rel={m.id === 'linkedin' ? 'noopener noreferrer' : undefined}
              className="card-accent p-6 flex items-start gap-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-700 to-brand-900"></div>
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-700/30">
                {m.icon === 'email' ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-1">{t(m.titleKey, locale)}</h3>
                {m.id === 'email' ? (
                  <>
                    <p className="text-brand-600 group-hover:text-brand-700 transition-colors">wojciechstaniszewski80@gmail.com</p>
                    <p className="text-sm text-slate-600 mt-1">{t(m.descriptionKey, locale)}</p>
                  </>
                ) : (
                  <>
                    {m.subtitleKey && (
                      <p className="text-brand-600 group-hover:text-brand-700 transition-colors">{t(m.subtitleKey, locale)}</p>
                    )}
                    <p className="text-sm text-slate-600 mt-1">{t(m.descriptionKey, locale)}</p>
                  </>
                )}
              </div>
            </a>
          ))}

          {/* GitHub (static card) */}
          <div className="card-accent p-6 flex items-start gap-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-700 to-brand-900"></div>
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-700/30">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">{t('contact.github.title', locale)}</h3>
              <p className="text-slate-600">{t('contact.github.line1', locale)}</p>
              <p className="text-sm text-slate-600 mt-1">{t('contact.github.line2', locale)}</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

