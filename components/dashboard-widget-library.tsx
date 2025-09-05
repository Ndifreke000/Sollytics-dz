"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Database, Type, Search, Plus, Calendar } from "lucide-react"

interface SavedVisualization {
  id: string
  name: string
  type: "bar" | "line" | "pie" | "counter"
  query: string
  config: any
  createdAt: string
}

interface SavedTable {
  id: string
  name: string
  query: string
  result: any
  createdAt: string
}

interface DashboardWidgetLibraryProps {
  savedVisualizations: SavedVisualization[]
  savedTables: SavedTable[]
  onAddVisualization: (viz: SavedVisualization) => void
  onAddTable: (table: SavedTable) => void
  onAddTextWidget: () => void
}

export function DashboardWidgetLibrary({
  savedVisualizations,
  savedTables,
  onAddVisualization,
  onAddTable,
  onAddTextWidget
}: DashboardWidgetLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("visualizations")

  const filteredVisualizations = savedVisualizations.filter(viz =>
    viz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    viz.query.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredTables = savedTables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.query.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getVisualizationIcon = (type: string) => {
    switch (type) {
      case "bar":
      case "line":
      case "pie":
        return <BarChart3 className="w-4 h-4" />
      case "counter":
        return <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">#</div>
      default:
        return <BarChart3 className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Widget Library
        </CardTitle>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent className="h-[calc(100%-140px)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visualizations" className="gap-2">
              <BarChart3 className="w-3 h-3" />
              Charts
            </TabsTrigger>
            <TabsTrigger value="tables" className="gap-2">
              <Database className="w-3 h-3" />
              Tables
            </TabsTrigger>
            <TabsTrigger value="widgets" className="gap-2">
              <Type className="w-3 h-3" />
              Widgets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualizations" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredVisualizations.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No saved visualizations found</p>
                    <p className="text-xs">Create charts in the Query Editor</p>
                  </div>
                ) : (
                  filteredVisualizations.map(viz => (
                    <Card key={viz.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getVisualizationIcon(viz.type)}
                            <h4 className="font-medium text-sm">{viz.name}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {viz.type}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {viz.query.substring(0, 100)}...
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(viz.createdAt)}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onAddVisualization(viz)}
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
          </TabsContent>

          <TabsContent value="tables" className="flex-1 mt-4">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredTables.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Database className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No saved tables found</p>
                    <p className="text-xs">Save query results in the Query Editor</p>
                  </div>
                ) : (
                  filteredTables.map(table => (
                    <Card key={table.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            <h4 className="font-medium text-sm">{table.name}</h4>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {table.result.rowCount} rows
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {table.query.substring(0, 100)}...
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(table.createdAt)}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onAddTable(table)}
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
          </TabsContent>

          <TabsContent value="widgets" className="flex-1 mt-4">
            <div className="space-y-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Type className="w-8 h-8 p-2 bg-blue-100 text-blue-600 rounded-lg" />
                    <div>
                      <h4 className="font-medium text-sm">Text Widget</h4>
                      <p className="text-xs text-muted-foreground">
                        Add notes, documentation, or markdown content
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">Markdown</Badge>
                    <Badge variant="secondary" className="text-xs">Emojis</Badge>
                    <Badge variant="secondary" className="text-xs">Links</Badge>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={onAddTextWidget}
                    className="w-full h-7 text-xs"
                  >
                    Add Text Widget
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}