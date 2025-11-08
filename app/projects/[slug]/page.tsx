'use client'

import projectsEN from '@/data/projects.json'
import projectsES from '@/data/projects.es.json'
import Link from 'next/link'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'

type Project = {
  slug: string
  title: string
  summary: string
  description?: string
  examples?: string[]
  architecture?: string
  demo?: string
  demoId?: string
  tech: string[]
  impact: string[]
  highlights?: string[]
  links?: { label: string; href: string }[]
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const { locale } = useLanguageCtx()
  
  const projects = locale === 'es' ? projectsES : projectsEN
  const project = (projects as Project[]).find(p => p.slug === params.slug)
  
  if (!project) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-bold">{locale === 'es' ? t('Project not found', 'es') : t('Project not found', 'en')}</h1>
        <Link href="/projects" className="text-brand-600 hover:text-brand-700">{locale === 'es' ? t('Back to projects', 'es') : t('Back to projects', 'en')}</Link>
      </main>
    )
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Back Button - Floating */}
      <div className="fixed top-24 left-4 md:left-8 z-50">
        <Link 
          href="/projects"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-sm border-2 border-slate-200 text-slate-700 hover:text-brand-700 hover:border-brand-500 hover:bg-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          {t('Back', locale as any)}
        </Link>
      </div>

      <div className="container py-12 md:py-16">
        {/* Hero Section - Sharp & Angular */}
        <section className="relative mb-12 overflow-hidden bg-gradient-to-br from-blue-600 via-brand-700 to-indigo-700 p-8 md:p-12 shadow-2xl border-l-8 border-white/30">
          {/* Decorative angular elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 -translate-y-1/2 translate-x-1/2 transform rotate-45"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/20 translate-y-1/2 -translate-x-1/2 transform rotate-12"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-400 animate-pulse"></span>
                    {t('Production Project', locale as any)}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-blue-50 leading-relaxed max-w-3xl mb-8">
                  {project.summary}
                </p>
                
                {/* Tech Stack Pills - Angular */}
                {project.tech?.length ? (
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.slice(0, 6).map(tech => (
                      <span key={tech} className="px-4 py-2 bg-white/15 backdrop-blur-md border-2 border-white/20 text-white font-semibold text-sm hover:bg-white/25 transition-colors clip-corner">
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 6 && (
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white font-bold text-sm">
                        +{project.tech.length - 6} {t('more', locale as any)}
                      </span>
                    )}
                  </div>
                ) : null}
              </div>
              
              {/* CTA Button - Sharp */}
              <div className="lg:self-center">
                {project.demoId && (
                  <Link 
                    href={`/demos?demo=${project.demoId}`}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-brand-700 font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 border-l-4 border-brand-700"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                    {t('viewDemo', locale as any)}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

      {/* KPI metrics for Credit Risk */}
      {project.slug === 'credit-risk-prediction-platform' && (
        <section className="mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-600">
              <div className="text-xs uppercase tracking-widest text-brand-600 font-bold mb-2">{t('AUC-ROC', locale as any)}</div>
              <div className="text-4xl font-black bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">0.89</div>
            </div>
            <div className="group p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-600">
              <div className="text-xs uppercase tracking-widest text-brand-600 font-bold mb-2">{t('Precision', locale as any)}</div>
              <div className="text-4xl font-black bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">0.76</div>
            </div>
            <div className="group p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-brand-600">
              <div className="text-xs uppercase tracking-widest text-brand-600 font-bold mb-2">{t('Recall', locale as any)}</div>
              <div className="text-4xl font-black bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent">0.81</div>
            </div>
            <div className="group p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-emerald-600">
              <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-2">{t('Loss Reduction', locale as any)}</div>
              <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">-18%</div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {project.description && (
            <div className="group p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-brand-600">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-brand-500 to-blue-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('Overview', locale as any)}</h2>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed text-lg">{project.description}</p>
            </div>
          )}

          {project.examples && project.examples.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="examples" className="text-2xl font-bold text-slate-900">{t('realWorldExamples', locale as any)}</h2>
              </div>
              <div className="grid gap-4">
                {project.examples.map((ex: string, idx: number) => (
                  <div key={idx} className="group p-5 bg-gradient-to-br from-slate-50 to-blue-50/50 border-l-4 border-brand-500 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-brand-600 text-white font-bold flex items-center justify-center text-sm mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-800 leading-relaxed flex-1">{ex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.demo && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="running" className="text-2xl font-bold text-slate-900">{t('runningProject', locale as any)}</h2>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-600 shadow-lg">
                <p className="text-slate-800 leading-relaxed">{project.demo}</p>
              </div>
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-green-500 to-emerald-600">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="impact" className="text-2xl font-bold text-slate-900">{t('businessImpact', locale as any)}</h2>
              </div>
              <div className="grid gap-4">
                {project.impact.map((i: string, idx: number) => (
                  <div key={i} className="group p-5 bg-white border-l-4 border-green-600 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-800 leading-relaxed flex-1 pt-0.5">{i}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <h2 id="highlights" className="text-2xl font-bold text-slate-900">{t('technicalHighlights', locale as any)}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {project.highlights.map((i: string, idx: number) => (
                  <div key={i} className="group p-5 bg-gradient-to-br from-white to-amber-50/30 border-l-4 border-amber-600 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-bold flex items-center justify-center text-xs">
                        ★
                      </span>
                      <p className="text-slate-700 leading-relaxed flex-1">{i}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.architecture && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-gradient-to-br from-slate-700 to-slate-900">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="architecture" className="text-2xl font-bold text-slate-900">{t('architecture', locale as any)}</h2>
              </div>
              <div className="overflow-hidden border-l-4 border-slate-700 shadow-xl">
                <pre className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-mono text-sm leading-relaxed whitespace-pre-wrap overflow-x-auto">{project.architecture}</pre>
              </div>
            </div>
          )}
        </div>
        <aside className="lg:sticky lg:top-28 h-fit space-y-6">
          {/* Table of Contents */}
          <div className="p-6 border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-brand-500 to-blue-600">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">{t('onThisPage', locale as any)}</h3>
            </div>
            <nav className="space-y-2">
              <a href="#examples" className="group flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition-all">
                <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-brand-600 transition-colors"></span>
                {t('realWorldExamples', locale as any)}
              </a>
              <a href="#running" className="group flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition-all">
                <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-brand-600 transition-colors"></span>
                {t('runningProject', locale as any)}
              </a>
              <a href="#impact" className="group flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition-all">
                <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-brand-600 transition-colors"></span>
                {t('businessImpact', locale as any)}
              </a>
              <a href="#highlights" className="group flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition-all">
                <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-brand-600 transition-colors"></span>
                {t('technicalHighlights', locale as any)}
              </a>
              <a href="#architecture" className="group flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-700 hover:bg-brand-50 transition-all">
                <span className="w-1.5 h-1.5 bg-slate-400 group-hover:bg-brand-600 transition-colors"></span>
                {t('architecture', locale as any)}
              </a>
            </nav>
          </div>

          {/* Tech Stack Card */}
          <div className="p-6 border-2 border-slate-200 bg-white shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900">{t('techStack', locale as any)}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-brand-100 hover:to-blue-100 text-xs font-semibold text-slate-700 hover:text-brand-700 transition-all cursor-default border border-slate-200 hover:border-brand-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Resources */}
            {project.links && project.links.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-slate-100 space-y-3">
                  <p className="text-xs font-bold uppercase text-slate-600 tracking-widest mb-3">{t('Resources', locale as any)}</p>
                {project.links.map((l: { label: string; href: string }) => (
                  <a 
                    key={l.href} 
                    href={l.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="group flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-brand-700 hover:to-brand-800 text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 border-l-4 border-brand-500"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="flex-1">{l.label}</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
      </div>
    </main>
  )
}
