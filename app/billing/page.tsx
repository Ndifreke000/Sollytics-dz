"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { CommandPalette } from "@/components/command-palette"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, History, Wallet, ArrowRight } from "lucide-react"

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState('free')
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: '1',
      date: '2024-01-15',
      plan: 'Pro',
      amount: '0.27 SOL',
      status: 'completed',
      signature: 'abc123...def456'
    }
  ])

  const handlePaymentSuccess = (planId: string, signature: string) => {
    setCurrentPlan(planId)
    setPaymentHistory(prev => [{
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      plan: planId,
      amount: '0.27 SOL',
      status: 'completed',
      signature
    }, ...prev])
  }

  return (
    <ProtectedRoute>
      <AppShell>
        <CommandPalette />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Billing & Subscriptions</h1>
            <p className="text-muted-foreground">
              Manage your subscription and payment methods using Solana crypto payments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h3 className="font-bold">Free</h3>
                      <p className="text-2xl font-bold">$0<span className="text-sm">/month</span></p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>✓ 100 queries/month</li>
                        <li>✓ 3 dashboards</li>
                        <li>✓ Basic support</li>
                      </ul>
                      <Button className="w-full mt-4" disabled={currentPlan === 'free'}>
                        {currentPlan === 'free' ? 'Current Plan' : 'Downgrade'}
                      </Button>
                    </Card>
                    <Card className="p-4 border-blue-500">
                      <h3 className="font-bold">Pro</h3>
                      <p className="text-2xl font-bold">$49<span className="text-sm">/month</span></p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>✓ Unlimited queries</li>
                        <li>✓ Advanced AI</li>
                        <li>✓ API access</li>
                      </ul>
                      <Button className="w-full mt-4" onClick={() => handlePaymentSuccess('pro', 'demo')}>
                        {currentPlan === 'pro' ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <h3 className="font-bold">Enterprise</h3>
                      <p className="text-2xl font-bold">$499<span className="text-sm">/month</span></p>
                      <ul className="text-sm space-y-1 mt-2">
                        <li>✓ White-label</li>
                        <li>✓ SSO integration</li>
                        <li>✓ Dedicated support</li>
                      </ul>
                      <Button className="w-full mt-4" onClick={() => handlePaymentSuccess('enterprise', 'demo')}>
                        {currentPlan === 'enterprise' ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Current Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge className="mb-2 capitalize">{currentPlan}</Badge>
                    <p className="text-sm text-muted-foreground">
                      {currentPlan === 'free' ? 'Free tier with basic features' :
                       currentPlan === 'pro' ? '$49/month - Unlimited access' :
                       '$499/month - Enterprise features'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Payment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{payment.plan} Plan</div>
                          <div className="text-sm text-muted-foreground">{payment.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{payment.amount}</div>
                          <Badge variant="outline" className="text-xs">
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <span>◎</span>
                      <span className="text-sm">SOL (Solana)</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Connect your Solana wallet to pay with SOL
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppShell>
    </ProtectedRoute>
  )
}