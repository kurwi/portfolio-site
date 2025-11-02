'use client'

import { useState } from 'react'

export default function MarketingAutomationDemo() {
  const [tab, setTab] = useState<'builder' | 'segments' | 'analytics' | 'reports'>('builder')

  const segments = [
    { name: 'High-value churned', size: 3240, rules: 'LTV > $500 AND last_purchase > 90d AND opened_last_2 = true' },
    { name: 'Engaged subscribers', size: 15040, rules: 'opened_last_3 = true OR clicked_last = true' },
    { name: 'Trial low-usage', size: 2840, rules: 'trial AND sessions_7d < 10' },
  ]

  const campaigns = [
    { name: 'Product Launch', status: 'Active', sends: 200000, open: 24, click: 8, revenue: 340000 },
    { name: 'Win-back Offer', status: 'Paused', sends: 3240, open: 31, click: 12, revenue: 72000 },
    { name: 'Abandoned Cart', status: 'Active', sends: 12000, open: 40, click: 16, revenue: 85000 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              Marketing Automation Platform
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Segmentation, Orchestration, and Real-Time Performance Analytics
            </p>
            <div className="flex gap-3">
              <span className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
                Segments
              </span>
              <span className="inline-block bg-white border-2 border-brand-700 text-brand-700 px-5 py-2 font-bold text-sm uppercase tracking-wider">
                Flows
              </span>
              <span className="inline-block bg-white border-2 border-brand-700 text-brand-700 px-5 py-2 font-bold text-sm uppercase tracking-wider">
                Multi-channel
              </span>
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Active campaigns', value: '86' },
            { label: 'Contacts', value: '200K' },
            { label: 'Deliverability', value: '99.7%' },
            { label: 'Open rate', value: '24%' },
            { label: 'Click rate', value: '8%' },
            { label: 'Revenue (Q1)', value: '$340K' },
          ].map((m, idx) => (
            <div
              key={idx}
              className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-4 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {m.label}
              </div>
              <div className="text-2xl font-black text-slate-900">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['builder','segments','analytics','reports'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all ${
                tab === t
                  ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-xl'
                  : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Builder */}
        {tab === 'builder' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Palette */}
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Blocks</h3>
              <div className="space-y-3">
                {[
                  { title: 'Send', desc: 'Email / SMS / Push' },
                  { title: 'Wait', desc: 'Delay a step' },
                  { title: 'Condition', desc: 'If / Else split' },
                  { title: 'A/B Test', desc: 'Split traffic' },
                  { title: 'Webhook', desc: 'Call external API' },
                ].map(b => (
                  <div key={b.title} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:border-brand-700 transition-all">
                    <div className="font-bold text-slate-900">{b.title}</div>
                    <div className="text-xs text-slate-600">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas placeholder */}
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                <h3 className="font-black uppercase text-slate-900">Flow Canvas</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-bold uppercase bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700">Validate</button>
                  <button className="px-4 py-2 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white">Publish</button>
                </div>
              </div>
              <div className="h-80 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">DAG builder placeholder</div>
              </div>
            </div>
          </div>
        )}

        {/* Segments */}
        {tab === 'segments' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Segments</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-blue-200 text-slate-700 bg-gradient-to-r from-slate-50 to-blue-50">
                    <th className="py-3 px-4 font-bold uppercase">Name</th>
                    <th className="py-3 px-4 font-bold uppercase">Size</th>
                    <th className="py-3 px-4 font-bold uppercase">Rule</th>
                  </tr>
                </thead>
                <tbody>
                  {segments.map(s => (
                    <tr key={s.name} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50">
                      <td className="py-3 px-4 text-slate-700 font-bold">{s.name}</td>
                      <td className="py-3 px-4 text-slate-700 font-bold">{s.size.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-700 font-mono text-xs">{s.rules}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Preview</h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Segment preview placeholder</div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {tab === 'analytics' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Performance</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Open/Click/Revenue charts</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Top Campaigns</h3>
              <div className="space-y-3">
                {campaigns.map(c => (
                  <div key={c.name} className="p-3 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="font-bold text-slate-900 mb-1">
                      {c.name} <span className="text-xs font-semibold text-slate-600">({c.status})</span>
                    </div>
                    <div className="text-xs text-slate-600 mb-2">
                      Sends {c.sends.toLocaleString()} • Open {c.open}% • Click {c.click}%
                    </div>
                    <div className="text-slate-900 font-black text-lg">${c.revenue.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {tab === 'reports' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Automated Reports</h3>
            <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
              <div className="text-slate-400 text-sm font-semibold">Report table / export placeholder</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
