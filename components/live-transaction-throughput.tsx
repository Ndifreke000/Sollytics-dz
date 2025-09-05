"use client"

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockData = Array.from({ length: 20 }, (_, i) => ({
  time: `${40 - i * 2}s`,
  tps: Math.floor(Math.random() * 4500) + 1500
}))

export function LiveTransactionThroughput() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Live Transaction Throughput</CardTitle>
        <p className="text-sm text-muted-foreground">Transactions per second over the last 40 seconds</p>
      </CardHeader>
      <CardContent className="p-0 h-[calc(100%-80px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 6000]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Line 
              type="monotone" 
              dataKey="tps" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}