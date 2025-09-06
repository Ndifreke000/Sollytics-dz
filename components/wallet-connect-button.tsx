"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Wallet, ExternalLink, Download, CheckCircle, AlertCircle } from "lucide-react"

interface WalletProvider {
  name: string
  icon: string
  installed: boolean
  downloadUrl: string
  adapter?: any
}

export function WalletConnectButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [wallets, setWallets] = useState<WalletProvider[]>([])
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    checkWallets()
  }, [])

  const checkWallets = () => {
    const walletProviders: WalletProvider[] = [
      {
        name: "Phantom",
        icon: "👻",
        installed: !!(window as any)?.solana?.isPhantom,
        downloadUrl: "https://phantom.app/",
        adapter: (window as any)?.solana
      },
      {
        name: "Solflare",
        icon: "🔥",
        installed: !!(window as any)?.solflare,
        downloadUrl: "https://solflare.com/",
        adapter: (window as any)?.solflare
      },
      {
        name: "Backpack",
        icon: "🎒",
        installed: !!(window as any)?.backpack,
        downloadUrl: "https://backpack.app/",
        adapter: (window as any)?.backpack
      },
      {
        name: "Glow",
        icon: "✨",
        installed: !!(window as any)?.glow,
        downloadUrl: "https://glow.app/",
        adapter: (window as any)?.glow
      }
    ]
    
    setWallets(walletProviders)
  }

  const connectWallet = async (wallet: WalletProvider) => {
    if (!wallet.installed || !wallet.adapter) return
    
    setIsConnecting(true)
    
    try {
      const response = await wallet.adapter.connect()
      setConnectedWallet(wallet.name)
      setIsOpen(false)
      console.log("Connected to", wallet.name, response.publicKey.toString())
    } catch (error) {
      console.error("Failed to connect:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setConnectedWallet(null)
    // Disconnect from actual wallet
    wallets.forEach(wallet => {
      if (wallet.installed && wallet.adapter?.disconnect) {
        wallet.adapter.disconnect()
      }
    })
  }

  if (connectedWallet) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          {connectedWallet}
        </Badge>
        <Button variant="ghost" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Wallet className="w-4 h-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-purple-600" />
            Connect Solana Wallet
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <Card key={wallet.name} className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{wallet.icon}</span>
                    <div>
                      <div className="font-medium">{wallet.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {wallet.installed ? "Detected" : "Not installed"}
                      </div>
                    </div>
                  </div>
                  
                  {wallet.installed ? (
                    <Button 
                      size="sm" 
                      onClick={() => connectWallet(wallet)}
                      disabled={isConnecting}
                    >
                      {isConnecting ? "Connecting..." : "Connect"}
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => window.open(wallet.downloadUrl, '_blank')}
                      className="gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Install
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {wallets.filter(w => !w.installed).length > 0 && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-amber-800 dark:text-amber-200">
                    Wallet Not Found
                  </div>
                  <div className="text-amber-700 dark:text-amber-300">
                    Install a Solana wallet extension to connect and interact with the blockchain.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}