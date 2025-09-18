"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart3, Layout, Database, Zap } from "lucide-react"
import { useRouter } from "next/navigation"

interface Command {
  id: string
  label: string
  description: string
  icon: React.ComponentType<any>
  action: () => void
  keywords: string[]
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()

  const commands: Command[] = [
    {
      id: "new-query",
      label: "New Query",
      description: "Create a new SQL query",
      icon: Search,
      action: () => router.push("/query"),
      keywords: ["query", "sql", "new", "create"]
    },
    {
      id: "new-dashboard",
      label: "New Dashboard",
      description: "Create a new dashboard",
      icon: Layout,
      action: () => router.push("/dashboard/create"),
      keywords: ["dashboard", "new", "create", "visualization"]
    },
    {
      id: "marketplace",
      label: "Browse Templates",
      description: "Explore query and dashboard templates",
      icon: BarChart3,
      action: () => router.push("/marketplace"),
      keywords: ["templates", "marketplace", "browse", "examples"]
    },
    {
      id: "contracts",
      label: "Smart Contracts",
      description: "Analyze smart contract data",
      icon: Database,
      action: () => router.push("/contracts"),
      keywords: ["contracts", "smart", "blockchain", "solana"]
    }
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase()) ||
    cmd.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const executeCommand = (command: Command) => {
    command.action()
    setIsOpen(false)
    setQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 max-w-2xl">
        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search commands... (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 border-0 focus-visible:ring-0"
              autoFocus
            />
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No commands found for "{query}"
            </div>
          ) : (
            <div className="p-2">
              {filteredCommands.map((command, index) => (
                <Button
                  key={command.id}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto p-3 mb-1"
                  onClick={() => executeCommand(command)}
                >
                  <command.icon className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{command.label}</div>
                    <div className="text-sm text-muted-foreground">{command.description}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {index === 0 ? "Enter" : `Cmd+${index + 1}`}
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t p-3 text-xs text-muted-foreground flex items-center justify-between">
          <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
          <Badge variant="outline">Cmd+K</Badge>
        </div>
      </DialogContent>
    </Dialog>
  )
}