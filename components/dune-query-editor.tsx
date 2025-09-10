"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Save, Brain, Zap } from "lucide-react"

interface DuneQueryEditorProps {
  query: string
  onQueryChange: (query: string) => void
  onExecute: (cluster?: string) => void
  onSave: () => void
  isExecuting: boolean
  credits: number
}

export function DuneQueryEditor({ query, onQueryChange, onExecute, onSave, isExecuting, credits }: DuneQueryEditorProps) {
  const [cluster, setCluster] = useState<string>("free")
  
  const getCreditCost = () => {
    const base = cluster === "free" ? 1 : cluster === "medium" ? 5 : 10
    const hasJoin = query.toLowerCase().includes("join") ? 2 : 1
    return base * hasJoin
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            DuneSQL Query Editor
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{credits} credits</Badge>
            <Badge variant="secondary">Cost: {getCreditCost()}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={cluster} onValueChange={setCluster}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="large">Large</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => onExecute(cluster)} disabled={isExecuting} className="gap-2">
            <Play className="w-4 h-4" />
            Execute
          </Button>
          <Button variant="outline" onClick={onSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
        
        <Textarea
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="SELECT * FROM solana.transactions WHERE block_time >= NOW() - INTERVAL '1 hour' LIMIT 100;"
          className="min-h-[200px] font-mono"
          disabled={isExecuting}
        />
      </CardContent>
    </Card>
  )
}