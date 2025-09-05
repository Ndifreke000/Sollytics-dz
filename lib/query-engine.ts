export interface QueryResult {
  columns: string[]
  rows: any[][]
  executionTime: number
  rowCount: number
}

export interface SavedQuery {
  id: string
  name: string
  query: string
  createdAt: Date
  lastExecuted?: Date
}

export interface QueryHistory {
  id: string
  query: string
  executedAt: Date
  executionTime: number
  success: boolean
  error?: string
}

// Simulated query templates for Solana blockchain data
export const QUERY_TEMPLATES = [
  {
    name: "Network Performance",
    description: "Get recent network performance metrics",
    query: `SELECT 
  slot,
  num_transactions,
  sample_period_secs,
  (num_transactions / sample_period_secs) as tps
FROM performance_samples 
ORDER BY slot DESC 
LIMIT 20;`,
  },
  {
    name: "Top Validators by Stake",
    description: "Find validators with highest stake",
    query: `SELECT 
  vote_pubkey,
  activated_stake,
  commission,
  last_vote
FROM validators 
WHERE status = 'active'
ORDER BY activated_stake DESC 
LIMIT 10;`,
  },
  {
    name: "Transaction Volume by Hour",
    description: "Hourly transaction volume analysis",
    query: `SELECT 
  DATE_TRUNC('hour', block_time) as hour,
  COUNT(*) as transaction_count,
  AVG(fee) as avg_fee
FROM transactions 
WHERE block_time >= NOW() - INTERVAL '24 hours'
GROUP BY hour 
ORDER BY hour DESC;`,
  },
  {
    name: "Account Balance Distribution",
    description: "Distribution of account balances",
    query: `SELECT 
  CASE 
    WHEN lamports < 1000000000 THEN '< 1 SOL'
    WHEN lamports < 10000000000 THEN '1-10 SOL'
    WHEN lamports < 100000000000 THEN '10-100 SOL'
    ELSE '> 100 SOL'
  END as balance_range,
  COUNT(*) as account_count
FROM accounts 
GROUP BY balance_range 
ORDER BY MIN(lamports);`,
  },
]

class QueryEngine {
  private queryHistory: QueryHistory[] = []
  private savedQueries: SavedQuery[] = []

  async executeQuery(query: string): Promise<QueryResult> {
    const startTime = Date.now()

    try {
      // Simulate query execution with mock data
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))

      const result = this.generateMockResult(query)
      const executionTime = Date.now() - startTime

      // Add to history
      this.queryHistory.unshift({
        id: crypto.randomUUID(),
        query,
        executedAt: new Date(),
        executionTime,
        success: true,
      })

      return {
        ...result,
        executionTime,
      }
    } catch (error) {
      const executionTime = Date.now() - startTime

      this.queryHistory.unshift({
        id: crypto.randomUUID(),
        query,
        executedAt: new Date(),
        executionTime,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })

      throw error
    }
  }

  private generateMockResult(query: string): Omit<QueryResult, "executionTime"> {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("performance_samples")) {
      return {
        columns: ["slot", "num_transactions", "sample_period_secs", "tps"],
        rows: Array.from({ length: 20 }, (_, i) => [
          280000000 + i,
          Math.floor(Math.random() * 5000) + 1000,
          2,
          Math.floor(Math.random() * 2500) + 500,
        ]),
        rowCount: 20,
      }
    }

    if (lowerQuery.includes("validators")) {
      return {
        columns: ["vote_pubkey", "activated_stake", "commission", "last_vote"],
        rows: Array.from({ length: 10 }, (_, i) => [
          `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`,
          Math.floor(Math.random() * 10000000) + 1000000,
          Math.floor(Math.random() * 10),
          280000000 + Math.floor(Math.random() * 1000),
        ]),
        rowCount: 10,
      }
    }

    if (lowerQuery.includes("transactions")) {
      return {
        columns: ["hour", "transaction_count", "avg_fee"],
        rows: Array.from({ length: 24 }, (_, i) => {
          const date = new Date()
          date.setHours(date.getHours() - i)
          return [
            date.toISOString().substring(0, 13) + ":00:00",
            Math.floor(Math.random() * 100000) + 50000,
            Math.floor(Math.random() * 10000) + 5000,
          ]
        }),
        rowCount: 24,
      }
    }

    // Default result
    return {
      columns: ["id", "value", "timestamp"],
      rows: Array.from({ length: 5 }, (_, i) => [i + 1, Math.floor(Math.random() * 1000), new Date().toISOString()]),
      rowCount: 5,
    }
  }

  getQueryHistory(): QueryHistory[] {
    return this.queryHistory
  }

  getSavedQueries(): SavedQuery[] {
    return this.savedQueries
  }

  saveQuery(name: string, query: string): SavedQuery {
    const savedQuery: SavedQuery = {
      id: crypto.randomUUID(),
      name,
      query,
      createdAt: new Date(),
    }

    this.savedQueries.push(savedQuery)
    return savedQuery
  }

  deleteSavedQuery(id: string): void {
    this.savedQueries = this.savedQueries.filter((q) => q.id !== id)
  }
}

export const queryEngine = new QueryEngine()
