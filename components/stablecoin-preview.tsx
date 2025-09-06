"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, ArrowRight, Brain } from "lucide-react"
import Link from "next/link"

export function StablecoinPreview() {
  const [metrics, setMetrics] = useState({
    usdc: { supply: 32500000000, change24h: 2.1 },
    usdt: { supply: 18200000000, change24h: -0.8 },
    total: 50700000000
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        usdc: { 
          supply: prev.usdc.supply + (Math.random() - 0.5) * 1000000,
          change24h: prev.usdc.change24h + (Math.random() - 0.5) * 0.1
        },
        usdt: { 
          supply: prev.usdt.supply + (Math.random() - 0.5) * 500000,
          change24h: prev.usdt.change24h + (Math.random() - 0.5) * 0.1
        },
        total: prev.usdc.supply + prev.usdt.supply
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const supplyData = [
    { name: 'USDC', value: metrics.usdc.supply, color: '#3b82f6' },
    { name: 'USDT', value: metrics.usdt.supply, color: '#10b981' }
  ]

  return (
    <section id="stablecoins" className="py-20 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
            Stablecoin Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track USDC and USDT supply, flows, and market dynamics with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Supply Metrics */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USDC Supply</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(metrics.usdc.supply / 1e9).toFixed(1)}B</div>
                <Badge variant={metrics.usdc.change24h > 0 ? "default" : "destructive"} className="mt-1">
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
                <Badge variant={metrics.usdt.change24h > 0 ? "default" : "destructive"} className="mt-1">
                  {metrics.usdt.change24h > 0 ? '+' : ''}{metrics.usdt.change24h}% 24h
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Supply Distribution Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Supply Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={supplyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {supplyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Low risk assessment - stable market conditions</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>USDC supply growth indicates healthy adoption</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>Cross-chain flows detected from Ethereum</span>
                </div>
              </div>
              
              <Button asChild className="w-full gap-2 mt-4">
                <Link href="/stablecoins">
                  View Full Analytics
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
            <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div className="text-left">
              <h3 className="font-semibold">Real-time Stablecoin Monitoring</h3>
              <p className="text-sm text-muted-foreground">Track supply changes, mint/burn events, and market flows</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/stablecoins">Explore</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}