'use client'

import Link from 'next/link'
import projectsData from '@/data/projects.json'

const projects = Array.isArray(projectsData) ? projectsData : []

export default function Projects() {
  return (
    <>
      <nav className="border-b border-slate-200 sticky top-0 bg-white">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">Wojciech</Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/projects" className="text-blue-600">Projects</Link>
            <Link href="/skills" className="hover:text-blue-600">Skills</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-slate-600 mb-12">8 Production-Grade Systems</p>

        <div className="space-y-6">
          {projects.map((project: any) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <div className="card group cursor-pointer">
                <div className="flex justify-between items-start gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 mb-2">{project.title}</h3>
                    <p className="text-slate-600">{project.summary}</p>
                  </div>
                  <span className="text-blue-600 font-semibold whitespace-nowrap">View →</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                  {project.tech.slice(0, 4).map((t: string) => (
                    <span key={t} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
