"use client"

import { useSolanaData } from "@/hooks/use-solana-data"
import { useSolanaSupply } from "@/hooks/use-solana-supply"
import { useSolanaValidators } from "@/hooks/use-solana-validators"
import { SolanaMetricsCard } from "@/components/solana-metrics-card"
import { PerformanceChart } from "@/components/performance-chart"
import { SupplyChart } from "@/components/supply-chart"
import { ValidatorStats } from "@/components/validator-stats"
import { LiveTransactionAnalysis } from "@/components/live-transaction-analysis"
import { NetworkHealthDashboard } from "@/components/network-health-dashboard"
import { formatEpoch, formatSlot } from "@/lib/formatters"

export function LiveMetricsSection() {
  const solanaData = useSolanaData()
  const { supply, isLoading: supplyLoading } = useSolanaSupply()
  const { validators, isLoading: validatorsLoading } = useSolanaValidators()

  return (
    <section id="metrics" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Network Analytics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time data from the Solana mainnet, updated every few seconds to give you the most current view of
            network performance and health.
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SolanaMetricsCard
            title="Current Slot"
            value={formatSlot(solanaData.currentSlot)}
            subtitle="Latest confirmed slot"
            isLoading={solanaData.isLoading}
          />

          <SolanaMetricsCard
            title="Epoch"
            value={solanaData.epochInfo ? formatEpoch(solanaData.epochInfo.epoch) : "Loading..."}
            subtitle={
              solanaData.epochInfo
                ? `${solanaData.epochInfo.slotIndex}/${solanaData.epochInfo.slotsInEpoch} slots`
                : undefined
            }
            isLoading={solanaData.isLoading}
          />

          <SolanaMetricsCard
            title="Total Transactions"
            value={solanaData.transactionCount}
            subtitle="Network lifetime"
            isLoading={solanaData.isLoading}
          />

          <SolanaMetricsCard
            title="Network Health"
            value={solanaData.health}
            status={solanaData.health === "ok" ? "healthy" : "error"}
            isLoading={solanaData.isLoading}
          />
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Live Transaction Analysis</h3>
          <LiveTransactionAnalysis />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <PerformanceChart data={solanaData.performanceSamples} isLoading={solanaData.isLoading} />
          <SupplyChart supply={supply} isLoading={supplyLoading} />
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Network Health Dashboard</h3>
          <NetworkHealthDashboard />
        </div>

        {/* Validator Stats */}
        <div className="max-w-2xl mx-auto">
          <ValidatorStats validators={validators} isLoading={validatorsLoading} />
        </div>

        {solanaData.error && (
          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            <p className="text-destructive font-medium">Error loading network data: {solanaData.error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check console for detailed error information. Ensure RPC endpoint is accessible.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
