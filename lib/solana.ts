export const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

export interface SolanaRPCResponse<T = any> {
  jsonrpc: string
  id: number
  result?: T
  error?: {
    code: number
    message: string
  }
}

export interface SlotInfo {
  slot: number
  parent: number
  root: number
}

export interface EpochInfo {
  absoluteSlot: number
  blockHeight: number
  epoch: number
  slotIndex: number
  slotsInEpoch: number
  transactionCount: number
}

export interface PerformanceSample {
  slot: number
  numTransactions: number
  numSlots: number
  samplePeriodSecs: number
}

export interface AccountInfo {
  executable: boolean
  lamports: number
  owner: string
  rentEpoch: number
  space: number
}

export interface BlockProduction {
  byIdentity: Record<string, [number, number]>
  range: {
    firstSlot: number
    lastSlot: number
  }
}

export interface SupplyInfo {
  circulating: number
  nonCirculating: number
  nonCirculatingAccounts: string[]
  total: number
}

export interface VoteAccount {
  activatedStake: number
  commission: number
  epochCredits: Array<[number, number, number]>
  epochVoteAccount: boolean
  lastVote: number
  nodePubkey: string
  rootSlot: number
  votePubkey: string
}

class SolanaRPC {
  private baseUrl: string
  private requestId = 1

  constructor(url: string = SOLANA_RPC_URL) {
    this.baseUrl = url
  }

  private async makeRequest<T>(method: string, params: any[] = []): Promise<T> {
    console.log("[v0] Making RPC request:", method)

    try {
      const response = await fetch("/api/solana", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          method,
          params,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: SolanaRPCResponse<T> = await response.json()

      if (data.error) {
        throw new Error(`Solana RPC Error: ${data.error.message}`)
      }

      console.log("[v0] RPC request successful:", method)
      return data.result as T
    } catch (error) {
      console.error("[v0] RPC request failed:", method, error)
      throw error
    }
  }

  async getSlot(): Promise<number> {
    return this.makeRequest<number>("getSlot")
  }

  async getEpochInfo(): Promise<EpochInfo> {
    return this.makeRequest<EpochInfo>("getEpochInfo")
  }

  async getRecentPerformanceSamples(limit = 20): Promise<PerformanceSample[]> {
    return this.makeRequest<PerformanceSample[]>("getRecentPerformanceSamples", [limit])
  }

  async getHealth(): Promise<string> {
    return this.makeRequest<string>("getHealth")
  }

  async getVersion(): Promise<{ "solana-core": string; "feature-set": number }> {
    return this.makeRequest<{ "solana-core": string; "feature-set": number }>("getVersion")
  }

  async getTransactionCount(): Promise<number> {
    return this.makeRequest<number>("getTransactionCount")
  }

  async getSupply(): Promise<SupplyInfo> {
    const result = await this.makeRequest<{ value: SupplyInfo }>("getSupply")
    return result.value
  }

  async getBlockProduction(firstSlot?: number, lastSlot?: number): Promise<BlockProduction> {
    const params = firstSlot && lastSlot ? [{ firstSlot, lastSlot }] : []
    const result = await this.makeRequest<{ value: BlockProduction }>("getBlockProduction", params)
    return result.value
  }

  async getVoteAccounts(): Promise<{ current: VoteAccount[]; delinquent: VoteAccount[] }> {
    return this.makeRequest<{ current: VoteAccount[]; delinquent: VoteAccount[] }>("getVoteAccounts")
  }

  async getInflationRate(): Promise<{
    epoch: number
    foundation: number
    total: number
    validator: number
  }> {
    return this.makeRequest("getInflationRate")
  }

  async getLeaderSchedule(slot?: number): Promise<Record<string, number[]> | null> {
    const params = slot ? [slot] : []
    return this.makeRequest("getLeaderSchedule", params)
  }

  async getClusterNodes(): Promise<
    Array<{
      pubkey: string
      gossip: string | null
      tpu: string | null
      rpc: string | null
      version: string | null
      featureSet: number | null
      shredVersion: number | null
    }>
  > {
    return this.makeRequest("getClusterNodes")
  }
}

export const solanaRPC = new SolanaRPC()
