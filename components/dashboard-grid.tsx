"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import type { Widget } from "@/lib/dashboard"

interface DashboardGridProps {
  widgets: Widget[]
  isEditing?: boolean
  onWidgetUpdate?: (widgetId: string, updates: Partial<Widget>) => void
  onWidgetRemove?: (widgetId: string) => void
}

export function DashboardGrid({ widgets, isEditing, onWidgetUpdate, onWidgetRemove }: DashboardGridProps) {
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)

  const renderWidget = (widget: Widget) => {
    const { config } = widget

    return (
      <Card
        key={widget.id}
        className={`relative ${isEditing ? "border-dashed border-2 hover:border-primary" : ""}`}
        style={{
          gridColumn: `span ${widget.position.width}`,
          gridRow: `span ${widget.position.height}`,
        }}
      >
        {isEditing && (
          <div className="absolute top-2 right-2 z-10 flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setSelectedWidget(widget.id)}>
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
              onClick={() => onWidgetRemove?.(widget.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}

        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            {widget.title}
            <Badge variant="outline" className="text-xs">
              {widget.type}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {widget.type === "metric" && config.metric && (
            <div className="space-y-1">
              <div className="text-2xl font-bold">
                {typeof config.metric.value === "number" ? config.metric.value.toLocaleString() : config.metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{config.metric.label}</div>
              {config.metric.trend && (
                <div
                  className={`text-xs flex items-center gap-1 ${
                    config.metric.trend.direction === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span>{config.metric.trend.direction === "up" ? "↗" : "↘"}</span>
                  {config.metric.trend.value}%
                </div>
              )}
            </div>
          )}

          {widget.type === "chart" && config.chart && (
            <div className="h-32 bg-muted/50 rounded flex items-center justify-center">
              <div className="text-center text-sm text-muted-foreground">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  📊
                </div>
                {config.chart.type.toUpperCase()} Chart
                <div className="text-xs mt-1">{config.chart.dataSource}</div>
              </div>
            </div>
          )}

          {widget.type === "table" && config.table && (
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Data: {config.table.dataSource}</div>
              <div className="bg-muted/50 rounded p-2">
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {config.table.columns.slice(0, 4).map((col, i) => (
                    <div key={i} className="font-mono">
                      {col}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {widget.type === "text" && config.text && (
            <div
              className={`${
                config.text.fontSize === "sm"
                  ? "text-sm"
                  : config.text.fontSize === "lg"
                    ? "text-lg"
                    : config.text.fontSize === "xl"
                      ? "text-xl"
                      : "text-base"
              } ${
                config.text.alignment === "center"
                  ? "text-center"
                  : config.text.alignment === "right"
                    ? "text-right"
                    : "text-left"
              }`}
            >
              {config.text.content}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-4 auto-rows-min">
      {widgets.map(renderWidget)}

      {isEditing && widgets.length === 0 && (
        <div className="col-span-12 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <div className="text-muted-foreground">
            <div className="text-4xl mb-2">📊</div>
            <h3 className="font-medium mb-1">No widgets yet</h3>
            <p className="text-sm">Add widgets to start building your dashboard</p>
          </div>
        </div>
      )}
    </div>
  )
}
