"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Coins, TrendingUp, TrendingDown, Search, ExternalLink } from "lucide-react"

export function TokenAnalytics() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [tokenData, setTokenData] = useState<any>(null)

  const searchToken = async () => {
    if (!tokenAddress.trim()) return
    
    // Mock token data
    setTokenData({
      symbol: "BONK",
      name: "Bonk",
      address: tokenAddress,
      price: 0.000012,
      change24h: 15.7,
      marketCap: 850000000,
      volume24h: 45000000,
      supply: {
        total: 100000000000000,
        circulating: 75000000000000
      },
      holders: 125000,
      priceHistory: Array.from({ length: 30 }, (_, i) => ({
        time: i,
        price: 0.000012 + (Math.random() - 0.5) * 0.000005
      })),
      topHolders: [
        { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", percentage: 12.5, amount: "9.375T" },
        { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", percentage: 8.3, amount: "6.225T" },
        { address: "5KmH4VZ8xH3Nq7J2K9L4P8R6T1S3M95VfYmGC5m8fZw2", percentage: 6.1, amount: "4.575T" }
      ]
    })
  }

  const supplyData = tokenData ? [
    { name: 'Circulating', value: tokenData.supply.circulating, color: '#3b82f6' },
    { name: 'Locked', value: tokenData.supply.total - tokenData.supply.circulating, color: '#64748b' }
  ] : []

  return (
    <div className="space-y-6">
      {/* Token Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-emerald-600" />
            Token Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter token mint address..."
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={searchToken}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTokenAddress("DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263")}
            >
              BONK
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTokenAddress("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")}
            >
              USDC
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTokenAddress("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So")}
            >
              mSOL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Token Data */}
      {tokenData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Token Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">{tokenData.symbol}</div>
                  <div className="text-sm text-muted-foreground">{tokenData.name}</div>
                </div>
                <Badge variant={tokenData.change24h > 0 ? "default" : "destructive"}>
                  {tokenData.change24h > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {tokenData.change24h > 0 ? '+' : ''}{tokenData.change24h}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-medium">${tokenData.price.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${(tokenData.marketCap / 1e6).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">24h Volume</span>
                  <span className="font-medium">${(tokenData.volume24h / 1e6).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Holders</span>
                  <span className="font-medium">{tokenData.holders.toLocaleString()}</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full gap-2">
                <ExternalLink className="w-4 h-4" />
                View on Explorer
              </Button>
            </CardContent>
          </Card>

          {/* Price Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price History (30D)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={tokenData.priceHistory}>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Supply Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Supply Distribution</CardTitle>
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
        </div>
      )}

      {/* Top Holders */}
      {tokenData && (
        <Card>
          <CardHeader>
            <CardTitle>Top Holders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tokenData.topHolders.map((holder: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{i + 1}</Badge>
                    <code className="text-sm bg-background px-2 py-1 rounded">
                      {holder.address.slice(0, 8)}...{holder.address.slice(-8)}
                    </code>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{holder.amount} {tokenData.symbol}</div>
                    <div className="text-sm text-muted-foreground">{holder.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}