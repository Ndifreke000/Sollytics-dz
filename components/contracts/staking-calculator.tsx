"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, TrendingUp, Coins, Clock } from "lucide-react"

export function StakingCalculator() {
  const [amount, setAmount] = useState("100")
  const [duration, setDuration] = useState("12")
  const [validator, setValidator] = useState("high")
  const [results, setResults] = useState<any>(null)

  const validators = {
    high: { name: "High Performance", apy: 8.5, commission: 5 },
    medium: { name: "Medium Performance", apy: 7.2, commission: 7 },
    low: { name: "Low Performance", apy: 6.1, commission: 10 }
  }

  const calculateRewards = () => {
    const stakeAmount = parseFloat(amount) || 0
    const stakeDuration = parseInt(duration) || 0
    const validatorData = validators[validator as keyof typeof validators]
    
    const grossAPY = validatorData.apy / 100
    const commission = validatorData.commission / 100
    const netAPY = grossAPY * (1 - commission)
    
    const monthlyRate = netAPY / 12
    const totalRewards = stakeAmount * netAPY * (stakeDuration / 12)
    const finalAmount = stakeAmount + totalRewards
    
    setResults({
      stakeAmount,
      stakeDuration,
      validator: validatorData,
      netAPY: netAPY * 100,
      monthlyRewards: stakeAmount * monthlyRate,
      totalRewards,
      finalAmount
    })
  }

  return (
    <div className="space-y-6">
      {/* Calculator Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-green-600" />
            Staking Rewards Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Stake Amount (SOL)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (Months)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="12"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Validator Performance</Label>
              <Select value={validator} onValueChange={setValidator}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High Performance (8.5% APY)</SelectItem>
                  <SelectItem value="medium">Medium Performance (7.2% APY)</SelectItem>
                  <SelectItem value="low">Low Performance (6.1% APY)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button onClick={calculateRewards} className="w-full">
            Calculate Rewards
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-600" />
                Reward Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {results.stakeAmount.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Initial Stake</div>
                </div>
                <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {results.totalRewards.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Rewards</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Validator</span>
                  <span className="font-medium">{results.validator.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Gross APY</span>
                  <span className="font-medium">{results.validator.apy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Commission</span>
                  <span className="font-medium">{results.validator.commission}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Net APY</span>
                  <span className="font-medium text-emerald-600">{results.netAPY.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Rewards</span>
                  <span className="font-medium">{results.monthlyRewards.toFixed(4)} SOL</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                Final Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {results.finalAmount.toFixed(2)} SOL
                </div>
                <div className="text-sm text-muted-foreground">
                  Total after {results.stakeDuration} months
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Return on Investment</span>
                  <span className="font-bold text-emerald-600">
                    +{((results.totalRewards / results.stakeAmount) * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm">Break-even Time</span>
                  <span className="font-medium">
                    {Math.ceil(12 / results.netAPY)} months
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Validator Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Validator Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(validators).map(([key, validator]) => (
              <div key={key} className="p-4 border rounded-lg">
                <h3 className="font-bold mb-2">{validator.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">APY</span>
                    <span className="font-medium text-emerald-600">{validator.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Commission</span>
                    <span className="font-medium">{validator.commission}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net APY</span>
                    <span className="font-medium">{(validator.apy * (1 - validator.commission / 100)).toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}