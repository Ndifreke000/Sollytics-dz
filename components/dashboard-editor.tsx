"use client"

import { useState, useCallback } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type Widget, type Dashboard } from "@/lib/dashboard"
import { GripVertical, Edit, Trash2, Plus } from "lucide-react"

interface DashboardEditorProps {
  dashboard: Dashboard
  onUpdateDashboard: (updates: Partial<Dashboard>) => void
  onAddWidget: () => void
  onEditWidget: (widgetId: string) => void
  onDeleteWidget: (widgetId: string) => void
}

export function DashboardEditor({
  dashboard,
  onUpdateDashboard,
  onAddWidget,
  onEditWidget,
  onDeleteWidget
}: DashboardEditorProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback((result: DropResult) => {
    setIsDragging(false)
    
    if (!result.destination) return

    const widgets = Array.from(dashboard.widgets)
    const [reorderedWidget] = widgets.splice(result.source.index, 1)
    widgets.splice(result.destination.index, 0, reorderedWidget)

    onUpdateDashboard({ widgets })
  }, [dashboard.widgets, onUpdateDashboard])

  const getWidgetTypeColor = (type: Widget["type"]) => {
    switch (type) {
      case "metric": return "bg-blue-100 text-blue-800"
      case "chart": return "bg-green-100 text-green-800"
      case "table": return "bg-purple-100 text-purple-800"
      case "text": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{dashboard.name}</h2>
          <p className="text-muted-foreground">Drag widgets to reorder, click to edit</p>
        </div>
        <Button onClick={onAddWidget} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Widget
        </Button>
      </div>

      <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-4 min-h-[200px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                snapshot.isDraggingOver ? "border-primary bg-primary/5" : "border-muted"
              }`}
            >
              {dashboard.widgets.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8" />
                  </div>
                  <p>No widgets yet. Add your first widget to get started.</p>
                </div>
              ) : (
                dashboard.widgets.map((widget, index) => (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-all ${
                          snapshot.isDragging ? "shadow-lg rotate-2" : "hover:shadow-md"
                        } ${isDragging && !snapshot.isDragging ? "opacity-50" : ""}`}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                              >
                                <GripVertical className="w-4 h-4 text-muted-foreground" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{widget.title}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className={getWidgetTypeColor(widget.type)}>
                                    {widget.type}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {widget.position.width}×{widget.position.height}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onEditWidget(widget.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeleteWidget(widget.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground">
                            Position: ({widget.position.x}, {widget.position.y})
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}