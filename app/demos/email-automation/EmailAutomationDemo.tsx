'use client'

import { useState } from 'react'

export default function EmailAutomationDemo() {
  const [activeTab, setActiveTab] = useState('campaigns')
  const [selectedCampaign, setSelectedCampaign] = useState('welcome-series')

  const campaigns = [
    { id: 'welcome-series', name: 'Welcome Series', status: 'Active', sent: 2847, open: 68.4, click: 24.3 },
    { id: 'product-launch', name: 'Product Launch', status: 'Active', sent: 5423, open: 72.1, click: 31.2 },
    { id: 'abandoned-cart', name: 'Abandoned Cart', status: 'Active', sent: 1234, open: 45.2, click: 18.7 },
    { id: 'newsletter', name: 'Weekly Newsletter', status: 'Scheduled', sent: 0, open: 0, click: 0 },
  ]

  const templates = [
    { id: 1, name: 'Modern Welcome', category: 'Onboarding', preview: '/templates/welcome.png' },
    { id: 2, name: 'Product Showcase', category: 'Marketing', preview: '/templates/product.png' },
    { id: 3, name: 'Minimal Newsletter', category: 'Content', preview: '/templates/newsletter.png' },
    { id: 4, name: 'Flash Sale', category: 'Promotional', preview: '/templates/sale.png' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8 pb-8 border-b-4 border-brand-700">
          <div className="text-7xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 shadow-2xl border-4 border-brand-800">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-3">
              Email Automation Platform
            </h1>
            <p className="text-xl text-slate-600 font-semibold">
              AI-Powered Email Marketing & Automation System
            </p>
            <div className="inline-block mt-4 bg-gradient-to-r from-brand-600 to-brand-800 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg border-2 border-brand-800">
              Powered by NLP & Machine Learning
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Campaigns', value: '47', change: '+12%' },
            { label: 'Total Subscribers', value: '24.5K', change: '+8.3%' },
            { label: 'Avg Open Rate', value: '68.4%', change: '+5.2%' },
            { label: 'Avg Click Rate', value: '24.3%', change: '+3.1%' },
          ].map((metric, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-white to-blue-50 p-6 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-lg hover:shadow-2xl hover:translate-x-1 hover:-translate-y-1 transition-all"
            >
              <div className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-2">
                {metric.label}
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-green-600">
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8">
          {['campaigns', 'templates', 'analytics', 'ai-insights'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold uppercase text-sm tracking-wider border-2 transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-brand-600 to-brand-800 text-white border-brand-800 shadow-lg'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-white hover:border-blue-300'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-200 border-l-[6px] border-l-brand-700 shadow-lg">
              <div className="border-b-2 border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                <h2 className="text-2xl font-black uppercase text-slate-800">Active Campaigns</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-4 font-bold uppercase text-sm text-slate-600">Campaign</th>
                      <th className="text-left py-3 px-4 font-bold uppercase text-sm text-slate-600">Status</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-600">Sent</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-600">Open Rate</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-600">Click Rate</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-slate-100 hover:bg-blue-50 transition-colors cursor-pointer"
                        onClick={() => setSelectedCampaign(campaign.id)}
                      >
                        <td className="py-4 px-4 font-semibold text-slate-800">{campaign.name}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold uppercase ${
                              campaign.status === 'Active'
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-semibold">{campaign.sent.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-bold text-brand-700">{campaign.open}%</td>
                        <td className="py-4 px-4 text-right font-bold text-brand-700">{campaign.click}%</td>
                        <td className="py-4 px-4 text-right">
                          <button className="px-4 py-2 bg-gradient-to-r from-brand-600 to-brand-800 text-white font-bold text-xs uppercase border-2 border-brand-800 shadow hover:shadow-lg transition-all">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white border-2 border-slate-200 border-l-[6px] border-l-brand-700 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="bg-gradient-to-r from-slate-100 to-blue-100 h-48 flex items-center justify-center border-b-2 border-slate-200">
                  <svg className="w-24 h-24 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-black text-slate-800">{template.name}</h3>
                    <span className="px-3 py-1 bg-blue-100 text-brand-700 text-xs font-bold uppercase border border-blue-300">
                      {template.category}
                    </span>
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-800 text-white font-bold uppercase text-sm border-2 border-brand-800 shadow hover:shadow-lg transition-all">
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border-2 border-slate-200 border-l-[6px] border-l-brand-700 shadow-lg p-6">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-4">Email Performance Trends</h3>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-slate-200">
                  <div className="text-center">
                    <svg className="w-20 h-20 mx-auto text-brand-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm font-semibold text-slate-600">Interactive Chart Placeholder</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-2 border-slate-200 border-l-[6px] border-l-brand-700 shadow-lg p-6">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-4">Subscriber Growth</h3>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-slate-200">
                  <div className="text-center">
                    <svg className="w-20 h-20 mx-auto text-brand-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <div className="text-sm font-semibold text-slate-600">Interactive Chart Placeholder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-200 border-l-[6px] border-l-brand-700 shadow-lg p-6">
              <h3 className="text-xl font-black uppercase text-slate-800 mb-6 flex items-center gap-3">
                <svg className="w-8 h-8 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                AI-Powered Recommendations
              </h3>
              <div className="space-y-4">
                {[
                  { title: 'Best Send Time', value: 'Tuesday 10:00 AM', confidence: '94%' },
                  { title: 'Optimal Subject Length', value: '6-8 words', confidence: '89%' },
                  { title: 'Top Performing Content', value: 'Product Updates', confidence: '91%' },
                  { title: 'Churn Risk Subscribers', value: '342 identified', confidence: '87%' },
                ].map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-brand-300 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="font-bold text-slate-800 uppercase text-sm">{insight.title}</div>
                        <div className="text-lg font-black text-brand-700">{insight.value}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-500 uppercase">Confidence</div>
                      <div className="text-2xl font-black text-green-600">{insight.confidence}</div>
                    </div>
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
