"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, CheckCircle, AlertCircle } from "lucide-react"

interface WalletInfo {
  address: string
  balance: number
  connected: boolean
  provider: string
}

export function WalletConnection() {
  const [wallet, setWallet] = useState<WalletInfo | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const walletProviders = [
    { name: "Phantom", icon: "👻", available: true },
    { name: "Solflare", icon: "🔥", available: true },
    { name: "Backpack", icon: "🎒", available: true },
    { name: "Glow", icon: "✨", available: false }
  ]

  const connectWallet = async (provider: string) => {
    setIsConnecting(true)
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setWallet({
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      balance: 12.45,
      connected: true,
      provider
    })
    setIsConnecting(false)
  }

  const disconnectWallet = () => {
    setWallet(null)
  }

  const copyAddress = () => {
    if (wallet) {
      navigator.clipboard.writeText(wallet.address)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!wallet ? (
            <>
              <p className="text-sm text-muted-foreground">
                Connect your Solana wallet to access smart contract features
              </p>
              <div className="grid grid-cols-2 gap-3">
                {walletProviders.map((provider) => (
                  <Button
                    key={provider.name}
                    variant="outline"
                    className="h-16 flex flex-col gap-2"
                    disabled={!provider.available || isConnecting}
                    onClick={() => connectWallet(provider.name)}
                  >
                    <span className="text-2xl">{provider.icon}</span>
                    <span className="text-sm">{provider.name}</span>
                    {!provider.available && (
                      <Badge variant="secondary" className="text-xs">Soon</Badge>
                    )}
                  </Button>
                ))}
              </div>
              {isConnecting && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Connecting wallet...
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">Connected to {wallet.provider}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Address</span>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
                    </code>
                    <Button size="sm" variant="ghost" onClick={copyAddress}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Balance</span>
                  <span className="font-medium">{wallet.balance} SOL</span>
                </div>
              </div>

              <Button variant="outline" onClick={disconnectWallet} className="w-full">
                Disconnect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wallet Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          {wallet ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-muted-foreground">Total Transactions</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">15</div>
                  <div className="text-sm text-muted-foreground">Token Holdings</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recent Activity</h4>
                <div className="space-y-2">
                  {[
                    { type: "Transfer", amount: "-2.5 SOL", time: "2 min ago" },
                    { type: "Swap", amount: "+1,250 USDC", time: "1 hour ago" },
                    { type: "Stake", amount: "-10 SOL", time: "3 hours ago" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <div className="text-sm font-medium">{activity.type}</div>
                        <div className="text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                      <div className="text-sm font-medium">{activity.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Connect wallet to view analytics</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}