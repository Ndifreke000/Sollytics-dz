import { NextResponse } from 'next/server'
import { splTokenService } from '@/lib/spl-token'

export async function GET() {
  try {
    const metrics = await splTokenService.getStablecoinMetrics()
    
    return NextResponse.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch stablecoin metrics'
    }, { status: 500 })
  }
}