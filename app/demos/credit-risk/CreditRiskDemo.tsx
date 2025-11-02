'use client'

import { useMemo, useState } from 'react'

export default function CreditRiskDemo() {
  const [tab, setTab] = useState<'scoring' | 'portfolio' | 'policies' | 'monitoring'>('scoring')
  const [form, setForm] = useState({
    name: 'New Applicant',
    income: 60000,
    debt_to_income: 0.32,
    credit_history: 5,
    delinquency_12m: 0,
    requested: 10000,
  })
  const [result, setResult] = useState<null | {
    prob: number
    risk: 'LOW' | 'MEDIUM' | 'HIGH'
    decision: 'AUTO-APPROVE' | 'MANUAL REVIEW' | 'REJECT'
    contributions: Record<string, number>
  }>(null)

  const kpis = [
    { label: 'AUC', value: '0.89', sub: 'Model discrimination' },
    { label: 'Precision', value: '0.76', sub: 'Positive predictive value' },
    { label: 'Recall', value: '0.81', sub: 'Sensitivity' },
    { label: 'Loss', value: '-18%', sub: 'Expected loss reduction' },
  ]

  const sampleApplicants = [
    { id: 'CR-10482', name: 'John Doe', income: 62000, debt_to_income: 0.31, credit_history: 7, delinquency_12m: 0, requested: 12000 },
    { id: 'CR-10483', name: 'Maria Smith', income: 42000, debt_to_income: 0.48, credit_history: 2, delinquency_12m: 1, requested: 8000 },
    { id: 'CR-10484', name: 'Wei Zhang', income: 98000, debt_to_income: 0.22, credit_history: 12, delinquency_12m: 0, requested: 20000 },
  ]

  function sigmoid(z: number) {
    return 1 / (1 + Math.exp(-z))
  }

  function scoreApplicant(a: {income: number; debt_to_income: number; credit_history: number; delinquency_12m: number; requested: number}) {
    // Simple interpretable linear model (simulated) → logistic
    const contrib_dti = 2.5 * (a.debt_to_income - 0.3) // + risk if DTI above 30%
    const contrib_hist = -0.08 * (a.credit_history - 5) // - risk per year above 5
    const contrib_delin = 0.6 * a.delinquency_12m // + risk if recent delinquency
    const contrib_income = -0.000006 * (a.income - 50000) // - risk as income above 50k
    const contrib_amount = 0.00001 * a.requested // + risk with requested amount
    const base = -0.3 // baseline intercept
    const z = base + contrib_dti + contrib_hist + contrib_delin + contrib_income + contrib_amount
    const prob = Math.min(0.99, Math.max(0.01, sigmoid(z)))

    const risk: 'LOW' | 'MEDIUM' | 'HIGH' = prob < 0.2 ? 'LOW' : prob < 0.5 ? 'MEDIUM' : 'HIGH'
    const decision: 'AUTO-APPROVE' | 'MANUAL REVIEW' | 'REJECT' =
      prob < 0.2 && a.debt_to_income < 0.35 ? 'AUTO-APPROVE' : prob < 0.5 && a.debt_to_income < 0.5 ? 'MANUAL REVIEW' : 'REJECT'

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

  const distributionData = useMemo(() => {
    // synthetic portfolio + current result to build a distribution
    const base = [0.06,0.12,0.18,0.22,0.27,0.33,0.38,0.45,0.52,0.61,0.72]
    const arr = result ? [...base, result.prob] : base
    const buckets = { low: 0, mid: 0, high: 0 }
    arr.forEach(p => {
      if (p < 0.2) buckets.low++
      else if (p < 0.5) buckets.mid++
      else buckets.high++
    })
    const total = arr.length
    return {
      low: Math.round((buckets.low / total) * 100),
      mid: Math.round((buckets.mid / total) * 100),
      high: Math.round((buckets.high / total) * 100),
    }
  }, [result])

  const aucSeries = [0.88, 0.89, 0.90, 0.89, 0.91, 0.90, 0.905]

  function pickSample(a: typeof sampleApplicants[number]) {
    setForm({
      name: a.name,
      income: a.income,
      debt_to_income: a.debt_to_income,
      credit_history: a.credit_history,
      delinquency_12m: a.delinquency_12m,
      requested: a.requested,
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
              <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v3H4V4z" />
              <path fillRule="evenodd" d="M18 9H2v7a2 2 0 002 2h12a2 2 0 002-2V9zM4 12h3v2H4v-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              Credit Risk Assessment Platform
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Professional ML-powered credit risk prediction with real-time scoring, portfolio monitoring, and policy simulation.
            </p>
            <div className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
              Sub-50ms Scoring API • SHAP Explainability
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
          {(['scoring','portfolio','policies','monitoring'] as const).map(t => (
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

        {/* Scoring */}
        {tab === 'scoring' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Scoring form */}
            <div className="bg-white col-span-2 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                <h3 className="font-black uppercase text-slate-900">Applicant Scoring</h3>
                <span className="text-xs font-bold text-slate-600 uppercase">Interactive</span>
              </div>
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
                    onClick={()=> setResult(scoreApplicant(form))}
                    className="px-5 py-3 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-black uppercase text-sm shadow hover:shadow-xl"
                  >
                    Score applicant
                  </button>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Or pick a sample (prefills form)</div>
                    <div className="space-y-2">
                      {sampleApplicants.map(a => (
                        <button key={a.id} onClick={()=>pickSample(a)} className="w-full text-left p-3 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 hover:shadow">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-slate-900">{a.name} <span className="text-xs text-slate-600">({a.id})</span></div>
                            <div className="text-xs font-semibold text-slate-600">Income ${a.income.toLocaleString()} • DTI {(a.debt_to_income*100).toFixed(0)}%</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Score</div>
                    {result ? (
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Default probability</div>
                          <div className="text-3xl font-black text-slate-900">{(result.prob*100).toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Risk</div>
                          <div className={`text-2xl font-black ${result.risk==='LOW'?'text-green-600':result.risk==='MEDIUM'?'text-amber-600':'text-red-600'}`}>{result.risk}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 font-bold uppercase">Decision</div>
                          <div className="text-xl font-black text-brand-700">{result.decision}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-700 font-semibold">Enter values and click &quot;Score applicant&quot;.</div>
                    )}
                  </div>

                  <div className="p-4 bg-white border-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Expected loss (LGD 40%)</div>
                    <div className="text-slate-800 font-black text-2xl">{result ? `$${Math.round(result.prob * form.requested * 0.4).toLocaleString()}` : '—'}</div>
                  </div>

                  <div className="p-4 bg-white border-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Top drivers (contributions)</div>
                    {result ? (
                      <ul className="text-sm text-slate-700 font-semibold space-y-1">
                        {Object.entries(result.contributions).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).slice(0,4).map(([k,v])=> (
                          <li key={k} className="flex items-center justify-between">
                            <span>{k}</span>
                            <span className={`${v>=0?'text-red-600':'text-green-600'} font-bold`}>{v>=0?'+':''}{v.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-slate-700">No score yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Explainability panel */}
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="text-xs font-bold uppercase text-slate-500 mb-2">Explainability</div>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-center justify-center">
                {result ? (
                  <div className="w-full px-4">
                    {/* simple horizontal bar viz */}
                    {Object.entries(result.contributions).map(([k,v])=>{
                      const pct = Math.min(100, Math.round(Math.abs(v)*40))
                      return (
                        <div key={k} className="mb-2">
                          <div className="text-xs font-semibold text-slate-600 mb-1">{k}</div>
                          <div className="h-3 bg-white border border-blue-100">
                            <div className={`h-3 ${v>=0?'bg-red-200':'bg-green-200'}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-slate-400 text-sm font-semibold">SHAP summary plot placeholder</div>
                )}
              </div>
              <div className="mt-4 text-xs text-slate-600 font-semibold">
                Top drivers: DTI, Credit history length, Delinquency 12m, Income stability
              </div>
            </div>
          </div>
        )}

        {/* Portfolio */}
        {tab === 'portfolio' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Risk Distribution</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-end justify-around p-6">
                {[{label:'Low (<20%)',v:distributionData.low,color:'bg-green-500'},{label:'Medium (20-50%)',v:distributionData.mid,color:'bg-amber-500'},{label:'High (>=50%)',v:distributionData.high,color:'bg-red-500'}].map(b=> (
                  <div key={b.label} className="flex flex-col items-center h-full w-1/4">
                    <div className={`w-full ${b.color}`} style={{ height: `${b.v}%` }} />
                    <div className="mt-2 text-sm font-bold text-slate-800">{b.v}%</div>
                    <div className="text-xs text-slate-600 font-semibold text-center">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Exposure</h3>
              <ul className="space-y-2 text-sm font-semibold text-slate-700">
                <li className="flex justify-between"><span>Low risk</span><span className="text-green-600">52%</span></li>
                <li className="flex justify-between"><span>Medium risk</span><span className="text-amber-600">34%</span></li>
                <li className="flex justify-between"><span>High risk</span><span className="text-red-600">14%</span></li>
              </ul>
              <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-green-200 font-semibold">
                Expected portfolio loss: <span className="font-black text-green-700">-18%</span>
              </div>
            </div>
          </div>
        )}

        {/* Policies */}
        {tab === 'policies' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Approval Policies</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{label:'Auto-approve',desc:'score<0.2 & DTI<35%'},{label:'Manual review',desc:'0.2<=score<0.5 or DTI 35-50%'},{label:'Reject',desc:'score>=0.5 or severe delinquency'}].map((p,i)=>(
                <div key={i} className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                  <div className="font-black uppercase text-slate-900 mb-1">{p.label}</div>
                  <div className="text-slate-700 text-sm font-semibold">{p.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-blue-200 bg-white">
                <div className="text-xs font-bold uppercase text-slate-500 mb-1">Policy levers</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>DTI threshold: 35% → 40%</li>
                  <li>Manual review buffer: 0.30 → 0.35</li>
                  <li>Min credit history: 2 yrs</li>
                </ul>
              </div>
              <div className="p-4 border-2 border-blue-200 bg-white">
                <div className="text-xs font-bold uppercase text-slate-500 mb-1">Simulated impact</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>Approval rate +4.3%</li>
                  <li>Expected loss +1.1%</li>
                  <li>Portfolio return +0.8%</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Monitoring */}
        {tab === 'monitoring' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Performance Over Time</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 p-4">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="2"
                    points={aucSeries.map((v,i)=>`${(i/(aucSeries.length-1))*100},${40 - (v-0.85)/0.08*40}`).join(' ')}
                  />
                  {aucSeries.map((v,i)=> (
                    <circle key={i} cx={(i/(aucSeries.length-1))*100} cy={40 - (v-0.85)/0.08*40} r="1.5" fill="#1d4ed8" />
                  ))}
                </svg>
                <div className="mt-2 text-xs text-slate-600 font-semibold">AUC trend: {aucSeries[aucSeries.length-1].toFixed(3)}</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Drift & Alerts</h3>
              <ul className="space-y-2 text-sm font-semibold text-slate-700">
                <li className="p-3 bg-green-50 border-2 border-green-200">PSI healthy across features</li>
                <li className="p-3 bg-yellow-50 border-2 border-yellow-200">Latency p95 increased 5ms</li>
                <li className="p-3 bg-red-50 border-2 border-red-200">Delinquency rate drift in last cohort</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
