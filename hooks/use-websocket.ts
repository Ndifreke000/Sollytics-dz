"use client"

import { useState, useEffect, useRef, useCallback } from "react"

export interface WebSocketMessage {
  type: string
  data: any
  timestamp: number
}

export interface WebSocketState {
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  lastMessage: WebSocketMessage | null
}

export function useWebSocket(url: string, options: { 
  reconnectInterval?: number
  maxReconnectAttempts?: number
} = {}) {
  const { reconnectInterval = 3000, maxReconnectAttempts = 5 } = options
  
  const [state, setState] = useState<WebSocketState>({
    isConnected: false,
    isConnecting: false,
    error: null,
    lastMessage: null
  })
  
  const ws = useRef<WebSocket | null>(null)
  const reconnectAttempts = useRef(0)
  const reconnectTimeout = useRef<NodeJS.Timeout>()
  
  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return
    
    setState(prev => ({ ...prev, isConnecting: true, error: null }))
    
    try {
      ws.current = new WebSocket(url)
      
      ws.current.onopen = () => {
        setState(prev => ({ ...prev, isConnected: true, isConnecting: false, error: null }))
        reconnectAttempts.current = 0
      }
      
      ws.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          setState(prev => ({ ...prev, lastMessage: message }))
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error)
        }
      }
      
      ws.current.onclose = () => {
        setState(prev => ({ ...prev, isConnected: false, isConnecting: false }))
        
        if (reconnectAttempts.current < maxReconnectAttempts) {
          reconnectAttempts.current++
          reconnectTimeout.current = setTimeout(connect, reconnectInterval)
        }
      }
      
      ws.current.onerror = () => {
        setState(prev => ({ ...prev, error: "WebSocket connection failed", isConnecting: false }))
      }
    } catch (error) {
      setState(prev => ({ ...prev, error: "Failed to create WebSocket connection", isConnecting: false }))
    }
  }, [url, reconnectInterval, maxReconnectAttempts])
  
  const disconnect = useCallback(() => {
    if (reconnectTimeout.current) {
      clearTimeout(reconnectTimeout.current)
    }
    if (ws.current) {
      ws.current.close()
      ws.current = null
    }
    setState(prev => ({ ...prev, isConnected: false, isConnecting: false }))
  }, [])
  
  const sendMessage = useCallback((message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message))
    }
  }, [])
  
  useEffect(() => {
    connect()
    return disconnect
  }, [connect, disconnect])
  
  return { ...state, connect, disconnect, sendMessage }
}