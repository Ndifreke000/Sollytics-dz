#!/usr/bin/env node

const { websocketService } = require('../lib/websocket-server')
const { database } = require('../lib/database')

async function startServer() {
  try {
    console.log('🚀 Starting Sollytics Backend Services...')
    
    // Initialize database connection
    console.log('📊 Connecting to database...')
    await database.connect()
    console.log('✅ Database connected')
    
    // Start WebSocket server
    console.log('🔌 Starting WebSocket server...')
    websocketService.initialize(process.env.WS_PORT || 8080)
    console.log('✅ WebSocket server running on port', process.env.WS_PORT || 8080)
    
    console.log('🎉 All services started successfully!')
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down services...')
      websocketService.shutdown()
      await database.disconnect()
      console.log('✅ Services stopped')
      process.exit(0)
    })
    
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()