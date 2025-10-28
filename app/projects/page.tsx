import Link from 'next/link'
import projects from '@/data/projects.json'

export default function ProjectsPage() {
  return (
    <main className="container py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-lg text-slate-600">
          A collection of production-grade systems showcasing end-to-end ML pipelines, 
          real-time analytics, and scalable data infrastructure.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map(p => (
          <Link key={p.slug} href={`/projects/${p.slug}`} className="card-accent p-6 block group relative overflow-hidden hover:scale-[1.01] transition-all">
            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors relative z-10">{p.title}</h2>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed relative z-10">{p.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
              {p.tech.slice(0, 5).map((t: string) => (
                <span key={t} className="badge bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold">{t}</span>
              ))}
              {p.tech.length > 5 && (
                <span className="badge bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold">+{p.tech.length - 5} more</span>
              )}
            </div>
            <div className="text-brand-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all relative z-10">
              View details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
