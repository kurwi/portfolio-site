'use client'

import { useState } from 'react'

interface Customer {
  id: number
  name: string
  score: number
  risk: string
  logins: number
  tickets: number
  payment_delay: number
  trend: string
}

export default function CustomerScoringDemo() {
  const [activeView, setActiveView] = useState('live')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const liveScores = [
    { id: 12849, name: 'Acme Corp', score: 35, risk: 'MEDIUM', logins: 0, tickets: 2, payment_delay: 8, trend: 'declining' },
    { id: 45023, name: 'TechStart Inc', score: 89, risk: 'HIGH', logins: 1, tickets: 4, payment_delay: 15, trend: 'critical' },
    { id: 78234, name: 'GlobalTech Ltd', score: 12, risk: 'LOW', logins: 45, tickets: 0, payment_delay: 0, trend: 'healthy' },
    { id: 23456, name: 'DataFlow Systems', score: 67, risk: 'HIGH', logins: 3, tickets: 3, payment_delay: 12, trend: 'declining' },
    { id: 89012, name: 'CloudBase Co', score: 8, risk: 'LOW', logins: 52, tickets: 0, payment_delay: 0, trend: 'healthy' },
    { id: 34567, name: 'NetWorks Inc', score: 43, risk: 'MEDIUM', logins: 2, tickets: 1, payment_delay: 5, trend: 'stable' },
  ]

  const modelMetrics = {
    version: 'v2.4.1',
    auc: 0.84,
    latency_p95: 48,
    requests_today: 5247,
    accuracy: 0.81,
    champion: 'Random Forest',
    challenger: 'XGBoost'
  }

  const driftData = [
    { feature: 'login_frequency', psi: 0.08, status: 'healthy' },
    { feature: 'support_tickets', psi: 0.15, status: 'monitor' },
    { feature: 'payment_delays', psi: 0.28, status: 'alert' },
    { feature: 'feature_usage', psi: 0.11, status: 'healthy' },
  ]

  const abTest = {
    champion_auc: 0.84,
    challenger_auc: 0.86,
    traffic_split: '90/10',
    duration_days: 14,
    status: 'active'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8">
          <div className="w-28 h-28 bg-gradient-to-br from-brand-700 to-brand-900 flex items-center justify-center shadow-xl">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent mb-3">
              Customer Scoring System
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Real-Time Churn Prediction & Risk Monitoring
            </p>
            <div className="flex gap-3">
              <span className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
                Model: {modelMetrics.version}
              </span>
              <span className="inline-block bg-white border-2 border-brand-700 text-brand-700 px-5 py-2 font-bold text-sm uppercase tracking-wider">
                {modelMetrics.requests_today.toLocaleString()} Predictions Today
              </span>
            </div>
          </div>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'AUC Score', value: modelMetrics.auc.toFixed(2), sub: 'Champion Model' },
            { label: 'Latency P95', value: `${modelMetrics.latency_p95}ms`, sub: 'Real-time scoring' },
            { label: 'Accuracy', value: `${(modelMetrics.accuracy * 100).toFixed(0)}%`, sub: 'Validation set' },
            { label: 'High Risk', value: liveScores.filter(c => c.risk === 'HIGH').length.toString(), sub: 'Customers' },
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

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {['live', 'drift', 'ab-test'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`flex-1 px-6 py-4 font-black uppercase text-sm tracking-wider transition-all ${
                activeView === view
                  ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-xl'
                  : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
              }`}
            >
              {view.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Live Scoring View */}
        {activeView === 'live' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b-2 border-brand-700">
                <h2 className="text-2xl font-black uppercase text-slate-800">Real-Time Customer Scores</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {liveScores.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => setSelectedCustomer(customer)}
                      className="grid grid-cols-7 gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-t-2 border-r-2 border-b-2 transition-all cursor-pointer hover:shadow-lg border-blue-200 hover:border-brand-700"
                    >
                      <div className="col-span-2">
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Customer</div>
                        <div className="font-bold text-slate-900">{customer.name}</div>
                        <div className="text-xs text-slate-600">ID: {customer.id}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Churn Score</div>
                        <div className={`text-2xl font-black ${
                          customer.risk === 'HIGH' ? 'text-red-600' :
                          customer.risk === 'MEDIUM' ? 'text-orange-600' : 'text-green-600'
                        }`}>
                          {customer.score}%
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Risk Level</div>
                        <span className={`px-2 py-1 text-xs font-bold uppercase ${
                          customer.risk === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' :
                          customer.risk === 'MEDIUM' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 
                          'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          {customer.risk}
                        </span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Logins (14d)</div>
                        <div className="text-lg font-bold text-slate-900">{customer.logins}</div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Tickets</div>
                        <div className="text-lg font-bold text-slate-900">{customer.tickets}</div>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-1">Trend</div>
                        <div className={`text-xs font-bold uppercase ${
                          customer.trend === 'critical' ? 'text-red-600' :
                          customer.trend === 'declining' ? 'text-orange-600' :
                          customer.trend === 'stable' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {customer.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Customer Details */}
            {selectedCustomer && (
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black uppercase text-slate-900 mb-1">{selectedCustomer.name}</h3>
                    <p className="text-sm text-slate-600">Customer ID: {selectedCustomer.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedCustomer(null)}
                    className="text-slate-400 hover:text-slate-900 text-2xl font-bold"
                  >×</button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-red-600 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Churn Probability</div>
                    <div className="text-3xl font-black text-red-600">{selectedCustomer.score}%</div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Payment Delay</div>
                    <div className="text-3xl font-black text-brand-700">{selectedCustomer.payment_delay}d</div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-purple-600 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Support Tickets</div>
                    <div className="text-3xl font-black text-purple-600">{selectedCustomer.tickets}</div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brand-700 to-brand-900 text-white p-4 font-semibold">
                  <strong>Action Recommended:</strong> {
                    selectedCustomer.risk === 'HIGH' 
                      ? 'Urgent account manager outreach required. Contract renewal risk.'
                      : selectedCustomer.risk === 'MEDIUM'
                      ? 'Trigger retention campaign with personalized offer.'
                      : 'Continue standard engagement. Monitor for changes.'
                  }
                </div>
              </div>
            )}
          </div>
        )}

        {/* Drift Monitoring View */}
        {activeView === 'drift' && (
          <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b-2 border-brand-700">
              <h2 className="text-2xl font-black uppercase text-slate-800">Feature Drift Monitoring</h2>
            </div>
            <div className="p-6 space-y-4">
              {driftData.map((drift, idx) => (
                <div 
                  key={idx}
                  className={`p-5 border-l-[6px] border-t-2 border-r-2 border-b-2 ${
                    drift.status === 'alert' 
                      ? 'bg-red-50 border-red-600 border-red-200' 
                      : drift.status === 'monitor'
                      ? 'bg-yellow-50 border-yellow-600 border-yellow-200'
                      : 'bg-green-50 border-green-600 border-green-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-lg font-black text-slate-900 uppercase mb-1">{drift.feature}</div>
                      <div className="text-sm text-slate-600">Population Stability Index (PSI)</div>
                    </div>
                    
                    <div className="text-center mx-8">
                      <div className={`text-4xl font-black ${
                        drift.status === 'alert' ? 'text-red-600' :
                        drift.status === 'monitor' ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {drift.psi.toFixed(2)}
                      </div>
                    </div>

                    <div>
                      <span className={`px-4 py-2 text-sm font-bold uppercase ${
                        drift.status === 'alert' 
                          ? 'bg-red-600 text-white' 
                          : drift.status === 'monitor'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {drift.status}
                      </span>
                    </div>
                  </div>

                  {drift.status === 'alert' && (
                    <div className="mt-3 p-3 bg-white border-2 border-red-600 text-red-700 text-sm font-semibold">
                      ⚠️ PSI threshold exceeded (0.2). Feature distribution has significantly shifted. Model retraining recommended.
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-5">
                <h3 className="text-lg font-black uppercase text-slate-900 mb-3">Drift Detection Thresholds</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center p-4 bg-white border-2 border-green-200">
                    <div className="text-green-600 font-bold text-xl">PSI &lt; 0.1</div>
                    <div className="text-slate-600 font-semibold">Healthy</div>
                  </div>
                  <div className="text-center p-4 bg-white border-2 border-yellow-200">
                    <div className="text-yellow-600 font-bold text-xl">0.1 - 0.2</div>
                    <div className="text-slate-600 font-semibold">Monitor</div>
                  </div>
                  <div className="text-center p-4 bg-white border-2 border-red-200">
                    <div className="text-red-600 font-bold text-xl">PSI &gt; 0.2</div>
                    <div className="text-slate-600 font-semibold">Alert</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* A/B Test View */}
        {activeView === 'ab-test' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-b-2 border-brand-700">
                <h2 className="text-2xl font-black uppercase text-slate-800">Model A/B Testing</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Champion */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 border-l-[6px] border-blue-600 border-t-2 border-r-2 border-b-2 border-blue-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black uppercase text-slate-900">Champion</h3>
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase">90% Traffic</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">Model Type</div>
                        <div className="text-xl font-black text-slate-900">{modelMetrics.champion}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">AUC Score</div>
                        <div className="text-4xl font-black text-blue-600">{abTest.champion_auc}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">Status</div>
                        <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold uppercase">Production</span>
                      </div>
                    </div>
                  </div>

                  {/* Challenger */}
                  <div className="bg-gradient-to-br from-slate-50 to-purple-50 border-l-[6px] border-purple-600 border-t-2 border-r-2 border-b-2 border-purple-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-black uppercase text-slate-900">Challenger</h3>
                      <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold uppercase">10% Traffic</span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">Model Type</div>
                        <div className="text-xl font-black text-slate-900">{modelMetrics.challenger}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">AUC Score</div>
                        <div className="text-4xl font-black text-purple-600">{abTest.challenger_auc}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 uppercase font-bold mb-1">Status</div>
                        <span className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold uppercase">Testing</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-green-200 p-5 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-600 uppercase mb-1">Performance Improvement</div>
                      <div className="text-3xl font-black text-green-600">+2.4%</div>
                      <div className="text-sm text-slate-700 mt-1 font-semibold">Challenger outperforming by {((abTest.challenger_auc - abTest.champion_auc) * 100).toFixed(1)}%</div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-black uppercase text-sm hover:shadow-xl transition-all">
                      Promote to Production
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Test Duration</div>
                    <div className="text-2xl font-black text-slate-900">{abTest.duration_days} Days</div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-purple-600 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Predictions Tested</div>
                    <div className="text-2xl font-black text-slate-900">12.4K</div>
                  </div>
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-blue-200">
                    <div className="text-xs font-bold text-slate-500 uppercase mb-1">Confidence</div>
                    <div className="text-2xl font-black text-slate-900">95%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
