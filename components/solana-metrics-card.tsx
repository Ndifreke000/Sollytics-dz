"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  status?: "healthy" | "warning" | "error" | "unknown"
  isLoading?: boolean
}

export function SolanaMetricsCard({ title, value, subtitle, status, isLoading }: MetricsCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-24 mb-2" />
          {subtitle && <Skeleton className="h-4 w-16" />}
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {status && (
            <Badge variant="outline" className="text-xs">
              <div className={`w-2 h-2 rounded-full mr-1 ${getStatusColor(status)}`} />
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{typeof value === "number" ? value.toLocaleString() : value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
