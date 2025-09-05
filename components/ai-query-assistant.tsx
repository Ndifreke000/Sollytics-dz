"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Loader2, Sparkles, Code, CheckCircle } from "lucide-react"
import { aiModel } from "@/lib/ai-model"

interface AIQueryAssistantProps {
  query: string
  onQueryUpdate: (newQuery: string) => void
  onExecute: () => void
}

export function AIQueryAssistant({ query, onQueryUpdate, onExecute }: AIQueryAssistantProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestion, setSuggestion] = useState<string | null>(null)
  const [improvements, setImprovements] = useState<string[]>([])

  const handleAIAssist = async () => {
    setIsProcessing(true)
    setSuggestion(null)
    setImprovements([])

    try {
      if (!query.trim()) {
        // Generate new query
        const prompt = `Generate a useful Solana blockchain SQL query for analytics. Include common patterns like:
        - Transaction analysis
        - Program activity
        - Performance metrics
        - Token transfers
        Return only the SQL query without explanation.`
        
        const generatedQuery = await aiModel.generateQuery(prompt)
        setSuggestion(generatedQuery)
        setImprovements(["Generated new query for blockchain analysis"])
      } else {
        // Refine existing query
        const prompt = `Analyze and improve this Solana blockchain SQL query:
        ${query}
        
        Provide:
        1. An optimized version of the query
        2. List of improvements made
        
        Focus on performance, readability, and best practices.`
        
        const response = await aiModel.refineQuery(query, prompt)
        setSuggestion(response.optimizedQuery)
        setImprovements(response.improvements)
      }
    } catch (error) {
      console.error("AI assistance failed:", error)
      setImprovements(["AI assistance temporarily unavailable"])
    } finally {
      setIsProcessing(false)
    }
  }

  const applysuggestion = () => {
    if (suggestion) {
      onQueryUpdate(suggestion)
      setSuggestion(null)
      setImprovements([])
    }
  }

  const applyAndExecute = () => {
    if (suggestion) {
      onQueryUpdate(suggestion)
      setTimeout(() => onExecute(), 100)
      setSuggestion(null)
      setImprovements([])
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleAIAssist}
        disabled={isProcessing}
        variant="outline"
        className="gap-2 w-full"
      >
        {isProcessing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Brain className="w-4 h-4 text-purple-600" />
        )}
        {isProcessing ? "AI Processing..." : query.trim() ? "Refine Query" : "Generate Query"}
        <Sparkles className="w-3 h-3 text-yellow-500" />
      </Button>

      {suggestion && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-600" />
              AI Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-3 rounded-lg border">
              <pre className="text-sm font-mono whitespace-pre-wrap">{suggestion}</pre>
            </div>
            
            {improvements.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Improvements:</h4>
                <ul className="space-y-1">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={applyAndExecute} size="sm" className="gap-2">
                <Code className="w-3 h-3" />
                Apply & Execute
              </Button>
              <Button onClick={applysuggestion} variant="outline" size="sm">
                Apply Only
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}