"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { LiveAnalysisAI } from "@/components/live-analysis-ai"

interface TransactionAnalysis {
  timestamp: number
  txCount: number
  avgFee: number
  computeUnits: number
  successRate: number
  topPrograms: { name: string; count: number }[]
}

export function LiveTransactionAnalysis() {
  const [analysis, setAnalysis] = useState<TransactionAnalysis[]>([])
  const [currentStats, setCurrentStats] = useState({
    activeTxs: 0,
    avgBlockTime: 0,
    networkLoad: 0,
  })

  useEffect(() => {
    const generateAnalysis = (): TransactionAnalysis => {
      const now = Date.now()
      return {
        timestamp: now,
        txCount: Math.floor(Math.random() * 3000) + 1500, // 1500-4500 TPS
        avgFee: Math.random() * 0.001 + 0.000005, // 0.000005-0.001005 SOL
        computeUnits: Math.floor(Math.random() * 200000) + 100000, // 100k-300k CU
        successRate: Math.random() * 5 + 95, // 95-100% success rate
        topPrograms: [
          { name: "Token Program", count: Math.floor(Math.random() * 500) + 200 },
          { name: "System Program", count: Math.floor(Math.random() * 300) + 150 },
          { name: "DEX Program", count: Math.floor(Math.random() * 200) + 100 },
          { name: "NFT Program", count: Math.floor(Math.random() * 150) + 50 },
        ],
      }
    }

    const updateStats = () => {
      setCurrentStats({
        activeTxs: Math.floor(Math.random() * 50000) + 25000,
        avgBlockTime: Math.random() * 200 + 400, // 400-600ms
        networkLoad: Math.random() * 30 + 60, // 60-90%
      })
    }

    // Initial data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      ...generateAnalysis(),
      timestamp: Date.now() - (19 - i) * 2000,
    }))
    setAnalysis(initialData)
    updateStats()

    // Update every 2 seconds
    const interval = setInterval(() => {
      setAnalysis((prev) => {
        const newData = [...prev.slice(1), generateAnalysis()]
        return newData
      })
      updateStats()
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const chartData = analysis.map((item, index) => ({
    time: index,
    tps: item.txCount,
    fee: item.avgFee * 1000000, // Convert to micro-SOL for better visualization
    compute: item.computeUnits / 1000, // Convert to thousands
    success: item.successRate,
  }))

  return (
    <div className="space-y-6">
      {/* Live Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.activeTxs.toLocaleString()}</div>
            <Badge variant="secondary" className="mt-1">
              Live
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Block Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.avgBlockTime.toFixed(0)}ms</div>
            <Badge variant={currentStats.avgBlockTime < 500 ? "default" : "destructive"} className="mt-1">
              {currentStats.avgBlockTime < 500 ? "Optimal" : "Slow"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Network Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStats.networkLoad.toFixed(1)}%</div>
            <Badge variant={currentStats.networkLoad < 80 ? "default" : "destructive"} className="mt-1">
              {currentStats.networkLoad < 80 ? "Normal" : "High"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Charts and AI Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TPS Chart */}
        <Card className="h-[420px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Live Transaction Throughput</CardTitle>
            <CardDescription className="text-sm">Transactions per second over the last 40 seconds</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                tps: {
                  label: "TPS",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={(value) => `${(20 - value) * 2}s`}
                    fontSize={11}
                  />
                  <YAxis fontSize={11} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => `${(20 - value) * 2} seconds ago`}
                  />
                  <Area
                    type="monotone"
                    dataKey="tps"
                    stroke="var(--color-tps)"
                    fill="var(--color-tps)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Program Activity */}
        <Card className="h-[420px]">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Top Program Activity</CardTitle>
            <CardDescription className="text-sm">Most active programs in the current block</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ChartContainer
              config={{
                count: {
                  label: "Transactions",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[280px] w-full"
            >
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={analysis[analysis.length - 1]?.topPrograms || []} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={11} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <div className="h-[420px]">
          <LiveAnalysisAI 
            data={{
              activeTransactions: currentStats.activeTxs,
              avgBlockTime: currentStats.avgBlockTime,
              networkLoad: currentStats.networkLoad,
              tpsData: chartData.map(d => d.tps)
            }}
          />
        </div>
      </div>
    </div>
  )
}
