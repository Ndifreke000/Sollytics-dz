"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, RefreshCw, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface AIInterpretation {
  summary: string
  insights: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
  confidence: number
}

interface AIDataInterpreterProps {
  transactionData: {
    activeTransactions: number
    avgBlockTime: number
    networkLoad: number
    tps: number[]
    programActivity: Array<{ name: string; activity: number }>
  }
}

export function AIDataInterpreter({ transactionData }: AIDataInterpreterProps) {
  const [interpretation, setInterpretation] = useState<AIInterpretation | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeData = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const avgTps = transactionData.tps.reduce((a, b) => a + b, 0) / transactionData.tps.length
    const tpsVariance = Math.sqrt(transactionData.tps.reduce((sum, tps) => sum + Math.pow(tps - avgTps, 2), 0) / transactionData.tps.length)
    
    const mockInterpretation: AIInterpretation = {
      summary: `Network is operating at ${transactionData.networkLoad}% capacity with ${transactionData.activeTransactions.toLocaleString()} active transactions. Block time of ${transactionData.avgBlockTime}ms indicates ${transactionData.avgBlockTime < 500 ? 'optimal' : 'elevated'} network performance.`,
      insights: [
        `TPS averaging ${Math.round(avgTps)} with ${tpsVariance > 500 ? 'high' : 'low'} volatility`,
        `System Program dominance at ${transactionData.programActivity[0]?.activity}% suggests healthy base layer activity`,
        `Network load at ${transactionData.networkLoad}% indicates ${transactionData.networkLoad > 80 ? 'near capacity' : 'moderate usage'}`
      ],
      recommendations: [
        transactionData.networkLoad > 85 ? "Monitor for potential congestion" : "Network capacity is healthy",
        transactionData.avgBlockTime > 500 ? "Block time elevated - watch validator performance" : "Block production is optimal",
        "Consider diversifying program usage for better load distribution"
      ],
      riskLevel: transactionData.networkLoad > 90 ? "high" : transactionData.networkLoad > 75 ? "medium" : "low",
      confidence: 87
    }
    
    setInterpretation(mockInterpretation)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    analyzeData()
    const interval = setInterval(analyzeData, 180000) // 3 minutes
    return () => clearInterval(interval)
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low": return "text-green-600 bg-green-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "high": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "low": return <CheckCircle className="w-4 h-4" />
      case "medium": return <TrendingUp className="w-4 h-4" />
      case "high": return <AlertTriangle className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Data Interpretation
          </CardTitle>
          <Button variant="outline" size="sm" onClick={analyzeData} disabled={isAnalyzing}>
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Analysis refreshes every 3 minutes • GPT-OSS-120B</p>
      </CardHeader>
      
      <CardContent className="space-y-4 h-[calc(100%-120px)] overflow-y-auto">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600 animate-pulse" />
              <p className="text-sm text-muted-foreground">Analyzing network data...</p>
            </div>
          </div>
        ) : interpretation ? (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getRiskColor(interpretation.riskLevel)}>
                  {getRiskIcon(interpretation.riskLevel)}
                  {interpretation.riskLevel.toUpperCase()} RISK
                </Badge>
                <Badge variant="outline">
                  {interpretation.confidence}% confidence
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Summary</h4>
                <p className="text-sm text-muted-foreground">{interpretation.summary}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Key Insights</h4>
              <ul className="space-y-1">
                {interpretation.insights.map((insight, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {interpretation.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}