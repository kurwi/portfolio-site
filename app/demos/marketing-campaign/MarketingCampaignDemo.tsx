'use client'

import { useState } from 'react'
import { useLanguageCtx } from '@/contexts/LanguageCtx'

export default function MarketingCampaignDemo() {
  const { locale } = useLanguageCtx()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [dateRange, setDateRange] = useState('30d')
  const [sortBy, setSortBy] = useState('roi')

  const campaigns = [
    { id: 1, name: 'Summer Sale 2024', channel: 'Email', budget: 45000, spent: 42300, roi: 385, status: 'Completed', conversions: 1234 },
    { id: 2, name: 'Black Friday Promo', channel: 'Social Media', budget: 78000, spent: 75200, roi: 512, status: 'Active', conversions: 2847 },
    { id: 3, name: 'Product Launch Q3', channel: 'Paid Search', budget: 120000, spent: 98500, roi: 287, status: 'Active', conversions: 1893 },
    { id: 4, name: 'Brand Awareness', channel: 'Display Ads', budget: 55000, spent: 51200, roi: 156, status: 'Completed', conversions: 876 },
  ]

  const channels = [
    { name: 'Email', spend: 42300, conversions: 1234, ctr: 3.8, cpc: 2.45 },
    { name: 'Social Media', spend: 75200, conversions: 2847, ctr: 4.2, cpc: 1.87 },
    { name: 'Paid Search', spend: 98500, conversions: 1893, ctr: 5.1, cpc: 3.12 },
    { name: 'Display Ads', spend: 51200, conversions: 876, ctr: 2.3, cpc: 1.56 },
  ]

  const insights = [
    { title: 'Best Performing Channel', value: 'Paid Search', metric: '5.1% CTR', color: 'green' },
    { title: 'Highest ROI Campaign', value: 'Black Friday Promo', metric: '512% ROI', color: 'green' },
    { title: 'Budget Optimization', value: 'Reallocate $15K', metric: 'From Display to Social', color: 'yellow' },
    { title: 'Underperforming', value: 'Brand Awareness', metric: '156% ROI', color: 'red' },
  ]

  const audienceSegments = [
    { name: 'Young Professionals', size: 45000, engagement: 72, conversion: 3.8 },
    { name: 'Enterprise Decision Makers', size: 12000, engagement: 68, conversion: 5.2 },
    { name: 'Small Business Owners', size: 28000, engagement: 65, conversion: 4.1 },
    { name: 'Tech Enthusiasts', size: 34000, engagement: 81, conversion: 6.3 },
  ]

  const conversionFunnels = [
    { stage: 'Ad Impressions', count: 450000, rate: 100 },
    { stage: 'Clicks', count: 18000, rate: 4 },
    { stage: 'Landing Page', count: 15200, rate: 84.4 },
    { stage: 'Add to Cart', count: 3800, rate: 25 },
    { stage: 'Purchase', count: 2156, rate: 56.7 },
  ]

  const attributionModels = [
    { model: 'First Touch', email: 22, social: 18, search: 35, display: 25 },
    { model: 'Last Touch', email: 28, social: 35, search: 22, display: 15 },
    { model: 'Linear', email: 25, social: 26, search: 29, display: 20 },
    { model: 'Time Decay', email: 24, social: 29, search: 31, display: 16 },
  ]

  const competitorAnalysis = [
    { competitor: 'Competitor A', avgCPC: 2.15, avgCTR: 3.2, conversionRate: 2.8 },
    { competitor: 'Competitor B', avgCPC: 2.89, avgCTR: 2.9, conversionRate: 2.1 },
    { competitor: 'Your Company', avgCPC: 2.45, avgCTR: 3.8, conversionRate: 3.4 },
    { competitor: 'Competitor C', avgCPC: 1.95, avgCTR: 2.5, conversionRate: 1.9 },
  ]

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
              Marketing Campaign Analysis
            </h1>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              Multi-Channel Performance Tracking & Attribution Modeling
            </p>
            <div className="inline-block bg-gradient-to-r from-brand-700 to-brand-900 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg">
              Powered by Real-Time Analytics
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Budget', value: '$298K', change: '+15%' },
            { label: 'Total Spend', value: '$267.2K', change: '+12%' },
            { label: 'Total Conversions', value: '6,850', change: '+24%' },
            { label: 'Avg ROI', value: '335%', change: '+18%' },
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
              <div className="text-sm font-semibold text-green-600">
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2 overflow-x-auto">
            {['overview', 'campaigns', 'channels', 'funnel', 'attribution', 'competitor', 'audience', 'ai-insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-black uppercase text-sm tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-brand-700 to-brand-900 text-white shadow-xl'
                    : 'bg-white text-slate-700 border-2 border-blue-200 hover:border-brand-700'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="bg-white border-2 border-blue-200 shadow-lg p-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 uppercase">Date Range:</span>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border-2 border-blue-200 bg-white font-bold uppercase text-sm hover:border-brand-700 transition-all"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="365d">Last Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-blue-200 bg-white font-bold uppercase text-sm hover:border-brand-700 transition-all"
              >
                <option value="roi">ROI</option>
                <option value="spend">Spend</option>
                <option value="conversions">Conversions</option>
                <option value="ctr">CTR</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-700 uppercase">Channel:</span>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="px-4 py-2 border-2 border-blue-200 bg-white font-bold uppercase text-sm hover:border-brand-700 transition-all"
              >
                <option value="all">All Channels</option>
                <option value="email">Email</option>
                <option value="social">Social Media</option>
                <option value="search">Paid Search</option>
                <option value="display">Display Ads</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-4 pb-2 border-b-2 border-brand-700">Campaign Performance Overview</h3>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                  <div className="text-center">
                    <div className="text-5xl mb-4 text-brand-700">
                      <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-slate-600">ROI Trend Chart</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-4 pb-2 border-b-2 border-brand-700">Budget Allocation</h3>
                <div className="h-64 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center border-2 border-blue-100">
                  <div className="text-center">
                    <div className="text-5xl mb-4 text-brand-700">
                      <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-slate-600">Spend by Channel</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                <h2 className="text-2xl font-black uppercase text-slate-800">Active & Recent Campaigns</h2>
              </div>
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left py-3 px-4 font-bold uppercase text-sm text-slate-700">Campaign</th>
                      <th className="text-left py-3 px-4 font-bold uppercase text-sm text-slate-700">Channel</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-700">Budget</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-700">Spent</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-700">ROI</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-sm text-slate-700">Conversions</th>
                      <th className="text-left py-3 px-4 font-bold uppercase text-sm text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr
                        key={campaign.id}
                        className="border-b border-blue-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-4 px-4 font-semibold text-slate-800">{campaign.name}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-50 text-brand-700 text-xs font-bold uppercase border border-blue-200">
                            {campaign.channel}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-semibold text-slate-700">${campaign.budget.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-semibold text-slate-700">${campaign.spent.toLocaleString()}</td>
                        <td className="py-4 px-4 text-right font-bold text-green-600">{campaign.roi}%</td>
                        <td className="py-4 px-4 text-right font-bold text-brand-700">{campaign.conversions.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 text-xs font-bold uppercase ${
                              campaign.status === 'Active'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-slate-50 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Channels Tab */}
        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                <h2 className="text-2xl font-black uppercase text-slate-800">Channel Performance Comparison</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-4 gap-6">
                  {channels.map((channel, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-black uppercase text-slate-800 mb-4 pb-2 border-b-2 border-brand-700">{channel.name}</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase">Total Spend</div>
                          <div className="text-2xl font-black text-slate-800">${(channel.spend / 1000).toFixed(1)}K</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase">Conversions</div>
                          <div className="text-2xl font-black text-brand-700">{channel.conversions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase">CTR</div>
                          <div className="text-2xl font-black text-green-600">{channel.ctr}%</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase">CPC</div>
                          <div className="text-xl font-black text-slate-700">${channel.cpc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Conversion Funnel Tab */}
        {activeTab === 'funnel' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h2 className="text-2xl font-black uppercase text-slate-800 mb-6 pb-2 border-b-2 border-brand-700">Conversion Funnel Analysis</h2>
              <div className="space-y-4">
                {conversionFunnels.map((stage, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">{stage.stage}</span>
                      <div className="flex gap-3 items-center">
                        <span className="text-sm font-bold text-slate-600">{stage.count.toLocaleString()}</span>
                        <span className="px-3 py-1 bg-blue-50 text-brand-700 text-xs font-bold border border-blue-200">{stage.rate}%</span>
                      </div>
                    </div>
                    <div className="h-8 bg-gradient-to-r from-slate-100 to-blue-50 rounded-full overflow-hidden border-2 border-blue-200">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-700 to-brand-900 transition-all duration-500"
                        style={{width: `${stage.rate}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-green-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">Overall Conversion Rate</div>
                <div className="text-4xl font-black text-green-600 mb-2">0.48%</div>
                <p className="text-sm text-slate-600 font-semibold">2,156 conversions from 450,000 impressions</p>
              </div>
              <div className="bg-white border-l-[6px] border-orange-600 border-t-2 border-r-2 border-b-2 border-orange-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">Biggest Drop-off</div>
                <div className="text-lg font-black text-orange-600 mb-2">Add to Cart → Purchase</div>
                <p className="text-sm text-slate-600 font-semibold">43.3% drop (1,644 abandoned)</p>
              </div>
              <div className="bg-white border-l-[6px] border-blue-600 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">Best Performing Stage</div>
                <div className="text-lg font-black text-blue-600 mb-2">Landing Page</div>
                <p className="text-sm text-slate-600 font-semibold">84.4% proceed to next stage</p>
              </div>
            </div>
          </div>
        )}

        {/* Attribution Modeling Tab */}
        {activeTab === 'attribution' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h2 className="text-2xl font-black uppercase text-slate-800 mb-6 pb-2 border-b-2 border-brand-700">Multi-Touch Attribution Models</h2>
              <div className="grid grid-cols-4 gap-6">
                {attributionModels.map((model, idx) => (
                  <div key={idx} className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-4">
                    <h3 className="font-bold text-slate-900 uppercase text-sm mb-4 pb-2 border-b-2 border-brand-700">{model.model}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">Email</span>
                        <span className="font-bold text-brand-700">{model.email}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">Social</span>
                        <span className="font-bold text-green-600">{model.social}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">Search</span>
                        <span className="font-bold text-blue-600">{model.search}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700 font-semibold">Display</span>
                        <span className="font-bold text-orange-600">{model.display}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-[6px] border-purple-600 border-t-2 border-r-2 border-b-2 border-purple-200 shadow-xl p-6">
              <h3 className="font-black uppercase text-slate-900 mb-4">Attribution Insights</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white border-2 border-purple-200 rounded">
                  <div className="font-bold text-slate-900 mb-1">Email performs best in first-touch scenarios</div>
                  <p className="text-sm text-slate-600 font-semibold">22% attribution increases to 28% in last-touch model</p>
                </div>
                <div className="p-3 bg-white border-2 border-purple-200 rounded">
                  <div className="font-bold text-slate-900 mb-1">Search builds on social intent</div>
                  <p className="text-sm text-slate-600 font-semibold">Social drives discovery, Search captures intent (29% last-touch)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Competitor Analysis Tab */}
        {activeTab === 'competitor' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                <h2 className="text-2xl font-black uppercase text-slate-800">Competitive Benchmarking</h2>
              </div>
              <div className="p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left py-3 px-4 font-bold uppercase text-slate-700">Company</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-slate-700">Avg CPC</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-slate-700">Avg CTR</th>
                      <th className="text-right py-3 px-4 font-bold uppercase text-slate-700">Conversion Rate</th>
                      <th className="text-center py-3 px-4 font-bold uppercase text-slate-700">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorAnalysis.map((comp, idx) => (
                      <tr key={idx} className={`border-b border-blue-100 ${comp.competitor === 'Your Company' ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'hover:bg-slate-50'}`}>
                        <td className={`py-4 px-4 font-bold ${comp.competitor === 'Your Company' ? 'text-green-700' : 'text-slate-800'}`}>
                          {comp.competitor}
                        </td>
                        <td className="py-4 px-4 text-right font-semibold text-slate-700">${comp.avgCPC}</td>
                        <td className="py-4 px-4 text-right font-bold text-brand-700">{comp.avgCTR}%</td>
                        <td className={`py-4 px-4 text-right font-bold ${
                          comp.conversionRate > 3 ? 'text-green-600' : comp.conversionRate > 2 ? 'text-blue-600' : 'text-slate-600'
                        }`}>{comp.conversionRate}%</td>
                        <td className="py-4 px-4 text-center">
                          {comp.competitor === 'Your Company' ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 font-bold text-xs uppercase border border-green-300">1st</span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold text-xs uppercase border border-slate-200">{idx > 0 ? idx + 1 : 2}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white border-l-[6px] border-green-600 border-t-2 border-r-2 border-b-2 border-green-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">Your Advantage</div>
                <div className="text-2xl font-black text-green-600 mb-2">+0.6%</div>
                <p className="text-sm text-slate-600 font-semibold">Higher CTR than closest competitor</p>
              </div>
              <div className="bg-white border-l-[6px] border-blue-600 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">CPC Position</div>
                <div className="text-2xl font-black text-blue-600 mb-2">Median</div>
                <p className="text-sm text-slate-600 font-semibold">$2.45 avg vs industry $2.30</p>
              </div>
              <div className="bg-white border-l-[6px] border-purple-600 border-t-2 border-r-2 border-b-2 border-purple-200 shadow-xl p-6">
                <div className="text-xs font-bold text-slate-600 uppercase mb-2">Market Share</div>
                <div className="text-2xl font-black text-purple-600 mb-2">3.4%</div>
                <p className="text-sm text-slate-600 font-semibold">Highest conversion rate among peers</p>
              </div>
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === 'audience' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <div className="border-b-2 border-brand-700 bg-gradient-to-r from-slate-50 to-blue-50 p-4">
                <h2 className="text-2xl font-black uppercase text-slate-800">Audience Segment Analysis</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  {audienceSegments.map((segment, idx) => (
                    <div
                      key={idx}
                      className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 p-6 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-xl font-black uppercase text-slate-800 mb-4 pb-2 border-b-2 border-brand-700">{segment.name}</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase mb-1">Audience Size</div>
                          <div className="text-2xl font-black text-brand-700">{(segment.size / 1000).toFixed(0)}K</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase mb-1">Engagement</div>
                          <div className="text-2xl font-black text-green-600">{segment.engagement}%</div>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-600 uppercase mb-1">Conversion</div>
                          <div className="text-2xl font-black text-slate-800">{segment.conversion}%</div>
                        </div>
                      </div>
                      <button className="w-full mt-4 py-2 bg-gradient-to-r from-brand-700 to-brand-900 text-white font-bold text-xs uppercase shadow hover:shadow-xl transition-all">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-6">
            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="text-xl font-black uppercase text-slate-800 mb-6 pb-2 border-b-2 border-brand-700">
                AI-Powered Campaign Insights
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-brand-700 uppercase text-xs mb-1">{insight.title}</div>
                      <div className="text-lg font-black text-slate-800 mb-1">{insight.value}</div>
                      <div className="text-sm font-semibold text-slate-600">{insight.metric}</div>
                    </div>
                    <div
                      className={`px-3 py-1 text-xs font-bold uppercase ${
                        insight.color === 'green'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : insight.color === 'yellow'
                          ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      {insight.color === 'green' ? 'Excellent' : insight.color === 'yellow' ? 'Action' : 'Review'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl p-6">
              <h3 className="text-xl font-black uppercase text-slate-800 mb-4 pb-2 border-b-2 border-brand-700">Recommended Actions</h3>
              <div className="space-y-3">
                {[
                  'Increase budget for Paid Search by 20% - highest CTR potential',
                  'Reduce Display Ads spending by $10K - lowest ROI performance',
                  'Launch retargeting campaign for abandoned carts - 45% recovery rate expected',
                  'A/B test Social Media creative variations - potential 15% CTR improvement',
                ].map((action, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200"
                  >
                    <span className="text-brand-700 text-xl font-black">{idx + 1}</span>
                    <p className="flex-1 text-slate-700 font-semibold">{action}</p>
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

