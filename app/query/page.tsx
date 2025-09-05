"use client"

import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { QueryEditor } from "@/components/query-editor"
import { QueryResults } from "@/components/query-results"
import { QueryTemplates } from "@/components/query-templates"
import { useQueryEditor } from "@/hooks/use-query-editor"

export default function QueryPage() {
  const { query, setQuery, result, isExecuting, error, executeQuery, saveQuery, loadQuery } = useQueryEditor()

  const handleExecuteTemplate = (templateQuery: string) => {
    setQuery(templateQuery)
    executeQuery(templateQuery)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Query Editor</h1>
            <p className="text-muted-foreground">
              Analyze Solana blockchain data with SQL-like queries. Use templates to get started or write your own
              custom queries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Query Area */}
            <div className="lg:col-span-2 space-y-6">
              <QueryEditor
                query={query}
                onQueryChange={setQuery}
                onExecute={() => executeQuery()}
                onSave={saveQuery}
                isExecuting={isExecuting}
              />

              <QueryResults result={result} error={error} isExecuting={isExecuting} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <QueryTemplates onLoadTemplate={loadQuery} onExecuteTemplate={handleExecuteTemplate} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
