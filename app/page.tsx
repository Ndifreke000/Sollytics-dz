"use client"

import { LayoutWrapper } from "@/components/layout-wrapper"
import { HeroSection } from "@/components/hero-section"
import { LiveMetricsSection } from "@/components/live-metrics-section"
import { FeaturesSection } from "@/components/features-section"
import { StablecoinPreview } from "@/components/stablecoin-preview"

export default function HomePage() {
  return (
    <LayoutWrapper>
      <div className="min-h-screen">
        <main>
          <HeroSection />
          <LiveMetricsSection />
          <StablecoinPreview />
          <FeaturesSection />
        </main>
      </div>
    </LayoutWrapper>
  )
}
