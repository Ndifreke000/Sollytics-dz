import { Connection, PublicKey } from '@solana/web3.js'

const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
const USDT_MINT = 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'

export class SPLTokenService {
  private connection: Connection

  constructor(rpcUrl: string) {
    this.connection = new Connection(rpcUrl)
  }

  async getTokenSupply(mintAddress: string) {
    const mint = new PublicKey(mintAddress)
    const supply = await this.connection.getTokenSupply(mint)
    return {
      total: supply.value.amount,
      decimals: supply.value.decimals,
      formatted: Number(supply.value.amount) / Math.pow(10, supply.value.decimals)
    }
  }

  async getStablecoinMetrics() {
    const [usdcSupply, usdtSupply] = await Promise.all([
      this.getTokenSupply(USDC_MINT),
      this.getTokenSupply(USDT_MINT)
    ])

    return {
      usdc: {
        supply: usdcSupply.formatted,
        mint: USDC_MINT,
        symbol: 'USDC'
      },
      usdt: {
        supply: usdtSupply.formatted,
        mint: USDT_MINT,
        symbol: 'USDT'
      },
      total: usdcSupply.formatted + usdtSupply.formatted
    }
  }

  async getTokenTransfers(mintAddress: string, limit = 100) {
    // Mock implementation - would use transaction parsing in production
    return Array.from({ length: limit }, (_, i) => ({
      signature: `sig${i}`,
      amount: Math.random() * 1000000,
      type: Math.random() > 0.5 ? 'mint' : 'burn',
      timestamp: Date.now() - i * 60000
    }))
  }
}

export const splTokenService = new SPLTokenService(
  process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
)