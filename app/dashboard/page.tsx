"use client"

import { useState } from "react"
import { AppShell } from "@/components/app-shell"
import { CommandPalette } from "@/components/command-palette"
import { MobileDashboardGrid } from "@/components/mobile-dashboard-grid"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardTemplates } from "@/components/dashboard-templates"
import { DashboardWidgetLibrary } from "@/components/dashboard-widget-library"
import { DashboardTextWidget } from "@/components/dashboard-text-widget"
import { DashboardNameDialog } from "@/components/dashboard-name-dialog"
import { SavedQueriesDialog } from "@/components/saved-queries-dialog"
import { useDashboard } from "@/hooks/use-dashboard"
import { Plus, LayoutDashboard, Calendar, Users, MoreHorizontal, BarChart3, Database, Type } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { dashboards, createDashboard, createFromTemplate, deleteDashboard } = useDashboard()
  const [showTemplates, setShowTemplates] = useState(false)
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false)
  const [showNameDialog, setShowNameDialog] = useState(false)
  const [showQueriesDialog, setShowQueriesDialog] = useState(false)
  const [savedVisualizations, setSavedVisualizations] = useState<any[]>([])
  const [savedTables, setSavedTables] = useState<any[]>([])
  const [dashboardWidgets, setDashboardWidgets] = useState<any[]>([])
  const [mockSavedQueries] = useState([
    {
      id: "1",
      name: "Transaction Volume Analysis",
      query: "SELECT DATE_TRUNC('hour', block_time) as hour, COUNT(*) as tx_count FROM transactions WHERE block_time > NOW() - INTERVAL '24 hours' GROUP BY hour ORDER BY hour DESC",
      result: { rowCount: 24 },
      visualizations: [{ type: "line", name: "Hourly Transactions" }, { type: "bar", name: "Volume Chart" }],
      createdAt: new Date().toISOString()
    },
    {
      id: "2", 
      name: "Top Validators",
      query: "SELECT validator_identity, activated_stake, commission FROM validators ORDER BY activated_stake DESC LIMIT 20",
      result: { rowCount: 20 },
      visualizations: [{ type: "bar", name: "Stake Distribution" }],
      createdAt: new Date().toISOString()
    }
  ])

  const handleCreateDashboard = () => {
    setShowNameDialog(true)
  }

  const handleConfirmCreate = (name: string, description: string, tags: string[]) => {
    setShowNameDialog(false)
    setShowQueriesDialog(true)
  }

  const handleSelectQuery = (query: any) => {
    const dashboard = createDashboard(`Dashboard for ${query.name}`, `Analytics dashboard based on ${query.name}`)
    if (dashboard) {
      setShowQueriesDialog(false)
      window.location.href = `/dashboard/create?id=${dashboard.id}&query=${query.id}`
    }
  }

  const handleCreateFromTemplate = (templateId: string, name: string) => {
    const dashboard = createFromTemplate(templateId, name)
    if (dashboard) {
      setShowTemplates(false)
      // Navigate to dashboard viewer
      window.location.href = `/dashboard/${dashboard.id}`
    }
  }

  const handleAddVisualization = (viz: any) => {
    const widget = {
      id: Date.now().toString(),
      type: "visualization",
      title: viz.name,
      config: viz.config,
      query: viz.query,
      position: { x: 0, y: 0, w: 6, h: 4 }
    }
    setDashboardWidgets(prev => [...prev, widget])
  }

  const handleAddTable = (table: any) => {
    const widget = {
      id: Date.now().toString(),
      type: "table",
      title: table.name,
      query: table.query,
      result: table.result,
      position: { x: 0, y: 0, w: 12, h: 6 }
    }
    setDashboardWidgets(prev => [...prev, widget])
  }

  const handleAddTextWidget = () => {
    const widget = {
      id: Date.now().toString(),
      type: "text",
      title: "Text Widget",
      content: "# Welcome to your dashboard\n\nAdd your notes here with **markdown** support! 📝",
      position: { x: 0, y: 0, w: 6, h: 4 }
    }
    setDashboardWidgets(prev => [...prev, widget])
  }

  if (showTemplates) {
    return (
      <ProtectedRoute>
        <AppShell>
          <CommandPalette />
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-6">
              <Button variant="outline" onClick={() => setShowTemplates(false)} className="mb-4">
                ← Back to Dashboards
              </Button>
            </div>
            <DashboardTemplates onCreateFromTemplate={handleCreateFromTemplate} />
          </div>
        </AppShell>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AppShell>
        <CommandPalette />
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboards</h1>
              <p className="text-muted-foreground">
                Create and manage custom dashboards for Solana blockchain analytics.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowWidgetLibrary(!showWidgetLibrary)} className="gap-2">
                <Plus className="w-4 h-4" />
                Widget Library
              </Button>
              <Button variant="outline" onClick={() => setShowTemplates(true)} className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Templates
              </Button>
              <Button onClick={handleCreateDashboard} className="gap-2">
                <Plus className="w-4 h-4" />
                New Dashboard
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {showWidgetLibrary && (
              <div className="lg:col-span-1">
                <DashboardWidgetLibrary
                  savedVisualizations={savedVisualizations}
                  savedTables={savedTables}
                  onAddVisualization={handleAddVisualization}
                  onAddTable={handleAddTable}
                  onAddTextWidget={handleAddTextWidget}
                />
              </div>
            )}
            
            <div className={showWidgetLibrary ? "lg:col-span-3" : "lg:col-span-4"}>
              {/* Demo widgets */}
              {dashboardWidgets.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Dashboard Preview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboardWidgets.map(widget => {
                      if (widget.type === "text") {
                        return (
                          <div key={widget.id} className="lg:col-span-1">
                            <DashboardTextWidget
                              initialContent={widget.content}
                              title={widget.title}
                              onSave={(content, title) => {
                                setDashboardWidgets(prev => 
                                  prev.map(w => w.id === widget.id 
                                    ? { ...w, content, title } 
                                    : w
                                  )
                                )
                              }}
                            />
                          </div>
                        )
                      }
                      
                      if (widget.type === "table") {
                        return (
                          <div key={widget.id} className="lg:col-span-3">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <Database className="w-5 h-5" />
                                  {widget.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-sm text-muted-foreground mb-2">
                                  {widget.result.rowCount} rows • Query: {widget.query.substring(0, 50)}...
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center text-muted-foreground">
                                  Table data would be displayed here
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )
                      }
                      
                      if (widget.type === "visualization") {
                        return (
                          <div key={widget.id} className="lg:col-span-2">
                            <Card>
                              <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                  <BarChart3 className="w-5 h-5" />
                                  {widget.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="text-sm text-muted-foreground mb-2">
                                  {widget.config.type} chart • Query: {widget.query.substring(0, 50)}...
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center text-muted-foreground h-48 flex items-center justify-center">
                                  Chart visualization would be displayed here
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )
                      }
                      
                      return null
                    })}
                  </div>
                </div>
              )}
              
              {dashboards.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No dashboards yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Create your first dashboard to start visualizing Solana blockchain data with custom widgets and charts.
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleCreateDashboard} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Dashboard
                </Button>
                <Button variant="outline" onClick={() => setShowTemplates(true)} className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Browse Templates
                </Button>
              </div>
            </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboards.map((dashboard) => (
                    <Card key={dashboard.id} className="group hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{dashboard.name}</CardTitle>
                            {dashboard.description && (
                              <CardDescription className="mt-1">{dashboard.description}</CardDescription>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          {dashboard.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {dashboard.isPublic && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Users className="w-3 h-3" />
                              Public
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Widgets</span>
                            <span className="font-medium">{dashboard.widgets.length}</span>
                          </div>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            Updated {dashboard.updatedAt.toLocaleDateString()}
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button asChild size="sm" className="flex-1">
                              <Link href={`/dashboard/${dashboard.id}`}>View</Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Link href={`/dashboard/${dashboard.id}/edit`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DashboardNameDialog
          isOpen={showNameDialog}
          onClose={() => setShowNameDialog(false)}
          onConfirm={handleConfirmCreate}
        />
        
        <SavedQueriesDialog
          isOpen={showQueriesDialog}
          onClose={() => setShowQueriesDialog(false)}
          onSelectQuery={handleSelectQuery}
          savedQueries={mockSavedQueries}
        />
      </AppShell>
    </ProtectedRoute>
  )
}
