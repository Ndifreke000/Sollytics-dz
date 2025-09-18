"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Wallet, Save, Copy, Check } from "lucide-react"
import { solanaPayments } from "@/lib/solana-payments"

export function WalletSettings() {
  const [adminWallet, setAdminWallet] = useState('')
  const [newWallet, setNewWallet] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setAdminWallet(solanaPayments.getAdminWallet())
    setNewWallet(solanaPayments.getAdminWallet())
  }, [])

  const handleSave = async () => {
    if (!newWallet.trim()) return

    setLoading(true)
    try {
      if (newWallet.length !== 44) {
        throw new Error('Invalid wallet address format')
      }

      solanaPayments.setAdminWallet(newWallet)
      setAdminWallet(newWallet)
      
      await fetch('/api/admin/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wallet: newWallet })
      })

      ;(window as any).toast?.({
        type: 'success',
        title: 'Wallet Updated',
        description: 'Admin wallet address has been updated successfully'
      })
    } catch (error) {
      ;(window as any).toast?.({
        type: 'error',
        title: 'Update Failed',
        description: 'Please check the wallet address format'
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(adminWallet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Payment Wallet Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Current Admin Wallet</Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 p-3 bg-muted rounded-md font-mono text-sm">
              {adminWallet}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        <div>
          <Label>Update Admin Wallet</Label>
          <div className="space-y-3 mt-2">
            <Input
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
              placeholder="Enter new Solana wallet address"
              className="font-mono"
            />
            <Button
              onClick={handleSave}
              disabled={loading || newWallet === adminWallet}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Updating...' : 'Update Wallet'}
            </Button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Supported Payment Tokens</h4>
          <div className="flex gap-2">
            <Badge variant="outline">◎ SOL</Badge>
            <Badge variant="outline">$ USDC</Badge>
            <Badge variant="outline">₮ USDT</Badge>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            All subscription payments will be sent to this wallet address
          </p>
        </div>
      </CardContent>
    </Card>
  )
}