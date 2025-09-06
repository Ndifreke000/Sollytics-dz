"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

export default function StablecoinsPage() {
  const [metrics, setMetrics] = useState({
    usdc: { supply: 32500000000, change24h: 2.1 },
    usdt: { supply: 18200000000, change24h: -0.8 },
    total: 50700000000
  })

  const [aiInsights, setAiInsights] = useState({
    riskLevel: "low" as const,
    trend: "stable",
    alerts: ["USDC supply increased 2.1% in 24h", "Cross-chain flows detected"]
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        usdc: { 
          supply: prev.usdc.supply + (Math.random() - 0.5) * 2000000,
          change24h: prev.usdc.change24h + (Math.random() - 0.5) * 0.2
        },
        usdt: { 
          supply: prev.usdt.supply + (Math.random() - 0.5) * 1000000,
          change24h: prev.usdt.change24h + (Math.random() - 0.5) * 0.2
        },
        total: prev.usdc.supply + prev.usdt.supply
      }))
      
      // Update AI insights occasionally
      if (Math.random() > 0.7) {
        const insights = [
          "USDC supply fluctuation detected",
          "Cross-chain arbitrage opportunities identified", 
          "Market stability indicators positive",
          "Institutional inflows increasing"
        ]
        setAiInsights(prev => ({
          ...prev,
          alerts: [insights[Math.floor(Math.random() * insights.length)], ...prev.alerts.slice(0, 2)]
        }))
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const supplyData = [
    { name: 'USDC', value: metrics.usdc.supply, color: '#2563eb' },
    { name: 'USDT', value: metrics.usdt.supply, color: '#16a34a' }
  ]

  const flowData = [
    { time: '00:00', inflow: 120000, outflow: 95000 },
    { time: '06:00', inflow: 180000, outflow: 140000 },
    { time: '12:00', inflow: 250000, outflow: 200000 },
    { time: '18:00', inflow: 190000, outflow: 160000 }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Stablecoin Analytics</h1>
            <p className="text-muted-foreground">USDC/USDT tracking and market analysis</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USDC Supply</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(metrics.usdc.supply / 1e9).toFixed(1)}B</div>
                <Badge variant={metrics.usdc.change24h > 0 ? "default" : "destructive"}>
                  {metrics.usdc.change24h > 0 ? '+' : ''}{metrics.usdc.change24h}% 24h
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USDT Supply</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(metrics.usdt.supply / 1e9).toFixed(1)}B</div>
                <Badge variant={metrics.usdt.change24h > 0 ? "default" : "destructive"}>
                  {metrics.usdt.change24h > 0 ? '+' : ''}{metrics.usdt.change24h}% 24h
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Risk Assessment</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{aiInsights.riskLevel}</div>
                <Badge variant="secondary">{aiInsights.trend}</Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={supplyData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {supplyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${(value / 1e9).toFixed(1)}B`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>24h Inflows/Outflows</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={flowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`} />
                    <Bar dataKey="inflow" fill="#22c55e" name="Inflow" />
                    <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AI Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {aiInsights.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    {alert}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}