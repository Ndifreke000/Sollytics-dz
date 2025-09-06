"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Code, Bell, Activity, AlertTriangle, CheckCircle } from "lucide-react"

export function ContractMonitoring() {
  const [newContract, setNewContract] = useState("")
  const [contracts, setContracts] = useState([
    {
      id: 1,
      address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
      name: "Token Program",
      type: "System",
      monitoring: true,
      alerts: 3,
      lastActivity: "2 min ago",
      status: "active"
    },
    {
      id: 2,
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      name: "Custom DEX",
      type: "DeFi",
      monitoring: true,
      alerts: 0,
      lastActivity: "15 min ago",
      status: "active"
    }
  ])

  const addContract = () => {
    if (!newContract.trim()) return
    
    const contract = {
      id: Date.now(),
      address: newContract,
      name: "New Contract",
      type: "Custom",
      monitoring: true,
      alerts: 0,
      lastActivity: "Just added",
      status: "active"
    }
    
    setContracts([...contracts, contract])
    setNewContract("")
  }

  const toggleMonitoring = (id: number) => {
    setContracts(contracts.map(c => 
      c.id === id ? { ...c, monitoring: !c.monitoring } : c
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-500" />
      default: return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Contract */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5 text-indigo-600" />
            Contract Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter contract address to monitor..."
              value={newContract}
              onChange={(e) => setNewContract(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={addContract}>
              Add Contract
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Monitor smart contracts for transactions, state changes, and custom events
          </div>
        </CardContent>
      </Card>

      {/* Monitored Contracts */}
      <Card>
        <CardHeader>
          <CardTitle>Monitored Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(contract.status)}
                    <div>
                      <div className="font-medium">{contract.name}</div>
                      <code className="text-sm text-muted-foreground">
                        {contract.address.slice(0, 8)}...{contract.address.slice(-8)}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{contract.type}</Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Monitor</span>
                      <Switch
                        checked={contract.monitoring}
                        onCheckedChange={() => toggleMonitoring(contract.id)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Activity</span>
                    <div className="font-medium">{contract.lastActivity}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Alerts</span>
                    <div className="flex items-center gap-1">
                      <Bell className="w-3 h-3" />
                      <span className="font-medium">{contract.alerts}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status</span>
                    <div className="font-medium capitalize">{contract.status}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            Alert Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Transaction Alerts</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Large transactions (>100 SOL)</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Failed transactions</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Unusual activity patterns</span>
                  <Switch />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">State Change Alerts</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Account balance changes</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Program upgrades</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authority changes</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { type: "warning", message: "Large transaction detected: 250 SOL", time: "5 min ago", contract: "Custom DEX" },
              { type: "info", message: "Program upgrade completed", time: "1 hour ago", contract: "Token Program" },
              { type: "error", message: "Transaction failed: Insufficient funds", time: "2 hours ago", contract: "Custom DEX" }
            ].map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'error' ? 'bg-red-500' : 
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">
                    {alert.contract} • {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}