"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const mockPrograms = [
  { name: "System Program", activity: 85, transactions: 12450 },
  { name: "Token Program", activity: 72, transactions: 9830 },
  { name: "NFT Program", activity: 58, transactions: 7620 },
  { name: "DEX Program", activity: 45, transactions: 5940 },
  { name: "Lending Program", activity: 32, transactions: 4210 },
  { name: "Staking Program", activity: 28, transactions: 3680 }
]

export function TopProgramActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Top Program Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Most active programs in the current block</p>
      </CardHeader>
      <CardContent className="space-y-4 h-[calc(100%-100px)] overflow-y-auto">
        {mockPrograms.map((program, index) => (
          <div key={program.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{program.name}</span>
              <span className="text-xs text-muted-foreground">{program.transactions.toLocaleString()}</span>
            </div>
            <Progress value={program.activity} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}