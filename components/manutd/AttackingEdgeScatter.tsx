'use client'

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AttackingMetric {
  squad: string
  season: string
  progressive_carries: number
  goals_per_90: number
  is_man_utd: boolean
}

interface Props {
  data: AttackingMetric[]
}

export function AttackingEdgeScatter({ data }: Props) {
  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="progressive_carries"
          name="Progressive Carries/90"
          type="number"
          label={{ value: 'Progressive Carries per 90', position: 'bottom', offset: 10 }}
          stroke="#64748b"
        />
        <YAxis
          dataKey="goals_per_90"
          name="Goals per 90"
          label={{ value: 'Goals per 90', angle: -90, position: 'insideLeft' }}
          stroke="#64748b"
        />
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
        <Legend />

        {/* Man Utd (highlighted in red) */}
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
