"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Loader2, Activity, Database, TrendingUp } from "lucide-react"

export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6", 
    lg: "w-8 h-8"
  }
  
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  )
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-3 w-16" />
      </CardContent>
    </Card>
  )
}

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-64 w-full" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <TableSkeleton />
      </div>
    </div>
  )
}

export function QueryEditorSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
      
      <TableSkeleton rows={8} />
    </div>
  )
}

interface LoadingStateProps {
  type: "metrics" | "chart" | "table" | "dashboard" | "query"
  message?: string
}

export function LoadingState({ type, message }: LoadingStateProps) {
  const getIcon = () => {
    switch (type) {
      case "metrics": return <Activity className="w-8 h-8 text-primary" />
      case "chart": return <TrendingUp className="w-8 h-8 text-primary" />
      case "table": 
      case "query": return <Database className="w-8 h-8 text-primary" />
      default: return <Loader2 className="w-8 h-8 animate-spin text-primary" />
    }
  }

  const getMessage = () => {
    if (message) return message
    switch (type) {
      case "metrics": return "Loading network metrics..."
      case "chart": return "Generating visualization..."
      case "table": return "Fetching data..."
      case "query": return "Executing query..."
      case "dashboard": return "Loading dashboard..."
      default: return "Loading..."
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        {getIcon()}
      </div>
      <p className="text-muted-foreground">{getMessage()}</p>
    </div>
  )
}