"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical, Edit, Trash2, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Widget {
  id: string
  title: string
  type: string
  content: React.ReactNode
}

interface MobileDashboardGridProps {
  widgets: Widget[]
  onEditWidget: (id: string) => void
  onDeleteWidget: (id: string) => void
  onReorderWidgets: (widgets: Widget[]) => void
  isEditing: boolean
}

export function MobileDashboardGrid({ widgets, onEditWidget, onDeleteWidget, onReorderWidgets, isEditing }: MobileDashboardGridProps) {
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, widgetId: string) => {
    setDraggedWidget(widgetId)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedWidget || draggedWidget === targetId) return

    const draggedIndex = widgets.findIndex(w => w.id === draggedWidget)
    const targetIndex = widgets.findIndex(w => w.id === targetId)
    
    const newWidgets = [...widgets]
    const [draggedItem] = newWidgets.splice(draggedIndex, 1)
    newWidgets.splice(targetIndex, 0, draggedItem)
    
    onReorderWidgets(newWidgets)
    setDraggedWidget(null)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chart": return "bg-blue-100 text-blue-800"
      case "metric": return "bg-green-100 text-green-800"
      case "table": return "bg-purple-100 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4 p-4">
      {widgets.map((widget) => (
        <Card
          key={widget.id}
          className={`transition-all ${isEditing ? "border-dashed border-2" : ""} ${
            draggedWidget === widget.id ? "opacity-50 scale-95" : ""
          }`}
          draggable={isEditing}
          onDragStart={(e) => handleDragStart(e, widget.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, widget.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isEditing && (
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
                )}
                <div>
                  <CardTitle className="text-base">{widget.title}</CardTitle>
                  <Badge variant="secondary" className={`text-xs mt-1 ${getTypeColor(widget.type)}`}>
                    {widget.type}
                  </Badge>
                </div>
              </div>
              
              {isEditing ? (
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onEditWidget(widget.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteWidget(widget.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditWidget(widget.id)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDeleteWidget(widget.id)} className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="min-h-[200px] w-full">
              {widget.content}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {widgets.length === 0 && (
        <Card className="border-dashed border-2">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center text-muted-foreground">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                📊
              </div>
              <p>No widgets yet</p>
              <p className="text-sm">Add your first visualization</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}