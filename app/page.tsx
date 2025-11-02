'use client'

import Link from 'next/link'
import { StatsSection } from '@/app/components/StatsSection'
import { ContactSection } from '@/app/components/ContactSection'
import { FadeIn, SlideIn, ScaleIn } from '@/app/components/Animations'

export default function HomePage() {
  return (
    <main className="container py-16">
      <section className="mb-20">
        <div className="max-w-3xl">
          <FadeIn duration={1000}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-brand-700 text-brand-800 text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-brand-700 rounded-full animate-pulse"></span>
              Available for new opportunities
            </div>
          </FadeIn>
          <SlideIn direction="left" duration={1100} delay={150}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Hi, I&apos;m <span className="gradient-text">Wojciech Staniszewski</span>
            </h1>
          </SlideIn>
          <FadeIn duration={1000} delay={300}>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
              Python developer with 2+ years of experience creating production-grade ML and data systems. I build end-to-end solutions from data pipelines and trading algorithms to scalable APIs and interactive dashboards, focusing on measurable business impact and clean, maintainable code.
            </p>
          </FadeIn>
          <FadeIn delay={500} duration={1000}>
            <div className="flex gap-4">
              <Link href="/projects" className="px-6 py-3 bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold hover:shadow-2xl hover:shadow-brand-700/40 hover:-translate-y-1 transition-all duration-300 border-l-4 border-brand-900">
                View Projects
              </Link>
              <Link href="/contact" className="px-6 py-3 border-2 border-brand-700 text-brand-800 font-semibold hover:bg-brand-700 hover:text-white transition-all duration-300">
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mb-20">
        <SlideIn direction="left">
          <h2 className="section-title">My Expertise</h2>
        </SlideIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScaleIn delay={0}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Machine Learning</h3>
              <p className="text-slate-600">XGBoost, Neural Networks, LogisticRegression, RandomForest, Data Mining, Candlestick Patterns, GPT Signals</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={50}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Data Engineering</h3>
              <p className="text-slate-600">Pipelines, ETL, Pandas, PostgreSQL, Redis, real-time processing, data validation frameworks</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={100}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Trading & Finance</h3>
              <p className="text-slate-600">Reinforcement Learning trading bots, Forex strategies with MT5, quantitative analysis, backtesting</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={150}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Backend & APIs</h3>
              <p className="text-slate-600">FastAPI, Flask, async workers, scalable architecture, Docker, Kubernetes, monitoring</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={200}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Dashboards & Visualization</h3>
              <p className="text-slate-600">Dash, Plotly, Streamlit, real-time analytics, interactive reports, executive dashboards</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={250}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900">Languages</h3>
              <p className="text-slate-600">English, French, Polish, Spanish - fluent communication with international teams</p>
            </div>
          </ScaleIn>
        </div>
      </section>

      <StatsSection />

      <section className="mb-20">
        <h2 className="section-title">9 Production Systems</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">
          From credit risk ML models to trading bots, customer analytics platforms to marketing automation systems—here are the production-grade solutions I&apos;ve built.
        </p>
        <div className="grid gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-700 to-brand-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative card p-8">
              <h3 className="text-xl font-semibold mb-2">Explore All Projects</h3>
              <p className="text-slate-600 mb-6">Complete collection of 9 projects with technical architecture, business impact, and detailed implementation highlights.</p>
              <Link href="/projects" className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all">
                View Projects
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