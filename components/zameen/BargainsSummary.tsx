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
  return match ? `Precinct ${match[1]}` : precinctKey
}

const getPrecinctShortLabel = (precinctKey: string): string => {
  const match = precinctKey.match(/precinct_(\d+)/)
  return match ? `P${match[1]}` : precinctKey
}

// Calculate percentage below median for a bargain
const calculatePercentBelowMedian = (bargainData: TopBargainData[], precinctMedian: number): number => {
  if (precinctMedian <= 0) return 0
  return ((precinctMedian - bargainData.price_per_sq_yd) / precinctMedian) * 100
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
    displayLabel: getPrecinctShortLabel(item.precinct),
    bargain_pct: item.bargain_pct,
  }))

  // Top 5 bargains
  const topFiveBargains = useMemo(() => {
    return topBargains.slice(0, 5)
  }, [topBargains])

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-50 mb-3">Where are the genuine bargains?</h3>
        <p className="text-slate-300">
          Not every cheap listing is a bargain. Some are small, awkwardly located, or need a full gut renovation. Here, a "bargain" is a house that&apos;s both below the typical price per square yard and unusually cheap compared to other homes in the same precinct. These are the listings where something interesting is happening — and where an investor should probably look twice.
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-12 gap-8">
        <div className="flex justify-center md:justify-start flex-shrink-0">
          <div className="w-56 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={overallStats.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={105}
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
        </div>
        <div className="flex-1">
          <p className="text-5xl font-bold text-sky-400">
            ≈{overallStats.bargainPct.toFixed(0)}%
          </p>
          <p className="text-base text-slate-300 mt-2">of homes flagged as bargains</p>
          <p className="text-xs text-slate-500 mt-3">
            {overallStats.totalBargains} of {overallStats.totalHouses} properties
          </p>
          <p className="text-slate-300 mt-8 leading-relaxed">
            Roughly one in four homes in this sample is statistically underpriced. That&apos;s not a gut feel — it&apos;s based on how far each property sits below the local going rate for its size in that precinct.
          </p>
        </div>
      </div>

      {/* Comparison bars */}
      <div>
        <h4 className="text-sm font-bold text-slate-200 mb-4">Bargain % by Precinct</h4>
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
          <h4 className="text-base font-bold text-slate-50 mb-4">Top 5 Most Underpriced</h4>
          <div className="overflow-x-auto border border-slate-700 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-slate-700 border-b border-slate-600">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold text-slate-100">Precinct</th>
                  <th className="px-5 py-4 text-right font-semibold text-slate-100">Price</th>
                  <th className="px-5 py-4 text-right font-semibold text-slate-100">Size (sq yd)</th>
                  <th className="px-5 py-4 text-right font-semibold text-slate-100">Price/sq yd</th>
                  <th className="px-5 py-4 text-right font-semibold text-slate-100">% Below Typical</th>
                </tr>
              </thead>
              <tbody>
                {topFiveBargains.map((bargain, idx) => {
                  const precintMedian = bargainsSummary.find(p => p.precinct === bargain.precinct)?.median_price_per_sq_yd || 0
                  const percentBelow = calculatePercentBelowMedian(bargain, precintMedian)
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-850'}>
                      <td className="px-5 py-4 text-slate-50 font-medium">
                        {getPrecinctLabel(bargain.precinct)}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-300">
                        {formatPkPrice(bargain.price)}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-300">
                        {bargain.size_sq_yd.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right text-slate-300">
                        {Math.round(bargain.price_per_sq_yd).toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <span className="font-bold text-green-400 text-base">
                          −{percentBelow.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
