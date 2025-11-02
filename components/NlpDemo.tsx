'use client'

import { useState } from 'react'

type SentimentRes = {
  score: number
  magnitude: number
  label: 'positive' | 'negative' | 'neutral'
  details: { pos: number; neg: number }
}

type SummaryRes = {
  summary: string[]
  scored: Array<{ sentence: string; score: number }>
}

export default function NlpDemo() {
  const [text, setText] = useState<string>(
    'I absolutely love clean engineering and reliable AI systems. Bad architectures make me sad, but great design and testing make products awesome.'
  )
  const [loading, setLoading] = useState<'sentiment' | 'summary' | null>(null)
  const [sentiment, setSentiment] = useState<SentimentRes | null>(null)
  const [summary, setSummary] = useState<SummaryRes | null>(null)
  const [error, setError] = useState<string>('')

  async function callSentiment() {
    setLoading('sentiment'); setError('')
    try {
      const res = await fetch('/api/nlp/sentiment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Request failed')
      setSentiment(data)
    } catch (e: any) {
      setError(e?.message || 'Error')
    } finally {
      setLoading(null)
    }
  }

  async function callSummarize() {
    setLoading('summary'); setError('')
    try {
      const res = await fetch('/api/nlp/summarize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, sentences: 3 }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Request failed')
      setSummary(data)
    } catch (e: any) {
      setError(e?.message || 'Error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-slate-600">
        A tiny in-browser NLP micro-API demo: sentiment analysis and extractive summarization. Type text and call
        the APIs to see structured results immediately.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full rounded-sm border border-blue-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-600"
      />

      <div className="flex flex-wrap gap-3">
        <button
          onClick={callSentiment}
          disabled={loading !== null}
          className="px-4 py-2 rounded-sm bg-gradient-to-r from-brand-700 to-brand-800 text-white border-l-4 border-brand-900 disabled:opacity-60"
        >
          {loading === 'sentiment' ? 'Analyzing…' : 'Analyze Sentiment'}
        </button>
        <button
          onClick={callSummarize}
          disabled={loading !== null}
          className="px-4 py-2 rounded-sm border-2 border-brand-700 text-brand-800 hover:bg-brand-700 hover:text-white disabled:opacity-60"
        >
          {loading === 'summary' ? 'Summarizing…' : 'Summarize'}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-sm bg-rose-50 border border-rose-200 text-rose-700">{error}</div>
      )}

      {sentiment && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
            <div className="text-xs uppercase text-slate-500">Label</div>
            <div className="text-2xl font-bold text-slate-900 capitalize">{sentiment.label}</div>
          </div>
          <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
            <div className="text-xs uppercase text-slate-500">Score</div>
            <div className="text-2xl font-bold text-slate-900">{sentiment.score}</div>
          </div>
          <div className="rounded-sm border border-blue-200 p-4 bg-white/70">
            <div className="text-xs uppercase text-slate-500">Magnitude</div>
            <div className="text-2xl font-bold text-slate-900">{sentiment.magnitude}</div>
          </div>
        </div>
      )}

      {summary && (
        <div className="space-y-3">
          <div className="text-sm text-slate-500">Top sentences</div>
          <ul className="list-disc ml-6 space-y-1">
            {summary.summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-xs text-slate-500 border-t border-blue-200 pt-4">
        Endpoints: <code className="bg-blue-50 px-1 py-0.5 rounded-sm border border-blue-200">POST /api/nlp/sentiment</code>
        {' '}and{' '}
        <code className="bg-blue-50 px-1 py-0.5 rounded-sm border border-blue-200">POST /api/nlp/summarize</code>
      </div>
    </div>
  )
}
