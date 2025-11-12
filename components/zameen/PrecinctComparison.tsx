'use client'

import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

const precinctData = [
  {
    name: 'P5',
    properties: 67,
    housePrice: { median: 50.0, range: '45M - 65M' },
    plotPrice: { median: 10.5, range: '8M - 13M' },
    costPerSqYd: { median: 79, range: '75K - 85K' },
    avgSize: { median: 500, range: '400 - 700 sq yd' },
  },
  {
    name: 'P6',
    properties: 68,
    housePrice: { median: 27.5, range: '20M - 35M' },
    plotPrice: { median: 5.7, range: '4M - 8M' },
    costPerSqYd: { median: 80, range: '75K - 85K' },
    avgSize: { median: 272, range: '200 - 350 sq yd' },
  },
  {
    name: 'P8',
    properties: 67,
    housePrice: { median: 29.2, range: '22M - 38M' },
    plotPrice: { median: 7.4, range: '5M - 10M' },
    costPerSqYd: { median: 79, range: '74K - 86K' },
    avgSize: { median: 272, range: '200 - 350 sq yd' },
  },
]

export function PrecinctComparison() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      {precinctData.map((precinct) => (
        <div key={precinct.name}>
          <button
            onClick={() => setExpanded(expanded === precinct.name ? null : precinct.name)}
            className="w-full border border-slate-200 p-5 rounded-lg text-left hover:border-slate-400 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Precinct {precinct.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{precinct.properties} properties analyzed</p>
              </div>
              <FiChevronDown
                size={20}
                className={`text-slate-400 transition-transform ${expanded === precinct.name ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {expanded === precinct.name && (
            <div className="border border-t-0 border-slate-200 p-5 rounded-b-lg bg-slate-50 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Median House Price</p>
                  <p className="text-xl font-bold text-slate-900 mb-1">PKR {precinct.housePrice.median}M</p>
                  <p className="text-sm text-slate-600">Range: {precinct.housePrice.range}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Median Plot Price</p>
                  <p className="text-xl font-bold text-slate-900 mb-1">PKR {precinct.plotPrice.median}M</p>
                  <p className="text-sm text-slate-600">Range: {precinct.plotPrice.range}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Cost per Sq Yard</p>
                  <p className="text-xl font-bold text-slate-900 mb-1">PKR {precinct.costPerSqYd.median}K</p>
                  <p className="text-sm text-slate-600">Range: {precinct.costPerSqYd.range}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Avg Property Size</p>
                  <p className="text-xl font-bold text-slate-900 mb-1">{precinct.avgSize.median} sq yd</p>
                  <p className="text-sm text-slate-600">Range: {precinct.avgSize.range}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
