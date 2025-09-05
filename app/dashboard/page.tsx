"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DashboardTemplates } from "@/components/dashboard-templates"
import { useDashboard } from "@/hooks/use-dashboard"
import { Plus, LayoutDashboard, Calendar, Users, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { dashboards, createDashboard, createFromTemplate, deleteDashboard } = useDashboard()
  const [showTemplates, setShowTemplates] = useState(false)

  const handleCreateDashboard = () => {
    const name = `Dashboard ${dashboards.length + 1}`
    const dashboard = createDashboard(name, "Custom dashboard")
    if (dashboard) {
      // Navigate to dashboard editor
      window.location.href = `/dashboard/${dashboard.id}/edit`
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

  if (showTemplates) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-6">
              <Button variant="outline" onClick={() => setShowTemplates(false)} className="mb-4">
                ← Back to Dashboards
              </Button>
            </div>
            <DashboardTemplates onCreateFromTemplate={handleCreateFromTemplate} />
          </main>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboards</h1>
              <p className="text-muted-foreground">
                Create and manage custom dashboards for Solana blockchain analytics.
              </p>
            </div>

            <div className="flex gap-2">
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
        </main>
      </div>
    </ProtectedRoute>
  )
}
