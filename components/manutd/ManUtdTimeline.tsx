'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

interface TimelineMetric {
  season: string
  goals_per_90: number
  xg_per_90?: number | null
}

interface Props {
  data: TimelineMetric[]
}

export function ManUtdTimeline({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  // Ferguson era ended in 2013
  const fergusonEndIndex = data.findIndex(d => d.season.includes('2013'))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="season"
          stroke="#64748b"
          angle={-45}
          textAnchor="end"
          height={80}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          label={{ value: 'Goals per 90', angle: -90, position: 'insideLeft' }}
          stroke="#64748b"
        />

        {/* Shaded region for Ferguson era */}
        {fergusonEndIndex !== -1 && (
          <ReferenceLine
            x={data[fergusonEndIndex].season}
            stroke="#e2e8f0"
            strokeWidth={2}
            label={{ value: 'Ferguson Retires →', position: 'top', fill: '#64748b', fontSize: 12 }}
          />
        )}

        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px'
          }}
          formatter={(value: any) => {
            if (typeof value === 'number') {
              return value.toFixed(2)
            }
            return value
          }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />

        {/* Actual goals line */}
        <Line
          type="monotone"
          dataKey="goals_per_90"
          stroke="#dc2626"
          strokeWidth={2}
          name="Actual Goals/90"
          dot={false}
          isAnimationActive={true}
        />

        {/* Expected goals line (if available) */}
        <Line
          type="monotone"
          dataKey="xg_per_90"
          stroke="#94a3b8"
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Expected Goals/90 (xG)"
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
