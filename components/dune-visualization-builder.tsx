"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { BarChart3, LineChart, PieChart, Hash } from "lucide-react"
import { BarChart, Bar, LineChart as RechartsLine, Line, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface DuneVisualizationBuilderProps {
  data: any[]
  columns: string[]
  onSave: (config: any) => void
}

export function DuneVisualizationBuilder({ data, columns, onSave }: DuneVisualizationBuilderProps) {
  const [type, setType] = useState("bar")
  const [xCol, setXCol] = useState("")
  const [yCol, setYCol] = useState("")
  const [title, setTitle] = useState("")

  const chartData = data.map(row => 
    columns.reduce((obj, col, i) => ({ ...obj, [col]: row[i] }), {})
  )

  const renderChart = () => {
    if (!xCol || !yCol) return null
    
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey={xCol} />
              <YAxis />
              <Bar dataKey={yCol} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLine data={chartData}>
              <XAxis dataKey={xCol} />
              <YAxis />
              <Line dataKey={yCol} stroke="#3b82f6" />
            </RechartsLine>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Visualization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Chart title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select value={xCol} onValueChange={setXCol}>
            <SelectTrigger>
              <SelectValue placeholder="X-axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map(col => (
                <SelectItem key={col} value={col}>{col}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={yCol} onValueChange={setYCol}>
            <SelectTrigger>
              <SelectValue placeholder="Y-axis" />
            </SelectTrigger>
            <SelectContent>
              {columns.map(col => (
                <SelectItem key={col} value={col}>{col}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded p-4">
          {renderChart()}
        </div>

        <Button 
          onClick={() => onSave({ type, xCol, yCol, title })}
          disabled={!xCol || !yCol || !title}
          className="w-full"
        >
          Save Visualization
        </Button>
      </CardContent>
    </Card>
  )
}