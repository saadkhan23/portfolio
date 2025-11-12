'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'

const constructionData = [
  {
    precinct: 'P5',
    housePrice: 50000000,
    plotPrice: 10500000,
    constructionCost: 39500000,
    costPerSqYd: 79000,
    avgSize: 500,
  },
  {
    precinct: 'P6',
    housePrice: 25550000,
    plotPrice: 6500000,
    constructionCost: 19050000,
    costPerSqYd: 70037,
    avgSize: 272,
  },
  {
    precinct: 'P8',
    housePrice: 29000000,
    plotPrice: 7200000,
    constructionCost: 21800000,
    costPerSqYd: 80147,
    avgSize: 272,
  },
]

const formatPrice = (value: number) => {
  return `PKR ${(value / 1000000).toFixed(1)}M`
}

const formatCostPerSqYd = (value: number) => {
  return `PKR ${(value / 1000).toFixed(0)}K`
}

export function ConstructionCostChart() {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={constructionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="precinct" />
          <YAxis yAxisId="left" label={{ value: 'Price (PKR)', angle: -90, position: 'insideLeft' }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: 'Cost/Sq Yd (PKR)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip formatter={(value) => formatPrice(Number(value))} />
          <Legend />
          <Bar yAxisId="left" dataKey="housePrice" fill="#3b82f6" name="House Median Price" />
          <Bar yAxisId="left" dataKey="plotPrice" fill="#10b981" name="Plot Median Price" />
          <Bar yAxisId="left" dataKey="constructionCost" fill="#f59e0b" name="Construction Cost" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CostPerSqYdChart() {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={constructionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="precinct" />
          <YAxis label={{ value: 'Cost/Sq Yd (PKR)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => formatCostPerSqYd(Number(value))} />
          <Legend />
          <Line
            type="monotone"
            dataKey="costPerSqYd"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 6 }}
            activeDot={{ r: 8 }}
            name="Construction Cost/Sq Yd"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PropertySizeChart() {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={constructionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="precinct" />
          <YAxis label={{ value: 'Average Size (Sq Yd)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgSize" fill="#ec4899" name="Average Property Size (Sq Yd)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
