"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Save, BookOpen, Loader2 } from "lucide-react"

interface QueryEditorProps {
  query: string
  onQueryChange: (query: string) => void
  onExecute: () => void
  onSave: (name: string) => void
  isExecuting: boolean
}

export function QueryEditor({ query, onQueryChange, onExecute, onSave, isExecuting }: QueryEditorProps) {
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [queryName, setQueryName] = useState("")

  const handleSave = () => {
    if (queryName.trim()) {
      onSave(queryName)
      setQueryName("")
      setSaveDialogOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      onExecute()
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Query Editor
            </CardTitle>
            <CardDescription>Write SQL-like queries to analyze Solana blockchain data</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Ctrl+Enter to execute
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Textarea
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="SELECT * FROM performance_samples ORDER BY slot DESC LIMIT 10;"
            className="min-h-[200px] font-mono text-sm resize-none"
            disabled={isExecuting}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button onClick={onExecute} disabled={isExecuting || !query.trim()} className="gap-2">
              {isExecuting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isExecuting ? "Executing..." : "Execute Query"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(true)}
              disabled={!query.trim()}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">{query.length} characters</div>
        </div>

        {saveDialogOpen && (
          <Card className="border-2 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Query Name</label>
                  <input
                    type="text"
                    value={queryName}
                    onChange={(e) => setQueryName(e.target.value)}
                    placeholder="Enter a name for this query..."
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm" disabled={!queryName.trim()}>
                    Save Query
                  </Button>
                  <Button variant="outline" onClick={() => setSaveDialogOpen(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
