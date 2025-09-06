"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart3, LineChart, PieChart, Hash, Save, Palette, Brain } from "lucide-react"
import { ResponsiveContainer, BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { ColorPaletteSelector } from "@/components/color-palette-selector"
import type { QueryResult } from "@/lib/query-engine"

interface VisualizationConfig {
  id: string
  name: string
  type: "bar" | "line" | "pie" | "counter"
  xColumn?: string
  yColumns: string[]
  colors: { [key: string]: string }
  title: string
}

interface VisualizationBuilderProps {
  result: QueryResult
  onSaveVisualization: (config: VisualizationConfig) => void
  existingVisualizations?: VisualizationConfig[]
}

const CHART_COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", 
  "#ff00ff", "#00ffff", "#ff0000", "#0000ff", "#ffff00"
]

const VISUALIZATION_TYPES = [
  { value: "bar", label: "Bar Chart", icon: BarChart3 },
  { value: "line", label: "Line Chart", icon: LineChart },
  { value: "pie", label: "Pie Chart", icon: PieChart },
  { value: "counter", label: "Counter", icon: Hash }
]

export function VisualizationBuilder({ result, onSaveVisualization, existingVisualizations = [] }: VisualizationBuilderProps) {
  const [config, setConfig] = useState<Partial<VisualizationConfig>>({
    type: "bar",
    yColumns: [],
    colors: {},
    title: "Untitled Visualization"
  })
  const [chartData, setChartData] = useState<any[]>([])
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([])

  const numericColumns = result.columns.filter((col, index) => 
    result.rows.some(row => typeof row[index] === "number")
  )
  const textColumns = result.columns.filter((col, index) => 
    result.rows.some(row => typeof row[index] === "string")
  )

  useEffect(() => {
    generateAIRecommendations()
  }, [result])

  useEffect(() => {
    if (config.xColumn && config.yColumns.length > 0) {
      generateChartData()
    }
  }, [config.xColumn, config.yColumns, result])

  const generateAIRecommendations = () => {
    const recommendations = []
    
    if (numericColumns.length >= 2) {
      recommendations.push("Line chart recommended for time series data")
    }
    if (textColumns.length > 0 && numericColumns.length > 0) {
      recommendations.push("Bar chart suitable for categorical comparisons")
    }
    if (numericColumns.length === 1 && result.rowCount <= 10) {
      recommendations.push("Pie chart works well for proportional data")
    }
    if (numericColumns.length === 1 && result.rowCount === 1) {
      recommendations.push("Counter display ideal for single metrics")
    }
    
    setAiRecommendations(recommendations)
  }

  const generateChartData = () => {
    if (!config.xColumn || config.yColumns.length === 0) return

    const xIndex = result.columns.indexOf(config.xColumn)
    const yIndices = config.yColumns.map(col => result.columns.indexOf(col))

    const data = result.rows.map(row => {
      const item: any = { [config.xColumn!]: row[xIndex] }
      config.yColumns.forEach((col, i) => {
        item[col] = row[yIndices[i]]
      })
      return item
    })

    setChartData(data)
  }

  const updateConfig = (updates: Partial<VisualizationConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  const addYColumn = (column: string) => {
    if (!config.yColumns.includes(column)) {
      const newYColumns = [...config.yColumns, column]
      const newColors = { ...config.colors }
      if (!newColors[column]) {
        newColors[column] = CHART_COLORS[newYColumns.length - 1] || "#8884d8"
      }
      updateConfig({ yColumns: newYColumns, colors: newColors })
    }
  }

  const removeYColumn = (column: string) => {
    const newYColumns = config.yColumns.filter(col => col !== column)
    const newColors = { ...config.colors }
    delete newColors[column]
    updateConfig({ yColumns: newYColumns, colors: newColors })
  }

  const updateColumnColor = (column: string, color: string) => {
    updateConfig({ colors: { ...config.colors, [column]: color } })
  }

  const handleSave = () => {
    if (config.title && config.type && (config.type === "counter" || (config.xColumn && config.yColumns.length > 0))) {
      const fullConfig: VisualizationConfig = {
        id: Date.now().toString(),
        name: config.title,
        type: config.type as any,
        xColumn: config.xColumn,
        yColumns: config.yColumns,
        colors: config.colors,
        title: config.title
      }
      onSaveVisualization(fullConfig)
    }
  }

  const renderVisualization = () => {
    if (!chartData.length && config.type !== "counter") return null

    switch (config.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.xColumn} />
              <YAxis />
              <Tooltip />
              <Legend />
              {config.yColumns.map(col => (
                <Bar key={col} dataKey={col} fill={config.colors[col]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.xColumn} />
              <YAxis />
              <Tooltip />
              <Legend />
              {config.yColumns.map(col => (
                <Line key={col} type="monotone" dataKey={col} stroke={config.colors[col]} />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        )

      case "pie":
        const pieData = chartData.map(item => ({
          name: item[config.xColumn!],
          value: item[config.yColumns[0]]
        }))
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        )

      case "counter":
        const counterValue = config.yColumns.length > 0 && chartData.length > 0 
          ? chartData[0][config.yColumns[0]] 
          : result.rowCount
        return (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {typeof counterValue === "number" ? counterValue.toLocaleString() : counterValue}
              </div>
              <div className="text-lg text-muted-foreground">
                {config.yColumns[0] || "Total Records"}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Visualization Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              AI Recommendations
            </h4>
            <ul className="space-y-1">
              {aiRecommendations.map((rec, index) => (
                <li key={index} className="text-sm text-blue-700">• {rec}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Configuration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Visualization Type</Label>
            <Select value={config.type} onValueChange={(value: any) => updateConfig({ type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VISUALIZATION_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <type.icon className="w-4 h-4" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Title</Label>
            <Input
              value={config.title}
              onChange={(e) => updateConfig({ title: e.target.value })}
              placeholder="Enter visualization title"
            />
          </div>
        </div>

        {config.type !== "counter" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>X-Axis Column</Label>
              <Select value={config.xColumn} onValueChange={(value) => updateConfig({ xColumn: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {result.columns.map(col => (
                    <SelectItem key={col} value={col}>{col}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Y-Axis Columns</Label>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {numericColumns.filter(col => !config.yColumns.includes(col)).map(col => (
                    <Button
                      key={col}
                      variant="outline"
                      size="sm"
                      onClick={() => addYColumn(col)}
                      className="justify-start text-xs"
                    >
                      + {col}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  {config.yColumns.map(col => (
                    <div key={col} className="flex items-center gap-2 p-2 border rounded">
                      <input
                        type="color"
                        value={config.colors[col]}
                        onChange={(e) => updateColumnColor(col, e.target.value)}
                        className="w-6 h-6 rounded border cursor-pointer"
                      />
                      <span className="flex-1 text-sm font-medium">{col}</span>
                      <Button
                        onClick={() => removeYColumn(col)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {config.type === "counter" && (
          <div>
            <Label>Value Column (optional)</Label>
            <Select value={config.yColumns[0]} onValueChange={(value) => updateConfig({ yColumns: [value] })}>
              <SelectTrigger>
                <SelectValue placeholder="Select column or use row count" />
              </SelectTrigger>
              <SelectContent>
                {numericColumns.map(col => (
                  <SelectItem key={col} value={col}>{col}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Color Palette Selector */}
        {config.yColumns.length > 0 && (
          <div>
            <ColorPaletteSelector
              selectedColors={config.colors}
              columns={config.yColumns}
              onColorsChange={(colors) => updateConfig({ colors })}
            />
          </div>
        )}

        {/* Chart Options */}
        {config.yColumns.length > 0 && (
          <div>
            <Label className="text-sm font-medium">Chart Options</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                Show grid lines
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" defaultChecked />
                Show legend
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                Smooth curves
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                Show tooltips
              </label>
            </div>
          </div>
        )}

        {/* Preview */}
        <div>
          <Label>Preview</Label>
          <div className="border rounded-lg p-4 bg-white">
            {renderVisualization()}
          </div>
        </div>

        {/* Existing Visualizations */}
        {existingVisualizations.length > 0 && (
          <div>
            <Label>Existing Visualizations</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {existingVisualizations.map(viz => (
                <Card key={viz.id} className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{viz.name}</h4>
                    <Badge variant="outline" className="text-xs">{viz.type}</Badge>
                  </div>
                  <div className="bg-gray-50 rounded p-2 h-16 flex items-center justify-center text-xs text-muted-foreground">
                    {viz.type} chart preview
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <Button 
          onClick={handleSave} 
          className="w-full gap-2"
          disabled={!config.title || (config.type !== "counter" && (!config.xColumn || config.yColumns.length === 0))}
        >
          <Save className="w-4 h-4" />
          {existingVisualizations.length > 0 ? "Add Another Visualization" : "Save Visualization"}
        </Button>
      </CardContent>
    </Card>
  )
}