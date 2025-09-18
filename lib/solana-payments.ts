import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

export const PAYMENT_TOKENS = {
  SOL: {
    symbol: 'SOL',
    decimals: 9,
    mint: null, // Native SOL
    icon: '◎'
  }
}

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    priceUSD: 0,
    queries: 100,
    dashboards: 3,
    features: ['Basic dashboards', 'Community support']
  },
  pro: {
    name: 'Pro',
    priceUSD: 49,
    queries: -1,
    dashboards: -1,
    features: ['Unlimited queries', 'Advanced AI', 'API access', 'Priority support']
  },
  enterprise: {
    name: 'Enterprise',
    priceUSD: 499,
    queries: -1,
    dashboards: -1,
    features: ['White-label', 'SSO', 'Dedicated support', 'SLA', 'Custom integrations']
  }
}

class SolanaPaymentService {
  private connection: Connection
  private adminWallet: PublicKey

  constructor() {
    const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
    this.connection = new Connection(rpcUrl)
    this.adminWallet = new PublicKey(process.env.ADMIN_WALLET_ADDRESS || '11111111111111111111111111111112')
  }

  async getTokenPrice(symbol: string): Promise<number> {
    // Mock price feed - replace with real price oracle
    const prices: { [key: string]: number } = {
      SOL: 180,
      USDC: 1,
      USDT: 1
    }
    return prices[symbol] || 0
  }

  async calculateTokenAmount(usdAmount: number, tokenSymbol: string): Promise<number> {
    const tokenPrice = await this.getTokenPrice(tokenSymbol)
    const token = PAYMENT_TOKENS[tokenSymbol as keyof typeof PAYMENT_TOKENS]
    const tokenAmount = usdAmount / tokenPrice
    return Math.ceil(tokenAmount * Math.pow(10, token.decimals))
  }

  async createPaymentTransaction(
    userWallet: PublicKey,
    planId: string,
    tokenSymbol: string
  ): Promise<{ transaction: Transaction; amount: number }> {
    const plan = SUBSCRIPTION_PLANS[planId as keyof typeof SUBSCRIPTION_PLANS]
    const token = PAYMENT_TOKENS[tokenSymbol as keyof typeof PAYMENT_TOKENS]
    const amount = await this.calculateTokenAmount(plan.priceUSD, tokenSymbol)

    const transaction = new Transaction()

    if (tokenSymbol === 'SOL') {
      // Native SOL transfer
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: userWallet,
          toPubkey: this.adminWallet,
          lamports: amount
        })
      )
    } else {
      // SPL Token transfer - simplified for build
      // Note: Implement full SPL token support when @solana/spl-token is available
      throw new Error('SPL token transfers require additional setup')
    }

    const { blockhash } = await this.connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = userWallet

    return { transaction, amount }
  }

  async verifyPayment(signature: string, expectedAmount: number): Promise<boolean> {
    try {
      const transaction = await this.connection.getTransaction(signature, {
        commitment: 'confirmed'
      })
      
      if (!transaction || transaction.meta?.err) {
        return false
      }

      return true // Simplified verification for demo
    } catch (error) {
      console.error('Payment verification failed:', error)
      return false
    }
  }

  setAdminWallet(newWallet: string) {
    this.adminWallet = new PublicKey(newWallet)
  }

  getAdminWallet(): string {
    return this.adminWallet.toString()
  }
}

export const solanaPayments = new SolanaPaymentService()