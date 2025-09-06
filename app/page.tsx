"use client"

import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { LiveMetricsSection } from "@/components/live-metrics-section"
import { FeaturesSection } from "@/components/features-section"
import { StablecoinPreview } from "@/components/stablecoin-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LiveMetricsSection />
        <StablecoinPreview />
        <FeaturesSection />
      </main>
    </div>
  )
}
