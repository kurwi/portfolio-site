'use client'

import { useState, useMemo } from 'react'

export default function MarketingAutomationDemo() {
  const [tab, setTab] = useState<'builder' | 'segments' | 'analytics' | 'reports'>('builder')
  const [flowSteps, setFlowSteps] = useState([
    { id: 1, type: 'trigger', label: 'Trigger: User Signs Up', color: 'bg-green-500' },
    { id: 2, type: 'send', label: 'Send Welcome Email', color: 'bg-blue-500' },
    { id: 3, type: 'wait', label: 'Wait 24 Hours', color: 'bg-yellow-500' },
    { id: 4, type: 'condition', label: 'Did they open?', color: 'bg-purple-500' },
  ])
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const segments = [
    { name: 'High-value churned', size: 3240, rules: 'LTV > $500 AND last_purchase > 90d AND opened_last_2 = true', growth: '+12%' },
    { name: 'Engaged subscribers', size: 15040, rules: 'opened_last_3 = true OR clicked_last = true', growth: '+34%' },
    { name: 'Trial low-usage', size: 2840, rules: 'trial AND sessions_7d < 10', growth: '-8%' },
  ]

  const campaigns = [
    { name: 'Product Launch', status: 'Active', sends: 200000, open: 24, click: 8, revenue: 340000, trend: '+18%' },
    { name: 'Win-back Offer', status: 'Paused', sends: 3240, open: 31, click: 12, revenue: 72000, trend: '+22%' },
    { name: 'Abandoned Cart', status: 'Active', sends: 12000, open: 40, click: 16, revenue: 85000, trend: '+5%' },
  ]

  const performanceData = useMemo(() => {
    return [
      { day: 'Mon', open: 22, click: 7, conversion: 3 },
      { day: 'Tue', open: 24, click: 8, conversion: 3.5 },
      { day: 'Wed', open: 26, click: 9, conversion: 4 },
      { day: 'Thu', open: 25, click: 8.5, conversion: 3.8 },
      { day: 'Fri', open: 28, click: 10, conversion: 4.5 },
      { day: 'Sat', open: 20, click: 6, conversion: 2.5 },
      { day: 'Sun', open: 24, click: 8, conversion: 3.2 },
    ]
  }, [])

  const channelMetrics = [
    { channel: 'Email', contacts: 85000, opens: 24, clicks: 8, revenue: 180000 },
    { channel: 'SMS', contacts: 42000, opens: 18, clicks: 12, revenue: 95000 },
    { channel: 'Push', contacts: 73000, opens: 15, clicks: 5, revenue: 65000 },
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
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Blocks</h3>
              <div className="space-y-3">
                {[
                  { title: 'Send', desc: 'Email / SMS / Push' },
                  { title: 'Wait', desc: 'Delay a step' },
                  { title: 'Condition', desc: 'If / Else split' },
                  { title: 'A/B Test', desc: 'Split traffic' },
                  { title: 'Webhook', desc: 'Call external API' },
                ].map(b => (
                  <div key={b.title} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:border-brand-700 hover:shadow-lg transition-all cursor-move">
                    <div>
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-600">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas with flow */}
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                <h3 className="font-black uppercase text-slate-900">Flow Canvas</h3>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-bold uppercase bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700">Validate</button>
                  <button className="px-4 py-2 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-lg">Publish</button>
                </div>
              </div>
              <div className="h-80 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {flowSteps.map((step, idx) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div
                        onMouseEnter={() => setHoveredStep(step.id)}
                        onMouseLeave={() => setHoveredStep(null)}
                        className={`flex-1 p-4 rounded-lg ${step.color} text-white font-bold shadow-lg hover:shadow-xl transition-all ${
                          hoveredStep === step.id ? 'scale-105' : ''
                        }`}
                      >
                        {step.label}
                      </div>
                      {idx < flowSteps.length - 1 && (
                        <div className="text-center">
                          <div className="text-2xl text-slate-400">↓</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-6 w-full py-3 border-2 border-dashed border-blue-400 text-slate-600 font-bold hover:border-brand-700 hover:text-brand-700 transition-all">+ Add Step</button>
              </div>
            </div>
          </div>
        )}

        {/* Segments */}
        {tab === 'segments' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Active Segments</h3>
              <div className="space-y-3">
                {segments.map(s => (
                  <div key={s.name} className="p-4 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-black text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-600 font-mono mt-1">{s.rules}</div>
                      </div>
                      <div className={`text-sm font-black ${s.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {s.growth}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-2xl font-black text-slate-900">{s.size.toLocaleString()}</div>
                      <div className="text-xs text-slate-600 font-semibold">contacts</div>
                    </div>
                    <div className="mt-3 h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-brand-700" style={{ width: `${(s.size / 15040) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Segment Distribution</h3>
              <div className="space-y-4">
                {segments.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-600">{s.name}</div>
                      <div className="mt-1 h-3 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${(s.size / 21120) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{Math.round((s.size / 21120) * 100)}%</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 rounded-lg">
                <div className="text-xs font-bold text-slate-600 mb-1">Total Contacts</div>
                <div className="text-3xl font-black text-slate-900">21.1K</div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics */}
        {tab === 'analytics' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Performance Trend</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 p-6 flex items-end gap-3">
                {performanceData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex gap-1 items-end justify-center h-56">
                      <div className="flex-1 bg-blue-400 rounded-t" style={{ height: `${(d.open / 30) * 100}%` }}></div>
                      <div className="flex-1 bg-green-400 rounded-t" style={{ height: `${(d.click / 12) * 100}%` }}></div>
                      <div className="flex-1 bg-purple-400 rounded-t" style={{ height: `${(d.conversion / 5) * 100}%` }}></div>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mt-2">{d.day}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mt-4 justify-center">
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-400 rounded"></div><span className="text-sm font-semibold text-slate-600">Open Rate</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-400 rounded"></div><span className="text-sm font-semibold text-slate-600">Click Rate</span></div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 bg-purple-400 rounded"></div><span className="text-sm font-semibold text-slate-600">Conversion</span></div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Channel Performance</h3>
              <div className="space-y-4">
                {channelMetrics.map(c => (
                  <div key={c.channel} className="p-4 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="font-black text-slate-900 mb-2">{c.channel}</div>
                    <div className="text-xs text-slate-600 space-y-1 font-semibold">
                      <div>Contacts: {c.contacts.toLocaleString()}</div>
                      <div>Open: {c.opens}% • Click: {c.clicks}%</div>
                      <div className="text-slate-900 font-black text-lg mt-2">${c.revenue.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-600 p-3 bg-blue-50 border border-blue-200 rounded">
                Email drives {Math.round((180000 / (180000 + 95000 + 65000)) * 100)}% of revenue
              </div>
            </div>
          </div>
        )}

        {/* Reports */}
        {tab === 'reports' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Campaign Performance Report</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b-2 border-blue-200 text-slate-700 bg-gradient-to-r from-slate-50 to-blue-50">
                    <th className="py-3 px-4 font-bold uppercase">Campaign</th>
                    <th className="py-3 px-4 font-bold uppercase">Status</th>
                    <th className="py-3 px-4 font-bold uppercase">Sends</th>
                    <th className="py-3 px-4 font-bold uppercase">Open %</th>
                    <th className="py-3 px-4 font-bold uppercase">Click %</th>
                    <th className="py-3 px-4 font-bold uppercase">Revenue</th>
                    <th className="py-3 px-4 font-bold uppercase">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr key={c.name} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 transition-all">
                      <td className="py-3 px-4 text-slate-900 font-bold">{c.name}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 text-xs font-black uppercase ${
                          c.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-bold">{c.sends.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-700 font-bold">{c.open}%</td>
                      <td className="py-3 px-4 text-slate-700 font-bold">{c.click}%</td>
                      <td className="py-3 px-4 text-slate-900 font-black">${c.revenue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-green-600 font-bold">{c.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                <div className="text-xs font-bold text-slate-600 mb-1">Total Revenue</div>
                <div className="text-3xl font-black text-slate-900">$497K</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                <div className="text-xs font-bold text-slate-600 mb-1">Avg Open Rate</div>
                <div className="text-3xl font-black text-slate-900">31.7%</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                <div className="text-xs font-bold text-slate-600 mb-1">Total Sends</div>
                <div className="text-3xl font-black text-slate-900">215.2K</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

