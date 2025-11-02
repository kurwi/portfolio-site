import Link from 'next/link'

const articles = [
  {
    slug: 'cost-sensitive-classification',
    title: 'Cost-Sensitive Classification for Credit Risk',
    summary: 'How we optimized loan approval thresholds using a custom cost matrix, reducing expected loss by 18% vs. default 0.5 threshold.',
    date: '2024-12-15',
    tags: ['ML', 'XGBoost', 'Optuna', 'Classification'],
    readTime: '8 min'
  },
  {
    slug: 'shap-explainability',
    title: 'Production-Ready SHAP Explanations',
    summary: 'Implementing SHAP waterfall plots and force diagrams for regulatory compliance and loan officer transparency.',
    date: '2024-12-10',
    tags: ['Explainability', 'SHAP', 'Compliance'],
    readTime: '6 min'
  },
  {
    slug: 'real-time-scoring-api',
    title: 'Building a Sub-50ms ML Scoring API',
    summary: 'FastAPI + model caching + async workers: how we serve 5K+ predictions/day with p95 latency under 50ms.',
    date: '2024-12-05',
    tags: ['FastAPI', 'API Design', 'Performance'],
    readTime: '10 min'
  },
  {
    slug: 'drift-monitoring',
    title: 'Detecting Model Drift in Production',
    summary: 'Using PSI, chi-square tests, and Evidently to monitor feature distributions and trigger retraining when PSI > 0.2.',
    date: '2024-11-28',
    tags: ['MLOps', 'Monitoring', 'Evidently'],
    readTime: '7 min'
  },
  {
    slug: 'ab-testing-framework',
    title: 'A/B Testing ML Models Safely',
    summary: 'Cohort randomization, traffic splitting, and chi-square significance tests for production model validation.',
    date: '2024-11-20',
    tags: ['A/B Testing', 'MLOps', 'Statistics'],
    readTime: '9 min'
  },
  {
    slug: 'markov-attribution',
    title: 'Multi-Touch Attribution with Markov Chains',
    summary: 'Assigning fractional credit across customer journeys using Markov chains—revealed Facebook\'s 45% mid-funnel value vs. 12% last-click.',
    date: '2024-11-15',
    tags: ['Attribution', 'Marketing Analytics', 'NumPy'],
    readTime: '11 min'
  }
]

export default function TechnicalPage() {
  return (
    <main className="container py-16">
      <div className="max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Technical Deep Dives</span>
          </h1>
          <p className="text-lg text-slate-600">
            In-depth explorations of ML engineering decisions, architecture patterns, and production challenges. 
            Code snippets, benchmarks, and lessons learned from building real systems.
          </p>
        </div>

        <div className="space-y-6">
          {articles.map(article => (
            <article key={article.slug} className="card p-6 hover:shadow-lg transition-shadow border border-slate-200">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    <Link href={`/technical/${article.slug}`} className="hover:text-brand-600 transition-colors">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 leading-relaxed">{article.summary}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <time>{article.date}</time>
                <span>•</span>
                <span>{article.readTime} read</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="badge bg-slate-100 text-slate-700">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Coming soon</h3>
          <ul className="space-y-1 text-slate-700">
            <li>• Hyperparameter Tuning at Scale with Optuna</li>
            <li>• Building Recommendation Systems with LightFM</li>
            <li>• Event-Driven Architectures for Customer Automation</li>
            <li>• Time-Series Forecasting with Prophet</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
