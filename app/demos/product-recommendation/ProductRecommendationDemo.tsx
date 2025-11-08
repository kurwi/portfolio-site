'use client'

import { useMemo, useState } from 'react'
import { useLanguageCtx } from '@/contexts/LanguageCtx'
import { t } from '@/lib/translations'

interface Product {
  id: number
  name: string
  category: string
  price: number
  score: number
}

const CATEGORIES = ['All', 'Audio', 'Mobile', 'Accessories', 'Fitness']

const CATALOG: Product[] = [
  { id: 1, name: 'AirPods Pro', category: 'Audio', price: 249, score: 0.92 },
  { id: 2, name: 'Noise-Canceling Headphones', category: 'Audio', price: 199, score: 0.88 },
  { id: 3, name: 'iPhone Case (MagSafe)', category: 'Accessories', price: 49, score: 0.77 },
  { id: 4, name: 'Wireless Charger', category: 'Accessories', price: 59, score: 0.74 },
  { id: 5, name: 'Spotify Premium (12 mo)', category: 'Audio', price: 119, score: 0.69 },
  { id: 6, name: 'Running Shoes', category: 'Fitness', price: 129, score: 0.71 },
  { id: 7, name: 'Fitness Tracker', category: 'Fitness', price: 159, score: 0.79 },
  { id: 8, name: 'USB-C Cable (2m)', category: 'Accessories', price: 19, score: 0.62 },
  { id: 9, name: 'Android Smartphone', category: 'Mobile', price: 699, score: 0.75 },
  { id: 10, name: 'Bluetooth Speaker', category: 'Audio', price: 89, score: 0.67 },
]

const USERS = [
  { id: 1001, name: 'Alice', recent: ['AirPods Pro', 'iPhone Case (MagSafe)'] },
  { id: 1002, name: 'Ben', recent: ['Running Shoes', 'Fitness Tracker'] },
  { id: 1003, name: 'Caro', recent: ['Android Smartphone', 'USB-C Cable (2m)'] },
]

