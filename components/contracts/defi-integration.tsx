"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Zap, Coins, BarChart3 } from "lucide-react"

export function DeFiIntegration() {
  const dexData = [
    { name: "Raydium", tvl: 1250000000, volume24h: 85000000, pairs: 2500 },
    { name: "Orca", tvl: 890000000, volume24h: 62000000, pairs: 1800 },
    { name: "Jupiter", tvl: 650000000, volume24h: 120000000, pairs: 3200 }
  ]

  const lendingProtocols = [
    { name: "Solend", tvl: 450000000, borrowed: 280000000, apy: 8.5 },
    { name: "Mango", tvl: 320000000, borrowed: 195000000, apy: 12.3 },
    { name: "Tulip", tvl: 180000000, borrowed: 95000000, apy: 6.8 }
  ]

  return (
    <div className="space-y-6">
      {/* DEX Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-600" />
            DEX Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dexData.map((dex, i) => (
              <div key={i} className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{dex.name}</h3>
                  <Badge variant="secondary">DEX</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL</span>
                    <span className="font-medium">${(dex.tvl / 1e9).toFixed(2)}B</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">24h Volume</span>
                    <span className="font-medium">${(dex.volume24h / 1e6).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Pairs</span>
                    <span className="font-medium">{dex.pairs.toLocaleString()}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lending Protocols */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-600" />
            Lending Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lendingProtocols.map((protocol, i) => (
              <div key={i} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg">{protocol.name}</h3>
                  <Badge variant="secondary">Lending</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL</span>
                    <span className="font-medium">${(protocol.tvl / 1e6).toFixed(0)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Borrowed</span>
                    <span className="font-medium">${(protocol.borrowed / 1e6).toFixed(0)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max APY</span>
                    <span className="font-medium text-emerald-600">{protocol.apy}%</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View Rates
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cross-Chain Bridges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Cross-Chain Bridges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Wormhole</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                  <span className="font-medium">$45.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Chains</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Allbridge</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                  <span className="font-medium">$12.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Chains</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MEV Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            MEV Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-600">$2.4M</div>
              <div className="text-sm text-muted-foreground">24h MEV Volume</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">1,247</div>
              <div className="text-sm text-muted-foreground">MEV Transactions</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">$1,925</div>
              <div className="text-sm text-muted-foreground">Avg MEV Value</div>
            </div>
            <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">85%</div>
              <div className="text-sm text-muted-foreground">Arbitrage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}