"use client"

import { Header } from "@/components/header"
import { ProtectedRoute } from "@/components/protected-route"
import { CommunityMarketplace } from "@/components/community-marketplace"

export default function MarketplacePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Community Marketplace</h1>
            <p className="text-muted-foreground">
              Discover and share dashboards, queries, and widgets with the community
            </p>
          </div>

          <CommunityMarketplace />
        </main>
      </div>
    </ProtectedRoute>
  )
}