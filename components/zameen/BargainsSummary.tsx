'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'

interface BargainSummaryData {
  precinct: string
  n_houses: number
  n_bargains: number
  bargain_pct: number
  median_price_per_sq_yd: number
  std_price_per_sq_yd: number
  min_bargain_price_per_sq_yd: number
  max_bargain_price_per_sq_yd: number
}

interface TopBargainData {
  precinct: string
  price: number
  size_sq_yd: number
  price_per_sq_yd: number
  z_score: number
  is_bargain: number
}

interface Props {
  bargainsSummary: BargainSummaryData[]
  topBargains: TopBargainData[]
}

// Format helpers
const formatPkPrice = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M PKR`
  }
  return `${value.toLocaleString()} PKR`
}

const formatPkPerSqYd = (value: number): string => {
  return `${value.toLocaleString()} PKR/sq yd`
}

const getPrecinctLabel = (precinctKey: string): string => {
  const match = precinctKey.match(/precinct_(\d+)/)
  return match ? `P${match[1]}` : precinctKey
}

const COLORS = ['#ef4444', '#f3f4f6'] // Red for bargains, gray for others

export function BargainsSummary({ bargainsSummary, topBargains }: Props) {
  if (!bargainsSummary || bargainsSummary.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  // Calculate overall bargain percentage
  const overallStats = useMemo(() => {
    const totalBargains = bargainsSummary.reduce((sum, p) => sum + p.n_bargains, 0)
    const totalHouses = bargainsSummary.reduce((sum, p) => sum + p.n_houses, 0)
    const bargainPct = totalHouses > 0 ? (totalBargains / totalHouses) * 100 : 0

    return {
      totalBargains,
      totalHouses,
      bargainPct,
      pieData: [
        { name: 'Bargains', value: totalBargains },
        { name: 'Other', value: totalHouses - totalBargains },
      ],
    }
  }, [bargainsSummary])

  // Data for comparison bars
  const comparisonData = bargainsSummary.map((item) => ({
    displayLabel: getPrecinctLabel(item.precinct),
    bargain_pct: item.bargain_pct,
  }))

  // Top 5 bargains
  const topFiveBargains = useMemo(() => {
    return topBargains.slice(0, 5)
  }, [topBargains])

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Where are the genuine bargains?</h3>
        <p className="text-slate-600 mb-6">
          A bargain here is a house that is both below the precinct median price per sq yd and at least 0.8 standard deviations cheaper than the local norm.
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={overallStats.pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {overallStats.pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-3xl font-bold text-slate-900">
            ≈{overallStats.bargainPct.toFixed(0)}%
          </p>
          <p className="text-sm text-slate-600">of houses are bargains</p>
          <p className="text-xs text-slate-500 mt-2">
            {overallStats.totalBargains} of {overallStats.totalHouses} properties
          </p>
        </div>
      </div>

      {/* Comparison bars */}
      <div>
        <h4 className="text-sm font-bold text-slate-900 mb-4">Bargain % by Precinct</h4>
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="displayLabel"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(value: any) => `${Number(value).toFixed(2)}%`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px',
                }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Bar
                dataKey="bargain_pct"
                fill="#f97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 Bargains Table */}
      {topFiveBargains && topFiveBargains.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-4">Top 5 Most Underpriced</h4>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-3 py-2 text-left font-medium text-slate-700">Precinct</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-700">Price</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-700">Size (sq yd)</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-700">Price/sq yd</th>
                  <th className="px-3 py-2 text-right font-medium text-slate-700">Z-Score</th>
                </tr>
              </thead>
              <tbody>
                {topFiveBargains.map((bargain, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-3 py-2 text-slate-900 font-medium">
                      {getPrecinctLabel(bargain.precinct)}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {formatPkPrice(bargain.price)}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {bargain.size_sq_yd.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {formatPkPerSqYd(bargain.price_per_sq_yd)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      <span className="font-bold text-green-600">
                        {bargain.z_score.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3 italic">
            Z-score measures how many standard deviations below the precinct's typical price a house sits. More negative = deeper discount.
          </p>
        </div>
      )}
    </div>
  )
}
