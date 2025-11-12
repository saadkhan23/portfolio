'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const precinctData = [
  {
    name: 'P5',
    properties: 67,
    housePrice: '50.0M',
    plotPrice: '10.5M',
    costPerSqYd: '79K',
    avgSize: 500,
  },
  {
    name: 'P6',
    properties: 68,
    housePrice: '27.5M',
    plotPrice: '5.7M',
    costPerSqYd: '80K',
    avgSize: 272,
  },
  {
    name: 'P8',
    properties: 67,
    housePrice: '29.2M',
    plotPrice: '7.4M',
    costPerSqYd: '79K',
    avgSize: 272,
  },
]

export function OptionA_PrecinctTabs() {
  const [selected, setSelected] = useState('P5')
  const precinct = precinctData.find((p) => p.name === selected)

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        {precinctData.map((p) => (
          <button
            key={p.name}
            onClick={() => setSelected(p.name)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              selected === p.name
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 text-slate-600 hover:border-slate-400'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {precinct && (
        <div className="border border-slate-200 p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 text-slate-900">Precinct {precinct.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-slate-500 mb-1">Properties Analyzed</p>
              <p className="text-2xl font-bold text-slate-900">{precinct.properties}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Avg House Price</p>
              <p className="text-2xl font-bold text-slate-900">PKR {precinct.housePrice}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Avg Plot Price</p>
              <p className="text-2xl font-bold text-slate-900">PKR {precinct.plotPrice}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Cost per Sq Yd</p>
              <p className="text-2xl font-bold text-slate-900">PKR {precinct.costPerSqYd}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">Avg Property Size</p>
              <p className="text-2xl font-bold text-slate-900">{precinct.avgSize} sq yd</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function OptionB_ComparisonMatrix() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {precinctData.map((precinct) => (
        <div key={precinct.name} className="border border-slate-200 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-5 text-slate-900">Precinct {precinct.name}</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Properties</p>
              <p className="text-xl font-bold text-slate-900">{precinct.properties}</p>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">House Price</p>
              <p className="text-lg font-bold text-slate-900">PKR {precinct.housePrice}</p>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Plot Price</p>
              <p className="text-lg font-bold text-slate-900">PKR {precinct.plotPrice}</p>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cost/Sq Yd</p>
              <p className="text-lg font-bold text-slate-900">PKR {precinct.costPerSqYd}</p>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Avg Size</p>
              <p className="text-lg font-bold text-slate-900">{precinct.avgSize} sq yd</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function OptionC_InteractiveToggle() {
  const [metric, setMetric] = useState('housePrice')

  const metrics = [
    { key: 'housePrice', label: 'Avg House Price', format: (p: typeof precinctData[0]) => `PKR ${p.housePrice}` },
    { key: 'plotPrice', label: 'Avg Plot Price', format: (p: typeof precinctData[0]) => `PKR ${p.plotPrice}` },
    { key: 'costPerSqYd', label: 'Cost per Sq Yd', format: (p: typeof precinctData[0]) => `PKR ${p.costPerSqYd}` },
    { key: 'avgSize', label: 'Avg Property Size', format: (p: typeof precinctData[0]) => `${p.avgSize} sq yd` },
  ]

  const currentMetric = metrics.find((m) => m.key === metric)

  return (
    <div className="space-y-6">
      <div className="relative inline-block w-full md:w-64">
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white cursor-pointer font-medium text-slate-900"
        >
          {metrics.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={20} />
      </div>

      <div className="border border-slate-200 p-8 rounded-lg">
        <h3 className="text-lg font-bold mb-8 text-slate-900">{currentMetric?.label}</h3>

        <div className="space-y-6">
          {precinctData.map((precinct) => {
            const value = currentMetric?.format(precinct)
            // Simple bar width calculation for visualization
            const maxWidth = metric === 'housePrice' ? 50 : metric === 'plotPrice' ? 10.5 : metric === 'costPerSqYd' ? 80 : 500
            const precinctValue = metric === 'housePrice' ? parseFloat(precinct.housePrice) : metric === 'plotPrice' ? parseFloat(precinct.plotPrice) : metric === 'costPerSqYd' ? parseFloat(precinct.costPerSqYd) : precinct.avgSize
            const barPercentage = (precinctValue / maxWidth) * 100

            return (
              <div key={precinct.name}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-bold text-slate-900">Precinct {precinct.name}</span>
                  <span className="text-lg font-bold text-slate-900">{value}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-slate-900 h-2 rounded-full transition-all"
                    style={{ width: `${barPercentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
