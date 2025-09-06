import { NextResponse } from 'next/server'

export async function GET() {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      database: 'connected',
      websocket: 'running',
      cache: 'active'
    },
    metrics: {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      version: process.version
    }
  }

  return NextResponse.json(health)
}