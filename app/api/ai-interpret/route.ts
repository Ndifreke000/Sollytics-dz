import { NextRequest, NextResponse } from "next/server"
import { aiModel } from "@/lib/ai-model"
import { database } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const { transactionData, networkMetrics } = await request.json()
    
    // Check cache first
    const cacheKey = `ai-analysis-${JSON.stringify(transactionData).slice(0, 50)}`
    const cached = await database.getCachedData(cacheKey)
    
    if (cached) {
      return NextResponse.json({ interpretation: cached })
    }
    
    // Generate new analysis using AI model
    const interpretation = await aiModel.analyzeBlockchainData({
      transactionData,
      networkMetrics: networkMetrics || {
        currentSlot: 364708336,
        validatorCount: 1847,
        health: 'ok'
      }
    })
    
    // Cache for 3 minutes
    await database.cacheAnalyticsData(cacheKey, interpretation, 180)
    
    return NextResponse.json({ interpretation })
  } catch (error) {
    console.error('AI interpretation error:', error)
    return NextResponse.json({ error: "Failed to interpret data" }, { status: 500 })
  }
}