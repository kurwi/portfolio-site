'use client'

import projects from '@/data/projects.json'
import Link from 'next/link'

export default function ProjectsPage() {
  return (
    <main className="container py-16 pb-32">
      {/* Page Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent leading-tight pb-2">
          Projects
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          Production-ready ML systems spanning credit risk, sales forecasting, customer analytics, and marketing automation. Each project showcases end-to-end engineering: data pipelines, model training, deployment, monitoring, and business impact measurement.
        </p>
      </section>

      {/* Projects List - Rectangle Cards */}
      <section className="grid md:grid-cols-2 gap-6">
        {(projects as any[]).map((project) => (
          <Link 
            key={project.slug} 
            href={`/projects/${project.slug}`}
            className="block group"
          >
            <div className="p-6 bg-white border border-slate-200 hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                  {project.title}
                </h3>
                <svg className="w-6 h-6 text-brand-700 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </div>
              
              <p className="text-slate-600 mb-4">{project.summary}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.slice(0, 6).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold bg-brand-100 text-brand-700 border border-brand-200"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600">
                    +{project.tech.length - 6} more
                  </span>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                {project.impact.slice(0, 2).map((item: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-brand-700 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
