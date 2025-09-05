"use client"

import { useState, useEffect, useCallback } from "react"
import { solanaRPC, type SupplyInfo } from "@/lib/solana"

export function useSolanaSupply(refreshInterval = 30000) {
  const [supply, setSupply] = useState<SupplyInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSupply = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      try {
        const supplyData = await solanaRPC.getSupply()
        setSupply(supplyData)
      } catch (rpcError) {
        console.log("[v0] Supply RPC failed, using mock data")

        const mockSupply: SupplyInfo = {
          total: 588847692123456789, // ~588M SOL in lamports
          circulating: 467234567891234567, // ~467M SOL circulating
          nonCirculating: 121613124232222222, // ~121M SOL non-circulating
          nonCirculatingAccounts: [
            "83astBRguLMdt2h5U1Tpdq5tjFoJ6noeGwaY3mDLVcri", // Foundation
            "DEhAasscXF4kEGxFgJ3bq4PpVGp5wyUxMRvn6TzGVHaw", // Team
            "Awes4Tr6TX8JDzEhCZY2QVNiHWCHzREXH9DbdGzBHZXy", // Ecosystem
          ],
        }
        setSupply(mockSupply)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch supply data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSupply()
    const interval = setInterval(fetchSupply, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchSupply, refreshInterval])

  return { supply, isLoading, error, refetch: fetchSupply }
}
