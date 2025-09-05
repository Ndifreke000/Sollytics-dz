"use client"

import { useState, useMemo } from "react"
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Brush, ReferenceLine, ReferenceArea
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ZoomIn, ZoomOut, RotateCcw, Download, Filter } from "lucide-react"

interface ChartFilter {
  field: string
  operator: ">" | "<" | "=" | "!=" | "contains"
  value: string | number
}

interface AdvancedChartProps {
  data: any[]
  type: "line" | "area" | "bar" | "pie"
  title: string
  xAxis?: string
  yAxis?: string
  colors?: string[]
  showBrush?: boolean
  showFilters?: boolean
  interactive?: boolean
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00ff00", "#ff00ff"]

export function AdvancedChart({
  data,
  type,
  title,
  xAxis = "x",
  yAxis = "y",
  colors = COLORS,
  showBrush = false,
  showFilters = false,
  interactive = true
}: AdvancedChartProps) {
  const [filters, setFilters] = useState<ChartFilter[]>([])
  const [zoomDomain, setZoomDomain] = useState<[number, number] | null>(null)
  const [selectedMetric, setSelectedMetric] = useState<string>(yAxis)

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return filters.every(filter => {
        const value = item[filter.field]
        switch (filter.operator) {
          case ">": return value > filter.value
          case "<": return value < filter.value
          case "=": return value === filter.value
          case "!=": return value !== filter.value
          case "contains": return String(value).includes(String(filter.value))
          default: return true
        }
      })
    })
  }, [data, filters])

  const metrics = useMemo(() => {
    if (data.length === 0) return []
    return Object.keys(data[0]).filter(key => typeof data[0][key] === "number")
  }, [data])

  const handleZoomIn = () => {
    if (filteredData.length > 10) {
      const start = Math.floor(filteredData.length * 0.25)
      const end = Math.floor(filteredData.length * 0.75)
      setZoomDomain([start, end])
    }
  }

  const handleZoomOut = () => {
    setZoomDomain(null)
  }

  const handleExport = () => {
    const csvContent = [
      Object.keys(filteredData[0]).join(","),
      ...filteredData.map(row => Object.values(row).join(","))
    ].join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderChart = () => {
    const commonProps = {
      data: filteredData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {metrics.map((metric, index) => (
              <Line
                key={metric}
                type="monotone"
                dataKey={metric}
                stroke={colors[index % colors.length]}
                strokeWidth={metric === selectedMetric ? 3 : 2}
                dot={interactive}
              />
            ))}
            {showBrush && <Brush dataKey={xAxis} height={30} />}
          </LineChart>
        )

      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {metrics.map((metric, index) => (
              <Area
                key={metric}
                type="monotone"
                dataKey={metric}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={metric === selectedMetric ? 0.8 : 0.6}
              />
            ))}
            {showBrush && <Brush dataKey={xAxis} height={30} />}
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xAxis} />
            <YAxis />
            <Tooltip />
            <Legend />
            {metrics.map((metric, index) => (
              <Bar
                key={metric}
                dataKey={metric}
                fill={colors[index % colors.length]}
                opacity={metric === selectedMetric ? 1 : 0.7}
              />
            ))}
          </BarChart>
        )

      case "pie":
        return (
          <PieChart {...commonProps}>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={selectedMetric}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {title}
            <Badge variant="outline">{filteredData.length} points</Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {showFilters && (
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
              </Button>
            )}
            {interactive && (
              <>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setZoomDomain(null)}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {metrics.length > 1 && (
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map(metric => (
                <SelectItem key={metric} value={metric}>
                  {metric}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}