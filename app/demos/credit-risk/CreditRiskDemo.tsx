'use client'

import { useMemo, useState } from 'react'

export default function CreditRiskDemo() {
  const [tab, setTab] = useState<'scoring' | 'portfolio' | 'policies'>('scoring')
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

  const kpiTrends = [
    [0.86, 0.87, 0.88, 0.88, 0.89],
    [0.72, 0.73, 0.74, 0.75, 0.76],
    [0.79, 0.80, 0.80, 0.81, 0.81],
    [-0.22, -0.21, -0.20, -0.19, -0.18],
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

  const portfolioScores = useMemo(() => {
    const base = [0.06,0.12,0.18,0.22,0.27,0.33,0.38,0.45,0.52,0.61,0.72]
    return result ? [...base, result.prob] : base
  }, [result])

  const distributionData = useMemo(() => {
    const arr = portfolioScores
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
  }, [portfolioScores])

  const topDrivers = useMemo(() => {
    if (!result) return [] as { key: string; value: number; width: number }[]
    const arr = Object.entries(result.contributions)
      .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
      .slice(0, 4)
    const maxAbs = Math.max(...arr.map(([, v]) => Math.abs(v))) || 1
    return arr.map(([k, v]) => ({ key: k, value: v, width: Math.round((Math.abs(v) / maxAbs) * 100) }))
  }, [result])

  const dtiSensitivity = useMemo(() => {
    const xs = Array.from({ length: 13 }, (_, i) => 0.1 + i * 0.05) // 10% .. 70%
    return xs.map((x) =>
      scoreApplicant({
        income: form.income,
        debt_to_income: x,
        credit_history: form.credit_history,
        delinquency_12m: form.delinquency_12m,
        requested: form.requested,
      }).prob * 100
    )
  }, [form.income, form.credit_history, form.delinquency_12m, form.requested])

  const amtSensitivity = useMemo(() => {
    const xs = Array.from({ length: 14 }, (_, i) => 1000 + i * 3000) // $1k .. $40k
    return xs.map((a) =>
      scoreApplicant({
        income: form.income,
        debt_to_income: form.debt_to_income,
        credit_history: form.credit_history,
        delinquency_12m: form.delinquency_12m,
        requested: a,
      }).prob * 100
    )
  }, [form.income, form.debt_to_income, form.credit_history, form.delinquency_12m])

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
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-10 max-w-[1280px] text-[15px] md:text-[16px]">
        {/* Hero */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-14 h-14 rounded-full border border-slate-300 bg-white flex items-center justify-center">
            <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path d="M3 10h18M5 7h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 mb-2">Credit Risk Assessment Platform</h1>
            <p className="text-base text-slate-600 mb-2">Real-time scoring, portfolio monitoring, and policy simulation.</p>
            <div className="text-[12px] text-slate-500">Sub-50ms scoring API • Explainability</div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {kpis.map((k, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-5 shadow-sm">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{k.label}</div>
              <div className="text-2xl font-semibold text-slate-900 mb-0.5">{k.value}</div>
              <div className="text-[13px] text-slate-600">{k.sub}</div>
              <div className="mt-2">
                <ChartSparkline series={kpiTrends[idx]} color="#2563eb" width={140} height={36} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-6">
          <div className="flex gap-6">
            {(['scoring','portfolio','policies'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-1.5 py-2 text-sm font-medium -mb-px border-b-2 transition-colors ${
                  tab === t ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Scoring */}
        {tab === 'scoring' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Scoring form */}
            <div className="bg-white col-span-2 border border-slate-200 shadow-sm p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Applicant Scoring</h3>
                <span className="text-[11px] font-medium text-slate-500">Interactive</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600">Name</label>
                    <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Income ($)</label>
                      <input type="number" value={form.income} onChange={e=>setForm({...form, income: Number(e.target.value)})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Requested ($)</label>
                      <input type="number" value={form.requested} onChange={e=>setForm({...form, requested: Number(e.target.value)})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">DTI (%)</label>
                      <input type="number" value={Math.round(form.debt_to_income*100)} onChange={e=>setForm({...form, debt_to_income: Number(e.target.value)/100})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Credit history (yrs)</label>
                      <input type="number" value={form.credit_history} onChange={e=>setForm({...form, credit_history: Number(e.target.value)})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">Delinquency (12m)</label>
                      <select value={form.delinquency_12m} onChange={e=>setForm({...form, delinquency_12m: Number(e.target.value)})} className="mt-1 w-full border border-slate-300 px-3 py-2 focus:outline-none focus:border-slate-900">
                        <option value={0}>No</option>
                        <option value={1}>Yes</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={()=> setResult(scoreApplicant(form))}
                    className="px-4 py-2.5 bg-blue-700 text-white font-medium text-sm shadow-sm hover:bg-blue-600"
                  >
                    Score applicant
                  </button>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Or pick a sample (prefills form)</div>
                    <div className="space-y-2">
                      {sampleApplicants.map(a => (
                        <button key={a.id} onClick={()=>pickSample(a)} className="w-full text-left p-3 bg-white border border-slate-200 hover:bg-slate-50">
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
                  <div className="p-5 bg-white rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[11px] font-semibold text-slate-600 uppercase">Score</div>
                      {result && (
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
                          result.risk==='LOW'? 'bg-slate-100 text-slate-800'
                          : result.risk==='MEDIUM'? 'bg-slate-100 text-slate-800'
                          : 'bg-slate-100 text-slate-800'
                        }`}>{result.risk}</span>
                      )}
                    </div>
                    {result ? (
                      <div>
                        <div className="flex items-end justify-between mb-2">
                          <div className="text-[11px] text-slate-500 uppercase font-medium">Default probability</div>
                          <div className="text-2xl font-semibold text-slate-900">{(result.prob*100).toFixed(1)}%</div>
                        </div>
                        <div className="mb-3">
                          <RadialGauge prob={result.prob} size={120} color="#2563eb" />
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded">
                          <div
                            className={`h-2 rounded ${result.risk==='LOW'?'bg-emerald-500':result.risk==='MEDIUM'?'bg-amber-500':'bg-rose-500'}`}
                            style={{ width: `${Math.round(result.prob*100)}%` }}
                          />
                        </div>
                        <div className="mt-3 text-[12px] text-slate-600"><span className="font-medium">Decision:</span> {result.decision}</div>
                      </div>
                    ) : (
                      <div className="text-slate-600">Enter values and click &quot;Score applicant&quot;.</div>
                    )}
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Expected loss (LGD 40%)</div>
                    <div className="text-slate-800 font-black text-2xl">{result ? `$${Math.round(result.prob * form.requested * 0.4).toLocaleString()}` : '—'}</div>
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Top drivers (contributions)</div>
                    {result ? (
                      <div className="space-y-3">
                        {topDrivers.map(d => (
                          <div key={d.key}>
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                              <span>{d.key}</span>
                              <span className={`${d.value>=0?'text-rose-600':'text-emerald-600'} font-medium`}>{d.value>=0?'+':''}{d.value.toFixed(2)}</span>
                            </div>
                            <div className="h-2.5 bg-slate-100 rounded overflow-hidden">
                              <div className={`h-full ${d.value>=0?'bg-rose-300':'bg-emerald-300'}`} style={{ width: `${d.width}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-slate-600">No score yet.</div>
                    )}
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">Applicant vs portfolio</div>
                    <MiniHistogramWithMarker data={portfolioScores} bins={12} marker={result ? result.prob : null} />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>0%</span><span>100%</span></div>
                  </div>

                  <div className="p-5 bg-white rounded-lg border border-slate-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">What-if sensitivity</div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>DTI</span>
                          <span className="text-slate-600">current {(form.debt_to_income*100).toFixed(0)}%</span>
                        </div>
                        <ChartSparkline series={dtiSensitivity} color="#2563eb" width={240} height={56} />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>10%</span><span>70%</span></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>Amount</span>
                          <span className="text-slate-600">current ${form.requested.toLocaleString()}</span>
                        </div>
                        <ChartSparkline series={amtSensitivity} color="#2563eb" width={240} height={56} />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>$1k</span><span>$40k</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explainability panel */}
            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-lg">
              <div className="text-xs font-semibold uppercase text-slate-600 mb-2">Explainability</div>
              <div className="h-64 bg-white border border-slate-200 flex items-center justify-center">
                {result ? (
                  <div className="w-full px-4">
                    {Object.entries(result.contributions).map(([k,v])=>{
                      const pct = Math.min(100, Math.round(Math.abs(v)*40))
                      return (
                        <div key={k} className="mb-2">
                          <div className="text-xs font-medium text-slate-600 mb-1">{k}</div>
                          <div className="h-2.5 bg-slate-100">
                            <div className={`h-2.5 ${v>=0?'bg-rose-200':'bg-emerald-200'}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-slate-500 text-sm">SHAP summary plot placeholder</div>
                )}
              </div>
              <div className="mt-4 text-xs text-slate-600">
                Top drivers: DTI, Credit history length, Delinquency 12m, Income stability
              </div>
              <div className="mt-6">
                <div className="text-xs font-bold uppercase text-slate-600 mb-2">Decision thresholds</div>
                <ThresholdStrip prob={result?.prob ?? null} />
                <div className="text-[11px] text-slate-500 mt-1">Green: &lt;20% (Auto-approve), Amber: 20–50% (Manual), Red: ≥50% (Reject)</div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio */}
        {tab === 'portfolio' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border border-slate-200 shadow-sm p-6 rounded-lg">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b border-slate-200">PD Trend</h3>
              <div className="mb-6">
                <LineAreaChart series={[0.28,0.27,0.26,0.25,0.24,0.23,0.22,0.21,0.22,0.23,0.22,0.21]} color="#2563eb" width={720} height={160} />
              </div>
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b border-slate-200">Risk Distribution</h3>
              <div className="h-72 bg-white border border-slate-200 flex items-end justify-around p-6">
                {[{label:'Low (<20%)',v:distributionData.low,color:'#16a34a'},{label:'Medium (20-50%)',v:distributionData.mid,color:'#f59e0b'},{label:'High (>=50%)',v:distributionData.high,color:'#e11d48'}].map(b=> (
                  <div key={b.label} className="flex flex-col items-center h-full w-1/4">
                    <div className="w-full" style={{ height: `${b.v}%`, backgroundColor: b.color }} />
                    <div className="mt-2 text-sm font-bold text-slate-800">{b.v}%</div>
                    <div className="text-xs text-slate-600 font-semibold text-center">{b.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#16a34a'}}></span> Low</div>
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#f59e0b'}}></span> Medium</div>
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#e11d48'}}></span> High</div>
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Probability Histogram</h4>
                <ProbabilityHistogram data={portfolioScores} bins={10} />
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Score Deciles</h4>
                <ScoreDeciles data={portfolioScores} />
              </div>
            </div>
            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-lg">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b border-slate-200">Exposure</h3>
              <ul className="space-y-2 text-sm font-semibold text-slate-700">
                <li className="flex justify-between"><span>Low risk</span><span className="text-green-600">52%</span></li>
                <li className="flex justify-between"><span>Medium risk</span><span className="text-amber-600">34%</span></li>
                <li className="flex justify-between"><span>High risk</span><span className="text-red-600">14%</span></li>
              </ul>
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 font-medium">
                Expected portfolio loss: <span className="font-black text-green-700">-18%</span>
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Approval Rate Trend</h4>
                <ChartSparkline series={[72,74,73,75,76,77,76,78,79]} color="#2563eb" />
              </div>
            </div>
          </div>
        )}

        {/* Policies */}
        {tab === 'policies' && (
          <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-lg">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b border-slate-200">Approval Policies</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{label:'Auto-approve',desc:'score<0.2 & DTI<35%'},{label:'Manual review',desc:'0.2<=score<0.5 or DTI 35-50%'},{label:'Reject',desc:'score>=0.5 or severe delinquency'}].map((p,i)=>(
                <div key={i} className="p-4 bg-white border border-slate-200">
                  <div className="font-black uppercase text-slate-900 mb-1">{p.label}</div>
                  <div className="text-slate-700 text-sm font-semibold">{p.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 bg-white">
                <div className="text-xs font-bold uppercase text-slate-500 mb-1">Policy levers</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>DTI threshold: 35% → 40%</li>
                  <li>Manual review buffer: 0.30 → 0.35</li>
                  <li>Min credit history: 2 yrs</li>
                </ul>
              </div>
              <div className="p-4 border border-slate-200 bg-white">
                <div className="text-xs font-bold uppercase text-slate-500 mb-1">Simulated impact</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>Approval rate +4.3%</li>
                  <li>Expected loss +1.1%</li>
                  <li>Portfolio return +0.8%</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">Before vs After</h4>
              <GroupedBars
                labels={["Approval Rate","Expected Loss","Return"]}
                base={[72,18,12]}
                after={[76.3,19.1,12.8]}
                unit="%"
              />
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
      <div className="h-3 w-full bg-slate-100 rounded relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full" style={{ width: '20%', background: '#dcfce7' }} />
        <div className="absolute left-[20%] top-0 h-full" style={{ width: '30%', background: '#fef3c7' }} />
        <div className="absolute left-[50%] top-0 h-full" style={{ width: '50%', background: '#fee2e2' }} />
        {prob != null && (
          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: `${Math.min(99, Math.max(0, prob*100))}%` }}>
            <div className="w-[1px] h-4 bg-slate-700" />
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-medium">
        <span>0%</span><span>20%</span><span>50%</span><span>100%</span>
      </div>
    </div>
  )
}

function ProbabilityHistogram({ data, bins = 10 }: { data: number[]; bins?: number }) {
  const counts = new Array(bins).fill(0)
  data.forEach((p) => {
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(p * bins)))
    counts[idx] += 1
  })
  const maxCount = counts.reduce((m, v) => Math.max(m, v), 1)
  const colors = ['#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#172554']
  return (
    <div className="h-32 w-full flex items-end gap-2 border border-slate-200 p-3 bg-white">
      {counts.map((c, i) => (
        <div key={i} className="flex-1 flex items-end">
          <div
            className="w-full rounded-t"
            style={{ height: `${Math.round((c / maxCount) * 100)}%`, background: colors[i % colors.length] }}
            title={`Bin ${i + 1}: ${c}`}
          />
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
    <svg width={w} height={h} className="border border-slate-200 bg-white">
      <polyline fill="none" stroke={color} strokeWidth={2} points={points} />
    </svg>
  )
}

function GroupedBars({ labels, base, after, unit = '' }: { labels: string[]; base: number[]; after: number[]; unit?: string }) {
  const maxVal = Math.max(...base, ...after) * 1.1
  return (
    <div className="space-y-4">
      {labels.map((lbl, i) => (
        <div key={lbl}>
          <div className="text-sm font-semibold text-slate-700 mb-1">{lbl}</div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-20 text-[12px] text-slate-500">Baseline</div>
            <div className="flex-1 h-3 bg-slate-100">
              <div className="h-3 bg-slate-400" style={{ width: `${(base[i] / maxVal) * 100}%` }} />
            </div>
            <div className="w-14 text-right text-[12px] text-slate-700 font-semibold">{base[i]}{unit}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-20 text-[12px] text-slate-500">After</div>
            <div className="flex-1 h-3 bg-slate-100">
              <div className="h-3 bg-blue-500" style={{ width: `${(after[i] / maxVal) * 100}%` }} />
            </div>
            <div className="w-14 text-right text-[12px] text-slate-700 font-semibold">{after[i]}{unit}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LineAreaChart({ series, color = '#2563eb', width = 720, height = 160 }: { series: number[]; color?: string; width?: number; height?: number }) {
  const W = width
  const H = height
  const P = 8
  const min = Math.min(...series)
  const max = Math.max(...series)
  const nx = (i: number) => (i / (series.length - 1)) * (W - 2 * P) + P
  const ny = (v: number) => (H - P) - ((v - min) / (max - min || 1)) * (H - 2 * P)
  const linePoints = series.map((v, i) => `${nx(i)},${ny(v)}`).join(' ')
  const areaPoints = `${P},${H - P} ${linePoints} ${W - P},${H - P}`
  return (
    <svg width={W} height={H} className="border border-slate-200 bg-white">
      <polyline points={areaPoints} fill={color} fillOpacity={0.1} stroke="none" />
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  )
}

function ScoreDeciles({ data }: { data: number[] }) {
  const bins = 10
  const counts = new Array(bins).fill(0)
  data.forEach((p) => {
    const idx = Math.min(bins - 1, Math.max(0, Math.floor(p * bins)))
    counts[idx] += 1
  })
  const maxCount = counts.reduce((m, v) => Math.max(m, v), 1)
  return (
    <div className="space-y-1">
      {counts.map((c, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-16 text-[11px] text-slate-600">D{i + 1}</div>
          <div className="flex-1 h-3 bg-slate-100">
            <div className="h-3 bg-blue-500" style={{ width: `${Math.round((c / maxCount) * 100)}%` }} />
          </div>
          <div className="w-8 text-right text-[11px] text-slate-600">{c}</div>
        </div>
      ))}
    </div>
  )
}

function RadialGauge({ prob, size = 120, color = '#2563eb' }: { prob: number; size?: number; color?: string }) {
  const stroke = 10
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
    <div className="relative h-16 w-full flex items-end gap-1 border border-slate-200 p-2 bg-white">
      {counts.map((c, i) => (
        <div key={i} className="flex-1 flex items-end">
          <div className="w-full rounded-t" style={{ height: `${Math.round((c / maxCount) * 100)}%`, background: '#bfdbfe' }} />
        </div>
      ))}
      {marker != null && (
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${Math.min(99, Math.max(0, marker * 100))}%` }}
        >
          <div className="w-[1px] h-full bg-blue-700" />
        </div>
      )}
    </div>
  )
}
