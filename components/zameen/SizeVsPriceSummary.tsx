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

export function SizeVsPriceSummary({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  const chartData = data.map((item) => ({
    ...item,
    displayLabel: getPrecinctLabel(item.precinct),
  }))

  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Does size actually explain price?</h3>
        <p className="text-slate-600 mb-6">
          Median price per sq yd in each precinct, with R² showing how strongly size predicts price (higher R² = more disciplined pricing).
        </p>
      </div>

      {/* Bar Chart with R² labels */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="displayLabel"
              stroke="#64748b"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="#64748b"
              tickFormatter={formatPkPerSqYdShort}
              tick={{ fontSize: 12 }}
              label={{ value: 'Price per Sq Yd (PKR)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: any) => formatPkPerSqYdLong(value as number)}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px',
              }}
              cursor={{ fill: '#f3f4f6' }}
            />

            <Bar dataKey="median_price_per_sq_yd" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.r_squared)} />
              ))}
              <Label
                position="top"
                formatter={(value: number) => `R² ${value.toFixed(2)}`}
                fill="#64748b"
                fontSize={11}
                offset={4}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Text Summary */}
      <div className="space-y-3">
        {chartData.map((item) => (
          <div key={item.precinct} className="text-sm text-slate-600">
            <span className="font-medium text-slate-900">{item.displayLabel}:</span>
            {' '}
            {formatPkPerSqYdLong(item.median_price_per_sq_yd)}, R² ≈ {item.r_squared.toFixed(2)} ({getRSquaredDescription(item.r_squared)}).
          </div>
        ))}
      </div>

      {/* Explanation Box */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-sm text-slate-700">
        <p className="font-medium text-blue-900 mb-2">What does R² mean?</p>
        <p>
          R² measures how well property size explains price variation in each precinct. A higher R² means buyers in that precinct are more "rational" (size-driven pricing). Lower R² means other factors like location preference or individual seller expectations matter more.
        </p>
      </div>
    </div>
  )
}
