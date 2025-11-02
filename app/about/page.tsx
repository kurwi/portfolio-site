export default function AboutPage() {
  const experience = [
    {
      title: 'Profile',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: [
        '2 years Python programming experience',
        'Polish nationality, based in Alicante, Spain',
        'Fluent in English, French, Polish, Spanish',
        '9 production ML/data/trading systems built',
        'Passionate about end-to-end solutions and team collaboration'
      ]
    },
    {
      title: 'Technical Expertise',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: [
        'ML Models: XGBoost, Neural Networks, RandomForest, LogisticRegression',
        'Data Systems: Pandas, SQL, ETL pipelines, real-time processing',
        'Trading: Reinforcement Learning bots, Forex with MT5, Candlestick analysis',
        'Backend: FastAPI, Flask, async workers, Celery, Redis',
        'Dashboards: Dash, Plotly, Streamlit, real-time analytics'
      ]
    },
    {
      title: 'Approach',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      items: [
        'Business-focused: translate technical solutions to measurable ROI',
        'Team-oriented: collaborative, adaptable, focused on knowledge sharing',
        'Quality-first: testing, documentation, clean architecture from day one',
        'Verification: provide work samples and detailed case studies, not vague claims',
        'Continuous improvement: data-driven decisions, A/B testing, metrics tracking'
      ]
    }
  ]

  return (
    <main className="container py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
        <span className="gradient-text">About Me</span>
      </h1>
      <p className="text-lg text-slate-600 mb-12 max-w-3xl">
        I&apos;m <span className="font-semibold">Wojciech Staniszewski</span>, a Python programmer with 2 years of experience building machine learning and data systems. Based in Alicante, Spain, I specialize in end-to-end solutions from data pipelines to production APIs, trading systems, and interactive dashboards. I thrive in collaborative team environments and believe in clear communication, measurable impact, and continuous learning.
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
                  <span className="text-brand-600 mt-1 flex-shrink-0">•</span>
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
