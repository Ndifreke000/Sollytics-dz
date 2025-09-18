"use client"

import { useState } from "react"
// import { useWallet } from "@solana/wallet-adapter-react"
// Temporary mock for build
const useWallet = () => ({ publicKey: null, signTransaction: null })
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Wallet, ArrowRight } from "lucide-react"
import { SUBSCRIPTION_PLANS, PAYMENT_TOKENS, solanaPayments } from "@/lib/solana-payments"

interface CryptoPaymentProps {
  currentPlan?: string
  onPaymentSuccess: (planId: string, signature: string) => void
}

export function CryptoPayment({ currentPlan = 'free', onPaymentSuccess }: CryptoPaymentProps) {
  const { publicKey, signTransaction } = useWallet()
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [selectedToken, setSelectedToken] = useState<string>('SOL')
  const [loading, setLoading] = useState(false)
  const [tokenAmounts, setTokenAmounts] = useState<{ [key: string]: number }>({})

  const plans = Object.entries(SUBSCRIPTION_PLANS).map(([id, plan]) => ({
    id,
    ...plan,
    popular: id === 'pro'
  }))

  const calculateTokenAmounts = async (planId: string) => {
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    if (plan.priceUSD === 0) return

    const amounts: { [key: string]: number } = {}
    for (const [symbol, token] of Object.entries(PAYMENT_TOKENS)) {
      const amount = await solanaPayments.calculateTokenAmount(plan.priceUSD, symbol)
      amounts[symbol] = amount / Math.pow(10, token.decimals)
    }
    setTokenAmounts(amounts)
  }

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    calculateTokenAmounts(planId)
  }

  const handlePayment = async () => {
    if (!publicKey || !signTransaction || !selectedPlan) return

    setLoading(true)
    try {
      const { transaction, amount } = await solanaPayments.createPaymentTransaction(
        publicKey,
        selectedPlan,
        selectedToken
      )

      const signedTransaction = await signTransaction(transaction)
      const signature = await solanaPayments.connection.sendRawTransaction(
        signedTransaction.serialize()
      )

      await solanaPayments.connection.confirmTransaction(signature)
      
      const verified = await solanaPayments.verifyPayment(signature, amount)
      if (verified) {
        onPaymentSuccess(selectedPlan, signature)
      }
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`cursor-pointer transition-all ${
              selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">Popular</Badge>
            )}
            
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-2xl font-bold">
                ${plan.priceUSD}
                {plan.priceUSD > 0 && <span className="text-sm font-normal">/month</span>}
              </div>
            </CardHeader>

            <CardContent className="pt-2">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-green-500" />
                  {plan.queries === -1 ? 'Unlimited queries' : `${plan.queries} queries/month`}
                </li>
                {plan.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPlan && selectedPlan !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Complete Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-center gap-2">
                <span>◎</span>
                <span>SOL (Solana)</span>
                {tokenAmounts.SOL && (
                  <span className="text-muted-foreground ml-auto">
                    {tokenAmounts.SOL.toFixed(4)} SOL
                  </span>
                )}
              </div>
            </div>

            <Button 
              onClick={handlePayment}
              disabled={!publicKey || loading}
              className="w-full gap-2"
            >
              {loading ? "Processing..." : (
                <>
                  Pay with {selectedToken}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}