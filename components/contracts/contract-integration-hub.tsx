"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletConnection } from "./wallet-connection"
import { TransactionAnalyzer } from "./transaction-analyzer"
import { TokenAnalytics } from "./token-analytics"
import { NFTAnalytics } from "./nft-analytics"
import { DeFiIntegration } from "./defi-integration"
import { ContractMonitoring } from "./contract-monitoring"
import { GovernanceTracker } from "./governance-tracker"
import { StakingCalculator } from "./staking-calculator"
import { RealTimeContractMonitor } from "./real-time-contract-monitor"
import { Wallet, Activity, Coins, Image, TrendingUp, Code, Vote, Calculator } from "lucide-react"

export function ContractIntegrationHub() {
  const [activeTab, setActiveTab] = useState("wallet")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Wallet</span>
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="tokens" className="flex items-center gap-2">
            <Coins className="w-4 h-4" />
            <span className="hidden sm:inline">Tokens</span>
          </TabsTrigger>
          <TabsTrigger value="nfts" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            <span className="hidden sm:inline">NFTs</span>
          </TabsTrigger>
          <TabsTrigger value="defi" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">DeFi</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex items-center gap-2">
            <Vote className="w-4 h-4" />
            <span className="hidden sm:inline">Governance</span>
          </TabsTrigger>
          <TabsTrigger value="staking" className="flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Staking</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wallet" className="mt-6">
          <WalletConnection />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionAnalyzer />
        </TabsContent>

        <TabsContent value="tokens" className="mt-6">
          <TokenAnalytics />
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          <NFTAnalytics />
        </TabsContent>

        <TabsContent value="defi" className="mt-6">
          <DeFiIntegration />
        </TabsContent>

        <TabsContent value="contracts" className="mt-6">
          <ContractMonitoring />
        </TabsContent>

        <TabsContent value="monitor" className="mt-6">
          <RealTimeContractMonitor />
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <GovernanceTracker />
        </TabsContent>

        <TabsContent value="staking" className="mt-6">
          <StakingCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}