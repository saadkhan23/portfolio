'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from 'recharts'

interface SizeVsPriceData {
  precinct: string
  n_houses: number
  median_size_sq_yd: number
  median_price: number
  median_price_per_sq_yd: number
  regression_slope: number
  regression_intercept: number
  r_squared: number
}

interface Props {
  data: SizeVsPriceData[]
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

// Map R² to visual strength descriptor
const getRSquaredDescription = (rSquared: number): string => {
  if (rSquared >= 0.45) return 'most disciplined pricing'
  if (rSquared >= 0.30) return 'moderate fit'
  return 'noisiest; other factors dominate'
}

// Bar color based on R² strength
const getBarColor = (rSquared: number): string => {
  if (rSquared >= 0.45) return '#3b82f6' // strong blue
  if (rSquared >= 0.30) return '#60a5fa' // medium blue
  return '#93c5fd' // light blue
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
      <div className="bg-slate-900 border border-slate-700 p-3 rounded text-slate-200">
        <p className="font-medium text-sm">{precintName}</p>
        <p className="text-sm">{formatPkPerSqYdShort(value)} PKR/sq yd</p>
      </div>
    )
  }
  return null
}

export function SizeVsPriceSummary({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  const chartData = data.map((item) => ({
    ...item,
    displayLabel: getPrecinctLabel(item.precinct),
    shortLabel: getPrecinctShortLabel(item.precinct),
  }))

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-50 mb-3">Does size actually explain price?</h3>
        <p className="text-slate-300">
          Bigger homes should cost more — but some markets are much more disciplined than others. In a "disciplined" precinct, buyers roughly agree on what a home should cost for its size. In a noisy one, other factors like street, view, condition, and seller mood start to dominate.
        </p>
      </div>

      {/* Bar Chart with R² labels */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 30, right: 30, bottom: 20, left: 60 }}
          >
            <CartesianGrid strokeDasharray="5 5" stroke="#475569" />
            <XAxis
              dataKey="displayLabel"
              stroke="#64748b"
              tick={{ fontSize: 14, fill: '#94a3b8', fontWeight: 500 }}
            />
            <YAxis
              stroke="#64748b"
              tickFormatter={formatPkPerSqYdShort}
              tick={{ fontSize: 14, fill: '#94a3b8' }}
              label={{ value: 'Price per Sq Yd', angle: -90, position: 'insideLeft', style: { fontSize: 13, fill: '#94a3b8' } }}
            />
            <Tooltip
              content={<CustomTooltip chartData={chartData} />}
              cursor={{ fill: '#334155' }}
            />

            <Bar dataKey="median_price_per_sq_yd" fill="#0ea5e9" radius={[4, 4, 0, 0]}>
              <Label
                position="top"
                formatter={(value: number) => `R² ${value.toFixed(2)}`}
                fill="#94a3b8"
                fontSize={13}
                fontWeight={500}
                offset={8}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Explanation Box */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg">
        <p className="text-slate-300 leading-relaxed">
          <strong className="text-slate-50 block mb-2">What does R² mean here?</strong>
          It&apos;s just a measure of how predictable pricing is. Higher R² means size explains most of the price, so buyers broadly agree on what they&apos;re paying for. Lower R² means other factors — location within the precinct, finish, amenities, individual expectations — matter more than size.
        </p>
      </div>
    </div>
  )
}
