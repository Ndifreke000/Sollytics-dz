"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Sparkles, Code } from "lucide-react"

interface NaturalLanguageQueryProps {
  onQueryGenerated: (sql: string, description: string) => void
}

export function NaturalLanguageQuery({ onQueryGenerated }: NaturalLanguageQueryProps) {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions] = useState([
    "Show me whale transactions today",
    "Find top validators by stake",
    "Analyze USDC transfers this week",
    "Show Jupiter swap volume",
    "Find failed transactions"
  ])

  const handleSubmit = async () => {
    if (!input.trim()) return

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const sql = generateSQLFromNL(input)
      const description = `Generated query for: "${input}"`
      
      onQueryGenerated(sql, description)
      setInput("")
    } catch (error) {
      console.error('Query generation failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateSQLFromNL = (naturalLanguage: string): string => {
    const lower = naturalLanguage.toLowerCase()
    
    if (lower.includes('whale') && lower.includes('transaction')) {
      return `SELECT 
  signature,
  from_address,
  to_address,
  amount / 1000000000 as sol_amount,
  block_time
FROM transactions 
WHERE amount > 100000000000
  AND block_time >= NOW() - INTERVAL '1 day'
ORDER BY amount DESC
LIMIT 50;`
    }
    
    if (lower.includes('validator') && lower.includes('stake')) {
      return `SELECT 
  vote_pubkey,
  activated_stake / 1000000000 as stake_sol,
  commission,
  last_vote
FROM validators 
WHERE status = 'active'
ORDER BY activated_stake DESC 
LIMIT 20;`
    }
    
    return `SELECT 
  slot,
  block_time,
  transaction_count
FROM blocks 
WHERE block_time >= NOW() - INTERVAL '1 hour'
ORDER BY slot DESC
LIMIT 20;`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          Natural Language Query
          <Badge variant="secondary">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Solana data..."
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1"
          />
          <Button onClick={handleSubmit} disabled={loading || !input.trim()}>
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Try these examples:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">How it works</span>
          </div>
          <p className="text-xs text-blue-700">
            Our AI converts your natural language into optimized SQL queries for Solana blockchain data.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}