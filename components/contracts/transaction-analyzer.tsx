"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function TransactionAnalyzer() {
  const [txSignature, setTxSignature] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzeTx = async () => {
    if (!txSignature.trim()) return
    
    setIsAnalyzing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setAnalysis({
      signature: txSignature,
      status: "Success",
      blockTime: Date.now() - 300000,
      fee: 0.000005,
      computeUnits: 45000,
      instructions: [
        { program: "System Program", type: "Transfer", data: "2.5 SOL" },
        { program: "Token Program", type: "Transfer", data: "100 USDC" }
      ],
      accounts: [
        { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", role: "Signer", change: "-2.500005 SOL" },
        { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", role: "Recipient", change: "+2.5 SOL" }
      ]
    })
    setIsAnalyzing(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Success": return <CheckCircle className="w-4 h-4 text-emerald-500" />
      case "Failed": return <XCircle className="w-4 h-4 text-red-500" />
      default: return <AlertTriangle className="w-4 h-4 text-amber-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Transaction Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-blue-600" />
            Transaction Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter transaction signature..."
              value={txSignature}
              onChange={(e) => setTxSignature(e.target.value)}
              className="font-mono text-sm"
            />
            <Button onClick={analyzeTx} disabled={isAnalyzing || !txSignature.trim()}>
              {isAnalyzing ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Analyze"
              )}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTxSignature("5VfYmGC5m8fZw2BKmh4VZ8xH3Nq7J2K9L4P8R6T1S3M9")}
            >
              Sample Transfer
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTxSignature("2KmH4VZ8xH3Nq7J2K9L4P8R6T1S3M95VfYmGC5m8fZw2B")}
            >
              Sample Swap
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Transaction Overview</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(analysis.status)}
                    <Badge variant={analysis.status === "Success" ? "default" : "destructive"}>
                      {analysis.status}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Signature</span>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {analysis.signature.slice(0, 8)}...{analysis.signature.slice(-8)}
                      </code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Block Time</span>
                      <span className="text-sm">{new Date(analysis.blockTime).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Fee</span>
                      <span className="text-sm">{analysis.fee} SOL</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Compute Units</span>
                      <span className="text-sm">{analysis.computeUnits.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Instructions</span>
                      <span className="text-sm">{analysis.instructions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Accounts</span>
                      <span className="text-sm">{analysis.accounts.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.instructions.map((instruction: any, i: number) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{instruction.program}</Badge>
                        <span className="text-sm font-medium">{instruction.type}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{instruction.data}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Changes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.accounts.map((account: any, i: number) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm bg-background px-2 py-1 rounded">
                          {account.address.slice(0, 8)}...{account.address.slice(-8)}
                        </code>
                        <Badge variant="secondary">{account.role}</Badge>
                      </div>
                      <div className="text-sm font-medium">{account.change}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Program Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>Program 11111111111111111111111111111111 invoke [1]</div>
                  <div>Program 11111111111111111111111111111111 success</div>
                  <div>Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA invoke [1]</div>
                  <div>Program log: Instruction: Transfer</div>
                  <div>Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA consumed 4645 of 200000 compute units</div>
                  <div>Program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA success</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}