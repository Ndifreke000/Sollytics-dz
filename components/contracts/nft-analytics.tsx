"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Image, TrendingUp, Search, ExternalLink } from "lucide-react"

export function NFTAnalytics() {
  const [collectionAddress, setCollectionAddress] = useState("")
  const [collectionData, setCollectionData] = useState<any>(null)

  const searchCollection = async () => {
    if (!collectionAddress.trim()) return
    
    // Mock NFT collection data
    setCollectionData({
      name: "Mad Lads",
      symbol: "MAD",
      address: collectionAddress,
      floorPrice: 125.5,
      change24h: -3.2,
      volume24h: 2850,
      totalSupply: 10000,
      listed: 1250,
      holders: 7800,
      royalty: 5.5,
      volumeHistory: Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        volume: Math.random() * 5000 + 1000
      })),
      topSales: [
        { tokenId: "#4521", price: 450, time: "2 hours ago" },
        { tokenId: "#7832", price: 380, time: "4 hours ago" },
        { tokenId: "#1205", price: 320, time: "6 hours ago" }
      ],
      traits: [
        { trait: "Background", rarity: "Blue Sky", percentage: 2.1 },
        { trait: "Eyes", rarity: "Laser", percentage: 0.8 },
        { trait: "Hat", rarity: "Crown", percentage: 1.5 }
      ]
    })
  }

  return (
    <div className="space-y-6">
      {/* Collection Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="w-5 h-5 text-purple-600" />
            NFT Collection Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter collection address or name..."
              value={collectionAddress}
              onChange={(e) => setCollectionAddress(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={searchCollection}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCollectionAddress("Mad Lads")}
            >
              Mad Lads
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCollectionAddress("Okay Bears")}
            >
              Okay Bears
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCollectionAddress("DeGods")}
            >
              DeGods
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collection Data */}
      {collectionData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Collection Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <div className="text-xl font-bold">{collectionData.name}</div>
                  <div className="text-sm text-muted-foreground">{collectionData.symbol}</div>
                </div>
                <Badge variant={collectionData.change24h > 0 ? "default" : "destructive"}>
                  {collectionData.change24h > 0 ? '+' : ''}{collectionData.change24h}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{collectionData.floorPrice}</div>
                  <div className="text-sm text-muted-foreground">Floor Price (SOL)</div>
                </div>
                <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">{collectionData.volume24h}</div>
                  <div className="text-sm text-muted-foreground">24h Volume (SOL)</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Supply</span>
                  <span className="font-medium">{collectionData.totalSupply.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Listed</span>
                  <span className="font-medium">{collectionData.listed.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Holders</span>
                  <span className="font-medium">{collectionData.holders.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Royalty</span>
                  <span className="font-medium">{collectionData.royalty}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>7-Day Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={collectionData.volumeHistory}>
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Sales & Traits */}
      {collectionData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Sales */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Top Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collectionData.topSales.map((sale: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {sale.tokenId.slice(-2)}
                      </div>
                      <div>
                        <div className="font-medium">{sale.tokenId}</div>
                        <div className="text-sm text-muted-foreground">{sale.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{sale.price} SOL</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rare Traits */}
          <Card>
            <CardHeader>
              <CardTitle>Rare Traits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collectionData.traits.map((trait: any, i: number) => (
                  <div key={i} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{trait.trait}</span>
                      <Badge variant="outline">{trait.percentage}%</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{trait.rarity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}