'use client'

import { useMemo } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Point = {
  precinct: string
  price: number
  price_per_sq_yd: number
  size_sq_yd?: number
  is_bargain?: number
}

interface Props {
  data: Point[]
}

const precinctIndex = (p: string): number => {
  const m = p.match(/precinct_(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

const precinctShort = (p: string): string => {
  const m = p.match(/precinct_(\d+)/)
  return m ? `P${m[1]}` : p
}

function Legend() {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-300">
      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background:'#0ea5e9'}}></span> Finished listing</div>
      <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full" style={{background:'#22c55e'}}></span> Underpriced (flagged)</div>
    </div>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const pt = payload[0].payload
    const label = precinctShort(pt.precinct)
    const priceM = (pt.y / 1_000_000).toFixed(1)
    const ppsy = Math.round(pt.price_per_sq_yd).toLocaleString()
    const size = pt.size_sq_yd ? `${Math.round(pt.size_sq_yd)} sq yd` : '—'
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded text-slate-200 text-xs">
        <div className="font-semibold mb-1">{label}</div>
        <div>Price: {priceM} M PKR</div>
        <div>Price per sq yd: {ppsy} PKR</div>
        <div>Size: {size}</div>
      </div>
    )
  }
  return null
}

export function BeeswarmPricePerSqYd({ data }: Props) {
  const jittered = useMemo(() => {
    // Group by precinct and assign jittered x positions per group
    const grouped: Record<string, Point[]> = {}
    data.forEach((d) => {
      if (!grouped[d.precinct]) grouped[d.precinct] = []
      grouped[d.precinct].push(d)
    })

    const points: Array<{ x: number; y: number; precinct: string; is_bargain: boolean; price_per_sq_yd: number; size_sq_yd?: number }> = []
    const groups = Object.keys(grouped).sort((a, b) => precinctIndex(a) - precinctIndex(b))
    const spacing = 1 // gap between categories on x-axis
    groups.forEach((g, gi) => {
      const baseX = gi * spacing
      const groupPoints = grouped[g]
      groupPoints.forEach((p, i) => {
        const rand = ((i * 9301 + 49297) % 233280) / 233280 // deterministic-ish pseudo-random
        const jitter = (rand - 0.5) * 0.6 // ±0.3 around base
        const x = baseX + jitter
        const y = p.price
        points.push({ x, y, precinct: g, is_bargain: !!p.is_bargain, price_per_sq_yd: p.price_per_sq_yd, size_sq_yd: p.size_sq_yd })
      })
    })
    return { points, groups }
  }, [data])

  if (!data || data.length === 0) {
    return <div className="text-slate-600">No data available</div>
  }

  // Build custom ticks from groups
  const xTicks = jittered.groups.map((g, gi) => ({ value: gi, label: precinctShort(g) }))

  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-2xl font-bold text-slate-50 mb-2">How do finished homes cluster by price?</h3>
        <p className="text-slate-300">
          Each dot is a finished listing. Dots are jittered left/right by precinct so you can see density without hiding overlaps.
          The vertical position is the asking price per square yard. This is a quick “lay of the land” before we dig into medians
          and dispersion.
        </p>
      </div>

      <Legend />

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 50 }}>
            <CartesianGrid strokeDasharray="5 5" stroke="#475569" />
            <XAxis
              type="number"
              dataKey="x"
              tickFormatter={(v) => xTicks.find((t) => t.value === v)?.label ?? ''}
              ticks={xTicks.map((t) => t.value)}
              stroke="#64748b"
              tick={{ fontSize: 13, fill: '#94a3b8' }}
              domain={[xTicks[0]?.value ?? 0, xTicks[xTicks.length - 1]?.value ?? 0]}
            />
            <YAxis
              type="number"
              dataKey="y"
              stroke="#64748b"
              tickFormatter={(v) => `${(Number(v) / 1_000_000).toFixed(1)}M`}
              tick={{ fontSize: 13, fill: '#94a3b8' }}
              label={{ value: 'Price (PKR, millions)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#94a3b8' } }}
            />
            <Tooltip cursor={{ stroke: '#94a3b8', strokeDasharray: '3 3' }} content={<CustomTooltip />} />

            <Scatter
              data={jittered.points}
              fill="#0ea5e9"
              shape={(props: any) => {
                const { cx, cy, payload } = props
                const color = payload.is_bargain ? '#22c55e' : '#0ea5e9'
                return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.75} />
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="text-slate-500 text-xs">
        Green dots indicate statistically underpriced listings (relative to their precinct). Grey structures are excluded from this view.
      </p>
    </div>
  )
}
