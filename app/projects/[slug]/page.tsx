import projects from '@/data/projects.json'
import Link from 'next/link'

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
  const project = (projects as Project[]).find(p => p.slug === params.slug)
  if (!project) {
    return (
      <main className="container py-10">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Link href="/projects" className="text-brand-600 hover:text-brand-700">Back to projects</Link>
      </main>
    )
  }
  return (
    <main className="container py-10">
      {/* Fixed back-to-projects rectangular button */}
      <div className="fixed top-24 left-4 z-10">
        <Link 
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-brand-700 hover:text-brand-900 hover:border-brand-700 font-medium transition-colors shadow-sm"
        >
          Back
        </Link>
      </div>

      {/* Hero */}
      <section className="relative mb-8 rounded-md border border-slate-200 bg-gradient-to-r from-brand-50 to-slate-50 p-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              <span className="gradient-text">{project.title}</span>
            </h1>
            <p className="text-lg text-slate-700 max-w-3xl">{project.summary}</p>
            {project.tech?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map(t => (
                  <span key={t} className="badge bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold">{t}</span>
                ))}
                {project.tech.length > 6 && (
                  <span className="badge bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold">+{project.tech.length - 6} more</span>
                )}
              </div>
            ) : null}
          </div>
          <div className="shrink-0">
            {project.demoId && (
              <Link 
                href={`/demos?demo=${project.demoId}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold shadow-sm hover:shadow-brand-700/30 hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-brand-900"
              >
                Try Live Demo
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* KPI metrics for Credit Risk */}
      {project.slug === 'credit-risk-prediction-platform' && (
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500">AUC-ROC</div>
              <div className="text-2xl font-bold text-slate-900">0.89</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500">Precision</div>
              <div className="text-2xl font-bold text-slate-900">0.76</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500">Recall</div>
              <div className="text-2xl font-bold text-slate-900">0.81</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-md shadow-sm">
              <div className="text-xs uppercase tracking-wider text-slate-500">Expected loss</div>
              <div className="text-2xl font-bold text-emerald-600">-18%</div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          {project.description && (
            <div className="p-5 bg-white rounded-md border border-slate-200 shadow-sm">
              <p className="text-slate-700 leading-relaxed">{project.description}</p>
            </div>
          )}

          {project.examples && project.examples.length > 0 && (
            <div>
              <h2 id="examples" className="section-title text-xl font-bold text-slate-900 mb-3">Real-world examples</h2>
              <div className="space-y-3">
                {project.examples.map((ex: string, idx: number) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded">
                    <p className="text-sm text-slate-800">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.demo && (
            <div>
              <h2 id="running" className="section-title text-xl font-bold text-slate-900 mb-3">Running project</h2>
              <div className="p-5 bg-white rounded-md border border-slate-200 shadow-sm">
                <p className="text-slate-700 leading-relaxed">{project.demo}</p>
              </div>
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div>
              <h2 id="impact" className="section-title text-xl font-bold text-slate-900 mb-3">Business impact</h2>
              <ul className="space-y-2">
                {project.impact.map((i: string) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-sm bg-brand-600 text-white text-center leading-5 text-xs mt-0.5">✓</span>
                    <span className="text-slate-800">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2 id="highlights" className="section-title text-xl font-bold text-slate-900 mb-3">Technical highlights</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {project.highlights.map((i: string) => (
                  <div key={i} className="p-3 border border-slate-200 bg-white rounded">
                    <p className="text-slate-700 text-sm leading-relaxed">{i}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.architecture && (
            <div>
              <h2 id="architecture" className="section-title text-xl font-bold text-slate-900 mb-3">Architecture</h2>
              <pre className="p-4 bg-slate-900 text-slate-100 rounded-md font-mono text-sm leading-relaxed whitespace-pre-wrap">{project.architecture}</pre>
            </div>
          )}
        </div>
        <aside className="md:sticky md:top-28 h-fit space-y-4">
          <div className="p-4 rounded-md border border-slate-200 bg-white shadow-sm">
            <h3 className="font-semibold mb-2">On this page</h3>
            <nav className="text-sm text-slate-700 space-y-1">
              <a href="#examples" className="block hover:text-brand-700">Real-world examples</a>
              <a href="#running" className="block hover:text-brand-700">Running project</a>
              <a href="#impact" className="block hover:text-brand-700">Business impact</a>
              <a href="#highlights" className="block hover:text-brand-700">Technical highlights</a>
              <a href="#architecture" className="block hover:text-brand-700">Architecture</a>
            </nav>
          </div>
          <div className="p-4 rounded-md border border-slate-200 bg-white shadow-sm">
            <h3 className="font-semibold mb-2">Tech stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{t}</span>
              ))}
            </div>
            {project.links && project.links.length > 0 && (
              <div className="mt-4 space-y-2">
                {project.links.map((l: { label: string; href: string }) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700 block">{l.label} ↗</a>
                ))}
              </div>
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}
