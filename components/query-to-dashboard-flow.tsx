"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, BarChart3, Layout, Save, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface QueryToDashboardFlowProps {
  queryResult: any
  query: string
  onSaveVisualization: (viz: any) => void
  onSaveToDashboard: (dashboardId: string, viz: any) => void
}

export function QueryToDashboardFlow({ queryResult, query, onSaveVisualization, onSaveToDashboard }: QueryToDashboardFlowProps) {
  const [showVizDialog, setShowVizDialog] = useState(false)
  const [showDashboardDialog, setShowDashboardDialog] = useState(false)
  const [vizConfig, setVizConfig] = useState({ type: "bar", title: "", xCol: "", yCol: "" })
  const [dashboardName, setDashboardName] = useState("")
  const [selectedDashboard, setSelectedDashboard] = useState("")
  const router = useRouter()

  const savedDashboards = [
    { id: "1", name: "Network Analytics" },
    { id: "2", name: "Token Performance" },
    { id: "3", name: "Validator Stats" }
  ]

  const createVisualization = () => {
    const viz = {
      id: Date.now().toString(),
      ...vizConfig,
      query,
      data: queryResult
    }
    onSaveVisualization(viz)
    setShowVizDialog(false)
    setShowDashboardDialog(true)
  }

  const saveToDashboard = () => {
    if (selectedDashboard === "new") {
      // Create new dashboard
      const dashboardId = Date.now().toString()
      router.push(`/dashboard/${dashboardId}?viz=${vizConfig.title}`)
    } else {
      // Add to existing dashboard
      onSaveToDashboard(selectedDashboard, vizConfig)
      router.push(`/dashboard/${selectedDashboard}`)
    }
    setShowDashboardDialog(false)
  }

  if (!queryResult) return null

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowVizDialog(true)} className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Create Visualization
            </Button>
            <Button variant="outline" onClick={() => router.push("/dashboard/create")} className="gap-2">
              <Layout className="w-4 h-4" />
              New Dashboard
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" />
              Save Query
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visualization Dialog */}
      <Dialog open={showVizDialog} onOpenChange={setShowVizDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Visualization</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Visualization title"
              value={vizConfig.title}
              onChange={(e) => setVizConfig(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Select value={vizConfig.type} onValueChange={(value) => setVizConfig(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={vizConfig.xCol} onValueChange={(value) => setVizConfig(prev => ({ ...prev, xCol: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="X-axis" />
                </SelectTrigger>
                <SelectContent>
                  {queryResult.columns?.map((col: string) => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={vizConfig.yCol} onValueChange={(value) => setVizConfig(prev => ({ ...prev, yCol: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Y-axis" />
              </SelectTrigger>
              <SelectContent>
                {queryResult.columns?.map((col: string) => (
                  <SelectItem key={col} value={col}>{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button onClick={createVisualization} disabled={!vizConfig.title || !vizConfig.xCol || !vizConfig.yCol} className="w-full">
              Create & Add to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dashboard Selection Dialog */}
      <Dialog open={showDashboardDialog} onOpenChange={setShowDashboardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Dashboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedDashboard} onValueChange={setSelectedDashboard}>
              <SelectTrigger>
                <SelectValue placeholder="Select dashboard" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Create New Dashboard</SelectItem>
                {savedDashboards.map(dashboard => (
                  <SelectItem key={dashboard.id} value={dashboard.id}>{dashboard.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {selectedDashboard === "new" && (
              <Input
                placeholder="Dashboard name"
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
              />
            )}
            
            <Button onClick={saveToDashboard} disabled={!selectedDashboard} className="w-full">
              {selectedDashboard === "new" ? "Create Dashboard" : "Add to Dashboard"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}