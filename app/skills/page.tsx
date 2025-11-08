'use client';

import React from "react";
import { useLanguageCtx } from "@/contexts/LanguageCtx";
import { t } from "@/lib/translations";

const categoryKeys = {
	"Machine Learning Models": "skill.machinelearning",
	"Trading & Finance": "skill.trading",
	"Data Science & Engineering": "skill.datascience",
	"Programming Languages": "skill.programming",
	"Web Frameworks & APIs": "skill.web",
	"Databases & Caching": "skill.databases",
	"DevOps & Infrastructure": "skill.devops",
	"Monitoring & Testing": "skill.monitoring",
	"Task Queues & Async": "skill.queues",
	"Third-Party Integrations": "skill.integrations",
	"Languages": "skill.languages",
};

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
	Expert: "bg-blue-600 text-white",
	Advanced: "bg-blue-500 text-white",
	Intermediate: "bg-blue-400 text-white",
	Beginner: "bg-blue-300 text-white border border-blue-400",
};

const skillBadgeStyles = "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700";

export default function SkillsPage() {
	const { locale } = useLanguageCtx();
	const title = t('Technical Skills', locale);
	
	return (
		<main className="container py-12">
			<h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
				<span className="gradient-text">{title}</span>
			</h1>
			<div className="grid md:grid-cols-3 gap-6">
				{skills.map((cat) => (
					<section key={cat.category} className="mb-6">
						<h2 className="text-sm font-bold text-blue-700 mb-3 uppercase">{t(categoryKeys[cat.category as keyof typeof categoryKeys], locale)}</h2>
						<ul className="space-y-2">
							{cat.items.map((item) => (
								<li key={item.name} className="bg-gradient-to-br from-blue-50 to-brand-50 border-l-4 border-blue-600 p-2 flex flex-col gap-1 rounded text-xs shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200">
									<div className="flex items-center gap-2 flex-wrap">
										<span className={`${skillBadgeStyles} font-semibold rounded px-2 py-0.5 text-xs`}>{t(item.name, locale)}</span>
										<span className="text-xs font-medium text-blue-600">{t(item.level, locale)}</span>
										{'years' in item && item.years && (
											<span className="text-xs text-blue-500">{t(item.years, locale)}</span>
										)}
									</div>
									{'desc' in item && item.desc && (
										<span className="text-xs text-blue-900 opacity-70">{t(`${item.name}.desc`, locale)}</span>
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
