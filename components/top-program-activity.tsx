"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TopProgramActivity() {
  const [programs, setPrograms] = useState([
    { name: "System Program", activity: 85, transactions: 12450 },
    { name: "Token Program", activity: 72, transactions: 9830 },
    { name: "NFT Program", activity: 58, transactions: 7620 },
    { name: "DEX Program", activity: 45, transactions: 5940 },
    { name: "Lending Program", activity: 32, transactions: 4210 },
    { name: "Staking Program", activity: 28, transactions: 3680 }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setPrograms(prev => prev.map(program => ({
        ...program,
        activity: Math.max(10, Math.min(100, program.activity + (Math.random() - 0.5) * 10)),
        transactions: program.transactions + Math.floor(Math.random() * 100) - 50
      })))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Top Program Activity</CardTitle>
        <p className="text-sm text-muted-foreground">Most active programs in the current block</p>
      </CardHeader>
      <CardContent className="space-y-4 h-[calc(100%-100px)] overflow-y-auto">
        {programs.map((program, index) => (
          <div key={program.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{program.name}</span>
              <span className="text-xs text-muted-foreground">{program.transactions.toLocaleString()}</span>
            </div>
            <Progress value={program.activity} className="h-3 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}