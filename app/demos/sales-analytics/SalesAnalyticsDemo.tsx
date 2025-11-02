'use client'

import { useState } from 'react'

export default function SalesAnalyticsDemo() {
  const [tab, setTab] = useState<'overview' | 'forecast' | 'pipeline' | 'cohorts'>('overview')

  const kpis = [
    { label: 'Forecast MAPE', value: '8.9%', sub: '30-day horizon' },
    { label: 'Revenue YoY', value: '+12.4%', sub: 'Trailing 12 months' },
    { label: 'Pipeline Coverage', value: '3.2x', sub: 'Next quarter' },
    { label: 'Win Rate', value: '26%', sub: 'Last 90 days' },
  ]

  const pipeline = [
    { stage: 'Prospecting', count: 184, value: 920000 },
    { stage: 'Qualified', count: 132, value: 1450000 },
    { stage: 'Proposal', count: 74, value: 1180000 },
    { stage: 'Negotiation', count: 32, value: 640000 },
    { stage: 'Closed Won', count: 46, value: 790000 },
  ]

  const segments = [
    { name: 'Enterprise', mrr: 420000, churn: 1.1, growth: 6.4 },
    { name: 'Mid-market', mrr: 280000, churn: 1.9, growth: 4.1 },
    { name: 'SMB', mrr: 160000, churn: 2.7, growth: 3.2 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h2a1 1 0 011 1v11h2V8a1 1 0 011-1h2a1 1 0 011 1v6h2V5a1 1 0 011-1h2a1 1 0 011 1v12H3V3z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              Sales Analytics Platform
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Enterprise-grade analytics with ML forecasting, churn prediction, and pipeline insights.
            </p>
            <div className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
              Forecasting • Churn • Cohorts
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {kpis.map((k, idx) => (
            <div key={idx} className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 shadow-xl">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{k.label}</div>
              <div className="text-3xl font-black text-slate-900 mb-1">{k.value}</div>
              <div className="text-sm font-semibold text-slate-600">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['overview','forecast','pipeline','cohorts'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all ${
                tab === t ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-xl' : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Revenue & Forecast</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-semibold">Revenue and forecast chart</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Segments</h3>
              <div className="space-y-3">
                {segments.map((s, i) => (
                  <div key={i} className="p-3 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="font-black text-slate-900">{s.name}</div>
                    <div className="text-sm text-slate-700 font-semibold">MRR ${s.mrr.toLocaleString()} • Churn {s.churn}% • Growth {s.growth}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Forecast */}
        {tab === 'forecast' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">30/60/90 Day Forecast</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-semibold">Forecast time series charts</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Model Performance</h3>
              <ul className="text-sm text-slate-700 font-semibold space-y-2">
                <li>MAPE: 8.9%</li>
                <li>SMAPE: 6.1%</li>
                <li>WAPE: 7.4%</li>
                <li>Coverage: 95%</li>
              </ul>
            </div>
          </div>
        )}

        {/* Pipeline */}
        {tab === 'pipeline' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Pipeline Overview</h3>
            <div className="grid grid-cols-5 gap-4">
              {pipeline.map((p, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                  <div className="text-xs font-bold uppercase text-slate-500 mb-1">{p.stage}</div>
                  <div className="text-lg font-black text-slate-900">{p.count} deals</div>
                  <div className="text-sm font-semibold text-slate-700">${(p.value/1000).toFixed(0)}k value</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cohorts */}
        {tab === 'cohorts' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Cohort Retention</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-center justify-center">
                <div className="text-slate-400 text-sm font-semibold">Retention heatmap placeholder</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Insights</h3>
              <ul className="text-sm text-slate-700 font-semibold space-y-2">
                <li>Enterprise retention improved after onboarding revamp</li>
                <li>SMB churn spikes after price change—monitor</li>
                <li>Mid-market expansion opportunities in Q2</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
