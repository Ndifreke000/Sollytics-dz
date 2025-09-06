import WebSocket from 'ws'

export class WebSocketServer {
  private wss: WebSocket.Server
  private clients: Set<WebSocket> = new Set()

  constructor(port: number = 8080) {
    this.wss = new WebSocket.Server({ port })
    this.setupServer()
    this.startDataBroadcast()
  }

  private setupServer() {
    this.wss.on('connection', (ws) => {
      this.clients.add(ws)
      console.log('Client connected. Total clients:', this.clients.size)

      ws.on('close', () => {
        this.clients.delete(ws)
        console.log('Client disconnected. Total clients:', this.clients.size)
      })

      // Send initial data
      this.sendToClient(ws, {
        type: 'connection',
        data: { status: 'connected' },
        timestamp: Date.now()
      })
    })
  }

  private sendToClient(ws: WebSocket, message: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message))
    }
  }

  private broadcast(message: any) {
    this.clients.forEach(client => {
      this.sendToClient(client, message)
    })
  }

  private startDataBroadcast() {
    // Broadcast network metrics every 5 seconds
    setInterval(() => {
      this.broadcast({
        type: 'network_metrics',
        data: {
          tps: Math.random() * 5000,
          slot: Math.floor(Math.random() * 1000000) + 200000000,
          blockTime: 400 + Math.random() * 200,
          validators: 1500 + Math.random() * 100
        },
        timestamp: Date.now()
      })
    }, 5000)

    // Broadcast stablecoin data every 10 seconds
    setInterval(() => {
      this.broadcast({
        type: 'stablecoin_metrics',
        data: {
          usdc: {
            supply: 32500000000 + (Math.random() - 0.5) * 10000000,
            change24h: 2.1 + (Math.random() - 0.5) * 0.5
          },
          usdt: {
            supply: 18200000000 + (Math.random() - 0.5) * 5000000,
            change24h: -0.8 + (Math.random() - 0.5) * 0.3
          }
        },
        timestamp: Date.now()
      })
    }, 10000)

    // Broadcast AI insights every 30 seconds
    setInterval(() => {
      const insights = [
        'Network congestion detected in DeFi protocols',
        'Unusual validator performance patterns observed',
        'Cross-chain bridge activity increasing',
        'MEV bot activity spike detected',
        'Stablecoin redemption rate normalizing'
      ]
      
      this.broadcast({
        type: 'ai_insights',
        data: {
          insight: insights[Math.floor(Math.random() * insights.length)],
          confidence: 0.7 + Math.random() * 0.3,
          riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)]
        },
        timestamp: Date.now()
      })
    }, 30000)
  }
}

// Start server if this file is run directly
if (require.main === module) {
  const server = new WebSocketServer(8080)
  console.log('WebSocket server started on port 8080')
}