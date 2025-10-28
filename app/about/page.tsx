export default function AboutPage() {
  const experience = [
    {
      title: 'Key Achievements',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      items: [
        'Built 8+ production-grade data & ML systems from scratch',
        'Reduced costs by 40% through optimization and rate limiting strategies',
        'Improved prediction accuracy from 76% to 89% AUC via feature engineering',
        'Increased marketing ROI by 28% with attribution modeling and segmentation',
        'Delivered sub-100ms API latency for real-time ML inference at scale'
      ]
    },
    {
      title: 'What I Do Best',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: [
        'End-to-end ML pipelines: data collection → feature engineering → model training → deployment → monitoring',
        'Production APIs: FastAPI/Flask with async workers, caching, error handling, monitoring',
        'Data engineering: ETL pipelines, data validation, quality checks, schema management',
        'Real-time systems: event-driven architecture, Celery workers, Redis queuing',
        'Business impact: translate technical solutions into measurable ROI and KPIs'
      ]
    },
    {
      title: 'Work Approach',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      items: [
        'Start with business goals, then choose appropriate technical solutions',
        'Write tests first (TDD) for reliable, maintainable code',
        'Document clearly: README, API docs, architecture diagrams, runbooks',
        'Monitor everything: logs, metrics, alerts, dashboards',
        'Iterate based on data: A/B tests, experiments, feedback loops'
      ]
    }
  ]

  return (
    <main className="container py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        <span className="gradient-text">About Me</span>
      </h1>
      <p className="text-lg text-slate-600 mb-12 max-w-3xl">
        Data engineer and ML practitioner building production-ready systems that drive measurable business impact.
      </p>
      
      {/* Experience Sections */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {experience.map((section) => (
          <div
            key={section.title}
            className="relative overflow-hidden group hover:scale-[1.02] transition-all rounded-md border border-slate-200 border-l-4 border-l-brand-600 bg-white p-6"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-700/10 to-blue-400/5 transform translate-x-12 -translate-y-12"></div>
            <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center mb-4 shadow-lg shadow-brand-700/30 text-white relative z-10">
              {section.icon}
            </div>
            <h2 className="text-xl font-bold mb-4 text-slate-900 relative z-10">{section.title}</h2>
            <ul className="space-y-3 relative z-10">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-brand-600 mt-1 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}
