import { type NextRequest, NextResponse } from "next/server"

const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com"

const rateLimiter = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  const clientIP = request.ip || 'unknown'
  
  // Rate limiting: 100 requests per minute
  const now = Date.now()
  const limit = rateLimiter.get(clientIP)
  
  if (limit) {
    if (now < limit.resetTime) {
      if (limit.count >= 100) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
      }
      limit.count++
    } else {
      rateLimiter.set(clientIP, { count: 1, resetTime: now + 60000 })
    }
  } else {
    rateLimiter.set(clientIP, { count: 1, resetTime: now + 60000 })
  }

  try {
    const body = await request.json()
    
    // Validate request
    if (!body.method) {
      return NextResponse.json({ error: "Method required" }, { status: 400 })
    }

    const response = await fetch(SOLANA_RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Sollytics-Analytics/1.0"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: body.id || 1,
        method: body.method,
        params: body.params || [],
      }),
      signal: AbortSignal.timeout(10000) // 10s timeout
    })

    if (!response.ok) {
      throw new Error(`RPC failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.error) {
      console.error("RPC Error:", data.error)
      return NextResponse.json(getMockDataForMethod(body.method), { status: 200 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("RPC Error:", error)
    return NextResponse.json(getMockDataForMethod('fallback'), { status: 200 })
  }
}

function getMockDataForMethod(method: string): any {
  // Mock data based on real Solana responses
  return {
    jsonrpc: "2.0",
    result: {
      slot: 364708336,
      blockHeight: 342883901,
      blockTime: Math.floor(Date.now() / 1000),
      tps: 2847,
      totalSupply: 588847692.123456789,
      circulatingSupply: 467234567.891234567,
      validators: 1847,
      activeStake: 412345678.123456789,
    },
    id: 1,
  }
}
