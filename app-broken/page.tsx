'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <>
      <nav className="border-b border-slate-200 sticky top-0 bg-white">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">Wojciech</Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/projects" className="hover:text-blue-600">Projects</Link>
            <Link href="/skills" className="hover:text-blue-600">Skills</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className="py-20">
          <h1 className="text-5xl font-bold mb-4">Wojciech Staniszewski</h1>
          <p className="text-xl text-slate-600 mb-8">Data & AI Engineer crafting production-grade systems</p>
          <div className="flex gap-4">
            <Link href="/projects" className="btn-primary">View My Work</Link>
            <Link href="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </section>

        <section className="section">
          <h2 className="heading">Core Expertise</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="font-bold mb-2">Machine Learning</h3>
              <p className="text-sm text-slate-600">XGBoost, Neural Networks, LogisticRegression, RandomForest</p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Data Engineering</h3>
              <p className="text-sm text-slate-600">Pipelines, ETL, Pandas, PostgreSQL, Redis, real-time processing</p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Trading & Finance</h3>
              <p className="text-sm text-slate-600">RL Trading bots, Forex MT5, backtesting, quantitative analysis</p>
            </div>
          </div>
        </section>

        <section className="section pb-20">
          <h2 className="heading">Quick Stats</h2>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div><div className="text-3xl font-bold text-blue-600">8+</div><div className="text-sm text-slate-600">Projects</div></div>
            <div><div className="text-3xl font-bold text-blue-600">215+</div><div className="text-sm text-slate-600">Tests</div></div>
            <div><div className="text-3xl font-bold text-blue-600">85%</div><div className="text-sm text-slate-600">Coverage</div></div>
            <div><div className="text-3xl font-bold text-blue-600">5</div><div className="text-sm text-slate-600">Languages</div></div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 mt-20">
        <div className="container py-8 text-center text-sm text-slate-600">
          <p>© 2025 Wojciech Staniszewski. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
