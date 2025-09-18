"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { CommandPalette } from "@/components/command-palette"
import { QueryToDashboardFlow } from "@/components/query-to-dashboard-flow"
import { AIAssistant } from "@/components/ai-assistant"
import { ProtectedRoute } from "@/components/protected-route"
import { DuneQueryEditor } from "@/components/dune-query-editor"
import { DuneVisualizationBuilder } from "@/components/dune-visualization-builder"
import { DuneDashboardBuilder } from "@/components/dune-dashboard-builder"
import { QueryResults } from "@/components/query-results"
import { QueryTemplates } from "@/components/query-templates"
import { DataExport } from "@/components/data-export"
import { KeyboardShortcutsHelp } from "@/components/keyboard-shortcuts-help"
import { useQueryEditor } from "@/hooks/use-query-editor"
import { useKeyboardShortcuts, createCommonShortcuts } from "@/hooks/use-keyboard-shortcuts"

export default function QueryPage() {
  const { query, setQuery, result, isExecuting, error, executeQuery, saveQuery, loadQuery } = useQueryEditor()
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false)
  const [savedVisualizations, setSavedVisualizations] = useState<any[]>([])
  const [savedDashboards, setSavedDashboards] = useState<any[]>([])
  const [savedTables, setSavedTables] = useState<any[]>([])
  const [credits, setCredits] = useState(1000)
  const [currentQueryVisualizations, setCurrentQueryVisualizations] = useState<any[]>([])

  const shortcuts = createCommonShortcuts({
    onSave: saveQuery,
    onExecute: executeQuery,
    onHelp: () => setShowShortcutsHelp(true),
    onRefresh: () => window.location.reload()
  })

  useKeyboardShortcuts({ shortcuts })

  const handleExecuteTemplate = (templateQuery: string) => {
    setQuery(templateQuery)
    setCurrentQueryVisualizations([])
    executeQuery(templateQuery)
  }

  const handleSaveVisualization = (config: any) => {
    const newViz = {
      ...config,
      queryId: Date.now().toString(),
      query: query,
      createdAt: new Date().toISOString()
    }
    setSavedVisualizations(prev => [...prev, newViz])
    setCurrentQueryVisualizations(prev => [...prev, newViz])
    console.log('Saved visualization:', newViz)
  }

  const handleSaveTable = (name: string) => {
    if (result) {
      const newTable = {
        id: Date.now().toString(),
        name,
        query,
        result,
        createdAt: new Date().toISOString()
      }
      setSavedTables(prev => [...prev, newTable])
      // In production, save to database
      console.log('Saved table:', newTable)
    }
  }

  return (
    <ProtectedRoute>
      <AppShell>
        <CommandPalette />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Query Editor</h1>
            <p className="text-muted-foreground">
              Analyze Solana blockchain data with SQL-like queries. Use templates to get started or write your own
              custom queries.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Query Area */}
            <div className="xl:col-span-2 space-y-6">
              <DuneQueryEditor
                query={query}
                onQueryChange={setQuery}
                onExecute={(cluster) => executeQuery()}
                onSave={saveQuery}
                isExecuting={isExecuting}
                credits={credits}
              />

              <QueryToDashboardFlow
                queryResult={result}
                query={query}
                onSaveVisualization={handleSaveVisualization}
                onSaveToDashboard={(dashboardId, viz) => console.log('Save to dashboard:', dashboardId, viz)}
              />

              {result && (
                <DuneVisualizationBuilder
                  data={result.rows}
                  columns={result.columns}
                  onSave={handleSaveVisualization}
                />
              )}

              <QueryResults 
                result={result} 
                error={error} 
                isExecuting={isExecuting}
                onSaveVisualization={handleSaveVisualization}
                onSaveTable={handleSaveTable}
                savedVisualizations={currentQueryVisualizations}
              />
            </div>

            {/* AI Assistant */}
            <div className="xl:col-span-1">
              <AIAssistant />
            </div>
            
            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <QueryTemplates onLoadTemplate={loadQuery} onExecuteTemplate={handleExecuteTemplate} />
              
              {result && (
                <DataExport 
                  data={result.rows.map(row => 
                    result.columns.reduce((obj, col, i) => ({ ...obj, [col]: row[i] }), {})
                  )}
                  title="Query Results"
                />
              )}
            </div>
          </div>
        </div>
        
        <KeyboardShortcutsHelp
          shortcuts={shortcuts}
          isOpen={showShortcutsHelp}
          onClose={() => setShowShortcutsHelp(false)}
        />
      </AppShell>
    </ProtectedRoute>
  )
}
