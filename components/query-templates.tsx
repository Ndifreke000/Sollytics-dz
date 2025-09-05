"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Play } from "lucide-react"
import { QUERY_TEMPLATES } from "@/lib/query-engine"

interface QueryTemplatesProps {
  onLoadTemplate: (query: string) => void
  onExecuteTemplate: (query: string) => void
}

export function QueryTemplates({ onLoadTemplate, onExecuteTemplate }: QueryTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Query Templates
        </CardTitle>
        <CardDescription>Pre-built queries to get you started with Solana data analysis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {QUERY_TEMPLATES.map((template, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-sm">{template.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Template
              </Badge>
            </div>

            <div className="bg-muted/50 p-3 rounded text-xs font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap">{template.query}</pre>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onLoadTemplate(template.query)} className="gap-1">
                <FileText className="w-3 h-3" />
                Load
              </Button>
              <Button size="sm" onClick={() => onExecuteTemplate(template.query)} className="gap-1">
                <Play className="w-3 h-3" />
                Execute
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
