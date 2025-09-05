"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, FileText, Image, Database, Check, Loader2 } from "lucide-react"

interface ExportOptions {
  format: "csv" | "json" | "pdf" | "png"
  includeCharts: boolean
  dateRange?: "all" | "last7days" | "last30days" | "custom"
}

interface DataExportProps {
  data: any[]
  title: string
  onExport?: (options: ExportOptions) => Promise<void>
}

export function DataExport({ data, title, onExport }: DataExportProps) {
  const [exportFormat, setExportFormat] = useState<ExportOptions["format"]>("csv")
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportComplete, setExportComplete] = useState(false)

  const formatOptions = [
    { value: "csv", label: "CSV", icon: FileText, description: "Comma-separated values" },
    { value: "json", label: "JSON", icon: Database, description: "JavaScript Object Notation" },
    { value: "pdf", label: "PDF", icon: FileText, description: "Portable Document Format" },
    { value: "png", label: "PNG", icon: Image, description: "Image format" }
  ]

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)
    setExportComplete(false)

    try {
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      if (onExport) {
        await onExport({
          format: exportFormat,
          includeCharts: exportFormat === "pdf" || exportFormat === "png"
        })
      } else {
        // Default export logic
        await exportData()
      }

      clearInterval(progressInterval)
      setExportProgress(100)
      setExportComplete(true)
      
      setTimeout(() => {
        setIsExporting(false)
        setExportComplete(false)
        setExportProgress(0)
      }, 2000)
    } catch (error) {
      console.error("Export failed:", error)
      setIsExporting(false)
      setExportProgress(0)
    }
  }

  const exportData = async () => {
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}`

    switch (exportFormat) {
      case "csv":
        exportAsCSV(data, filename)
        break
      case "json":
        exportAsJSON(data, filename)
        break
      case "pdf":
        await exportAsPDF(data, filename)
        break
      case "png":
        await exportAsPNG(filename)
        break
    }
  }

  const exportAsCSV = (data: any[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(header => {
        const value = row[header]
        return typeof value === "string" && value.includes(",") ? `"${value}"` : value
      }).join(","))
    ].join("\n")

    downloadFile(csvContent, `${filename}.csv`, "text/csv")
  }

  const exportAsJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify({
      title,
      exportedAt: new Date().toISOString(),
      totalRecords: data.length,
      data
    }, null, 2)

    downloadFile(jsonContent, `${filename}.json`, "application/json")
  }

  const exportAsPDF = async (data: any[], filename: string) => {
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real implementation, you'd use a library like jsPDF
    const pdfContent = `PDF Export: ${title}\nGenerated: ${new Date().toLocaleString()}\nRecords: ${data.length}`
    downloadFile(pdfContent, `${filename}.pdf`, "application/pdf")
  }

  const exportAsPNG = async (filename: string) => {
    // Simulate image generation
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // In a real implementation, you'd capture the chart/dashboard as image
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, 800, 600)
      ctx.fillStyle = "#000000"
      ctx.font = "20px Arial"
      ctx.fillText(`${title} - Exported Chart`, 50, 50)
    }
    
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${filename}.png`
        a.click()
        URL.revokeObjectURL(url)
      }
    })
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Data
        </CardTitle>
        <CardDescription>
          Download your data in various formats
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Export Format</label>
          <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map(option => {
                const Icon = option.icon
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div>
            <p className="font-medium">Data Summary</p>
            <p className="text-sm text-muted-foreground">
              {data.length} records • {Object.keys(data[0] || {}).length} columns
            </p>
          </div>
          <Badge variant="secondary">{data.length} rows</Badge>
        </div>

        {isExporting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Exporting...</span>
              <span>{exportProgress}%</span>
            </div>
            <Progress value={exportProgress} className="h-2" />
          </div>
        )}

        <Button 
          onClick={handleExport} 
          disabled={isExporting || data.length === 0}
          className="w-full gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Exporting...
            </>
          ) : exportComplete ? (
            <>
              <Check className="w-4 h-4" />
              Export Complete
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Export as {exportFormat.toUpperCase()}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}