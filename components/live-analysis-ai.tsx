"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface LiveAnalysisData {
  activeTransactions: number
  avgBlockTime: number
  networkLoad: number
  tpsData: number[]
}

interface AIAnalysis {
  networkStatus: "optimal" | "normal" | "congested" | "critical"
  keyMetrics: string[]
  trends: string[]
  alerts: string[]
  timestamp: string
}

interface LiveAnalysisAIProps {
  data: LiveAnalysisData
}

export function LiveAnalysisAI({ data }: LiveAnalysisAIProps) {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeData = async () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const avgTps = data.tpsData.reduce((a, b) => a + b, 0) / data.tpsData.length
    const tpsVariance = Math.sqrt(data.tpsData.reduce((sum, tps) => sum + Math.pow(tps - avgTps, 2), 0) / data.tpsData.length)
    
    const networkStatus = data.networkLoad > 90 ? "critical" : 
                         data.networkLoad > 80 ? "congested" : 
                         data.networkLoad > 60 ? "normal" : "optimal"
    
    const mockAnalysis: AIAnalysis = {
      networkStatus,
      keyMetrics: [
        `${data.activeTransactions.toLocaleString()} active transactions`,
        `${data.avgBlockTime}ms average block time`,
        `${data.networkLoad}% network utilization`,
        `${Math.round(avgTps)} TPS average throughput`
      ],
      trends: [
        tpsVariance > 500 ? "High TPS volatility detected" : "Stable transaction throughput",
        data.avgBlockTime > 500 ? "Block times elevated above optimal" : "Block production within normal range",
        data.networkLoad > 75 ? "Network approaching capacity limits" : "Network capacity healthy"
      ],
      alerts: [
        ...(data.networkLoad > 85 ? ["⚠️ High network load - monitor for congestion"] : []),
        ...(data.avgBlockTime > 600 ? ["⚠️ Slow block times - validator performance issue"] : []),
        ...(avgTps < 1000 ? ["⚠️ Low throughput - potential network bottleneck"] : [])
      ],
      timestamp: new Date().toLocaleTimeString()
    }
    
    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
  }

  useEffect(() => {
    analyzeData()
    const interval = setInterval(analyzeData, 60000) // Update every 1 minute
    return () => clearInterval(interval)
  }, []) // Remove data dependency to prevent frequent updates

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-green-600 bg-green-100"
      case "normal": return "text-blue-600 bg-blue-100"
      case "congested": return "text-yellow-600 bg-yellow-100"
      case "critical": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal": return <CheckCircle className="w-4 h-4" />
      case "normal": return <TrendingUp className="w-4 h-4" />
      case "congested": 
      case "critical": return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Brain className="w-4 h-4 text-purple-600" />
          Live Network Analysis
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          AI-powered real-time blockchain insights
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3 h-[calc(100%-100px)] overflow-y-auto p-4 pt-0">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600 animate-pulse" />
              <p className="text-sm text-muted-foreground">Analyzing network data...</p>
            </div>
          </div>
        ) : analysis ? (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(analysis.networkStatus)}>
                  {getStatusIcon(analysis.networkStatus)}
                  {analysis.networkStatus.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Updated {analysis.timestamp}
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Current Metrics</h4>
              <ul className="space-y-1">
                {analysis.keyMetrics.map((metric, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    {metric}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Trend Analysis</h4>
              <ul className="space-y-1">
                {analysis.trends.map((trend, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                    {trend}
                  </li>
                ))}
              </ul>
            </div>

            {analysis.alerts.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2 text-orange-600">Active Alerts</h4>
                <ul className="space-y-1">
                  {analysis.alerts.map((alert, index) => (
                    <li key={index} className="text-sm text-orange-600 flex items-start gap-2">
                      <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {alert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : null}
      </CardContent>
    </Card>
  )
}