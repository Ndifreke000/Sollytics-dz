"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { formatSOL } from "@/lib/formatters"
import type { SupplyInfo } from "@/lib/solana"

interface SupplyChartProps {
  supply: SupplyInfo | null
  isLoading?: boolean
}

export function SupplyChart({ supply, isLoading }: SupplyChartProps) {
  if (isLoading || !supply) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>SOL Supply Distribution</CardTitle>
          <CardDescription>Circulating vs non-circulating supply</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full animate-pulse bg-muted rounded" />
        </CardContent>
      </Card>
    )
  }

  const chartData = [
    {
      name: "Circulating",
      value: supply.circulating,
      formatted: formatSOL(supply.circulating),
      color: "#8884d8",
    },
    {
      name: "Non-Circulating",
      value: supply.nonCirculating,
      formatted: formatSOL(supply.nonCirculating),
      color: "#82ca9d",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>SOL Supply Distribution</CardTitle>
        <CardDescription>Total Supply: {formatSOL(supply.total)} SOL</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            circulating: {
              label: "Circulating",
              color: "hsl(var(--chart-1))",
            },
            nonCirculating: {
              label: "Non-Circulating",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value: number, name: string) => [`${formatSOL(value)} SOL`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
