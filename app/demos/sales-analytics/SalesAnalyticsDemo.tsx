'use client'

import { useMemo, useState } from 'react'

export default function SalesAnalyticsDemo() {
  const [tab, setTab] = useState<'scoring' | 'pipeline' | 'analytics'>('scoring')
  const [form, setForm] = useState({
    name: 'New Customer',
    income: 55000,
    debt_to_income: 0.35,
    credit_history: 4,
    delinquency_12m: 0,
    requested: 8000,
  })
  const [result, setResult] = useState<null | {
    prob: number
    risk: 'LOW' | 'MEDIUM' | 'HIGH'
    decision: 'APPROVE' | 'REVIEW' | 'REJECT'
    contributions: Record<string, number>
  }>(null)

  const kpis = [
    { label: 'Forecast MAPE', value: '8.9%', sub: '30-day horizon' },
    { label: 'Revenue YoY', value: '+12.4%', sub: 'Trailing 12 months' },
    { label: 'Pipeline Coverage', value: '3.2x', sub: 'Next quarter' },
    { label: 'Win Rate', value: '26%', sub: 'Last 90 days' },
  ]

  const kpiTrends = [
    [10.2, 9.8, 9.4, 9.1, 8.9],
    [9.1, 10.4, 11.3, 12.0, 12.4],
    [2.7, 2.9, 3.1, 3.0, 3.2],
    [23, 24, 25, 26, 26],
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

  const sampleCustomers = [
    { id: 'C-1001', name: 'Alice Johnson', income: 72000, debt_to_income: 0.28, credit_history: 8, delinquency_12m: 0, requested: 12000 },
    { id: 'C-1002', name: 'Bob Martinez', income: 38000, debt_to_income: 0.52, credit_history: 2, delinquency_12m: 1, requested: 6000 },
    { id: 'C-1003', name: 'Chen Wei', income: 95000, debt_to_income: 0.19, credit_history: 15, delinquency_12m: 0, requested: 18000 },
  ]

  function sigmoid(z: number) {
    return 1 / (1 + Math.exp(-z))
  }

  function scoreCustomer(c: {income: number; debt_to_income: number; credit_history: number; delinquency_12m: number; requested: number}) {
    // Interpretable linear model → logistic (predicts default probability)
    const contrib_dti = 2.8 * (c.debt_to_income - 0.3)
    const contrib_hist = -0.1 * (c.credit_history - 5)
    const contrib_delin = 0.7 * c.delinquency_12m
    const contrib_income = -0.000008 * (c.income - 50000)
    const contrib_amount = 0.000012 * c.requested
    const base = -0.4
    const z = base + contrib_dti + contrib_hist + contrib_delin + contrib_income + contrib_amount
    const prob = Math.min(0.99, Math.max(0.01, sigmoid(z)))

    const risk: 'LOW' | 'MEDIUM' | 'HIGH' = prob < 0.2 ? 'LOW' : prob < 0.5 ? 'MEDIUM' : 'HIGH'
    const decision: 'APPROVE' | 'REVIEW' | 'REJECT' =
      prob < 0.2 && c.debt_to_income < 0.35 ? 'APPROVE' : prob < 0.5 && c.debt_to_income < 0.5 ? 'REVIEW' : 'REJECT'

    return {
      prob,
      risk,
      decision,
      contributions: {
        'Debt-to-Income': contrib_dti,
        'Credit history (yrs)': contrib_hist,
        'Delinquency (12m)': contrib_delin,
        'Income': contrib_income,
        'Requested amount': contrib_amount,
      },
    }
  }

  const portfolioScores = useMemo(() => {
    const base = [0.08,0.14,0.19,0.24,0.29,0.35,0.41,0.48,0.55,0.63,0.74]
    return result ? [...base, result.prob] : base
  }, [result])

  const topDrivers = useMemo(() => {
    if (!result) return [] as { key: string; value: number; width: number }[]
    const arr = Object.entries(result.contributions)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
      .slice(0, 4)
    const maxAbs = Math.max(...arr.map(([, v]) => Math.abs(v))) || 1
    return arr.map(([k, v]) => ({ key: k, value: v, width: Math.round((Math.abs(v) / maxAbs) * 100) }))
  }, [result])

  function pickSample(c: typeof sampleCustomers[number]) {
    setForm({
      name: c.name,
      income: c.income,
      debt_to_income: c.debt_to_income,
      credit_history: c.credit_history,
      delinquency_12m: c.delinquency_12m,
      requested: c.requested,
    })
    setResult(null)
  }

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
              <div className="mt-3">
                <ChartSparkline series={kpiTrends[idx]} color="#2563eb" width={160} height={40} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['scoring','pipeline','analytics'] as const).map(t => (
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

        {/* Scoring - MAIN FEATURE */}
        {tab === 'scoring' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Scoring form */}
            <div className="bg-white col-span-2 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Customer Credit Scoring</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600">Name</label>
                    <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Income ($)</label>
                      <input type="number" value={form.income} onChange={e=>setForm({...form, income: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Requested ($)</label>
                      <input type="number" value={form.requested} onChange={e=>setForm({...form, requested: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">DTI (%)</label>
                      <input type="number" value={Math.round(form.debt_to_income*100)} onChange={e=>setForm({...form, debt_to_income: Number(e.target.value)/100})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Credit history (yrs)</label>
                      <input type="number" value={form.credit_history} onChange={e=>setForm({...form, credit_history: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Delinquency (12m)</label>
                      <select value={form.delinquency_12m} onChange={e=>setForm({...form, delinquency_12m: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-brand-700">
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={()=> setResult(scoreCustomer(form))}
                    className="px-6 py-3 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-black uppercase text-sm shadow-xl hover:shadow-2xl transition-all"
                  >
                    Score customer
                  </button>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Or pick a sample (prefills form)</div>
                    <div className="space-y-2">
                      {sampleCustomers.map(c => (
                        <button key={c.id} onClick={()=>pickSample(c)} className="w-full text-left p-3 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-200 hover:border-brand-700 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="font-black text-slate-900">{c.name} <span className="text-xs text-slate-600">({c.id})</span></div>
                            <div className="text-xs font-semibold text-slate-600">Income ${c.income.toLocaleString()} • DTI {(c.debt_to_income*100).toFixed(0)}%</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-slate-600 uppercase">Default probability</div>
                      {result && (
                        <span className={`px-2 py-1 font-black text-xs uppercase ${
                          result.risk==='LOW'? 'bg-green-100 text-green-800'
                          : result.risk==='MEDIUM'? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                        }`}>{result.risk}</span>
                      )}
                    </div>
                    {result ? (
                      <div>
                        <div className="flex items-end justify-between mb-3">
                          <div className="text-xs text-slate-600 uppercase font-bold">Probability</div>
                          <div className="text-4xl font-black text-slate-900">{(result.prob*100).toFixed(1)}%</div>
                        </div>
                        <div className="mb-4">
                          <RadialGauge prob={result.prob} size={140} color="#2563eb" />
                        </div>
                        <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-3 rounded-full ${result.risk==='LOW'?'bg-green-500':result.risk==='MEDIUM'?'bg-amber-500':'bg-red-500'}`}
                            style={{ width: `${Math.round(result.prob*100)}%` }}
                          />
                        </div>
                        <div className="mt-3 text-sm text-slate-700 font-bold">Decision: <span className="text-slate-900">{result.decision}</span></div>
                      </div>
                    ) : (
                      <div className="text-slate-600 font-semibold">Enter values and click &quot;Score customer&quot;.</div>
                    )}
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Expected loss (LGD 40%)</div>
                    <div className="text-slate-900 font-black text-3xl">{result ? `$${Math.round(result.prob * form.requested * 0.4).toLocaleString()}` : '—'}</div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-3">Top risk drivers</div>
                    {result ? (
                      <div className="space-y-3">
                        {topDrivers.map(d => (
                          <div key={d.key}>
                            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                              <span>{d.key}</span>
                              <span className={`${d.value>=0?'text-red-600':'text-green-600'} font-black`}>{d.value>=0?'+':''}{d.value.toFixed(2)}</span>
                            </div>
                            <div className="h-3 bg-white border border-blue-200 rounded overflow-hidden">
                              <div className={`h-full ${d.value>=0?'bg-red-400':'bg-green-400'}`} style={{ width: `${d.width}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-slate-600 font-semibold">No score yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Explainability panel */}
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="text-xs font-bold uppercase text-slate-600 mb-3">Model explainability</div>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-center justify-center">
                {result ? (
                  <div className="w-full px-4">
                    {Object.entries(result.contributions).map(([k,v])=>{
                      const pct = Math.min(100, Math.round(Math.abs(v)*35))
                      return (
                        <div key={k} className="mb-3">
                          <div className="text-xs font-bold text-slate-700 mb-1">{k}</div>
                          <div className="h-3 bg-white border border-blue-200">
                            <div className={`h-3 ${v>=0?'bg-red-300':'bg-green-300'}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-slate-500 font-semibold text-sm">SHAP summary placeholder</div>
                )}
              </div>
              <div className="mt-4 text-xs text-slate-600 font-semibold">
                Top drivers: DTI, Credit history, Delinquency 12m, Income
              </div>
              <div className="mt-6">
                <div className="text-xs font-bold uppercase text-slate-600 mb-2">Decision thresholds</div>
                <ThresholdStrip prob={result?.prob ?? null} />
                <div className="text-[10px] text-slate-500 font-semibold mt-1">Green: &lt;20% (Approve), Amber: 20–50% (Review), Red: ≥50% (Reject)</div>
              </div>
            </div>
          </div>
        )}

        {/* Pipeline */}
        {tab === 'pipeline' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Sales Pipeline Overview</h3>
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

        {/* Analytics */}
        {tab === 'analytics' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Revenue & Performance</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-600 mb-3">Revenue trend</h4>
                  <LineChart series={[2.1, 2.3, 2.5, 2.4, 2.6, 2.8, 2.9, 3.0, 3.1, 3.3, 3.4, 3.6]} color="#2563eb" width={640} height={180} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-slate-600 mb-3">Win rate by segment</h4>
                  <BarChart labels={['Enterprise','Mid-market','SMB']} values={[32, 26, 18]} color="#2563eb" />
                </div>
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
      </div>
    </div>
  )
}

function ThresholdStrip({ prob }: { prob: number | null }) {
  return (
    <div className="w-full">
      <div className="h-4 w-full bg-slate-100 rounded relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full" style={{ width: '20%', background: '#86efac' }} />
        <div className="absolute left-[20%] top-0 h-full" style={{ width: '30%', background: '#fde047' }} />
        <div className="absolute left-[50%] top-0 h-full" style={{ width: '50%', background: '#fca5a5' }} />
        {prob != null && (
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${Math.min(99, Math.max(0, prob*100))}%` }}>
            <div className="w-[2px] h-5 bg-slate-900" />
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-600 font-bold">
        <span>0%</span><span>20%</span><span>50%</span><span>100%</span>
      </div>
    </div>
  )
}

function RadialGauge({ prob, size = 120, color = '#2563eb' }: { prob: number; size?: number; color?: string }) {
  const stroke = 12
  const r = (size - stroke) / 2
  const c = size / 2
  const circ = 2 * Math.PI * r
  const filled = Math.max(0, Math.min(1, prob))
  const offset = circ * (1 - filled)
  return (
    <svg width={size} height={size} className="block mx-auto">
      <circle cx={c} cy={c} r={r} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle
        cx={c}
        cy={c}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${c} ${c})`}
      />
    </svg>
  )
}

function MiniHistogramWithMarker({ data, bins = 12, marker }: { data: number[]; bins?: number; marker: number | null }) {
  const counts = new Array(bins).fill(0)
  data.forEach((p) => {
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(p * bins)))
    counts[idx] += 1
  })
  const maxCount = counts.reduce((m, v) => Math.max(m, v), 1)
  return (
    <div className="relative h-20 w-full flex items-end gap-1 border-2 border-blue-200 p-2 bg-white">
      {counts.map((c, i) => (
        <div key={i} className="flex-1 flex items-end">
          <div className="w-full rounded-t" style={{ height: `${Math.round((c / maxCount) * 100)}%`, background: '#93c5fd' }} />
        </div>
      ))}
      {marker != null && (
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${Math.min(99, Math.max(0, marker * 100))}%` }}
        >
          <div className="w-[2px] h-full bg-blue-700" />
        </div>
      )}
    </div>
  )
}

function LineChart({ series, color = '#2563eb', width = 640, height = 180 }: { series: number[]; color?: string; width?: number; height?: number }) {
  const W = width
  const H = height
  const P = 12
  const min = Math.min(...series)
  const max = Math.max(...series)
  const nx = (i: number) => (i / (series.length - 1)) * (W - 2 * P) + P
  const ny = (v: number) => (H - P) - ((v - min) / (max - min || 1)) * (H - 2 * P)
  const linePoints = series.map((v, i) => `${nx(i)},${ny(v)}`).join(' ')
  const areaPoints = `${P},${H - P} ${linePoints} ${W - P},${H - P}`
  return (
    <svg width={W} height={H} className="border-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50">
      <polyline points={areaPoints} fill={color} fillOpacity={0.1} stroke="none" />
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth={3} />
    </svg>
  )
}

function BarChart({ labels, values, color = '#2563eb' }: { labels: string[]; values: number[]; color?: string }) {
  const maxVal = Math.max(...values) * 1.1
  return (
    <div className="space-y-3">
      {labels.map((lbl, i) => (
        <div key={lbl}>
          <div className="flex items-center justify-between mb-1">
            <div className="text-xs font-bold text-slate-700">{lbl}</div>
            <div className="text-sm font-black text-slate-900">{values[i]}%</div>
          </div>
          <div className="h-4 bg-white border-2 border-blue-200">
            <div className="h-full" style={{ width: `${(values[i] / maxVal) * 100}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function ChartSparkline({ series, color = '#2563eb', width = 240, height = 64 }: { series: number[]; color?: string; width?: number; height?: number }) {
  const w = width
  const h = height
  const min = Math.min(...series)
  const max = Math.max(...series)
  const norm = (v: number) => (h - 8) - ((v - min) / (max - min || 1)) * (h - 16)
  const points = series.map((v, i) => `${(i / (series.length - 1)) * (w - 16) + 8},${norm(v)}`).join(' ')
  return (
    <svg width={w} height={h} className="border-2 border-blue-200 bg-white">
      <polyline fill="none" stroke={color} strokeWidth={2} points={points} />
    </svg>
  )
}
