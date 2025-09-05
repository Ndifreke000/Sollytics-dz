"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { formatSOL, formatPercentage, shortenAddress } from "@/lib/formatters"
import type { VoteAccount } from "@/lib/solana"

interface ValidatorStatsProps {
  validators: {
    current: VoteAccount[]
    delinquent: VoteAccount[]
  }
  isLoading?: boolean
}

export function ValidatorStats({ validators, isLoading }: ValidatorStatsProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Validator Network</CardTitle>
          <CardDescription>Active and delinquent validators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse bg-muted rounded" />
            <div className="h-4 w-3/4 animate-pulse bg-muted rounded" />
            <div className="h-4 w-1/2 animate-pulse bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalValidators = validators.current.length + validators.delinquent.length
  const totalStake = validators.current.reduce((sum, v) => sum + v.activatedStake, 0)
  const topValidators = validators.current.sort((a, b) => b.activatedStake - a.activatedStake).slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Validator Network</CardTitle>
        <CardDescription>
          {validators.current.length} active, {validators.delinquent.length} delinquent
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold">{validators.current.length}</div>
            <div className="text-sm text-muted-foreground">Active Validators</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{formatSOL(totalStake)}</div>
            <div className="text-sm text-muted-foreground">Total Stake (SOL)</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Top Validators by Stake</h4>
          <div className="space-y-2">
            {topValidators.map((validator, index) => {
              const stakePercentage = (validator.activatedStake / totalStake) * 100
              return (
                <div key={validator.votePubkey} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="text-sm font-mono">{shortenAddress(validator.votePubkey)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{formatPercentage(stakePercentage / 100)}</span>
                    <Progress value={stakePercentage} className="w-16" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
