"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Database, AlertCircle, BarChart3, Save, Plus } from "lucide-react"
import { VisualizationBuilder } from "@/components/visualization-builder"
import type { QueryResult } from "@/lib/query-engine"

interface VisualizationConfig {
  id: string
  name: string
  type: "bar" | "line" | "pie" | "counter"
  xColumn?: string
  yColumns: string[]
  colors: { [key: string]: string }
  title: string
}

interface QueryResultsProps {
  result: QueryResult | null
  error: string | null
  isExecuting: boolean
  onSaveTable?: (name: string) => void
  onSaveVisualization?: (config: VisualizationConfig) => void
  savedVisualizations?: VisualizationConfig[]
}

export function QueryResults({ result, error, isExecuting, onSaveTable, onSaveVisualization, savedVisualizations = [] }: QueryResultsProps) {
  const [activeTab, setActiveTab] = useState("table")
  const [tableName, setTableName] = useState("")
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const handleSaveTable = () => {
    if (tableName.trim() && onSaveTable) {
      onSaveTable(tableName)
      setTableName("")
      setShowSaveDialog(false)
    }
  }

  const handleSaveVisualization = (config: VisualizationConfig) => {
    if (onSaveVisualization) {
      onSaveVisualization(config)
    }
  }
  if (isExecuting) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Executing query...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-5 h-5" />
            Query Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-destructive/10 p-4 rounded-lg">
            <p className="text-sm font-mono text-destructive">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-2">
            <Database className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-sm text-muted-foreground">Execute a query to see results</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Query Results
            </CardTitle>
            <CardDescription>{result.rowCount} rows returned</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Clock className="w-3 h-3" />
              {result.executionTime}ms
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              className="gap-2"
            >
              <Save className="w-3 h-3" />
              Save Table
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showSaveDialog && (
          <Card className="mb-4 border-2 border-primary/20">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Table Name</label>
                  <input
                    type="text"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                    placeholder="Enter name for this table..."
                    className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveTable} size="sm" disabled={!tableName.trim()}>
                    Save Table
                  </Button>
                  <Button variant="outline" onClick={() => setShowSaveDialog(false)} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="table" className="gap-2">
              <Database className="w-4 h-4" />
              Table View
            </TabsTrigger>
            <TabsTrigger value="visualize" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Visualize
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-4">
            <ScrollArea className="h-[400px] w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    {result.columns.map((column, index) => (
                      <TableHead key={index} className="font-semibold">
                        {column}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="font-mono text-sm">
                          {typeof cell === "number" ? cell.toLocaleString() : String(cell)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="visualize" className="mt-4">
            <VisualizationBuilder
              result={result}
              onSaveVisualization={handleSaveVisualization}
              existingVisualizations={savedVisualizations}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
