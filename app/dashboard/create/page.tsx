"use client"

import { useState, useRef } from "react"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DashboardWidgetLibrary } from "@/components/dashboard-widget-library"
import { DashboardTextWidget } from "@/components/dashboard-text-widget"
import { 
  Save, Share, Download, Eye, EyeOff, Plus, Grid3X3, 
  BarChart3, Database, Type, Image, Link2, ArrowLeft 
} from "lucide-react"
import { useRouter } from "next/navigation"

interface DashboardWidget {
  id: string
  type: "visualization" | "table" | "text" | "query"
  title: string
  content?: any
  position: { x: number; y: number; w: number; h: number }
  config?: any
}

export default function CreateDashboardPage() {
  const router = useRouter()
  const dashboardRef = useRef<HTMLDivElement>(null)
  const [dashboardName, setDashboardName] = useState("Untitled Dashboard")
  const [widgets, setWidgets] = useState<DashboardWidget[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(true)
  const [gridSize] = useState(12)
  const [savedVisualizations] = useState<any[]>([])
  const [savedTables] = useState<any[]>([])

  const handleAddVisualization = (viz: any) => {
    const widget: DashboardWidget = {
      id: Date.now().toString(),
      type: "visualization",
      title: viz.name,
      content: viz,
      position: { x: 0, y: widgets.length * 2, w: 6, h: 4 },
      config: viz.config
    }
    setWidgets([...widgets, widget])
  }

  const handleAddTable = (table: any) => {
    const widget: DashboardWidget = {
      id: Date.now().toString(),
      type: "table", 
      title: table.name,
      content: table,
      position: { x: 0, y: widgets.length * 2, w: 12, h: 6 }
    }
    setWidgets([...widgets, widget])
  }

  const handleAddTextWidget = () => {
    const widget: DashboardWidget = {
      id: Date.now().toString(),
      type: "text",
      title: "Text Widget",
      content: "# Welcome to your dashboard\n\nAdd your notes here with **markdown** support! 📝",
      position: { x: 0, y: widgets.length * 2, w: 6, h: 4 }
    }
    setWidgets([...widgets, widget])
  }

  const handleAddQueryWidget = () => {
    const widget: DashboardWidget = {
      id: Date.now().toString(),
      type: "query",
      title: "Query Widget",
      content: {
        query: "SELECT * FROM transactions LIMIT 10",
        result: null
      },
      position: { x: 0, y: widgets.length * 2, w: 12, h: 8 }
    }
    setWidgets([...widgets, widget])
  }

  const updateWidget = (id: string, updates: Partial<DashboardWidget>) => {
    setWidgets(widgets.map(w => w.id === id ? { ...w, ...updates } : w))
  }

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id))
  }

  const handleSave = () => {
    const dashboard = {
      id: Date.now().toString(),
      name: dashboardName,
      widgets,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    console.log("Saving dashboard:", dashboard)
    router.push("/dashboard")
  }

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/dashboard/shared/${Date.now()}`
    navigator.clipboard.writeText(shareUrl)
    alert("Dashboard link copied to clipboard!")
  }

  const handleExportImage = async () => {
    if (dashboardRef.current) {
      try {
        const { default: html2canvas } = await import('html2canvas')
        const canvas = await html2canvas(dashboardRef.current)
        const link = document.createElement("a")
        link.download = `${dashboardName.replace(/\s+/g, "_")}.png`
        link.href = canvas.toDataURL()
        link.click()
      } catch (error) {
        console.error("Export failed:", error)
        alert("Export feature requires html2canvas library")
      }
    }
  }

  const renderWidget = (widget: DashboardWidget) => {
    const style = {
      gridColumn: `span ${widget.position.w}`,
      gridRow: `span ${widget.position.h}`,
      minHeight: `${widget.position.h * 60}px`
    }

    switch (widget.type) {
      case "text":
        return (
          <div key={widget.id} style={style} className="relative group">
            <DashboardTextWidget
              initialContent={widget.content}
              title={widget.title}
              onSave={(content, title) => updateWidget(widget.id, { content, title })}
              isEditable={!isPreview}
            />
            {!isPreview && (
              <Button
                onClick={() => removeWidget(widget.id)}
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </Button>
            )}
          </div>
        )

      case "visualization":
        return (
          <div key={widget.id} style={style} className="relative group">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="w-4 h-4" />
                  {widget.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded p-4 h-48 flex items-center justify-center text-muted-foreground">
                  {widget.config?.type} Chart Visualization
                </div>
              </CardContent>
            </Card>
            {!isPreview && (
              <Button
                onClick={() => removeWidget(widget.id)}
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </Button>
            )}
          </div>
        )

      case "table":
        return (
          <div key={widget.id} style={style} className="relative group">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="w-4 h-4" />
                  {widget.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded p-4 h-32 flex items-center justify-center text-muted-foreground">
                  Table Data ({widget.content?.result?.rowCount || 0} rows)
                </div>
              </CardContent>
            </Card>
            {!isPreview && (
              <Button
                onClick={() => removeWidget(widget.id)}
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </Button>
            )}
          </div>
        )

      case "query":
        return (
          <div key={widget.id} style={style} className="relative group">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Database className="w-4 h-4" />
                  {widget.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                    {widget.content?.query}
                  </div>
                  <div className="bg-gray-50 rounded p-4 h-24 flex items-center justify-center text-muted-foreground">
                    Query Results
                  </div>
                </div>
              </CardContent>
            </Card>
            {!isPreview && (
              <Button
                onClick={() => removeWidget(widget.id)}
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </Button>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <div className="border-b bg-white sticky top-16 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => router.push("/dashboard")} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Input
                  value={dashboardName}
                  onChange={(e) => setDashboardName(e.target.value)}
                  className="text-xl font-semibold border-none shadow-none px-0 focus-visible:ring-0"
                  placeholder="Dashboard name..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsPreview(!isPreview)}
                  className="gap-2"
                >
                  {isPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isPreview ? "Edit" : "Preview"}
                </Button>
                <Button onClick={handleShare} variant="outline" className="gap-2">
                  <Link2 className="w-4 h-4" />
                  Share
                </Button>
                <Button onClick={handleExportImage} variant="outline" className="gap-2">
                  <Image className="w-4 h-4" />
                  Export
                </Button>
                <Button onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {!isPreview && showWidgetLibrary && (
              <div className="lg:col-span-1">
                <div className="space-y-4">
                  <DashboardWidgetLibrary
                    savedVisualizations={savedVisualizations}
                    savedTables={savedTables}
                    onAddVisualization={handleAddVisualization}
                    onAddTable={handleAddTable}
                    onAddTextWidget={handleAddTextWidget}
                  />
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Quick Add</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button onClick={handleAddQueryWidget} variant="outline" size="sm" className="w-full gap-2">
                        <Database className="w-3 h-3" />
                        Query Widget
                      </Button>
                      <Button onClick={handleAddTextWidget} variant="outline" size="sm" className="w-full gap-2">
                        <Type className="w-3 h-3" />
                        Text Widget
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            <div className={showWidgetLibrary && !isPreview ? "lg:col-span-4" : "lg:col-span-5"}>
              <div ref={dashboardRef} className="min-h-[600px] bg-white rounded-lg border p-6">
                {widgets.length === 0 ? (
                  <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                      <Grid3X3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">Start Building Your Dashboard</h3>
                      <p className="text-gray-500 mb-4">Add widgets from the library to get started</p>
                      <Button onClick={() => setShowWidgetLibrary(true)} className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add Widget
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="grid gap-4"
                    style={{ 
                      gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                      gridAutoRows: "60px"
                    }}
                  >
                    {widgets.map(renderWidget)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}