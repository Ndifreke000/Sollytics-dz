"use client"

import { useState, useEffect } from "react"
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"

interface NetworkHealth {
  validatorCount: number
  stakeDistribution: { name: string; value: number; color: string }[]
  epochProgress: number
  slotHeight: number
  blockProduction: { time: number; blocks: number }[]
}

export function NetworkHealthDashboard() {
  const [health, setHealth] = useState<NetworkHealth>({
    validatorCount: 0,
    stakeDistribution: [],
    epochProgress: 0,
    slotHeight: 0,
    blockProduction: [],
  })

  useEffect(() => {
    const generateHealthData = (): NetworkHealth => {
      return {
        validatorCount: Math.floor(Math.random() * 100) + 1900, // 1900-2000 validators
        stakeDistribution: [
          { name: "Top 10 Validators", value: 35, color: "hsl(var(--chart-1))" },
          { name: "Top 50 Validators", value: 25, color: "hsl(var(--chart-2))" },
          { name: "Other Validators", value: 40, color: "hsl(var(--chart-3))" },
        ],
        epochProgress: Math.random() * 100,
        slotHeight: Math.floor(Math.random() * 1000000) + 364700000, // Current slot range
        blockProduction: Array.from({ length: 10 }, (_, i) => ({
          time: i,
          blocks: Math.floor(Math.random() * 50) + 150, // 150-200 blocks per minute
        })),
      }
    }

    setHealth(generateHealthData())

    const interval = setInterval(() => {
      setHealth(generateHealthData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Validators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.validatorCount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Network consensus nodes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Slot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.slotHeight.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Block height</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Epoch Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{health.epochProgress.toFixed(1)}%</div>
            <Progress value={health.epochProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stake Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Stake Distribution</CardTitle>
            <CardDescription>Distribution of staked SOL across validators</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                stake: {
                  label: "Stake %",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={health.stakeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {health.stakeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Block Production */}
        <Card>
          <CardHeader>
            <CardTitle>Block Production Rate</CardTitle>
            <CardDescription>Blocks produced per minute over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                blocks: {
                  label: "Blocks/min",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={health.blockProduction}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" tickFormatter={(value) => `${10 - value}m`} />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => `${10 - value} minutes ago`}
                  />
                  <Line type="monotone" dataKey="blocks" stroke="var(--color-blocks)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
