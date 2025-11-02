import React from "react";

const skills = [
	{
		category: "Machine Learning Models",
		items: [
			{ name: "XGBoost", level: "Expert", desc: "Production gradient boosting for classification, regression" },
			{ name: "Neural Networks", level: "Advanced", desc: "Deep learning with TensorFlow/Keras" },
			{ name: "Logistic Regression", level: "Advanced", desc: "Binary classification, interpretable models" },
			{ name: "RandomForest", level: "Advanced", desc: "Ensemble methods, feature importance" },
			{ name: "Data Mining", level: "Advanced", desc: "Pattern discovery, feature extraction" },
			{ name: "Candlestick Patterns", level: "Advanced", desc: "Technical analysis, forex/stock trading signals" },
			{ name: "GPT Signals", level: "Intermediate", desc: "LLM-based sentiment & signal analysis" },
		],
	},
	{
		category: "Trading & Finance",
		items: [
			{ name: "Reinforcement Learning Trading Bot", level: "Advanced", desc: "PPO, DQN algorithms for portfolio optimization" },
			{ name: "Forex Bot (MT5)", level: "Advanced", desc: "Automated trading with MetaTrader 5" },
			{ name: "Backtesting", level: "Advanced", desc: "Walk-forward validation, performance analysis" },
			{ name: "Quantitative Analysis", level: "Intermediate", desc: "Risk metrics, Sharpe ratio, drawdown analysis" },
		],
	},
	{
		category: "Data Science & Engineering",
		items: [
			{ name: "pandas & NumPy", level: "Expert", desc: "Data manipulation, feature engineering, aggregations" },
			{ name: "ETL Pipelines", level: "Advanced", desc: "Data ingestion, transformation, validation" },
			{ name: "SHAP & Explainability", level: "Advanced", desc: "Model interpretability for stakeholders" },
			{ name: "Optuna", level: "Advanced", desc: "Hyperparameter optimization at scale" },
		],
	},
	{
		category: "Programming Languages",
		items: [
			{ name: "Python", level: "Expert", years: "2+ years" },
			{ name: "SQL", level: "Advanced", years: "2+ years" },
			{ name: "JavaScript/TypeScript", level: "Intermediate", years: "1+ years" },
		],
	},
	{
		category: "Web Frameworks & APIs",
		items: [
			{ name: "FastAPI", level: "Advanced", desc: "Production REST APIs, async endpoints, 50K+ requests/day" },
			{ name: "Flask", level: "Advanced", desc: "Web applications, webhooks, integrations" },
			{ name: "Dash & Plotly", level: "Advanced", desc: "Interactive dashboards, real-time visualizations" },
			{ name: "Streamlit", level: "Intermediate", desc: "Rapid prototyping, ML demos" },
		],
	},
	{
		category: "Databases & Caching",
		items: [
			{ name: "PostgreSQL", level: "Advanced", desc: "Query optimization, indexing, transactions" },
			{ name: "SQLite", level: "Advanced", desc: "Embedded databases, rapid development" },
			{ name: "Redis", level: "Advanced", desc: "Caching, rate limiting, pub/sub, 1-day+ TTL" },
		],
	},
	{
		category: "DevOps & Infrastructure",
		items: [
			{ name: "Docker", level: "Advanced", desc: "Containerization, production deployments" },
			{ name: "Kubernetes", level: "Intermediate", desc: "Container orchestration, scaling" },
			{ name: "Git & GitHub", level: "Advanced", desc: "Version control, CI/CD workflows" },
			{ name: "AWS/Linux", level: "Intermediate", desc: "Cloud deployment, server management" },
		],
	},
	{
		category: "Monitoring & Testing",
		items: [
			{ name: "pytest", level: "Advanced", desc: "Unit & integration testing, 95% coverage" },
			{ name: "Prometheus & Grafana", level: "Advanced", desc: "Metrics, alerting, dashboards" },
			{ name: "Evidently", level: "Intermediate", desc: "ML monitoring, drift detection" },
			{ name: "MLflow", level: "Intermediate", desc: "Experiment tracking, model registry" },
		],
	},
	{
		category: "Task Queues & Async",
		items: [
			{ name: "Celery", level: "Advanced", desc: "Async workers, 20K+ events/day processing" },
			{ name: "Redis Queue", level: "Advanced", desc: "Job scheduling, rate limiting" },
		],
	},
	{
		category: "Third-Party Integrations",
		items: [
			{ name: "Twilio", level: "Advanced", desc: "SMS, messaging, webhooks" },
			{ name: "SendGrid / Brevo", level: "Advanced", desc: "Email campaigns, delivery tracking" },
			{ name: "Alpaca API", level: "Intermediate", desc: "Automated trading execution" },
		],
	},
	{
		category: "Languages",
		items: [
			{ name: "English", level: "Expert", desc: "Fluent - professional & technical communication" },
			{ name: "French", level: "Advanced", desc: "Fluent" },
			{ name: "Polish", level: "Expert", desc: "Native speaker" },
			{ name: "Spanish", level: "Advanced", desc: "Fluent" },
		],
	},
];

const levelColors: Record<string, string> = {
	Expert: "bg-brand-600 text-white",
	Advanced: "bg-brand-500 text-white",
	Intermediate: "bg-brand-300 text-brand-900",
	Beginner: "bg-brand-100 text-brand-900 border border-brand-300",
};

export default function SkillsPage() {
	return (
		<main className="container py-16">
			<h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
				<span className="gradient-text">Skills</span>
			</h1>
			<div className="grid md:grid-cols-2 gap-10">
				{skills.map((cat) => (
					<section key={cat.category} className="mb-8">
						<h2 className="section-title mb-4">{cat.category}</h2>
						<ul className="space-y-4">
							{cat.items.map((item) => (
								<li key={item.name} className="card-accent p-4 flex flex-col gap-2">
									<div className="flex items-center gap-3 flex-wrap">
										<span className={`badge ${levelColors[item.level] || levelColors.Beginner} font-semibold`}>{item.name}</span>
										<span className="text-xs font-medium text-brand-700">{item.level}</span>
										{'years' in item && item.years && (
											<span className="text-xs text-brand-400 ml-2">{item.years}</span>
										)}
									</div>
									{'desc' in item && item.desc && (
										<span className="text-sm text-brand-900 opacity-80 pl-1">{item.desc}</span>
									)}
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
