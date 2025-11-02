'use client'

import React, { useState, useMemo } from 'react'

function generateSeries(n = 120, anomalyRate = 0.08) {
  const data: number[] = []
  let v = 0
  for (let i = 0; i < n; i++) {
    // random walk with noise
    v += (Math.random() - 0.5) * 0.8
    const base = 10 + v + Math.sin(i / 8) * 2 + (Math.random() - 0.5)
    data.push(base)
  }
  // inject anomalies
  for (let i = 0; i < n; i++) {
    if (Math.random() < anomalyRate) {
      data[i] += (Math.random() < 0.5 ? -1 : 1) * (4 + Math.random() * 4)
    }
  }
  return data
}

function zScores(arr: number[]) {
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length
  const variance = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / arr.length
  const std = Math.sqrt(variance) || 1
  return { mean, std, z: arr.map((x) => (x - mean) / std) }
}

export default function AnomalyDetector() {
  const [threshold, setThreshold] = useState(2.5)
  const [seed, setSeed] = useState(1)

  const series = useMemo(() => generateSeries(140, 0.1), [])
  const { z } = useMemo(() => zScores(series), [series])
  const anomalies = z.map((v) => Math.abs(v) >= threshold)
  const anomalyCount = anomalies.filter(Boolean).length

  return (
    <div className="space-y-6">
      <p className="text-slate-600">
        Synthetic time-series with a simple z-score detector. Adjust the threshold or regenerate the data.
        This demonstrates fast exploratory analysis patterns I use when instrumenting metrics and alerts.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <label className="text-sm text-slate-700">
          Threshold (|z| ≥)
          <input
            type="range"
            min={1.5}
            max={4}
            step={0.1}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="block w-64 mt-1"
          />
        </label>
        <div className="px-3 py-1 rounded-sm bg-blue-50 border border-blue-200 text-slate-700">
          Current: <span className="font-semibold">{threshold.toFixed(1)}</span>
        </div>
        <button
          onClick={() => setSeed((s) => s + 1)}
          className="px-4 py-2 rounded-sm bg-gradient-to-r from-brand-700 to-brand-800 text-white border-l-4 border-brand-900 hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Regenerate Data
        </button>
        <div className="ml-auto text-sm text-slate-600">
          Detected anomalies: <span className="font-semibold text-red-700">{anomalyCount}</span>
        </div>
      </div>

      <div className="bg-white/70 rounded-sm border border-blue-200 p-6 h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-2">Chart visualization</p>
          <p className="text-sm text-slate-500">Detected anomalies: <span className="font-semibold text-red-700">{anomalyCount}</span></p>
        </div>
      </div>
    </div>
  )
}
