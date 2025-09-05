"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardGrid } from "@/components/dashboard-grid"
import { useDashboard } from "@/hooks/use-dashboard"
import { Edit, Share, MoreHorizontal, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DashboardViewPage() {
  const params = useParams()
  const dashboardId = params.id as string
  const { dashboard, isLoading, error } = useDashboard(dashboardId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-4 h-32 bg-muted rounded" />
              <div className="col-span-4 h-32 bg-muted rounded" />
              <div className="col-span-4 h-32 bg-muted rounded" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !dashboard) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Dashboard not found</h2>
            <p className="text-muted-foreground mb-6">{error || "The requested dashboard could not be found."}</p>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboards</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Link>
            </Button>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{dashboard.name}</h1>
                {dashboard.isPublic && (
                  <Badge variant="outline" className="gap-1">
                    <Share className="w-3 h-3" />
                    Public
                  </Badge>
                )}
              </div>
              {dashboard.description && <p className="text-muted-foreground">{dashboard.description}</p>}

              <div className="flex items-center gap-2 mt-2">
                {dashboard.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button asChild size="sm">
              <Link href={`/dashboard/${dashboard.id}/edit`}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <DashboardGrid widgets={dashboard.widgets} />

        {dashboard.widgets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="font-medium mb-1">This dashboard is empty</h3>
              <p className="text-sm mb-4">Add some widgets to start visualizing your data</p>
              <Button asChild>
                <Link href={`/dashboard/${dashboard.id}/edit`}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Dashboard
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
