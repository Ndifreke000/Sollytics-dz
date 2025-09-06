"use client"

import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { VisualQueryBuilder } from "@/components/visual-query-builder"

export default function VisualQueryPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Visual Query Builder</h1>
            <p className="text-muted-foreground">
              Build queries with drag-and-drop interface - no SQL knowledge required
            </p>
          </div>

          <VisualQueryBuilder />
        </main>
      </div>
    </ProtectedRoute>
  )
}