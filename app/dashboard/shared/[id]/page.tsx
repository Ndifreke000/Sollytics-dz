"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardTextWidget } from "@/components/dashboard-text-widget"
import { Share, Download, Eye, Calendar, User } from "lucide-react"
import { useParams } from "next/navigation"

interface SharedDashboard {
  id: string
  name: string
  description: string
  author: string
  createdAt: string
  widgets: any[]
  isPublic: boolean
  tags: string[]
}

export default function SharedDashboardPage() {
  const params = useParams()
  const [dashboard, setDashboard] = useState<SharedDashboard | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setDashboard({
        id: params.id as string,
        name: "Solana Network Analytics",
        description: "Real-time analysis of Solana blockchain performance and transaction metrics",
        author: "Analytics Team",
        createdAt: new Date().toISOString(),
        isPublic: true,
        tags: ["solana", "blockchain", "analytics", "real-time"],
        widgets: [
          {
            id: "1",
            type: "text",
            title: "Dashboard Overview",
            content: "# Solana Network Analytics\n\nThis dashboard provides **real-time insights** into Solana blockchain performance.\n\n## Key Metrics\n- Transaction throughput\n- Network health\n- Validator performance\n- Token activity\n\n📊 Data updates every 30 seconds",
            position: { x: 0, y: 0, w: 6, h: 4 }
          },
          {
            id: "2", 
            type: "visualization",
            title: "Transaction Throughput",
            config: { type: "line" },
            position: { x: 6, y: 0, w: 6, h: 4 }
          },
          {
            id: "3",
            type: "table",
            title: "Top Validators",
            content: { result: { rowCount: 25 } },
            position: { x: 0, y: 4, w: 12, h: 6 }
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    alert("Dashboard link copied to clipboard!")
  }

  const handleExport = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas')
      const element = document.getElementById('dashboard-content')
      if (element) {
        const canvas = await html2canvas(element)
        const link = document.createElement("a")
        link.download = `${dashboard?.name.replace(/\s+/g, "_")}.png`
        link.href = canvas.toDataURL()
        link.click()
      }
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export feature requires html2canvas library")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!dashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-2">Dashboard Not Found</h1>
            <p className="text-muted-foreground">The shared dashboard you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
      </div>
    )
  }

  const renderWidget = (widget: any) => {
    const style = {
      gridColumn: `span ${widget.position.w}`,
      gridRow: `span ${widget.position.h}`,
      minHeight: `${widget.position.h * 60}px`
    }

    switch (widget.type) {
      case "text":
        return (
          <div key={widget.id} style={style}>
            <DashboardTextWidget
              initialContent={widget.content}
              title={widget.title}
              isEditable={false}
            />
          </div>
        )

      case "visualization":
        return (
          <div key={widget.id} style={style}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{widget.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded p-4 h-48 flex items-center justify-center text-muted-foreground">
                  📈 {widget.config?.type} Chart Visualization
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "table":
        return (
          <div key={widget.id} style={style}>
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{widget.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded p-4 h-32 flex items-center justify-center text-muted-foreground">
                  📊 Table Data ({widget.content?.result?.rowCount || 0} rows)
                </div>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Shared Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{dashboard.name}</h1>
              {dashboard.description && (
                <p className="text-muted-foreground mb-4">{dashboard.description}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {dashboard.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(dashboard.createdAt).toLocaleDateString()}
                </div>
              </div>

              {dashboard.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {dashboard.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleShare} variant="outline" className="gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div 
          id="dashboard-content"
          className="bg-white rounded-lg border p-6"
        >
          <div 
            className="grid gap-4"
            style={{ 
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "60px"
            }}
          >
            {dashboard.widgets.map(renderWidget)}
          </div>
        </div>
      </main>
    </div>
  )
}