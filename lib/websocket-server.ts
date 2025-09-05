import { WebSocketServer } from 'ws'
import { solanaRPC } from './solana'
import { aiModel } from './ai-model'

interface WebSocketMessage {
  type: 'slotUpdate' | 'tpsUpdate' | 'aiAnalysis' | 'error'
  data: any
  timestamp: number
}

class SolanaWebSocketService {
  private wss: WebSocketServer | null = null
  private clients = new Set<any>()
  private updateInterval: NodeJS.Timeout | null = null

  initialize(port: number = 8080) {
    this.wss = new WebSocketServer({ port })
    
    this.wss.on('connection', (ws) => {
      this.clients.add(ws)
      console.log('Client connected. Total clients:', this.clients.size)
      
      ws.on('close', () => {
        this.clients.delete(ws)
        console.log('Client disconnected. Total clients:', this.clients.size)
      })
      
      ws.on('error', (error) => {
        console.error('WebSocket error:', error)
        this.clients.delete(ws)
      })
    })

    this.startDataUpdates()
  }

  private startDataUpdates() {
    // Update every 5 seconds
    this.updateInterval = setInterval(async () => {
      try {
        await this.broadcastSlotUpdate()
        await this.broadcastTpsUpdate()
        
        // AI analysis every 3 minutes
        if (Date.now() % 180000 < 5000) {
          await this.broadcastAIAnalysis()
        }
      } catch (error) {
        console.error('Update error:', error)
      }
    }, 5000)
  }

  private async broadcastSlotUpdate() {
    try {
      const slot = await solanaRPC.getSlot()
      this.broadcast({
        type: 'slotUpdate',
        data: { slot },
        timestamp: Date.now()
      })
    } catch (error) {
      this.broadcast({
        type: 'error',
        data: { message: 'Failed to fetch slot data' },
        timestamp: Date.now()
      })
    }
  }

  private async broadcastTpsUpdate() {
    try {
      const samples = await solanaRPC.getRecentPerformanceSamples(5)
      const tpsData = samples.map(s => ({
        slot: s.slot,
        tps: s.numTransactions / s.samplePeriodSecs
      }))
      
      this.broadcast({
        type: 'tpsUpdate',
        data: { tpsData },
        timestamp: Date.now()
      })
    } catch (error) {
      console.error('TPS update error:', error)
    }
  }

  private async broadcastAIAnalysis() {
    try {
      const [samples, epochInfo] = await Promise.all([
        solanaRPC.getRecentPerformanceSamples(10),
        solanaRPC.getEpochInfo()
      ])

      const analysis = await aiModel.analyzeBlockchainData({
        transactionData: {
          activeTransactions: 66090,
          avgBlockTime: 436,
          networkLoad: 82.5,
          tps: samples.map(s => s.numTransactions / s.samplePeriodSecs)
        },
        networkMetrics: {
          currentSlot: epochInfo.absoluteSlot,
          validatorCount: 1847,
          health: 'ok'
        }
      })

      this.broadcast({
        type: 'aiAnalysis',
        data: analysis,
        timestamp: Date.now()
      })
    } catch (error) {
      console.error('AI analysis broadcast error:', error)
    }
  }

  private broadcast(message: WebSocketMessage) {
    const data = JSON.stringify(message)
    
    this.clients.forEach(client => {
      if (client.readyState === 1) { // OPEN
        try {
          client.send(data)
        } catch (error) {
          console.error('Send error:', error)
          this.clients.delete(client)
        }
      }
    })
  }

  shutdown() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
    
    if (this.wss) {
      this.wss.close()
    }
    
    this.clients.clear()
  }
}

export const websocketService = new SolanaWebSocketService()