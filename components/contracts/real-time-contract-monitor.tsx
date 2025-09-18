"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, AlertTriangle, CheckCircle, Clock, Code } from "lucide-react"

interface ContractEvent {
  id: string
  program: string
  instruction: string
  timestamp: Date
  status: 'success' | 'failed' | 'pending'
  signature: string
}

export function RealTimeContractMonitor() {
  const [events, setEvents] = useState<ContractEvent[]>([])
  const [monitoredPrograms, setMonitoredPrograms] = useState([
    'Jupiter Exchange',
    'Raydium AMM',
    'Serum DEX',
    'Mango Markets'
  ])
  const [newProgram, setNewProgram] = useState('')

  useEffect(() => {
    // Simulate real-time contract events
    const interval = setInterval(() => {
      const programs = ['Jupiter', 'Raydium', 'Serum', 'Mango', 'Orca']
      const instructions = ['swap', 'addLiquidity', 'removeLiquidity', 'placeOrder', 'cancelOrder']
      
      const newEvent: ContractEvent = {
        id: Date.now().toString(),
        program: programs[Math.floor(Math.random() * programs.length)],
        instruction: instructions[Math.floor(Math.random() * instructions.length)],
        timestamp: new Date(),
        status: Math.random() > 0.1 ? 'success' : 'failed',
        signature: `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`
      }

      setEvents(prev => [newEvent, ...prev.slice(0, 49)]) // Keep last 50 events
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const addProgram = () => {
    if (newProgram.trim() && !monitoredPrograms.includes(newProgram)) {
      setMonitoredPrograms(prev => [...prev, newProgram])
      setNewProgram('')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Live Contract Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(event.status)}
                    <div>
                      <div className="font-medium">{event.program}</div>
                      <div className="text-sm text-muted-foreground">{event.instruction}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">{event.signature}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              Monitored Programs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newProgram}
                onChange={(e) => setNewProgram(e.target.value)}
                placeholder="Add program to monitor"
                onKeyPress={(e) => e.key === 'Enter' && addProgram()}
              />
              <Button onClick={addProgram}>Add</Button>
            </div>
            
            <div className="space-y-2">
              {monitoredPrograms.map((program, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <span className="text-sm">{program}</span>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Events</span>
                <span className="font-medium">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Success Rate</span>
                <span className="font-medium text-green-600">
                  {events.length > 0 ? Math.round((events.filter(e => e.status === 'success').length / events.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Programs</span>
                <span className="font-medium">{monitoredPrograms.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}