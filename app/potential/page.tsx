'use client'

import { useEffect, useState } from 'react'
import { FadeIn, SlideIn } from '@/app/components/Animations'

interface PortfolioData {
  experience: Record<string, number>
  technicalExpertise: Record<string, string[]>
  specializations: Array<{ area: string; expertise: string; proficiency: number }>
  achievements: Array<{ title: string; description: string; impact: string }>
  services: Array<{ name: string; description: string; timeline: string; priceRange: string }>
  qualityMetrics: Record<string, number>
  languages: string[]
  credentials: string[]
  availability: Record<string, string | number>
  nextSteps: string[]
}

export default function PotentialPage() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/potential')
        if (!response.ok) throw new Error('Failed to fetch potential data')
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="container py-16 text-center">
        <p className="text-xl text-slate-600">Loading portfolio data...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container py-16 text-center">
        <p className="text-xl text-red-600">{error}</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="container py-16 text-center">
        <p className="text-xl text-slate-600">No data available</p>
      </main>
    )
  }

  return (
    <main className="container py-16 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            See My <span className="gradient-text">Potential</span>
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive overview of skills, expertise, and proven track record
          </p>
        </FadeIn>
      </section>

      {/* Experience Overview */}
      <section>
        <h2 className="section-title">Experience Overview</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {Object.entries(data.experience).map(([key, value], index) => (
            <FadeIn key={key} delay={index * 100}>
              <div className="card p-6 text-center">
                <div className="text-4xl font-bold text-brand-700 mb-2">
                  {typeof value === 'number' && value > 10 ? `${value}` : value}
                  {key.includes('Rate') ? '%' : key.includes('Years') ? '+' : ''}
                </div>
                <p className="text-slate-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Specializations */}
      <section>
        <h2 className="section-title">Areas of Expertise</h2>
        <div className="space-y-4">
          {data.specializations.map((spec, index) => (
            <FadeIn key={spec.area} delay={index * 100}>
              <div className="card p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{spec.area}</h3>
                    <p className="text-slate-600 mt-1">{spec.expertise}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-brand-700">{spec.proficiency}%</div>
                    <p className="text-xs text-slate-500">Proficiency</p>
                  </div>
                </div>
                <div className="w-full bg-slate-200 h-2">
                  <div
                    className="bg-gradient-to-r from-brand-600 to-brand-700 h-full transition-all duration-1000"
                    style={{ width: `${spec.proficiency}%` }}
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Quality Metrics */}
      <section>
        <h2 className="section-title">Quality Metrics</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {Object.entries(data.qualityMetrics).map(([key, value], index) => (
            <FadeIn key={key} delay={index * 80}>
              <div className="card p-4 text-center">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-200" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - value / 100)}`}
                      className="text-brand-600 transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-brand-700">{value}%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Key Achievements */}
      <section>
        <h2 className="section-title">Key Achievements</h2>
        <div className="space-y-4">
          {data.achievements.map((achievement, index) => (
            <FadeIn key={achievement.title} delay={index * 100}>
              <div className="card p-6 border-l-4 border-brand-600">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{achievement.title}</h3>
                    <p className="text-slate-600">{achievement.description}</p>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <p className="text-sm font-semibold text-brand-700">{achievement.impact}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services & Pricing */}
      <section>
        <h2 className="section-title">Services & Investment</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services.map((service, index) => (
            <FadeIn key={service.name} delay={index * 100}>
              <div className="card p-6 flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-slate-600 mb-4 flex-1">{service.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Timeline:</span>
                    <span className="font-semibold text-slate-900">{service.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investment:</span>
                    <span className="font-semibold text-brand-700">{service.priceRange}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Technical Stack */}
      <section>
        <h2 className="section-title">Technical Stack</h2>
        <div className="space-y-6">
          {Object.entries(data.technicalExpertise).map(([category, items], index) => (
            <FadeIn key={category} delay={index * 100}>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Credentials & Languages */}
      <section className="grid md:grid-cols-2 gap-8">
        <FadeIn>
          <div>
            <h2 className="section-title">Certifications</h2>
            <ul className="space-y-2">
              {data.credentials.map((cred, index) => (
                <li key={cred} className="flex items-start gap-3">
                  <span className="text-brand-600 mt-1">•</span>
                  <span className="text-slate-700">{cred}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div>
            <h2 className="section-title">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((lang) => (
                <span key={lang} className="px-4 py-2 border border-brand-300 text-brand-700 font-medium">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Availability & Next Steps */}
      <section className="grid md:grid-cols-2 gap-8">
        <FadeIn>
          <div className="card p-8 bg-gradient-to-br from-brand-50 to-blue-50">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Availability</h3>
            <div className="space-y-3">
              {Object.entries(data.availability).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="font-semibold text-slate-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="card p-8 bg-gradient-to-br from-brand-600 to-brand-700">
            <h3 className="text-lg font-semibold text-white mb-4">Next Steps</h3>
            <ol className="space-y-3">
              {data.nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-white">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6 py-12">
        <FadeIn>
          <h2 className="text-3xl font-bold text-slate-900">Ready to work together?</h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-lg text-slate-600">Let&apos;s discuss how I can help your project succeed</p>
        </FadeIn>
        <FadeIn delay={400}>
          <div className="flex gap-4 justify-center">
            <a href="/contact" className="px-8 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold hover:shadow-xl transition-all">
              Get in Touch
            </a>
            <a href="/api/potential" target="_blank" className="px-8 py-3 border-2 border-brand-600 text-brand-700 font-semibold hover:bg-brand-50 transition-all">
              View JSON API
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}