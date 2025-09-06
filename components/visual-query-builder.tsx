"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Play, Database, Filter, BarChart3 } from "lucide-react"

interface QueryBlock {
  id: string
  type: 'table' | 'filter' | 'aggregate' | 'join'
  config: any
}

export function VisualQueryBuilder() {
  const [blocks, setBlocks] = useState<QueryBlock[]>([])
  const [selectedTable, setSelectedTable] = useState('')

  const tables = ['transactions', 'blocks', 'accounts', 'tokens']
  const columns = {
    transactions: ['signature', 'slot', 'fee', 'status'],
    blocks: ['slot', 'blockhash', 'timestamp', 'transactions_count'],
    accounts: ['address', 'balance', 'owner', 'executable'],
    tokens: ['mint', 'supply', 'decimals', 'symbol']
  }

  const addBlock = (type: QueryBlock['type']) => {
    const newBlock: QueryBlock = {
      id: Date.now().toString(),
      type,
      config: {}
    }
    setBlocks([...blocks, newBlock])
  }

  const generateSQL = () => {
    if (!selectedTable) return 'SELECT * FROM table_name'
    
    let sql = `SELECT * FROM ${selectedTable}`
    
    blocks.forEach(block => {
      switch (block.type) {
        case 'filter':
          sql += ` WHERE ${block.config.column || 'column'} ${block.config.operator || '='} ${block.config.value || 'value'}`
          break
        case 'aggregate':
          sql = sql.replace('*', `${block.config.function || 'COUNT'}(${block.config.column || '*'})`)
          break
      }
    })
    
    return sql + ' LIMIT 100'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Visual Query Builder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Table Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Select Table</label>
          <Select value={selectedTable} onValueChange={setSelectedTable}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a table" />
            </SelectTrigger>
            <SelectContent>
              {tables.map(table => (
                <SelectItem key={table} value={table}>{table}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Query Blocks */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Query Operations</label>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => addBlock('filter')}>
                <Filter className="w-3 h-3 mr-1" />
                Filter
              </Button>
              <Button size="sm" variant="outline" onClick={() => addBlock('aggregate')}>
                <BarChart3 className="w-3 h-3 mr-1" />
                Aggregate
              </Button>
            </div>
          </div>

          {blocks.map(block => (
            <div key={block.id} className="flex items-center gap-2 p-3 border rounded">
              <Badge variant="secondary">{block.type}</Badge>
              <span className="text-sm text-muted-foreground">
                {block.type === 'filter' && 'WHERE condition'}
                {block.type === 'aggregate' && 'GROUP BY / COUNT'}
              </span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setBlocks(blocks.filter(b => b.id !== block.id))}
              >
                ×
              </Button>
            </div>
          ))}
        </div>

        {/* Generated SQL */}
        <div>
          <label className="text-sm font-medium mb-2 block">Generated SQL</label>
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
            {generateSQL()}
          </div>
        </div>

        {/* Execute Button */}
        <Button 
          className="w-full gap-2" 
          onClick={() => {
            const sql = generateSQL()
            console.log('Executing query:', sql)
            alert(`Query executed: ${sql}`)
          }}
        >
          <Play className="w-4 h-4" />
          Execute Query
        </Button>
      </CardContent>
    </Card>
  )
}