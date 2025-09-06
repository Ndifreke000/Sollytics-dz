"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { PerformanceSample } from "@/lib/solana"

interface PerformanceChartProps {
  data: PerformanceSample[]
  isLoading?: boolean
}

export function PerformanceChart({ data, isLoading }: PerformanceChartProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Network Performance</CardTitle>
          <CardDescription>Transactions per second over recent slots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .map((sample, index) => ({
      slot: sample.slot,
      tps: sample.samplePeriodSecs > 0 ? Math.round(sample.numTransactions / sample.samplePeriodSecs) : 0,
      transactions: sample.numTransactions,
      index: index,
    }))
    .reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Performance</CardTitle>
        <CardDescription>Transactions per second over recent slots</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            tps: {
              label: "TPS",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" tickFormatter={(value) => `${chartData.length - value}`} />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => `Slot ${chartData[value]?.slot}`}
              />
              <Line type="monotone" dataKey="tps" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
