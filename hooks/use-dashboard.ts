"use client"

import { useState, useCallback, useEffect } from "react"
import { dashboardManager, type Dashboard, type Widget } from "@/lib/dashboard"

export function useDashboard(dashboardId?: string) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null)
  const [dashboards, setDashboards] = useState<Dashboard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadDashboard = useCallback((id: string) => {
    try {
      const dash = dashboardManager.getDashboard(id)
      if (dash) {
        setDashboard(dash)
        setError(null)
      } else {
        setError("Dashboard not found")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard")
    }
  }, [])

  const loadDashboards = useCallback(() => {
    try {
      const allDashboards = dashboardManager.getAllDashboards()
      setDashboards(allDashboards)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboards")
    }
  }, [])

  const createDashboard = useCallback((name: string, description?: string) => {
    try {
      const newDashboard = dashboardManager.createDashboard(name, description)
      setDashboards(dashboardManager.getAllDashboards())
      return newDashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create dashboard")
      return null
    }
  }, [])

  const createFromTemplate = useCallback((templateId: string, name: string) => {
    try {
      const newDashboard = dashboardManager.createFromTemplate(templateId, name)
      setDashboards(dashboardManager.getAllDashboards())
      return newDashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create dashboard from template")
      return null
    }
  }, [])

  const updateDashboard = useCallback((id: string, updates: Partial<Dashboard>) => {
    try {
      const updated = dashboardManager.updateDashboard(id, updates)
      setDashboard(updated)
      setDashboards(dashboardManager.getAllDashboards())
      return updated
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dashboard")
      return null
    }
  }, [])

  const deleteDashboard = useCallback(
    (id: string) => {
      try {
        dashboardManager.deleteDashboard(id)
        setDashboards(dashboardManager.getAllDashboards())
        if (dashboard?.id === id) {
          setDashboard(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete dashboard")
      }
    },
    [dashboard],
  )

  const addWidget = useCallback(
    (widget: Omit<Widget, "id">) => {
      if (!dashboard) return null

      try {
        const newWidget = dashboardManager.addWidget(dashboard.id, widget)
        setDashboard(dashboardManager.getDashboard(dashboard.id)!)
        return newWidget
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add widget")
        return null
      }
    },
    [dashboard],
  )

  const updateWidget = useCallback(
    (widgetId: string, updates: Partial<Widget>) => {
      if (!dashboard) return null

      try {
        const updated = dashboardManager.updateWidget(dashboard.id, widgetId, updates)
        setDashboard(dashboardManager.getDashboard(dashboard.id)!)
        return updated
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update widget")
        return null
      }
    },
    [dashboard],
  )

  const removeWidget = useCallback(
    (widgetId: string) => {
      if (!dashboard) return

      try {
        dashboardManager.removeWidget(dashboard.id, widgetId)
        setDashboard(dashboardManager.getDashboard(dashboard.id)!)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove widget")
      }
    },
    [dashboard],
  )

  useEffect(() => {
    loadDashboards()
    if (dashboardId) {
      loadDashboard(dashboardId)
    }
  }, [dashboardId, loadDashboard, loadDashboards])

  return {
    dashboard,
    dashboards,
    isLoading,
    error,
    loadDashboard,
    createDashboard,
    createFromTemplate,
    updateDashboard,
    deleteDashboard,
    addWidget,
    updateWidget,
    removeWidget,
  }
}
