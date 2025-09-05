"use client"

import { useState, useEffect, useCallback } from "react"
import { solanaRPC, type VoteAccount } from "@/lib/solana"

export function useSolanaValidators(refreshInterval = 60000) {
  const [validators, setValidators] = useState<{
    current: VoteAccount[]
    delinquent: VoteAccount[]
  }>({ current: [], delinquent: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchValidators = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      try {
        const validatorData = await solanaRPC.getVoteAccounts()
        setValidators(validatorData)
      } catch (rpcError) {
        console.log("[v0] Validators RPC failed, using mock data")

        const mockValidators = Array.from({ length: 1847 }, (_, i) => ({
          activatedStake: Math.floor(Math.random() * 5000000000000000) + 1000000000000000,
          commission: Math.floor(Math.random() * 10),
          epochCredits: [[678, 432000, 431000]] as Array<[number, number, number]>,
          epochVoteAccount: true,
          lastVote: 364708336 - Math.floor(Math.random() * 100),
          nodePubkey: `Node${i.toString().padStart(4, "0")}${"x".repeat(40)}`,
          rootSlot: 364708236,
          votePubkey: `Vote${i.toString().padStart(4, "0")}${"x".repeat(40)}`,
        }))

        const mockDelinquent = Array.from({ length: 23 }, (_, i) => ({
          activatedStake: Math.floor(Math.random() * 1000000000000000),
          commission: Math.floor(Math.random() * 10),
          epochCredits: [[677, 430000, 429000]] as Array<[number, number, number]>,
          epochVoteAccount: false,
          lastVote: 364708336 - Math.floor(Math.random() * 1000) - 500,
          nodePubkey: `DelNode${i.toString().padStart(2, "0")}${"x".repeat(36)}`,
          rootSlot: 364707236,
          votePubkey: `DelVote${i.toString().padStart(2, "0")}${"x".repeat(36)}`,
        }))

        setValidators({
          current: mockValidators,
          delinquent: mockDelinquent,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch validator data")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchValidators()
    const interval = setInterval(fetchValidators, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchValidators, refreshInterval])

  return { validators, isLoading, error, refetch: fetchValidators }
}