export default function ProductRecommendationDemo() {
  const { locale } = useLanguageCtx()
  const translate = (key: string) => t(key, locale)
  const [activeTab, setActiveTab] = useState<'overview' | 'evaluation' | 'similarity' | 'ab-test'>('overview')
  const [selectedUserId, setSelectedUserId] = useState<number>(USERS[0].id)
  const [category, setCategory] = useState<string>('All')

  const selectedUser = USERS.find(u => u.id === selectedUserId)!

  const recommendations = useMemo(() => {
    const filtered = category === 'All' ? CATALOG : CATALOG.filter(p => p.category === category)
    return filtered
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
  }, [category])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              {t('Product Recommendation System', locale)}
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              {t('Hybrid (Collaborative + Content) Recommendations with Evaluation and A/B Testing', locale)}
            </p>
            <div className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
              Powered by LightFM Hybrid Model
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Precision@10', value: '0.28', sub: 'Offline metric' },
            { label: 'NDCG@10', value: '0.42', sub: 'Ranking quality' },
            { label: 'Coverage', value: '78%', sub: 'Catalog exposure' },
            { label: 'Diversity', value: 'High', sub: 'Intra-list similarity' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {metric.label}
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-slate-600">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* User Context Card */}
        <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-black uppercase text-slate-900 mb-3">{translate('User Context')}</h3>
              <div className="flex gap-2 mb-4">
                {USERS.map(u => (
                  <button
                    key={u.id}
                    onClick={() => setSelectedUserId(u.id)}
                    className={`px-4 py-2 text-sm font-bold uppercase ${
                      selectedUserId === u.id 
                        ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white' 
                        : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
                    }`}
                  >
                    {u.name}
                  </button>
                ))}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">{translate('Recent Activity')} (ID: {selectedUserId})</div>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.recent.map(r => (
                    <span key={r} className="px-3 py-1 bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 text-sm font-semibold border-2 border-blue-200">{r}</span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase mb-2">Category Filter</div>
              <div className="flex gap-2">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`px-3 py-2 text-sm font-bold uppercase ${
                      category === c 
                        ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white' 
                        : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['overview','evaluation','similarity','ab-test'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-xl'
                  : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Left: Recommendations list */}
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="p-4 border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-between">
                <h3 className="font-black uppercase text-slate-900">{translate('Top Recommendations')}</h3>
                <span className="text-xs font-bold text-slate-600 uppercase">{translate('Personalized for')} {selectedUser.name}</span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {recommendations.map(p => (
                  <div key={p.id} className="border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-4 hover:shadow-lg transition-all bg-gradient-to-r from-white to-blue-50">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-slate-900 font-bold">{p.name}</div>
                        <div className="text-xs text-slate-600 font-semibold uppercase">{p.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-900 font-black text-lg">${p.price}</div>
                        <div className="text-xs text-brand-700 font-bold">score {(p.score*100).toFixed(0)}%</div>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-200 mb-3">
                      <div className="h-2 bg-gradient-to-r from-brand-700 to-brand-900" style={{ width: `${p.score*100}%` }} />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <button className="flex-1 px-3 py-2 text-sm font-bold uppercase bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700">{translate('View similar')}</button>
                      <button className="flex-1 px-3 py-2 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white">{translate('Add to cart')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Metrics & Reasoning */}
            <div className="space-y-6">
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Current Model</div>
                <div className="font-black text-slate-900 text-lg mb-4">LightFM (hybrid)</div>
                <div className="h-40 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                  <div className="text-slate-400 text-sm font-semibold">Category distribution</div>
                </div>
              </div>
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
                <div className="text-xs font-bold text-slate-500 uppercase mb-2">Reasoning</div>
                <ul className="text-sm text-slate-700 list-disc pl-5 space-y-2 font-semibold">
                  <li>Recent activity in Audio → prioritize headphones and speakers</li>
                  <li>Price affinity: mid-to-high tier items</li>
                  <li>Boost co-purchased accessories (MagSafe case + charger)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Evaluation */}
        {activeTab === 'evaluation' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">{translate('Offline Metrics')}</h3>
              <ul className="text-sm text-slate-700 list-disc pl-5 space-y-2 mb-4 font-semibold">
                <li>Precision@k and Recall@k over k=1..20</li>
                <li>NDCG over time by weekly retrains</li>
                <li>Coverage and catalog exposure</li>
                <li>Intra-list similarity (diversity)</li>
              </ul>
              <div className="h-56 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Line charts placeholder</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">{translate('Online Metrics')}</h3>
              <ul className="text-sm text-slate-700 list-disc pl-5 space-y-2 mb-4 font-semibold">
                <li>CTR on recommended widgets</li>
                <li>Conversion rate and AOV impact</li>
                <li>Revenue per session change</li>
              </ul>
              <div className="h-56 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Bar charts placeholder</div>
              </div>
            </div>
          </div>
        )}

        {/* Similarity */}
        {activeTab === 'similarity' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">{translate('Similar Items (Content-Based)')}</h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Embedding space visualization</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">{translate('Frequently Bought Together')}</h3>
              <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Co-occurrence network</div>
              </div>
            </div>
          </div>
        )}

        {/* A/B Test */}
        {activeTab === 'ab-test' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">{translate('A/B Test Results')}</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Cumulative conversion lift chart</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">Active Experiment</div>
              <div className="font-black text-slate-900 text-lg mb-4 pb-2 border-b-2 border-brand-700">Hybrid vs. Collaborative-only</div>
              <ul className="text-sm text-slate-700 list-disc pl-5 space-y-2 mb-4 font-semibold">
                <li>Traffic split: 90/10</li>
                <li>CTR lift: +18%</li>
                <li>AOV increase: +12%</li>
                <li>Duration: 2 weeks</li>
              </ul>
              <button className="w-full px-4 py-3 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-lg hover:shadow-xl transition-all">{translate('Promote Variant')}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

