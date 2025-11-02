'use client'

import { useState } from 'react'

const layouts = [
  { id: 'card-grid', name: 'Card Grid' },
  { id: 'sidebar', name: 'Sidebar Layout' },
  { id: 'split', name: 'Split View' },
  { id: 'table', name: 'Compact Table' },
  { id: 'asymmetric', name: 'Asymmetric' },
  { id: 'terminal', name: 'Terminal Style' },
]

const sampleData = {
  title: 'Product Dashboard',
  metrics: [
    { label: 'Revenue', value: '$45.2K', change: '+12.5%' },
    { label: 'Users', value: '1,234', change: '+8.2%' },
    { label: 'Orders', value: '892', change: '+15.3%' },
    { label: 'Conversion', value: '3.24%', change: '+0.8%' },
  ],
  items: [
    { id: 1, name: 'Product A', status: 'Active', value: 142 },
    { id: 2, name: 'Product B', status: 'Pending', value: 98 },
    { id: 3, name: 'Product C', status: 'Active', value: 256 },
    { id: 4, name: 'Product D', status: 'Inactive', value: 67 },
  ],
}

export default function UIShowcaseDemo() {
  const [activeLayout, setActiveLayout] = useState('card-grid')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-blue-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">UI Design Showcase</h1>
              <p className="text-slate-600 mt-1">The same content rendered in different structural layouts</p>
            </div>
          </div>
          
          {/* Layout Selector */}
          <div className="flex flex-wrap gap-2">
            {layouts.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveLayout(layout.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeLayout === layout.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 border border-blue-200 hover:border-blue-400 hover:shadow'
                }`}
              >
                {layout.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeLayout === 'card-grid' && <CardGridLayout data={sampleData} />}
        {activeLayout === 'sidebar' && <SidebarLayout data={sampleData} />}
        {activeLayout === 'split' && <SplitViewLayout data={sampleData} />}
        {activeLayout === 'table' && <TableLayout data={sampleData} />}
        {activeLayout === 'asymmetric' && <AsymmetricLayout data={sampleData} />}
        {activeLayout === 'terminal' && <TerminalLayout data={sampleData} />}
      </div>
    </div>
  )
}

// Layout 1: Card Grid - Blue/Purple Professional
function CardGridLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-xl border border-blue-200 p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{data.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm text-slate-600 mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
              <div className="text-sm text-green-600 font-medium mt-1">{metric.change}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-xl border border-blue-200 p-6 border-l-[6px] border-l-blue-600">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">{item.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'Active' ? 'bg-green-100 text-green-700' :
                item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {item.status}
              </span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Layout 2: Sidebar - Teal/Cyan Modern
function SidebarLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="flex gap-6">
      <div className="w-64 flex-shrink-0 space-y-4">
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">{data.title}</h2>
          <div className="space-y-3">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-xs text-teal-100">{metric.label}</div>
                <div className="text-lg font-bold text-white">{metric.value}</div>
                <div className="text-xs text-teal-200 mt-1">{metric.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-xl border border-teal-200 p-6">
        <h3 className="text-xl font-bold text-teal-900 mb-4">Items Overview</h3>
        <div className="space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border-2 border-teal-300 hover:border-teal-500 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {item.id}
                </div>
                <div>
                  <div className="font-bold text-teal-900">{item.name}</div>
                  <div className="text-sm text-teal-600">{item.status}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-cyan-600">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Layout 3: Split View - Orange/Amber Warm
function SplitViewLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="grid grid-cols-2 gap-6 h-[600px]">
      <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl shadow-xl border-2 border-orange-300 p-6 overflow-auto">
        <h2 className="text-2xl font-bold text-orange-900 mb-6">{data.title}</h2>
        <div className="space-y-4">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
              <div className="text-sm text-orange-700 font-semibold mb-2">{metric.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-orange-900">{metric.value}</div>
                <div className="text-lg text-green-600 font-medium">{metric.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl shadow-xl border-2 border-amber-300 p-6 overflow-auto">
        <h3 className="text-2xl font-bold text-amber-900 mb-6">Product Details</h3>
        <div className="space-y-6">
          {data.items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 border-2 border-amber-300">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-bold text-amber-900">{item.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  item.status === 'Active' ? 'bg-green-100 text-green-700' :
                  item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="h-3 bg-orange-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                  style={{ width: `${(item.value / 300) * 100}%` }}
                />
              </div>
              <div className="text-right text-sm text-amber-700 font-medium mt-2">{item.value} units</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Layout 4: Compact Table - Indigo/Violet Corporate
function TableLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="bg-white rounded-xl shadow-2xl border-2 border-indigo-300 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-6">
        <h2 className="text-2xl font-bold text-white">{data.title}</h2>
        <p className="text-indigo-100 text-sm mt-1">Comprehensive data overview</p>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-violet-50/50">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="text-center bg-white rounded-lg p-4 shadow-md border-2 border-indigo-200">
              <div className="text-xs text-indigo-600 uppercase tracking-wide font-bold mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-indigo-900">{metric.value}</div>
              <div className="text-xs text-green-600 font-medium mt-1">{metric.change}</div>
            </div>
          ))}
        </div>

        <table className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-violet-500">
              <th className="text-left py-3 px-4 font-bold text-white">ID</th>
              <th className="text-left py-3 px-4 font-bold text-white">Name</th>
              <th className="text-left py-3 px-4 font-bold text-white">Status</th>
              <th className="text-right py-3 px-4 font-bold text-white">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={item.id} className={`border-b border-indigo-200 hover:bg-indigo-100 transition-colors ${idx % 2 === 0 ? 'bg-indigo-50/50' : 'bg-white'}`}>
                <td className="py-3 px-4 font-mono text-indigo-600 font-bold">{item.id}</td>
                <td className="py-3 px-4 font-bold text-indigo-900">{item.name}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Active' ? 'bg-green-100 text-green-700' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right font-bold text-violet-600 text-lg">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Layout 5: Asymmetric - Pink/Rose Creative
function AsymmetricLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 rounded-2xl shadow-2xl border-2 border-pink-300 p-6">
          <h2 className="text-2xl font-bold text-pink-900 mb-4">{data.title}</h2>
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-lg border-2 border-pink-200 hover:border-pink-400 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg transform rotate-3">
                  {metric.change}
                </div>
                <div>
                  <div className="text-xs text-pink-600 font-semibold uppercase">{metric.label}</div>
                  <div className="text-2xl font-bold text-pink-900">{metric.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-2xl p-6 text-white transform -rotate-1">
          <h3 className="text-lg font-bold mb-4">Quick Stats ⚡</h3>
          <div className="space-y-4">
            {data.items.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="text-sm text-pink-100">{item.name}</div>
                <div className="text-3xl font-bold text-white mt-1">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {data.items.map((item, idx) => (
          <div key={item.id} className={`bg-white rounded-xl shadow-xl border-2 border-pink-300 p-4 hover:scale-105 transition-transform ${idx % 2 === 0 ? 'transform rotate-1' : 'transform -rotate-1'}`}>
            <div className="text-sm text-pink-600 font-semibold mb-2">{item.name}</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">{item.value}</div>
            <div className={`text-xs font-bold ${
              item.status === 'Active' ? 'text-green-600' :
              item.status === 'Pending' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Layout 6: Terminal Style
function TerminalLayout({ data }: { data: typeof sampleData }) {
  return (
    <div className="bg-slate-900 rounded-xl shadow-2xl border-2 border-green-500 overflow-hidden font-mono">
      <div className="bg-slate-800 px-4 py-2 border-b border-green-500 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 text-green-400 text-sm">terminal@dashboard:~$</span>
      </div>
      
      <div className="p-6 space-y-4 text-green-400">
        <div>
          <span className="text-green-500">user@system:~$</span> <span className="text-white">cat {data.title.toLowerCase().replace(' ', '_')}.txt</span>
        </div>
        
        <div className="pl-4 space-y-2 text-sm">
          {data.metrics.map((metric, idx) => (
            <div key={idx}>
              <span className="text-blue-400">[METRIC]</span> {metric.label}: <span className="text-yellow-400 font-bold">{metric.value}</span> <span className="text-green-400">({metric.change})</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <span className="text-green-500">user@system:~$</span> <span className="text-white">ls -la products/</span>
        </div>

        <div className="pl-4 space-y-1 text-sm">
          {data.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <span className="text-slate-500">-rw-r--r--</span>
              <span className="text-blue-400 w-8">{item.id}</span>
              <span className={`w-20 ${
                item.status === 'Active' ? 'text-green-400' :
                item.status === 'Pending' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {item.status}
              </span>
              <span className="text-white">{item.name}</span>
              <span className="text-yellow-400 ml-auto">{item.value}KB</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <span className="text-green-500">user@system:~$</span> <span className="text-white animate-pulse">▊</span>
        </div>
      </div>
    </div>
  )
}
