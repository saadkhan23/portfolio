'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'

interface PerformanceMetric {
  squad: string
  season: string
  xg_per_90: number
  goals_per_90: number
  over_under_performance: number
  is_man_utd: boolean
}

interface Props {
  data: PerformanceMetric[]
}

export function PerformanceVsExpectedScatter({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="xg_per_90"
          name="Expected Goals"
          type="number"
          label={{ value: 'Expected Goals (xG) per 90', position: 'bottom', offset: 10 }}
          stroke="#64748b"
        />
        <YAxis
          dataKey="goals_per_90"
          name="Actual Goals"
          label={{ value: 'Actual Goals per 90', angle: -90, position: 'insideLeft' }}
          stroke="#64748b"
        />
        {/* Reference line at y=x (where actual = expected) */}
        <ReferenceLine stroke="#94a3b8" strokeDasharray="5 5" />
        <Tooltip
          cursor={{ strokeDasharray: '3 3' }}
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
          labelFormatter={() => ''}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />

        {/* Man Utd (red) */}
        <Scatter
          name="Manchester United"
          data={data.filter(d => d.is_man_utd)}
          fill="#dc2626"
          isAnimationActive={true}
        />

        {/* Other teams (gray) */}
        <Scatter
          name="Other Teams"
          data={data.filter(d => !d.is_man_utd)}
          fill="#cbd5e1"
          isAnimationActive={true}
        />
      </ScatterChart>
    </ResponsiveContainer>
  )
}
