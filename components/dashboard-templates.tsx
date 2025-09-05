"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye } from "lucide-react"
import { DASHBOARD_TEMPLATES } from "@/lib/dashboard"

interface DashboardTemplatesProps {
  onCreateFromTemplate: (templateId: string, name: string) => void
}

export function DashboardTemplates({ onCreateFromTemplate }: DashboardTemplatesProps) {
  const handleCreateFromTemplate = (templateId: string) => {
    const template = DASHBOARD_TEMPLATES.find((t) => t.id === templateId)
    if (template) {
      const name = `${template.name} - ${new Date().toLocaleDateString()}`
      onCreateFromTemplate(templateId, name)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Templates</h2>
        <p className="text-muted-foreground">
          Get started quickly with pre-built dashboard templates for common Solana analytics use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DASHBOARD_TEMPLATES.map((template) => (
          <Card key={template.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={`${template.name} preview`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription className="mt-1">{template.description}</CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {template.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{template.widgets.length} widgets</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                    <Eye className="w-3 h-3" />
                    Preview
                  </Button>
                  <Button size="sm" onClick={() => handleCreateFromTemplate(template.id)} className="gap-1">
                    <Plus className="w-3 h-3" />
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
