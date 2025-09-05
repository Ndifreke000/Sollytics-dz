"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart3, Database, Zap, Shield, Globe, Code, Users } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Advanced Query Engine",
    description:
      "SQL-like interface for querying blockchain data with powerful filtering and aggregation capabilities.",
    badge: "Core Feature",
  },
  {
    icon: BarChart3,
    title: "Real-time Visualizations",
    description: "Interactive charts and graphs that update in real-time as new blocks are processed.",
    badge: "Live Data",
  },
  {
    icon: Database,
    title: "Historical Data Access",
    description: "Access complete historical blockchain data with optimized indexing for fast queries.",
    badge: "Archive",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Built for speed with caching layers and optimized data structures for sub-second responses.",
    badge: "Fast",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with encrypted connections and secure API key management.",
    badge: "Secure",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Distributed infrastructure ensures low latency access from anywhere in the world.",
    badge: "Global",
  },
  {
    icon: Code,
    title: "Developer APIs",
    description: "RESTful APIs and WebSocket connections for seamless integration into your applications.",
    badge: "API",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share dashboards and queries with your team, with role-based access controls.",
    badge: "Teams",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Blockchain Analytics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze, understand, and act on Solana blockchain data, from real-time monitoring to
            historical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="relative group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
