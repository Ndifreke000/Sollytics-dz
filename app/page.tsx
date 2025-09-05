"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LiveMetricsSection } from "@/components/live-metrics-section"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LiveMetricsSection />
        <FeaturesSection />
      </main>
    </div>
  )
}
