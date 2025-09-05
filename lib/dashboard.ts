export interface Widget {
  id: string
  type: "metric" | "chart" | "table" | "text"
  title: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  config: WidgetConfig
}

export interface WidgetConfig {
  // Metric widget config
  metric?: {
    value: string | number
    label: string
    format?: "number" | "currency" | "percentage"
    trend?: {
      value: number
      direction: "up" | "down"
    }
  }

  // Chart widget config
  chart?: {
    type: "line" | "bar" | "pie" | "area"
    dataSource: string
    xAxis?: string
    yAxis?: string
    colors?: string[]
  }

  // Table widget config
  table?: {
    dataSource: string
    columns: string[]
    pageSize?: number
  }

  // Text widget config
  text?: {
    content: string
    fontSize?: "sm" | "md" | "lg" | "xl"
    alignment?: "left" | "center" | "right"
  }
}

export interface Dashboard {
  id: string
  name: string
  description?: string
  widgets: Widget[]
  layout: {
    columns: number
    rows: number
  }
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  tags: string[]
}

export interface DashboardTemplate {
  id: string
  name: string
  description: string
  category: string
  widgets: Omit<Widget, "id">[]
  preview: string
}

export const DASHBOARD_TEMPLATES: DashboardTemplate[] = [
  {
    id: "network-overview",
    name: "Network Overview",
    description: "High-level metrics about Solana network performance",
    category: "Network",
    preview: "/network-dashboard-preview.jpg",
    widgets: [
      {
        type: "metric",
        title: "Current Slot",
        position: { x: 0, y: 0, width: 3, height: 2 },
        config: {
          metric: {
            value: "280,123,456",
            label: "Latest Slot",
            format: "number",
          },
        },
      },
      {
        type: "metric",
        title: "Network TPS",
        position: { x: 3, y: 0, width: 3, height: 2 },
        config: {
          metric: {
            value: 2847,
            label: "Transactions/sec",
            format: "number",
            trend: { value: 12.5, direction: "up" },
          },
        },
      },
      {
        type: "chart",
        title: "Performance Over Time",
        position: { x: 0, y: 2, width: 6, height: 4 },
        config: {
          chart: {
            type: "line",
            dataSource: "performance_samples",
            xAxis: "slot",
            yAxis: "tps",
          },
        },
      },
    ],
  },
  {
    id: "validator-analysis",
    name: "Validator Analysis",
    description: "Detailed validator performance and stake distribution",
    category: "Validators",
    preview: "/validator-dashboard-preview.jpg",
    widgets: [
      {
        type: "metric",
        title: "Active Validators",
        position: { x: 0, y: 0, width: 2, height: 2 },
        config: {
          metric: {
            value: 1847,
            label: "Validators",
            format: "number",
          },
        },
      },
      {
        type: "metric",
        title: "Total Stake",
        position: { x: 2, y: 0, width: 2, height: 2 },
        config: {
          metric: {
            value: "412.5M",
            label: "SOL Staked",
            format: "currency",
          },
        },
      },
      {
        type: "chart",
        title: "Stake Distribution",
        position: { x: 4, y: 0, width: 4, height: 4 },
        config: {
          chart: {
            type: "pie",
            dataSource: "validator_stakes",
          },
        },
      },
      {
        type: "table",
        title: "Top Validators",
        position: { x: 0, y: 2, width: 4, height: 4 },
        config: {
          table: {
            dataSource: "top_validators",
            columns: ["name", "stake", "commission", "apy"],
            pageSize: 10,
          },
        },
      },
    ],
  },
]

class DashboardManager {
  private dashboards: Dashboard[] = []

  createDashboard(name: string, description?: string): Dashboard {
    const dashboard: Dashboard = {
      id: crypto.randomUUID(),
      name,
      description,
      widgets: [],
      layout: { columns: 12, rows: 8 },
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      tags: [],
    }

    this.dashboards.push(dashboard)
    return dashboard
  }

  createFromTemplate(templateId: string, name: string): Dashboard {
    const template = DASHBOARD_TEMPLATES.find((t) => t.id === templateId)
    if (!template) {
      throw new Error("Template not found")
    }

    const dashboard: Dashboard = {
      id: crypto.randomUUID(),
      name,
      description: template.description,
      widgets: template.widgets.map((widget) => ({
        ...widget,
        id: crypto.randomUUID(),
      })),
      layout: { columns: 12, rows: 8 },
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: false,
      tags: [template.category.toLowerCase()],
    }

    this.dashboards.push(dashboard)
    return dashboard
  }

  getDashboard(id: string): Dashboard | undefined {
    return this.dashboards.find((d) => d.id === id)
  }

  getAllDashboards(): Dashboard[] {
    return this.dashboards
  }

  updateDashboard(id: string, updates: Partial<Dashboard>): Dashboard {
    const index = this.dashboards.findIndex((d) => d.id === id)
    if (index === -1) {
      throw new Error("Dashboard not found")
    }

    this.dashboards[index] = {
      ...this.dashboards[index],
      ...updates,
      updatedAt: new Date(),
    }

    return this.dashboards[index]
  }

  deleteDashboard(id: string): void {
    this.dashboards = this.dashboards.filter((d) => d.id !== id)
  }

  addWidget(dashboardId: string, widget: Omit<Widget, "id">): Widget {
    const dashboard = this.getDashboard(dashboardId)
    if (!dashboard) {
      throw new Error("Dashboard not found")
    }

    const newWidget: Widget = {
      ...widget,
      id: crypto.randomUUID(),
    }

    dashboard.widgets.push(newWidget)
    dashboard.updatedAt = new Date()

    return newWidget
  }

  updateWidget(dashboardId: string, widgetId: string, updates: Partial<Widget>): Widget {
    const dashboard = this.getDashboard(dashboardId)
    if (!dashboard) {
      throw new Error("Dashboard not found")
    }

    const widgetIndex = dashboard.widgets.findIndex((w) => w.id === widgetId)
    if (widgetIndex === -1) {
      throw new Error("Widget not found")
    }

    dashboard.widgets[widgetIndex] = {
      ...dashboard.widgets[widgetIndex],
      ...updates,
    }
    dashboard.updatedAt = new Date()

    return dashboard.widgets[widgetIndex]
  }

  removeWidget(dashboardId: string, widgetId: string): void {
    const dashboard = this.getDashboard(dashboardId)
    if (!dashboard) {
      throw new Error("Dashboard not found")
    }

    dashboard.widgets = dashboard.widgets.filter((w) => w.id !== widgetId)
    dashboard.updatedAt = new Date()
  }
}

export const dashboardManager = new DashboardManager()
