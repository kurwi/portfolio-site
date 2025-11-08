'use client'

import { useMemo, useState } from 'react'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'

export default function CreditRiskDemo() {
  const { locale } = useLanguageCtx();
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
    { label: t('AUC', locale), value: '0.89', sub: t('Model discrimination', locale) },
    { label: t('Precision', locale), value: '0.76', sub: t('Positive predictive value', locale) },
    { label: t('Recall', locale), value: '0.81', sub: t('Sensitivity', locale) },
    { label: t('Loss', locale), value: '-18%', sub: t('Expected loss reduction', locale) },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent mb-3">
              {t('Credit Risk Scoring', locale)}
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              {t('Real-time scoring, portfolio monitoring, and policy simulation with explainable AI.', locale)}
            </p>
            <div className="inline-block bg-gradient-to-r from-blue-700 to-blue-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
              {t('Scoring', locale)} • {t('Portfolio', locale)} • {t('Policies', locale)}
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {kpis.map((k, idx) => (
            <div key={idx} className="bg-white border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 shadow-xl">
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
          {(['scoring','portfolio','policies'] as const).map(tabKey => (
            <button
              key={tabKey}
              onClick={() => setTab(tabKey)}
              className={`flex-1 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all ${
                tab === tabKey ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-xl' : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-blue-700'
              }`}
            >
              {tabKey === 'scoring' ? t('Scoring', locale) : tabKey === 'portfolio' ? t('Portfolio', locale) : t('Policies', locale)}
            </button>
          ))}
        </div>

        {/* Scoring */}
        {tab === 'scoring' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Scoring form */}
            <div className="bg-white col-span-2 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-blue-700">{t('Credit Risk Scoring', locale)}</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600">{t('Name', locale)}</label>
                    <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">{t('Annual Income', locale)}</label>
                      <input type="number" value={form.income} onChange={e=>setForm({...form, income: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">{t('Requested Amount', locale)}</label>
                      <input type="number" value={form.requested} onChange={e=>setForm({...form, requested: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">{t('Debt-to-Income Ratio', locale)}</label>
                      <input type="number" value={Math.round(form.debt_to_income*100)} onChange={e=>setForm({...form, debt_to_income: Number(e.target.value)/100})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">{t('Credit History (years)', locale)}</label>
                      <input type="number" value={form.credit_history} onChange={e=>setForm({...form, credit_history: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase text-slate-600">{t('Delinquency (12m)', locale)}</label>
                      <select value={form.delinquency_12m} onChange={e=>setForm({...form, delinquency_12m: Number(e.target.value)})} className="mt-1 w-full border-2 border-blue-200 px-3 py-2 focus:outline-none focus:border-blue-700">
                        <option value={0}>{t('No', locale)}</option>
                        <option value={1}>{t('Yes', locale)}</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={()=> setResult(scoreApplicant(form))}
                    className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-black uppercase text-sm shadow-xl hover:shadow-2xl transition-all"
                  >
                    {t('Evaluate Applicant', locale)}
                  </button>

                  <div className="mt-6">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Sample Applicants', locale)}</div>
                    <div className="space-y-2">
                      {sampleApplicants.map(a => (
                        <button key={a.id} onClick={()=>pickSample(a)} className="w-full text-left p-3 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-200 hover:border-blue-700 transition-all">
                          <div className="flex items-center justify-between">
                            <div className="font-black text-slate-900">{a.name} <span className="text-xs text-slate-600">({a.id})</span></div>
                            <div className="text-xs font-semibold text-slate-600">{t('Income', locale)} ${a.income.toLocaleString()} • {t('DTI', locale)} {(a.debt_to_income*100).toFixed(0)}%</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-slate-600 uppercase">{t('Score', locale)}</div>
                      {result && (
                        <span className={`px-2 py-1 font-black text-xs uppercase ${
                          result.risk==='LOW'? 'bg-green-100 text-green-800'
                          : result.risk==='MEDIUM'? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                        }`}>{t(result.risk, locale)}</span>
                      )}
                    </div>
                    {result ? (
                      <div>
                        <div className="flex items-end justify-between mb-3">
                          <div className="text-xs text-slate-600 uppercase font-bold">{t('Default probability', locale)}</div>
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
                        <div className="mt-3 text-sm text-slate-700 font-bold">{t('Decision', locale)}: <span className="text-slate-900">{t(result.decision, locale)}</span></div>
                      </div>
                    ) : (
                      <div className="text-slate-600 font-semibold">{t('Enter values and click', locale)} &quot;{t('Evaluate Applicant', locale)}&quot;.</div>
                    )}
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Expected loss (LGD 40%)', locale)}</div>
                    <div className="text-slate-900 font-black text-3xl">{result ? `$${Math.round(result.prob * form.requested * 0.4).toLocaleString()}` : '—'}</div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-3">{t('Feature Contribution', locale)}</div>
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
                      <div className="text-slate-600 font-semibold">{t('No score yet', locale)}.</div>
                    )}
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Applicant vs portfolio', locale)}</div>
                    <MiniHistogramWithMarker data={portfolioScores} bins={12} marker={result ? result.prob : null} />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>0%</span><span>100%</span></div>
                  </div>

                  <div className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold uppercase text-slate-600 mb-3">{t('What-if sensitivity', locale)}</div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>{t('DTI', locale)}</span>
                          <span className="text-slate-600">{t('current', locale)} {(form.debt_to_income*100).toFixed(0)}%</span>
                        </div>
                        <ChartSparkline series={dtiSensitivity} color="#2563eb" width={240} height={56} />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>10%</span><span>70%</span></div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>{t('Amount', locale)}</span>
                          <span className="text-slate-600">{t('current', locale)} ${form.requested.toLocaleString()}</span>
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
            <div className="bg-white border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="text-xs font-bold uppercase text-slate-600 mb-3">{t('Explainability', locale)}</div>
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
                  <div className="text-slate-500 font-semibold text-sm">{t('SHAP summary plot placeholder', locale)}</div>
                )}
              </div>
              <div className="mt-4 text-xs text-slate-600 font-semibold">
                {t('Top drivers: DTI, Credit history length, Delinquency 12m, Income stability', locale)}
              </div>
              <div className="mt-6">
                <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Decision thresholds', locale)}</div>
                <ThresholdStrip prob={result?.prob ?? null} />
                <div className="text-[10px] text-slate-500 font-semibold mt-1">{t('Green: <20% (Auto-approve), Amber: 20–50% (Manual), Red: ≥50% (Reject)', locale)}</div>
              </div>
            </div>
          </div>
        )}

        {/* Portfolio */}
        {tab === 'portfolio' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-blue-700">{t('PD Trend', locale)}</h3>
              <div className="mb-6">
                <LineAreaChart series={[0.28,0.27,0.26,0.25,0.24,0.23,0.22,0.21,0.22,0.23,0.22,0.21]} color="#2563eb" width={720} height={160} />
              </div>
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-blue-700">{t('Portfolio Risk Distribution', locale)}</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-100 flex items-end justify-around p-6">
                {[{label:'Low (<20%)',v:distributionData.low,color:'#16a34a'},{label:'Medium (20-50%)',v:distributionData.mid,color:'#f59e0b'},{label:'High (>=50%)',v:distributionData.high,color:'#e11d48'}].map(b=> (
                  <div key={b.label} className="flex flex-col items-center h-full w-1/4">
                    <div className="w-full" style={{ height: `${b.v}%`, backgroundColor: b.color }} />
                    <div className="mt-2 text-sm font-bold text-slate-800">{b.v}%</div>
                    <div className="text-xs text-slate-600 font-semibold text-center">{b.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#16a34a'}}></span> {t('LOW', locale)}</div>
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#f59e0b'}}></span> {t('MEDIUM', locale)}</div>
                <div className="flex items-center gap-1"><span className="inline-block w-3 h-3" style={{background:'#e11d48'}}></span> {t('HIGH', locale)}</div>
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">{t('Probability Histogram', locale)}</h4>
                <ProbabilityHistogram data={portfolioScores} bins={10} />
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">{t('Score Deciles', locale)}</h4>
                <ScoreDeciles data={portfolioScores} />
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-blue-700">{t('Exposure', locale)}</h3>
              <ul className="space-y-2 text-sm font-semibold text-slate-700">
                <li className="flex justify-between"><span>{t('Low risk', locale)}</span><span className="text-green-600">52%</span></li>
                <li className="flex justify-between"><span>{t('Medium risk', locale)}</span><span className="text-amber-600">34%</span></li>
                <li className="flex justify-between"><span>{t('High risk', locale)}</span><span className="text-red-600">14%</span></li>
              </ul>
              <div className="mt-4 p-3 bg-emerald-50 border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-green-200 font-medium">
                {t('Expected portfolio loss:', locale)} <span className="font-black text-green-700">-18%</span>
              </div>
              <div className="mt-6">
                <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">{t('Approval Rate Trend', locale)}</h4>
                <ChartSparkline series={[72,74,73,75,76,77,76,78,79]} color="#2563eb" />
              </div>
            </div>
          </div>
        )}

        {/* Policies */}
        {tab === 'policies' && (
          <div className="bg-white border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
            <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-blue-700">{t('Approval Policies', locale)}</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{label:t('AUTO-APPROVE', locale),desc:'score<0.2 & DTI<35%'},{label:t('MANUAL REVIEW', locale),desc:'0.2<=score<0.5 or DTI 35-50%'},{label:t('REJECT', locale),desc:'score>=0.5 or severe delinquency'}].map((p,i)=>(
                <div key={i} className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                  <div className="font-black uppercase text-slate-900 mb-1">{p.label}</div>
                  <div className="text-slate-700 text-sm font-semibold">{p.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Policy levers', locale)}</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>DTI threshold: 35% → 40%</li>
                  <li>Manual review buffer: 0.30 → 0.35</li>
                  <li>Min credit history: 2 yrs</li>
                </ul>
              </div>
              <div className="p-4 border-l-[6px] border-blue-700 border-t-2 border-r-2 border-b-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-xs font-bold uppercase text-slate-600 mb-2">{t('Simulated impact', locale)}</div>
                <ul className="text-sm text-slate-700 space-y-1 font-semibold">
                  <li>Approval rate +4.3%</li>
                  <li>Expected loss +1.1%</li>
                  <li>Portfolio return +0.8%</li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-black uppercase text-slate-900 mb-3 text-sm">{t('Before vs After', locale)}</h4>
              <GroupedBars
                labels={[t("Approval Rate", locale), t("Expected Loss", locale), t("Return", locale)]}
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
    <div className="h-32 w-full flex items-end gap-2 border-2 border-blue-200 p-3 bg-gradient-to-br from-slate-50 to-blue-50">
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
    <svg width={w} height={h} className="border-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50">
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
    <svg width={W} height={H} className="border-2 border-blue-200 bg-gradient-to-br from-slate-50 to-blue-50">
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
          <div className="flex-1 h-3 bg-blue-100 border-2 border-blue-200">
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
    <div className="relative h-20 w-full flex items-end gap-1 border-2 border-blue-200 p-2 bg-gradient-to-br from-slate-50 to-blue-50">
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

