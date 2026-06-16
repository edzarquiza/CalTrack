import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { WeightLog } from '@/types'

interface WeightChartProps {
  logs: WeightLog[]
  targetWeight?: number
}

export function WeightChart({ logs, targetWeight }: WeightChartProps) {
  const chartData = [...logs]
    .reverse()
    .slice(-30)
    .map(log => ({
      date: new Date(log.logged_at + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      weight: log.weight_kg,
    }))

  if (chartData.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
        No data yet. Log your weight to see the trend.
      </div>
    )
  }

  const weights = chartData.map(d => d.weight)
  const minW = Math.min(...weights)
  const maxW = Math.max(...weights)
  const padding = 2
  const domain: [number, number] = [
    Math.floor(minW - padding),
    Math.ceil(maxW + padding),
  ]

  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={domain}
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          tickLine={false}
          axisLine={false}
          tickFormatter={v => `${v}`}
        />
        <Tooltip
          contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
          formatter={(value: number) => [`${value} kg`, 'Weight']}
        />
        {targetWeight && (
          <ReferenceLine
            y={targetWeight}
            stroke="#22c55e"
            strokeDasharray="4 4"
            label={{ value: 'Goal', fill: '#22c55e', fontSize: 10 }}
          />
        )}
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ fill: '#2563eb', r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
