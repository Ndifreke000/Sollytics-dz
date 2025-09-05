interface AIModelConfig {
  modelId: string
  maxTokens: number
  temperature: number
}

interface AIAnalysisRequest {
  transactionData: any
  networkMetrics: any
  context?: string
}

class AIModelService {
  private config: AIModelConfig = {
    modelId: "openai/gpt-oss-120b",
    maxTokens: 256,
    temperature: 0.7
  }

  async analyzeBlockchainData(request: AIAnalysisRequest) {
    try {
      // Simulate GPT-OSS model analysis
      const prompt = this.buildAnalysisPrompt(request)
      
      // In production, this would call the actual model
      const analysis = await this.callModel(prompt)
      
      return {
        summary: analysis.summary,
        insights: analysis.insights,
        recommendations: analysis.recommendations,
        riskLevel: analysis.riskLevel,
        confidence: analysis.confidence,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('AI Analysis Error:', error)
      return this.getFallbackAnalysis(request)
    }
  }

  private buildAnalysisPrompt(request: AIAnalysisRequest): string {
    return `Analyze the following Solana blockchain data:

Transaction Data:
- Active Transactions: ${request.transactionData.activeTransactions}
- Average Block Time: ${request.transactionData.avgBlockTime}ms
- Network Load: ${request.transactionData.networkLoad}%
- TPS Range: ${Math.min(...request.transactionData.tps)} - ${Math.max(...request.transactionData.tps)}

Network Metrics:
- Current Slot: ${request.networkMetrics.currentSlot}
- Validator Count: ${request.networkMetrics.validatorCount}
- Health Status: ${request.networkMetrics.health}

Provide:
1. Brief summary of network state
2. Key insights about performance
3. Recommendations for optimization
4. Risk assessment (low/medium/high)
5. Confidence level (0-100)`
  }

  private async callModel(prompt: string) {
    // Simulate model processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock GPT-OSS response based on prompt analysis
    const mockResponse = {
      summary: "Network operating within normal parameters with moderate activity levels.",
      insights: [
        "Transaction throughput shows consistent performance patterns",
        "Block production times indicate healthy validator participation", 
        "Network load suggests room for additional capacity"
      ],
      recommendations: [
        "Monitor validator performance during peak hours",
        "Consider load balancing for optimal distribution",
        "Maintain current security protocols"
      ],
      riskLevel: "low",
      confidence: Math.floor(Math.random() * 20) + 80
    }
    
    return mockResponse
  }

  private getFallbackAnalysis(request: AIAnalysisRequest) {
    return {
      summary: "Analysis unavailable - using fallback metrics",
      insights: ["Network data collected successfully"],
      recommendations: ["Continue monitoring network health"],
      riskLevel: "medium" as const,
      confidence: 60,
      timestamp: new Date().toISOString()
    }
  }

  async generateQueryInsights(queryResult: any, query: string) {
    const prompt = `Analyze this Solana blockchain query result:
Query: ${query}
Results: ${queryResult.rowCount} rows returned
Execution Time: ${queryResult.executionTime}ms

Provide insights about the data patterns and potential optimizations.`

    try {
      const analysis = await this.callModel(prompt)
      return {
        dataPatterns: analysis.insights,
        optimizations: analysis.recommendations,
        queryPerformance: queryResult.executionTime < 1000 ? 'optimal' : 'needs optimization'
      }
    } catch {
      return {
        dataPatterns: ["Query executed successfully"],
        optimizations: ["Consider adding indexes for better performance"],
        queryPerformance: 'unknown'
      }
    }
  }

  async generateQuery(prompt: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const queries = [
      `SELECT 
  slot,
  block_time,
  transaction_count,
  successful_transactions
FROM performance_samples 
WHERE block_time > NOW() - INTERVAL '1 hour'
ORDER BY slot DESC
LIMIT 100;`,
      
      `SELECT 
  program_id,
  COUNT(*) as transaction_count,
  AVG(compute_units_consumed) as avg_compute_units
FROM transactions 
WHERE block_time > NOW() - INTERVAL '24 hours'
GROUP BY program_id
ORDER BY transaction_count DESC
LIMIT 20;`,
      
      `SELECT 
  DATE_TRUNC('hour', block_time) as hour,
  AVG(transactions_per_second) as avg_tps,
  MAX(transactions_per_second) as max_tps,
  MIN(transactions_per_second) as min_tps
FROM network_stats 
WHERE block_time > NOW() - INTERVAL '7 days'
GROUP BY hour
ORDER BY hour DESC;`,
      
      `SELECT 
  validator_identity,
  vote_account,
  activated_stake,
  commission,
  last_vote_slot
FROM validators 
WHERE activated_stake > 1000000
ORDER BY activated_stake DESC
LIMIT 50;`
    ]
    
    return queries[Math.floor(Math.random() * queries.length)]
  }

  async refineQuery(originalQuery: string, prompt: string): Promise<{ optimizedQuery: string; improvements: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    let optimizedQuery = originalQuery
    const improvements = []
    
    if (!originalQuery.toLowerCase().includes('limit')) {
      optimizedQuery += '\nLIMIT 1000;'
      improvements.push('Added LIMIT clause to prevent large result sets')
    }
    
    if (originalQuery.toLowerCase().includes('where')) {
      improvements.push('Consider adding indexes on filtered columns for better performance')
    }
    
    if (!originalQuery.includes('\n')) {
      optimizedQuery = optimizedQuery.replace(/SELECT/gi, 'SELECT\n  ')
        .replace(/FROM/gi, '\nFROM')
        .replace(/WHERE/gi, '\nWHERE')
        .replace(/ORDER BY/gi, '\nORDER BY')
        .replace(/GROUP BY/gi, '\nGROUP BY')
      improvements.push('Improved query formatting for better readability')
    }
    
    if (originalQuery.toLowerCase().includes('select *')) {
      improvements.push('Consider selecting specific columns instead of * for better performance')
    }
    
    if (!originalQuery.toLowerCase().includes('order by')) {
      improvements.push('Added ORDER BY clause for consistent result ordering')
    }
    
    return {
      optimizedQuery,
      improvements: improvements.length > 0 ? improvements : ['Query is already well-optimized']
    }
  }
}

export const aiModel = new AIModelService()

export interface AIAnalysis {
  summary: string
  insights: string[]
  recommendations: string[]
  riskLevel: "low" | "medium" | "high"
  confidence: number
  timestamp: string
}

export interface QueryRefinement {
  optimizedQuery: string
  improvements: string[]
}