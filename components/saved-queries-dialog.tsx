"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Database, BarChart3, Search, X, Calendar } from "lucide-react"

interface SavedQuery {
  id: string
  name: string
  query: string
  result: any
  visualizations: any[]
  createdAt: string
}

interface SavedQueriesDialogProps {
  isOpen: boolean
  onClose: () => void
  onSelectQuery: (query: SavedQuery) => void
  savedQueries: SavedQuery[]
}

export function SavedQueriesDialog({ isOpen, onClose, onSelectQuery, savedQueries }: SavedQueriesDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQueries = savedQueries.filter(query =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.query.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 h-[80vh]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Select Saved Query
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search queries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent className="h-[calc(100%-140px)]">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQueries.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No saved queries found</p>
                </div>
              ) : (
                filteredQueries.map(query => (
                  <Card key={query.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{query.name}</h4>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="text-xs">
                            {query.result?.rowCount || 0} rows
                          </Badge>
                          {query.visualizations.length > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {query.visualizations.length} charts
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 font-mono">
                        {query.query.substring(0, 120)}...
                      </p>
                      
                      {query.visualizations.length > 0 && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {query.visualizations.map((viz, index) => (
                              <div key={index} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                                <BarChart3 className="w-3 h-3" />
                                {viz.type}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(query.createdAt).toLocaleDateString()}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onSelectQuery(query)}
                          className="h-7 px-3 text-xs"
                        >
                          Add to Dashboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}