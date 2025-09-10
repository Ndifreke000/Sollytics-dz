"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, BarChart3, Trash2 } from "lucide-react"

interface Widget {
  id: string
  title: string
  type: string
  queryId: string
  visualization: any
}

interface DuneDashboardBuilderProps {
  savedVisualizations: any[]
  onSaveDashboard: (dashboard: any) => void
}

export function DuneDashboardBuilder({ savedVisualizations, onSaveDashboard }: DuneDashboardBuilderProps) {
  const [name, setName] = useState("")
  const [widgets, setWidgets] = useState<Widget[]>([])
  const [isPublic, setIsPublic] = useState(false)

  const addWidget = (viz: any) => {
    const widget: Widget = {
      id: Date.now().toString(),
      title: viz.title,
      type: viz.type,
      queryId: viz.queryId,
      visualization: viz
    }
    setWidgets(prev => [...prev, widget])
  }

  const removeWidget = (id: string) => {
    setWidgets(prev => prev.filter(w => w.id !== id))
  }

  const saveDashboard = () => {
    if (!name || widgets.length === 0) return
    
    onSaveDashboard({
      id: Date.now().toString(),
      name,
      widgets,
      isPublic,
      createdAt: new Date()
    })
    
    setName("")
    setWidgets([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Dashboard name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={saveDashboard} disabled={!name || widgets.length === 0}>
            Save Dashboard
          </Button>
        </div>

        <div>
          <h4 className="font-medium mb-2">Available Visualizations</h4>
          <div className="grid grid-cols-2 gap-2">
            {savedVisualizations.map(viz => (
              <Card key={viz.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{viz.title}</div>
                    <Badge variant="outline" className="text-xs">{viz.type}</Badge>
                  </div>
                  <Button size="sm" onClick={() => addWidget(viz)}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Dashboard Widgets ({widgets.length})</h4>
          <div className="space-y-2">
            {widgets.map(widget => (
              <div key={widget.id} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">{widget.title}</span>
                  <Badge variant="secondary" className="text-xs">{widget.type}</Badge>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removeWidget(widget.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}