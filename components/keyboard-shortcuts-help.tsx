"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Keyboard, X, Command } from "lucide-react"
import { type KeyboardShortcut } from "@/hooks/use-keyboard-shortcuts"

interface KeyboardShortcutsHelpProps {
  shortcuts: KeyboardShortcut[]
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcutsHelp({ shortcuts, isOpen, onClose }: KeyboardShortcutsHelpProps) {
  if (!isOpen) return null

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, KeyboardShortcut[]>)

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const keys = []
    
    if (shortcut.ctrlKey || shortcut.metaKey) {
      keys.push(navigator.platform.includes("Mac") ? "⌘" : "Ctrl")
    }
    if (shortcut.shiftKey) keys.push("Shift")
    if (shortcut.altKey) keys.push("Alt")
    
    // Format special keys
    let keyDisplay = shortcut.key
    if (shortcut.key === "Enter") keyDisplay = "↵"
    else if (shortcut.key === " ") keyDisplay = "Space"
    else if (shortcut.key.startsWith("F")) keyDisplay = shortcut.key
    else keyDisplay = shortcut.key.toUpperCase()
    
    keys.push(keyDisplay)
    
    return keys
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              <CardTitle>Keyboard Shortcuts</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <CardDescription>
            Use these keyboard shortcuts to navigate and work more efficiently
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                {category}
                <Badge variant="secondary" className="text-xs">
                  {categoryShortcuts.length}
                </Badge>
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <span className="text-sm">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {formatShortcut(shortcut).map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
                            {key}
                          </kbd>
                          {keyIndex < formatShortcut(shortcut).length - 1 && (
                            <span className="text-muted-foreground">+</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Command className="w-4 h-4" />
              <span>Press <kbd className="px-1 py-0.5 text-xs bg-muted rounded">F1</kbd> to show this help anytime</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}