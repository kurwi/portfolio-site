'use client'

import { useState } from 'react'

export default function TradingBotDemo() {
  const [activeTab, setActiveTab] = useState('overview')

  const positions = [
    { symbol: 'AAPL', side: 'LONG', size: 120, pnl: '+$1,240', change: '+3.2%' },
    { symbol: 'MSFT', side: 'LONG', size: 80, pnl: '+$560', change: '+1.8%' },
    { symbol: 'TSLA', side: 'SHORT', size: 40, pnl: '-$220', change: '-2.1%' },
    { symbol: 'NVDA', side: 'LONG', size: 60, pnl: '+$890', change: '+4.5%' },
  ]

  const trades = [
    { time: '14:23:45', symbol: 'AAPL', action: 'BUY', qty: 20, price: '$178.45' },
    { time: '14:18:12', symbol: 'MSFT', action: 'BUY', qty: 15, price: '$412.30' },
    { time: '13:45:33', symbol: 'TSLA', action: 'SELL', qty: 10, price: '$235.80' },
    { time: '13:12:08', symbol: 'NVDA', action: 'BUY', qty: 12, price: '$875.20' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="flex items-center gap-8 mb-8 pb-8 border-b-4 border-brand-700">
          <div className="text-7xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 shadow-2xl border-4 border-brand-800">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-brand-600 to-brand-800 bg-clip-text text-transparent mb-3">
              RL Trading Bot
            </h1>
            <p className="text-xl text-slate-600 font-semibold">
              AI-Powered Trading System with Reinforcement Learning
            </p>
            <div className="inline-block mt-4 bg-gradient-to-r from-brand-600 to-brand-800 text-white px-5 py-2 font-bold text-sm uppercase tracking-wider shadow-lg border-2 border-brand-800">
              Powered by PPO & Deep RL
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Annual Return', value: '15%', change: '+2.3%' },
            { label: 'Sharpe Ratio', value: '1.4', change: '+0.2' },
            { label: 'Max Drawdown', value: '-12%', change: 'Improved' },
            { label: 'Win Rate', value: '58%', change: '+4.1%' },
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
          {['overview', 'backtest', 'risk', 'actions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 font-bold uppercase text-sm tracking-wider border-2 transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-brand-600 to-brand-800 text-white border-brand-800 shadow-lg'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-white hover:border-blue-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Portfolio Performance */}
              <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
                <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                  Portfolio Performance
                </h3>
                <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 flex items-center justify-center text-slate-600 font-semibold">
                  Equity Curve Chart Placeholder
                </div>
              </div>

              {/* Recent Trades */}
              <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
                <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                  Recent Trades
                </h3>
                <div className="space-y-3">
                  {trades.map((trade, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-brand-600 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 font-semibold">{trade.time}</span>
                        <span className="text-base font-black text-slate-900">{trade.symbol}</span>
                        <span className={`px-3 py-1 text-xs font-bold uppercase ${
                          trade.action === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.action}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-600 font-semibold">{trade.qty} shares</span>
                        <span className="text-base font-bold text-slate-900">{trade.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Open Positions */}
              <div className="bg-white p-6 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 mb-4 pb-3 border-b-2 border-brand-700">
                  Open Positions
                </h3>
                <div className="space-y-3">
                  {positions.map((pos) => (
                    <div
                      key={pos.symbol}
                      className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border-l-4 border-brand-600"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-black text-slate-900">{pos.symbol}</span>
                        <span className={`px-2 py-1 text-xs font-bold ${
                          pos.side === 'LONG' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {pos.side}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-semibold">{pos.size} shares</span>
                        <span className={`font-bold ${pos.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {pos.pnl}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{pos.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Status */}
              <div className="bg-white p-6 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 mb-4 pb-3 border-b-2 border-brand-700">
                  Strategy Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600">Mode</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase">LIVE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600">Algorithm</span>
                    <span className="text-sm font-bold text-slate-900">PPO</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600">Uptime</span>
                    <span className="text-sm font-bold text-slate-900">12d 4h 23m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-slate-600">Total Trades</span>
                    <span className="text-sm font-bold text-slate-900">347</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backtest Tab */}
        {activeTab === 'backtest' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                Backtest Performance
              </h3>
              <div className="h-96 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 flex items-center justify-center text-slate-600 font-semibold">
                Strategy vs Benchmark Chart Placeholder
              </div>
            </div>
            <div className="bg-white p-6 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-lg font-black uppercase tracking-wide text-slate-900 mb-4 pb-3 border-b-2 border-brand-700">
                Backtest Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Return', value: '+85.3%' },
                  { label: 'CAGR', value: '15.0%' },
                  { label: 'Volatility', value: '18.2%' },
                  { label: 'Sharpe', value: '1.42' },
                  { label: 'Max DD', value: '-12.1%' },
                  { label: 'Calmar', value: '1.24' },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center p-3 bg-gradient-to-r from-slate-50 to-blue-50">
                    <span className="text-sm font-bold text-slate-600 uppercase">{stat.label}</span>
                    <span className="text-lg font-black text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Risk Tab */}
        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                Risk Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Value at Risk (95%)', value: '-$2,340', color: 'text-red-600' },
                  { label: 'Portfolio Beta', value: '0.92', color: 'text-slate-900' },
                  { label: 'Position Concentration', value: '32%', color: 'text-amber-600' },
                  { label: 'Daily Volatility', value: '1.8%', color: 'text-slate-900' },
                  { label: 'Margin Usage', value: '24%', color: 'text-green-600' },
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-brand-600">
                    <span className="text-sm font-bold text-slate-600 uppercase">{metric.label}</span>
                    <span className={`text-xl font-black ${metric.color}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                Risk Distribution
              </h3>
              <div className="h-80 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200 flex items-center justify-center text-slate-600 font-semibold">
                Returns Histogram Placeholder
              </div>
            </div>
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                Manual Control
              </h3>
              <div className="space-y-4">
                <button className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold uppercase tracking-wider border-2 border-green-800 shadow-lg hover:shadow-xl hover:translate-x-1 transition-all">
                  Start Trading
                </button>
                <button className="w-full py-4 px-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold uppercase tracking-wider border-2 border-red-800 shadow-lg hover:shadow-xl hover:translate-x-1 transition-all">
                  Stop Trading
                </button>
                <button className="w-full py-4 px-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold uppercase tracking-wider border-2 border-amber-800 shadow-lg hover:shadow-xl hover:translate-x-1 transition-all">
                  Close All Positions
                </button>
                <button className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 to-brand-800 text-white font-bold uppercase tracking-wider border-2 border-brand-900 shadow-lg hover:shadow-xl hover:translate-x-1 transition-all">
                  Retrain Model
                </button>
              </div>
            </div>
            <div className="bg-white p-8 border-l-[6px] border-brand-700 border-t-2 border-r-2 border-b-2 border-blue-200 shadow-xl">
              <h3 className="text-xl font-black uppercase tracking-wide text-slate-900 mb-6 pb-3 border-b-2 border-brand-700">
                Recent Actions
              </h3>
              <div className="space-y-3">
                {[
                  { time: '14:45:12', action: 'Model retraining completed', status: 'success' },
                  { time: '12:30:05', action: 'Position limit adjusted', status: 'info' },
                  { time: '10:15:33', action: 'Risk alert: High volatility', status: 'warning' },
                  { time: '09:00:01', action: 'Trading session started', status: 'success' },
                ].map((log, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 border-l-4 border-brand-600">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900">{log.action}</div>
                        <div className="text-xs text-slate-500 mt-1">{log.time}</div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-bold uppercase ${
                        log.status === 'success' ? 'bg-green-100 text-green-800' :
                        log.status === 'warning' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.status}
                      </span>
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
