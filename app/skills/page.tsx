import React from "react";

const skills = [
	{
		category: "Machine Learning & Data Science",
		items: [
			{ name: "scikit-learn", level: "Expert", desc: "Classification, regression, clustering, pipelines" },
			{ name: "pandas & NumPy", level: "Expert", desc: "Data manipulation, feature engineering" },
			{ name: "XGBoost / LightGBM", level: "Advanced", desc: "Gradient boosting, hyperparameter tuning" },
			{ name: "SHAP & Explainability", level: "Advanced", desc: "Model interpretability, stakeholder communication" },
			{ name: "Optuna", level: "Advanced", desc: "Hyperparameter optimization, pruning strategies" },
			{ name: "LightFM & Implicit", level: "Intermediate", desc: "Recommendation systems, collaborative filtering" },
		],
	},
	{
		category: "Programming Languages",
		items: [
			{ name: "Python", level: "Expert", years: "5+ years" },
			{ name: "SQL", level: "Advanced", years: "4+ years" },
			{ name: "JavaScript/TypeScript", level: "Intermediate", years: "2+ years" },
			{ name: "Bash/Shell", level: "Intermediate", years: "3+ years" },
		],
	},
	{
		category: "Web Frameworks & APIs",
		items: [
			{ name: "FastAPI", level: "Advanced", desc: "High-performance REST APIs, async endpoints" },
			{ name: "Flask", level: "Advanced", desc: "Web applications, webhooks, integrations" },
			{ name: "Dash & Plotly", level: "Intermediate", desc: "Interactive dashboards, data visualization" },
			{ name: "Next.js & React", level: "Intermediate", desc: "Modern web applications, SSR" },
		],
	},
	{
		category: "Databases & Caching",
		items: [
			{ name: "PostgreSQL", level: "Advanced", desc: "Query optimization, indexing, transactions" },
			{ name: "SQLite", level: "Advanced", desc: "Embedded databases, testing" },
			{ name: "Redis", level: "Intermediate", desc: "Caching, rate limiting, pub/sub" },
		],
	},
	{
		category: "DevOps & Infrastructure",
		items: [
			{ name: "Docker", level: "Advanced", desc: "Containerization, multi-stage builds, Docker Compose" },
			{ name: "Git & GitHub", level: "Advanced", desc: "Version control, CI/CD, collaboration" },
			{ name: "Linux/Unix", level: "Advanced", desc: "Server administration, scripting, troubleshooting" },
			{ name: "Kubernetes", level: "Beginner", desc: "Container orchestration, deployments" },
		],
	},
	{
		category: "Monitoring & Testing",
		items: [
			{ name: "pytest", level: "Advanced", desc: "Unit testing, integration testing, fixtures, mocking" },
			{ name: "Prometheus & Grafana", level: "Intermediate", desc: "Metrics collection, alerting, dashboards" },
			{ name: "Evidently", level: "Intermediate", desc: "ML model monitoring, drift detection" },
			{ name: "MLflow", level: "Intermediate", desc: "Experiment tracking, model registry" },
		],
	},
	{
		category: "Task Queues & Messaging",
		items: [
			{ name: "Celery", level: "Advanced", desc: "Async task processing, distributed workers" },
			{ name: "RabbitMQ / Redis Queue", level: "Intermediate", desc: "Message brokers, job scheduling" },
		],
	},
	{
		category: "Third-Party Integrations",
		items: [
			{ name: "Twilio", level: "Advanced", desc: "SMS, voice, messaging APIs" },
			{ name: "SendGrid / Brevo", level: "Advanced", desc: "Email delivery, campaigns, webhooks" },
			{ name: "Stripe", level: "Beginner", desc: "Payment processing, subscriptions" },
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
