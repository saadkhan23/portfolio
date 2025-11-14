'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

interface ConstructionCostData {
  precinct: string
  median_cost_per_sq_yd: number
  p25_cost_per_sq_yd: number
  p75_cost_per_sq_yd: number
  n_properties: number
}

interface Props {
  data: ConstructionCostData[]
}

// Format helpers
const formatPkPerSqYdShort = (value: number): string => {
  return `${(value / 1000).toFixed(0)}k`
}

const formatPkPerSqYdLong = (value: number): string => {
  return `${value.toLocaleString()} PKR per sq yd`
}

const getPrecinctLabel = (precinctKey: string): string => {
  const match = precinctKey.match(/precinct_(\d+)/)
  return match ? `Precinct ${match[1]}` : precinctKey
}

const getPrecinctShortLabel = (precinctKey: string): string => {
  const match = precinctKey.match(/precinct_(\d+)/)
  return match ? `P${match[1]}` : precinctKey
}

interface CustomTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  chartData?: any[]
}

const CustomTooltip = ({ active, payload, label, chartData }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = chartData?.find(d => d.shortLabel === label)
    const precintName = item?.displayLabel || label
    const value = payload[0].value

    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded text-slate-200 text-xs">
        <p className="font-medium">{precintName}</p>
        <p>{formatPkPerSqYdShort(value)} PKR/sq yd</p>
      </div>
    )
  }
  return null
}

export function ConstructionCostChartFromData({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  // Transform data for chart
  const chartData = data.map((item) => ({
    ...item,
    displayLabel: getPrecinctLabel(item.precinct),
    shortLabel: getPrecinctShortLabel(item.precinct),
  }))

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-50 mb-3">What does it cost to build a house?</h3>
        <p className="text-slate-300">
          Across all three precincts, construction costs are surprisingly boring — and that&apos;s the interesting part. Typical homes land in the 70–80k PKR per square yard range. In each precinct, about half of all houses sit inside a fairly tight band — for example, Precinct 5 has 50% of homes between 64k and 83k PKR/sq yd. That tells us most of the price noise in Bahria Town comes from land and seller expectations, not wildly different build quality.
        </p>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 100, left: 80, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="5 5" stroke="#475569" horizontal={false} />
            <XAxis
              type="number"
              stroke="#64748b"
              tickFormatter={formatPkPerSqYdShort}
              tick={{ fontSize: 14, fill: '#94a3b8' }}
            />
            <YAxis
              dataKey="shortLabel"
              type="category"
              stroke="#64748b"
              tick={{ fontSize: 15, fill: '#94a3b8', fontWeight: 500 }}
              width={70}
            />
            <Tooltip
              content={<CustomTooltip chartData={chartData} />}
              cursor={{ fill: '#334155' }}
            />

            {/* Main bar: median */}
            <Bar
              dataKey="median_cost_per_sq_yd"
              fill="#0ea5e9"
              radius={[0, 4, 4, 0]}
              label={{
                position: 'right',
                formatter: formatPkPerSqYdShort,
                fill: '#0ea5e9',
                fontSize: 16,
                fontWeight: 600,
                offset: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-3 gap-5">
        {chartData.map((item) => (
          <div key={item.precinct} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <div className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500 mb-4">{item.displayLabel}</div>
            <div className="space-y-5">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">Typical construction cost</div>
                <div className="text-3xl font-bold text-sky-400">{formatPkPerSqYdShort(item.median_cost_per_sq_yd)}</div>
                <div className="text-xs text-slate-400 mt-1">PKR/sq yd</div>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">Middle 50% of homes</div>
                <div className="text-base font-medium text-slate-300">
                  {formatPkPerSqYdShort(item.p25_cost_per_sq_yd)}–{formatPkPerSqYdShort(item.p75_cost_per_sq_yd)} PKR/sq yd
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary note */}
      <p className="text-slate-500 text-xs">
        All three precincts cluster tightly around 75k–85k PKR per sq yd. Construction cost is stable — most price
        differences come from land value and seller expectations.
      </p>
    </div>
  )
}
