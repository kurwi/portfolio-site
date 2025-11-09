'use client'

import Link from 'next/link'
import { StatsSection } from '@/app/components/StatsSection'
import { ContactSection } from '@/app/components/ContactSection'
import { FadeIn, SlideIn, ScaleIn } from '@/app/components/Animations'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'
import CVDownload from '@/components/CVDownload'

export default function HomePage() {
  const { locale } = useLanguageCtx();
  
  return (
    <main className="container py-20">
      <section className="mb-24">
        <div className="max-w-4xl">
          <FadeIn duration={1000}>
            <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-brand-100 to-blue-100 border-l-3 border-brand-600 text-brand-700 text-sm font-semibold mb-8 rounded-lg shadow-lg shadow-brand-600/10">
              <span className="w-2 h-2 bg-brand-600 rounded-full animate-pulse"></span>
              {t('Available for new opportunities', locale)}
            </div>
          </FadeIn>
          <SlideIn direction="left" duration={1100} delay={150}>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              {t('Hi, I\'m', locale)} <span className="gradient-text">Wojciech</span>
              <br />
              <span className="gradient-text">Staniszewski</span>
            </h1>
          </SlideIn>
          <FadeIn duration={1000} delay={300}>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 max-w-3xl">
              {t('Data & AI Engineer crafting production-grade systems for machine learning, trading algorithms, and scalable data platforms.', locale)}
            </p>
          </FadeIn>
          <FadeIn delay={500} duration={1000}>
            <div className="flex gap-4 flex-wrap">
              <Link href="/projects" className="px-8 py-3.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-600/40 hover:-translate-y-1 transition-all duration-300 border border-brand-500/30">
                {t('View My Work', locale)}
              </Link>
              <Link href="/contact" className="px-8 py-3.5 border-2 border-brand-600 text-brand-600 font-semibold rounded-lg hover:bg-brand-50 hover:border-brand-700 hover:text-brand-700 transition-all duration-300">
                {t('Get in Touch', locale)}
              </Link>
              <CVDownload />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mb-24">
        <SlideIn direction="left">
          <h2 className="section-title">{t('Core Expertise', locale)}</h2>
        </SlideIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScaleIn delay={0}>
            <div className="card p-8 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-5 rounded-xl shadow-lg shadow-brand-600/25 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Machine Learning', locale)}</h3>
              <p className="text-slate-600 leading-relaxed">{t('XGBoost, Neural Networks, LogisticRegression, RandomForest, Data Mining, Candlestick Patterns, GPT Signals', locale)}</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={50}>
            <div className="card p-8 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-5 rounded-xl shadow-lg shadow-brand-700/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Data Engineering', locale)}</h3>
              <p className="text-slate-600 leading-relaxed">{t('Pipelines, ETL, Pandas, PostgreSQL, Redis, real-time processing, data validation frameworks', locale)}</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={100}>
            <div className="card p-8 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-5 rounded-xl shadow-lg shadow-brand-700/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Trading & Finance', locale)}</h3>
              <p className="text-slate-600 leading-relaxed">{t('Reinforcement Learning trading bots, Forex strategies with MT5, quantitative analysis, backtesting', locale)}</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={150}>
            <div className="card p-6 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Backend & APIs', locale)}</h3>
              <p className="text-slate-600">{t('FastAPI, Flask, async workers, scalable architecture, Docker, Kubernetes, monitoring', locale)}</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={200}>
            <div className="card p-6 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Dashboards & Visualization', locale)}</h3>
              <p className="text-slate-600">{t('Dash, Plotly, Streamlit, real-time analytics, interactive reports, executive dashboards', locale)}</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={250}>
            <div className="card p-6 group h-full relative overflow-hidden hover:border-brand-600 transition-all duration-300">
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent group-hover:border-t-brand-600 border-r-[40px] border-r-transparent group-hover:border-r-brand-600 transition-all duration-300"></div>
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-brand-600 transition-colors">{t('Languages', locale)}</h3>
              <p className="text-slate-600">{t('Fluent communication with international teams', locale)}</p>
            </div>
          </ScaleIn>
        </div>
      </section>

      <StatsSection />

      <section className="mb-20">
        <h2 className="section-title">{t('Featured Projects (home)', locale)}</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">
          {t('From credit risk ML models to trading bots, customer analytics platforms to marketing automation systems—here are the production-grade solutions I\'ve built.', locale)}
        </p>
        <div className="grid gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-700 to-brand-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative card p-8">
              <h3 className="text-xl font-semibold mb-2">{t('Explore All Projects', locale)}</h3>
              <p className="text-slate-600 mb-6">{t('Complete collection of 9 projects with technical architecture, business impact, and detailed implementation highlights.', locale)}</p>
              <Link href="/projects" className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all">
                {t('View All', locale)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  )
}
// Removed unused ProjectsPreview component for clarity

