'use client'

import Link from 'next/link'

const skills = [
  {
    category: 'Machine Learning',
    items: ['XGBoost', 'Neural Networks', 'LogisticRegression', 'RandomForest', 'SHAP', 'Optuna']
  },
  {
    category: 'Data Engineering',
    items: ['pandas', 'NumPy', 'ETL Pipelines', 'PostgreSQL', 'Redis', 'Kafka']
  },
  {
    category: 'Web & APIs',
    items: ['FastAPI', 'Flask', 'Dash', 'Plotly', 'Streamlit', 'Next.js']
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS', 'CI/CD']
  },
  {
    category: 'Testing',
    items: ['pytest', 'Mock', 'Coverage', 'Integration Tests', 'TDD']
  },
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'TypeScript', 'JavaScript']
  }
]

export default function Skills() {
  return (
    <>
      <nav className="border-b border-slate-200 sticky top-0 bg-white">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg">Wojciech</Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/projects" className="hover:text-blue-600">Projects</Link>
            <Link href="/skills" className="text-blue-600">Skills</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="container py-12">
        <h1 className="text-4xl font-bold mb-2">Technical Skills</h1>
        <p className="text-slate-600 mb-12">Production-grade expertise across ML, data, and infrastructure</p>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((category) => (
            <div key={category.category} className="card">
              <h2 className="font-bold text-lg mb-4">{category.category}</h2>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span key={skill} className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
