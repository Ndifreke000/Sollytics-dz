"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, Sparkles, Code, BarChart3 } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your Solana analytics assistant. I can help you write queries, create visualizations, and analyze blockchain data. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "Show me recent transaction volume",
        "Find top validators by stake",
        "Analyze token transfers",
        "Create a performance dashboard"
      ]
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
        suggestions: generateSuggestions(input)
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("transaction") || lowerQuery.includes("volume")) {
      return "Here's a query to analyze transaction volume:\n\n```sql\nSELECT \n  DATE_TRUNC('hour', block_time) as hour,\n  COUNT(*) as tx_count,\n  AVG(fee) as avg_fee\nFROM transactions \nWHERE block_time >= NOW() - INTERVAL '24 hours'\nGROUP BY hour \nORDER BY hour DESC;\n```\n\nThis will show hourly transaction counts and average fees. Would you like me to create a visualization for this data?"
    }
    
    if (lowerQuery.includes("validator") || lowerQuery.includes("stake")) {
      return "To find top validators by stake:\n\n```sql\nSELECT \n  vote_pubkey,\n  activated_stake / 1000000000 as stake_sol,\n  commission,\n  last_vote\nFROM validators \nWHERE status = 'active'\nORDER BY activated_stake DESC \nLIMIT 20;\n```\n\nThis shows the top 20 validators with their stake in SOL. I can help you create a bar chart to visualize this data."
    }
    
    return "I can help you with that! Here are some things I can assist with:\n\n• Writing SQL queries for Solana data\n• Creating visualizations from your results\n• Building dashboards\n• Analyzing blockchain patterns\n• Optimizing query performance\n\nWhat specific analysis are you looking for?"
  }

  const generateSuggestions = (query: string): string[] => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes("transaction")) {
      return [
        "Create a line chart of TPS over time",
        "Show transaction fee distribution",
        "Analyze failed vs successful transactions"
      ]
    }
    
    if (lowerQuery.includes("validator")) {
      return [
        "Visualize stake distribution",
        "Show validator performance metrics",
        "Create validator commission analysis"
      ]
    }
    
    return [
      "Help me write a custom query",
      "Show me query templates",
      "Create a new dashboard"
    ]
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="w-3 h-3 mr-1" />
            GPT-4
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-muted"
                }`}>
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  
                  {message.suggestions && (
                    <div className="mt-3 space-y-1">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 mr-1 mb-1"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about queries, visualizations, or Solana data..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage} disabled={!input.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}