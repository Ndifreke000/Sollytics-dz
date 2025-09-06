"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { ContractIntegrationHub } from "@/components/contracts/contract-integration-hub"

export default function ContractsPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            Smart Contract Integration
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect wallets, analyze transactions, and monitor smart contracts on Solana
          </p>
        </div>

        <ContractIntegrationHub />
      </div>
    </ProtectedRoute>
  )
}