"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, Save, History, Lightbulb, Code, Zap, Brain } from "lucide-react"
import { AIQueryAssistant } from "@/components/ai-query-assistant"

interface QuerySuggestion {
  text: string
  type: "keyword" | "table" | "column" | "function"
  description?: string
}

interface AdvancedQueryBuilderProps {
  query: string
  onQueryChange: (query: string) => void
  onExecute: () => void
  onSave: () => void
  isExecuting?: boolean
}

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "JOIN", "LEFT JOIN", 
  "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "UNION", "INSERT", "UPDATE", "DELETE",
  "CREATE", "ALTER", "DROP", "INDEX", "TABLE", "DATABASE", "AS", "AND", "OR", "NOT",
  "IN", "BETWEEN", "LIKE", "IS", "NULL", "COUNT", "SUM", "AVG", "MIN", "MAX"
]

const SOLANA_TABLES = [
  "transactions", "blocks", "accounts", "validators", "performance_samples",
  "vote_accounts", "token_accounts", "programs", "instructions"
]

const SOLANA_COLUMNS = [
  "signature", "slot", "block_time", "fee", "lamports", "owner", "executable",
  "vote_pubkey", "activated_stake", "commission", "last_vote", "num_transactions",
  "sample_period_secs", "pubkey", "data", "program_id"
]

export function AdvancedQueryBuilder({
  query,
  onQueryChange,
  onExecute,
  onSave,
  isExecuting = false
}: AdvancedQueryBuilderProps) {
  const [suggestions, setSuggestions] = useState<QuerySuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const highlightSyntax = (text: string) => {
    let highlighted = text
    
    // Highlight SQL keywords
    SQL_KEYWORDS.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="text-blue-600 font-semibold">${keyword}</span>`)
    })
    
    // Highlight table names
    SOLANA_TABLES.forEach(table => {
      const regex = new RegExp(`\\b${table}\\b`, 'gi')
      highlighted = highlighted.replace(regex, `<span class="text-green-600">${table}</span>`)
    })
    
    // Highlight strings
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="text-orange-600">\'$1\'</span>')
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-orange-600">"$1"</span>')
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\b/g, '<span class="text-purple-600">$&</span>')
    
    return highlighted
  }

  const getSuggestions = (currentWord: string, position: number) => {
    const suggestions: QuerySuggestion[] = []
    const word = currentWord.toLowerCase()
    
    if (word.length < 2) return []
    
    // Add keyword suggestions
    SQL_KEYWORDS.forEach(keyword => {
      if (keyword.toLowerCase().startsWith(word)) {
        suggestions.push({
          text: keyword,
          type: "keyword",
          description: `SQL keyword`
        })
      }
    })
    
    // Add table suggestions
    SOLANA_TABLES.forEach(table => {
      if (table.toLowerCase().includes(word)) {
        suggestions.push({
          text: table,
          type: "table",
          description: `Solana blockchain table`
        })
      }
    })
    
    // Add column suggestions
    SOLANA_COLUMNS.forEach(column => {
      if (column.toLowerCase().includes(word)) {
        suggestions.push({
          text: column,
          type: "column",
          description: `Database column`
        })
      }
    })
    
    return suggestions.slice(0, 8)
  }

  const handleInputChange = (value: string) => {
    onQueryChange(value)
    
    if (textareaRef.current) {
      const position = textareaRef.current.selectionStart
      const beforeCursor = value.substring(0, position)
      const words = beforeCursor.split(/\s+/)
      const currentWord = words[words.length - 1] || ""
      
      setCursorPosition(position)
      
      if (currentWord.length >= 2) {
        const newSuggestions = getSuggestions(currentWord, position)
        setSuggestions(newSuggestions)
        setShowSuggestions(newSuggestions.length > 0)
        setSelectedSuggestion(0)
      } else {
        setShowSuggestions(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedSuggestion(prev => 
            prev < suggestions.length - 1 ? prev + 1 : 0
          )
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedSuggestion(prev => 
            prev > 0 ? prev - 1 : suggestions.length - 1
          )
          break
        case "Tab":
        case "Enter":
          e.preventDefault()
          applySuggestion(suggestions[selectedSuggestion])
          break
        case "Escape":
          setShowSuggestions(false)
          break
      }
    }
    
    // Execute query with Ctrl+Enter
    if (e.ctrlKey && e.key === "Enter") {
      e.preventDefault()
      onExecute()
    }
  }

  const applySuggestion = (suggestion: QuerySuggestion) => {
    if (!textareaRef.current) return
    
    const textarea = textareaRef.current
    const start = textarea.selectionStart
    const beforeCursor = query.substring(0, start)
    const afterCursor = query.substring(start)
    
    // Find the start of the current word
    const words = beforeCursor.split(/\s+/)
    const currentWord = words[words.length - 1] || ""
    const wordStart = beforeCursor.lastIndexOf(currentWord)
    
    const newQuery = 
      query.substring(0, wordStart) + 
      suggestion.text + 
      afterCursor
    
    onQueryChange(newQuery)
    setShowSuggestions(false)
    
    // Set cursor position after the inserted text
    setTimeout(() => {
      const newPosition = wordStart + suggestion.text.length
      textarea.setSelectionRange(newPosition, newPosition)
      textarea.focus()
    }, 0)
  }

  const getSuggestionIcon = (type: QuerySuggestion["type"]) => {
    switch (type) {
      case "keyword": return <Code className="w-3 h-3 text-blue-600" />
      case "table": return <div className="w-3 h-3 bg-green-600 rounded-sm" />
      case "column": return <div className="w-3 h-3 bg-purple-600 rounded-full" />
      case "function": return <Zap className="w-3 h-3 text-orange-600" />
      default: return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Query Builder
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Ctrl+Enter to execute
            </Badge>
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <History className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 relative">
          <Textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SELECT * FROM transactions WHERE block_time > NOW() - INTERVAL '1 hour'"
            className="font-mono text-sm min-h-[120px] resize-none"
            spellCheck={false}
          />
          
          {/* Syntax highlighting overlay */}
          <div 
            className="absolute inset-0 pointer-events-none font-mono text-sm p-3 whitespace-pre-wrap opacity-0"
            dangerouslySetInnerHTML={{ __html: highlightSyntax(query) }}
          />
          
          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.type}-${suggestion.text}`}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-muted ${
                    index === selectedSuggestion ? "bg-muted" : ""
                  }`}
                  onClick={() => applySuggestion(suggestion)}
                >
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{suggestion.text}</div>
                    {suggestion.description && (
                      <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
          </div>
          
          <div className="lg:col-span-1">
            <AIQueryAssistant
              query={query}
              onQueryUpdate={onQueryChange}
              onExecute={onExecute}
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="w-4 h-4" />
            <span>Start typing for suggestions</span>
          </div>
          <Button onClick={onExecute} disabled={isExecuting || !query.trim()} className="gap-2">
            <Play className="w-4 h-4" />
            {isExecuting ? "Executing..." : "Execute Query"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}