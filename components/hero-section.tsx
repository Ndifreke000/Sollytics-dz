"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Activity, Database, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            <Activity className="w-3 h-3 mr-1" />
            Real-time Blockchain Analytics
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            Unlock Real-Time Insights into the <span className="text-primary">Solana Network</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Analyze, visualize, and act on blockchain data with our comprehensive suite of tools. Monitor network
            performance, track transactions, and build custom dashboards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/auth">
                Start Analyzing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
              <Link href="#metrics">
                <Database className="w-4 h-4" />
                View Live Data
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Real-time Metrics</h3>
              <p className="text-sm text-muted-foreground">Live network performance and transaction data</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Database className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Custom Queries</h3>
              <p className="text-sm text-muted-foreground">SQL-like interface for blockchain data analysis</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Dashboards</h3>
              <p className="text-sm text-muted-foreground">Build and share custom visualization dashboards</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
