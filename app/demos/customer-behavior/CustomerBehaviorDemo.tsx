'use client'

import { useState } from 'react'

export default function CustomerBehaviorDemo() {
  const [tab, setTab] = useState<'workflows' | 'monitor' | 'queue' | 'rules'>('workflows')

  const metrics = [
    { label: 'Events / day', value: '20,400', sub: '+6% WoW' },
    { label: 'Avg latency', value: '2m 06s', sub: 'event → action' },
    { label: 'Success rate', value: '99.5%', sub: 'p95 99.1%' },
    { label: 'Failed tasks', value: '12', sub: 'auto-retry enabled' },
  ]

  const queue = [
    { id: 'evt_94821', type: 'signup', status: 'processed', latency: '1m 12s', worker: 'email' },
    { id: 'evt_94820', type: 'inactivity_14d', status: 'queued', latency: '—', worker: 'sms' },
    { id: 'evt_94819', type: 'trial_expiring', status: 'retrying', latency: '3m 02s', worker: 'email' },
    { id: 'evt_94818', type: 'cart_abandoned', status: 'processed', latency: '1m 44s', worker: 'email' },
  ]

  const rules = [
    { name: 'Re-engage inactivity', trigger: 'no_login >= 14d', action: 'email → sms fallback', status: 'active' },
    { name: 'Trial expiring', trigger: 'trial_days_left <= 3 and sessions < 10', action: 'onboarding call offer', status: 'active' },
    { name: 'Cart recovery', trigger: 'cart_abandoned and value > 50', action: 'email reminder + 10% code', status: 'active' },
    { name: 'Renewal reminder', trigger: 'contract_ends <= 7d', action: 'account manager task', status: 'paused' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              Customer Behavior Automation
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Event-Driven Workflows for Lifecycle Messaging with Monitoring and Retries
            </p>
            <div className="flex gap-3">
              <span className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
                Triggers
              </span>
              <span className="inline-block bg-white border-2 border-brand-700 text-brand-700 px-5 py-2 font-bold text-sm uppercase tracking-wider">
                Conditions
              </span>
              <span className="inline-block bg-white border-2 border-brand-700 text-brand-700 px-5 py-2 font-bold text-sm uppercase tracking-wider">
                Actions
              </span>
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {m.label}
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">
                {m.value}
              </div>
              <div className="text-sm font-semibold text-slate-600">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['workflows','monitor','queue','rules'] as const).map(t => (
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

        {/* Workflows builder (columns) */}
        {tab === 'workflows' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Triggers */}
            <div>
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                  <h3 className="font-black uppercase text-slate-900">Triggers</h3>
                  <span className="text-xs font-bold text-slate-600 uppercase">4 presets</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Signup', desc: 'User created' },
                    { title: 'Inactivity 14d', desc: 'No login in 14 days' },
                    { title: 'Cart abandoned', desc: 'Unfinished checkout' },
                    { title: 'Trial expiring', desc: 'Ends in 3 days' },
                  ].map(b => (
                    <div key={b.title} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:border-brand-700 transition-all">
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-600">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conditions */}
            <div>
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                  <h3 className="font-black uppercase text-slate-900">Conditions</h3>
                  <span className="text-xs font-bold text-slate-600 uppercase">Rule engine</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Usage < 10 sessions', desc: 'Onboarding incomplete' },
                    { title: 'Value > $50', desc: 'High-value cart' },
                    { title: 'Opened last 2 emails', desc: 'Engaged user' },
                  ].map(b => (
                    <div key={b.title} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:border-brand-700 transition-all">
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-600">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-brand-700">
                  <h3 className="font-black uppercase text-slate-900">Actions</h3>
                  <span className="text-xs font-bold text-slate-600 uppercase">Email / SMS / Webhook</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Send email', desc: 'Welcome / Reminder / Offer' },
                    { title: 'Send SMS', desc: 'Short actionable nudge' },
                    { title: 'Webhook', desc: 'Notify external system' },
                    { title: 'Delay', desc: 'Wait 2h / 24h / custom' },
                  ].map(b => (
                    <div key={b.title} className="p-3 border-2 border-blue-200 bg-gradient-to-r from-slate-50 to-blue-50 hover:border-brand-700 transition-all">
                      <div className="font-bold text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-600">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monitor */}
        {tab === 'monitor' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Throughput & Latency</h3>
              <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                <div className="text-slate-400 text-sm font-semibold">Timeseries charts</div>
              </div>
            </div>
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4 pb-2 border-b-2 border-brand-700">Health</h3>
              <ul className="text-sm text-slate-700 space-y-3 mb-4 font-semibold">
                <li className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100">
                  <span>Queue depth</span>
                  <span className="font-black text-brand-700">32</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100">
                  <span>Workers (active)</span>
                  <span className="font-black text-brand-700">8</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100">
                  <span>Retry rate</span>
                  <span className="font-black text-brand-700">0.7%</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-blue-100">
                  <span>Error rate</span>
                  <span className="font-black text-brand-700">0.5%</span>
                </li>
              </ul>
              <div className="border-l-[6px] border-yellow-600 border-t-2 border-r-2 border-b-2 border-yellow-200 bg-yellow-50 p-4">
                <div className="text-xs font-bold text-slate-500 uppercase mb-1">Recent Alert</div>
                <div className="text-sm text-slate-800 font-semibold">Spike in email provider latency. Auto rerouted to backup pool.</div>
              </div>
            </div>
          </div>
        )}

        {/* Queue */}
        {tab === 'queue' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
            <div className="p-4 border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-between">
              <h3 className="font-black uppercase text-slate-900">Worker Queue</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-bold uppercase bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700">Retry failed</button>
                <button className="px-4 py-2 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white">Pause queue</button>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-200 text-slate-700 bg-gradient-to-r from-slate-50 to-blue-50">
                  <th className="py-3 px-4 font-bold uppercase">Event ID</th>
                  <th className="py-3 px-4 font-bold uppercase">Type</th>
                  <th className="py-3 px-4 font-bold uppercase">Status</th>
                  <th className="py-3 px-4 font-bold uppercase">Latency</th>
                  <th className="py-3 px-4 font-bold uppercase">Worker</th>
                </tr>
              </thead>
              <tbody>
                {queue.map((q) => (
                  <tr key={q.id} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50">
                    <td className="py-3 px-4 font-mono text-slate-700 font-semibold">{q.id}</td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">{q.type}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 text-xs font-bold uppercase border-2 ${
                        q.status === 'processed' ? 'bg-green-50 text-green-700 border-green-200' :
                        q.status === 'queued' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{q.status}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">{q.latency}</td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">{q.worker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Rules */}
        {tab === 'rules' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
            <div className="p-4 border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 flex items-center justify-between">
              <h3 className="font-black uppercase text-slate-900">Rules</h3>
              <button className="px-4 py-2 text-sm font-bold uppercase bg-gradient-to-r from-brand-700 to-brand-900 text-white">New rule</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b-2 border-blue-200 text-slate-700 bg-gradient-to-r from-slate-50 to-blue-50">
                  <th className="py-3 px-4 font-bold uppercase">Name</th>
                  <th className="py-3 px-4 font-bold uppercase">Trigger</th>
                  <th className="py-3 px-4 font-bold uppercase">Action</th>
                  <th className="py-3 px-4 font-bold uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {rules.map(r => (
                  <tr key={r.name} className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50">
                    <td className="py-3 px-4 text-slate-700 font-bold">{r.name}</td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">{r.trigger}</td>
                    <td className="py-3 px-4 text-slate-700 font-semibold">{r.action}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 text-xs font-bold uppercase border-2 ${
                        r.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
