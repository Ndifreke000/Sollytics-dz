"use client"

import { useState, useCallback } from "react"
import { queryEngine, type QueryResult, type QueryHistory, type SavedQuery } from "@/lib/query-engine"

export function useQueryEditor() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<QueryResult | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<QueryHistory[]>([])
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([])

  const executeQuery = useCallback(
    async (queryText?: string) => {
      const queryToExecute = queryText || query
      if (!queryToExecute.trim()) return

      setIsExecuting(true)
      setError(null)

      try {
        const result = await queryEngine.executeQuery(queryToExecute)
        setResult(result)
        setHistory(queryEngine.getQueryHistory())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Query execution failed")
        setResult(null)
      } finally {
        setIsExecuting(false)
      }
    },
    [query],
  )

  const saveQuery = useCallback(
    (name: string, queryText?: string) => {
      const queryToSave = queryText || query
      if (!queryToSave.trim() || !name.trim()) return

      const saved = queryEngine.saveQuery(name, queryToSave)
      setSavedQueries(queryEngine.getSavedQueries())
      return saved
    },
    [query],
  )

  const loadQuery = useCallback((queryText: string) => {
    setQuery(queryText)
    setResult(null)
    setError(null)
  }, [])

  const clearResults = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    query,
    setQuery,
    result,
    isExecuting,
    error,
    history,
    savedQueries,
    executeQuery,
    saveQuery,
    loadQuery,
    clearResults,
  }
}
