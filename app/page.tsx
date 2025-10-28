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
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              I build reliable, production-grade data and AI systems end-to-end: from clean data pipelines and
              robust model training to APIs, dashboards, and cloud deployments. I focus on business impact and
              developer experience.
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
          <h2 className="section-title">Why work with me</h2>
        </SlideIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScaleIn delay={0}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-4 shadow-lg shadow-brand-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Strong Engineering Fundamentals</h3>
              <p className="text-slate-600 dark:text-slate-400">Testing, CI/CD, type safety, performance optimization, and maintainable code architecture</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={50}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">End-to-End Ownership</h3>
              <p className="text-slate-600 dark:text-slate-400">From data pipelines and model training to APIs, dashboards, and cloud deployments</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={100}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Business Impact Focus</h3>
              <p className="text-slate-600 dark:text-slate-400">Measurable ROI, clear documentation, and solutions that drive real business value</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={150}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Modern Tooling</h3>
              <p className="text-slate-600 dark:text-slate-400">Practical, maintainable solutions using industry-standard tools and best practices</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={200}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Fast Delivery</h3>
              <p className="text-slate-600 dark:text-slate-400">Rapid prototyping, iterative development, and efficient time-to-market without sacrificing quality</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={250}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Clear Documentation</h3>
              <p className="text-slate-600 dark:text-slate-400">Comprehensive docs, clean code comments, and knowledge transfer for long-term maintainability</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={300}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Data-Driven Decisions</h3>
              <p className="text-slate-600 dark:text-slate-400">A/B testing, metrics tracking, and continuous improvement based on real performance data</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={350}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Scalable Architecture</h3>
              <p className="text-slate-600 dark:text-slate-400">Systems designed to grow with your business, handling increased load and complexity gracefully</p>
            </div>
          </ScaleIn>
          <ScaleIn delay={400}>
            <div className="card p-6 group h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Collaborative Approach</h3>
              <p className="text-slate-600 dark:text-slate-400">Effective communication with stakeholders, adapting to team workflows, and knowledge sharing</p>
            </div>
          </ScaleIn>
        </div>
      </section>

      <StatsSection />

      <section className="mb-20">
        <h2 className="section-title">Featured Projects</h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">
          A selection of production-grade systems I&apos;ve built, from data pipelines to machine learning models and web applications.
        </p>
        <div className="grid gap-8">
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-700 to-brand-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative card p-8">
              <h3 className="text-xl font-semibold mb-2">View All Projects</h3>
              <p className="text-slate-600 mb-6">Explore the complete collection of 8+ production systems with technical deep-dives.</p>
              <Link href="/projects" className="inline-flex items-center gap-2 text-brand-700 font-semibold hover:gap-3 transition-all">
                View Projects →
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