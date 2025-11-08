'use client'

import projectsData from '@/data/projects.json'
import Link from 'next/link'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'

export default function ProjectsPage() {
  const { locale } = useLanguageCtx()
  
  return (
    <main className="container py-16 pb-32">
      {/* Page Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent leading-tight pb-2">
          {t('Projects title', locale as any)}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          {t('Projects description', locale as any)}
        </p>
      </section>

      {/* Projects List - Rectangle Cards */}
      <section className="space-y-4">
        {(projectsData as any[]).map((project) => (
          <Link 
            key={project.slug} 
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <div className="relative p-6 md:p-8 bg-white border-2 border-slate-200 hover:border-brand-700 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-0.5 border-l-8 border-l-slate-300 hover:border-l-brand-700">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-100 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-5">
                  {/* Left: Title and Description */}
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-brand-700 transition-colors mb-2">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed max-w-3xl">
                      {project.summary}
                    </p>
                  </div>

                  {/* Right: View Demo Button */}
                  {project.demoId && (
                    <div className="flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold uppercase text-sm tracking-wider shadow-lg hover:shadow-xl hover:from-brand-700 hover:to-brand-800 transition-all border-l-4 border-brand-900 whitespace-nowrap">
                          {t('viewDemo', locale as any)}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-6 border-t-2 border-slate-100">
                  {project.tech.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 hover:bg-brand-100 hover:text-brand-700 transition-all cursor-default border border-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Impact/Highlights */}
                {project.impact && project.impact.length > 0 && (
                  <div className="mt-5 pt-5 border-t-2 border-slate-100 flex flex-wrap gap-3">
                    {project.impact.slice(0, 2).map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 flex-1 min-w-fit">
                        <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-slate-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

