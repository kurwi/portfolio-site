'use client'

import { useMemo, useState } from 'react'

type Inputs = {
  aImpressions: number
  aConversions: number
  bImpressions: number
  bConversions: number
}

// Approximation of error function (erf), Abramowitz-Stegun formula 7.1.26
function erf(x: number) {
  const sign = x < 0 ? -1 : 1
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429
  const p = 0.3275911
  const t = 1 / (1 + p * Math.abs(x))
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return sign * y
}

function zTestTwoProportions(aConv: number, aImp: number, bConv: number, bImp: number) {
  const p1 = aConv / Math.max(1, aImp)
  const p2 = bConv / Math.max(1, bImp)
  const p = (aConv + bConv) / Math.max(1, aImp + bImp)
  const se = Math.sqrt(p * (p - p * p) * (1 / Math.max(1, aImp) + 1 / Math.max(1, bImp)))
  const z = se === 0 ? 0 : (p2 - p1) / se
  // two-tailed p-value from z
  const cdf = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2))
  const pValue = 2 * (1 - cdf(Math.abs(z)))
  return { p1, p2, z, pValue }
}

export default function ABTestCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    aImpressions: 1000,
    aConversions: 120,
    bImpressions: 980,
    bConversions: 150,
  })

  const { p1, p2, z, pValue } = useMemo(() => (
    zTestTwoProportions(inputs.aConversions, inputs.aImpressions, inputs.bConversions, inputs.bImpressions)
  ), [inputs])

  const lift = (p2 - p1) * 100
  const significant = pValue < 0.05

  return (
    <div className="space-y-6">
      <p className="text-slate-600">
        Enter impressions and conversions for variants A and B. This computes a two-proportion z-test,
        showing lift, z-score, p-value, and whether the difference is statistically significant at 95%.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="accent-box p-4 bg-white/60">
          <h3 className="text-lg font-semibold mb-3 text-slate-900">Variant A</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm text-slate-700">
              Impressions
              <input
                type="number"
                className="mt-1 w-full rounded-sm border border-blue-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={inputs.aImpressions}
                onChange={(e) => setInputs((s) => ({ ...s, aImpressions: Number(e.target.value) }))}
                min={0}
              />
            </label>
            <label className="text-sm text-slate-700">
              Conversions
              <input
                type="number"
                className="mt-1 w-full rounded-sm border border-blue-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={inputs.aConversions}
                onChange={(e) => setInputs((s) => ({ ...s, aConversions: Number(e.target.value) }))}
                min={0}
                max={inputs.aImpressions}
              />
            </label>
          </div>
          <div className="mt-3 text-sm text-slate-600">CR: {(p1 * 100).toFixed(2)}%</div>
        </div>

        <div className="accent-box p-4 bg-white/60">
          <h3 className="text-lg font-semibold mb-3 text-slate-900">Variant B</h3>
          <div className="grid grid-cols-2 gap-4">
            <label className="text-sm text-slate-700">
              Impressions
              <input
                type="number"
                className="mt-1 w-full rounded-sm border border-blue-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={inputs.bImpressions}
                onChange={(e) => setInputs((s) => ({ ...s, bImpressions: Number(e.target.value) }))}
                min={0}
              />
            </label>
            <label className="text-sm text-slate-700">
              Conversions
              <input
                type="number"
                className="mt-1 w-full rounded-sm border border-blue-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
                value={inputs.bConversions}
                onChange={(e) => setInputs((s) => ({ ...s, bConversions: Number(e.target.value) }))}
                min={0}
                max={inputs.bImpressions}
              />
            </label>
          </div>
          <div className="mt-3 text-sm text-slate-600">CR: {(p2 * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
          <div className="text-xs uppercase text-slate-500">Lift (B vs A)</div>
          <div className={`text-2xl font-bold ${lift >= 0 ? 'text-green-700' : 'text-red-700'}`}>{lift.toFixed(2)}%</div>
        </div>
        <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
          <div className="text-xs uppercase text-slate-500">z-score</div>
          <div className="text-2xl font-bold text-slate-900">{z.toFixed(3)}</div>
        </div>
        <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
          <div className="text-xs uppercase text-slate-500">p-value</div>
          <div className="text-2xl font-bold text-slate-900">{pValue.toExponential(3)}</div>
        </div>
      </div>

      <div className={`p-4 rounded-sm border-l-4 ${significant ? 'border-l-green-600 bg-green-50' : 'border-l-amber-600 bg-amber-50'}`}>
        <div className="font-semibold text-slate-900">
          {significant ? 'Statistically significant at 95% confidence.' : 'Not statistically significant at 95% confidence.'}
        </div>
        <div className="text-sm text-slate-600 mt-1">
          {significant
            ? 'You can be reasonably confident B performs differently than A. Consider rollout or a follow-up test.'
            : 'Increase sample size or effect size to reach significance. Avoid premature conclusions.'}
        </div>
      </div>
    </div>
  )
}

