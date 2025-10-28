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
      <div className="flex items-center justify-between mb-6">
        <Link href="/projects" className="text-brand-600 hover:text-brand-700">← Back</Link>
        {project.demoId && (
          <Link 
            href={`/demos?demo=${project.demoId}`}
            className="px-6 py-3 rounded-sm bg-gradient-to-r from-brand-700 to-brand-800 text-white font-semibold hover:shadow-2xl hover:shadow-brand-700/40 hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-brand-900"
          >
            Try Live Demo
          </Link>
        )}
      </div>
      <h1 className="text-3xl font-bold tracking-tight mt-2">{project.title}</h1>
      <p className="mt-3 text-lg text-slate-600 max-w-3xl">{project.summary}</p>

      {project.description && (
        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-slate-700 leading-relaxed">{project.description}</p>
        </div>
      )}

      <section className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          {project.examples && project.examples.length > 0 && (
            <div>
              <h2 className="section-title">Real-world examples</h2>
              <div className="space-y-3">
                {project.examples.map((ex: string, idx: number) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded">
                    <p className="text-sm text-slate-700 font-mono">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.demo && (
            <div>
              <h2 className="section-title">Running project</h2>
              <div className="p-4 bg-gradient-to-br from-brand-50 to-slate-50 rounded-lg border border-brand-200">
                <p className="text-slate-700 leading-relaxed">{project.demo}</p>
              </div>
            </div>
          )}

          {project.impact && project.impact.length > 0 && (
            <div>
              <h2 className="section-title">Business impact</h2>
              <ul className="space-y-2">
                {project.impact.map((i: string) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-600 mt-1">✓</span>
                    <span className="text-slate-700">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h2 className="section-title">Technical highlights</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                {project.highlights.map((i: string) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          )}

          {project.architecture && (
            <div>
              <h2 className="section-title">Architecture</h2>
              <div className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-sm leading-relaxed">
                {project.architecture}
              </div>
            </div>
          )}
        </div>
        <aside>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Tech stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{t}</span>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {project.links?.map((l: { label: string; href: string }) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-brand-600 hover:text-brand-700 block">{l.label} ↗</a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
