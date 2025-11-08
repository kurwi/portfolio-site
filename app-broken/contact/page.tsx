'use client'

import Link from 'next/link'

export default function Contact() {
  return (
    <>
      <nav className="border-b border-slate-200 sticky top-0 bg-white">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">Wojciech</Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/projects" className="hover:text-blue-600">Projects</Link>
            <Link href="/skills" className="hover:text-blue-600">Skills</Link>
            <Link href="/contact" className="text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
        <p className="text-slate-600 mb-12">Open to new opportunities and collaborations</p>

        <div className="max-w-2xl space-y-6">
          <div className="card">
            <h3 className="font-bold mb-2">Email</h3>
            <p className="text-slate-600">Contact me at your discretion</p>
          </div>

          <div className="card">
            <h3 className="font-bold mb-2">GitHub</h3>
            <p className="text-slate-600">View code and projects on GitHub</p>
          </div>

          <div className="card">
            <h3 className="font-bold mb-2">LinkedIn</h3>
            <p className="text-slate-600">Connect on LinkedIn for professional inquiries</p>
          </div>
        </div>
      </main>
    </>
  )
}
