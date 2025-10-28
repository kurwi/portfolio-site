'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
// Dynamically import CreditRiskDemo as a client component
const CreditRiskDemo = dynamic(() => import('../components/CreditRiskDemo/index'), { ssr: false })
import { useSearchParams } from 'next/navigation'
import ABTestCalculator from '@/components/ABTestCalculator'
import AnomalyDetector from '@/components/AnomalyDetector'
import NlpDemo from '@/components/NlpDemo'
import projects from '@/data/projects.json'

type DemoId = 'credit-risk' | 'nlp-platform' | 'customer-behavior' | 'sales-analytics' | 'ab-test' | 'anomaly' | 'nlp' | 'trading-bot' | null

// Filter projects that have demos
const demoProjects = projects.filter(p => p.demoId)

export default function HomePage() {
  const searchParams = useSearchParams()
  const [selectedDemo, setSelectedDemo] = useState<DemoId>(null)

  useEffect(() => {
    const demoParam = searchParams.get('demo') as DemoId
    if (demoParam) {
      setSelectedDemo(demoParam)
    }
  }, [searchParams])


  return (
    <main className="container py-16">
      {!selectedDemo && (
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
            {demoProjects.map((project) => (
              <button
                key={project.slug}
                onClick={() => setSelectedDemo(project.demoId as DemoId)}
                className="card p-8 text-left hover:scale-[1.02] transition-transform group"
              >
                <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-brand-800 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {project.summary}
                </p>
                <div className="inline-flex items-center gap-2 text-brand-800 font-semibold group-hover:gap-3 transition-all">
                  View Demo →
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {selectedDemo && (
        <section>
          <a
            href="/projects"
            className="mb-6 inline-flex items-center gap-2 text-brand-800 font-semibold hover:underline"
          >
            ← Back to projects
          </a>

          {selectedDemo === 'credit-risk' && (
            <div className="fixed inset-0 top-0 left-0 w-screen h-screen bg-white overflow-hidden -m-16 z-50">
              <CreditRiskDemo />
            </div>
          )}

          {selectedDemo === 'nlp-platform' && (
            <div className="w-full max-w-full -mx-8 lg:-mx-16">
              <h2 className="text-3xl font-bold mb-4" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>NLP Sentiment Analysis Platform</h2>
              <p className="text-slate-600 mb-6 text-lg" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>
                Advanced sentiment analysis with aspect mining and entity extraction.
              </p>
              <div className="w-screen bg-white overflow-hidden" style={{height: '200vh', minHeight: '2000px', marginLeft: '-16rem'}}>
                <iframe
                  src="http://localhost:8575"
                  className="w-full h-full"
                  loading="lazy"
                  title="NLP Platform"
                />
              </div>
              <div className="text-sm text-slate-500 mt-12 text-center px-8 lg:px-16">
                If blank, <a className="text-brand-800 font-semibold underline hover:text-brand-900" href="http://localhost:8575" target="_blank" rel="noreferrer">open directly in new tab</a>
              </div>
            </div>
          )}

          {selectedDemo === 'customer-behavior' && (
            <div className="w-full max-w-full -mx-8 lg:-mx-16">
              <h2 className="text-3xl font-bold mb-4" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>Customer Behavior Automation</h2>
              <p className="text-slate-600 mb-6 text-lg" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>
                Predictive analytics for customer segmentation and churn prevention.
              </p>
              <div className="w-screen bg-white overflow-hidden" style={{height: '200vh', minHeight: '2000px', marginLeft: '-16rem'}}>
                <iframe
                  src="http://localhost:8581"
                  className="w-full h-full"
                  loading="lazy"
                  title="Customer Behavior App"
                />
              </div>
              <div className="text-sm text-slate-500 mt-12 text-center px-8 lg:px-16">
                If blank, <a className="text-brand-800 font-semibold underline hover:text-brand-900" href="http://localhost:8581" target="_blank" rel="noreferrer">open directly in new tab</a>
              </div>
            </div>
          )}

          {selectedDemo === 'sales-analytics' && (
            <div className="w-full max-w-full -mx-8 lg:-mx-16">
              <h2 className="text-3xl font-bold mb-4" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>Sales Analytics Platform</h2>
              <p className="text-slate-600 mb-6 text-lg" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>
                Comprehensive sales forecasting and performance analytics dashboard.
              </p>
              <div className="w-screen bg-white overflow-hidden" style={{height: '200vh', minHeight: '2000px', marginLeft: '-16rem'}}>
                <iframe
                  src="http://localhost:8582"
                  className="w-full h-full"
                  loading="lazy"
                  title="Sales Analytics App"
                />
              </div>
              <div className="text-sm text-slate-500 mt-12 text-center px-8 lg:px-16">
                If blank, <a className="text-brand-800 font-semibold underline hover:text-brand-900" href="http://localhost:8582" target="_blank" rel="noreferrer">open directly in new tab</a>
              </div>
            </div>
          )}

          {selectedDemo === 'trading-bot' && (
            <div className="w-full max-w-full -mx-8 lg:-mx-16">
              <h2 className="text-3xl font-bold mb-4" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>Reinforcement Learning Trading Bot Demo</h2>
              <p className="text-slate-600 mb-6 text-lg" style={{marginLeft: '-16rem', paddingLeft: '18rem'}}>
                Interactive dashboard for the RL trading bot. (Demo placeholder: connect your backend or notebook here.)
              </p>
              <div className="w-screen bg-white overflow-hidden" style={{height: '80vh', minHeight: '600px', marginLeft: '-16rem'}}>
                {/* Example: <iframe src="http://localhost:8590" className="w-full h-full" loading="lazy" title="Trading Bot Demo" /> */}
                <div className="flex items-center justify-center h-full text-slate-400 text-xl">Trading Bot demo coming soon…</div>
              </div>
            </div>
          )}

          {selectedDemo === 'ab-test' && (
            <div>
              <h2 className="section-title">A/B Test Significance Calculator</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Statistical analysis tool for conversion rate experiments.
              </p>
              <div className="card p-8 bg-white max-w-4xl">
                <ABTestCalculator />
              </div>
            </div>
          )}

          {selectedDemo === 'anomaly' && (
            <div>
              <h2 className="section-title">Time-series Anomaly Detector</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Interactive visualization with adjustable detection threshold.
              </p>
              <div className="card p-8 bg-white max-w-4xl">
                <AnomalyDetector />
              </div>
            </div>
          )}

          {selectedDemo === 'nlp' && (
            <div>
              <h2 className="section-title">NLP Micro‑API Demo</h2>
              <p className="text-slate-600 mb-6 text-lg">
                Real-time sentiment analysis and text summarization.
              </p>
              <div className="card p-8 bg-white max-w-4xl">
                <NlpDemo />
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  )
}
// Removed unused ProjectsPreview component for clarity
