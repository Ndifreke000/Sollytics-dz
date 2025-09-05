"use client"

import { useEffect, useCallback } from "react"

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  metaKey?: boolean
  action: () => void
  description: string
  category: string
}

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[]
  enabled?: boolean
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return
    
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") {
      // Allow some shortcuts even in inputs (like Ctrl+Enter)
      const allowedInInputs = shortcuts.filter(s => 
        s.key === "Enter" && s.ctrlKey ||
        s.key === "s" && s.ctrlKey ||
        s.key === "z" && s.ctrlKey
      )
      
      const matchingShortcut = allowedInInputs.find(shortcut =>
        shortcut.key.toLowerCase() === event.key.toLowerCase() &&
        !!shortcut.ctrlKey === event.ctrlKey &&
        !!shortcut.shiftKey === event.shiftKey &&
        !!shortcut.altKey === event.altKey &&
        !!shortcut.metaKey === event.metaKey
      )
      
      if (matchingShortcut) {
        event.preventDefault()
        matchingShortcut.action()
      }
      return
    }
    
    const matchingShortcut = shortcuts.find(shortcut =>
      shortcut.key.toLowerCase() === event.key.toLowerCase() &&
      !!shortcut.ctrlKey === event.ctrlKey &&
      !!shortcut.shiftKey === event.shiftKey &&
      !!shortcut.altKey === event.altKey &&
      !!shortcut.metaKey === event.metaKey
    )
    
    if (matchingShortcut) {
      event.preventDefault()
      matchingShortcut.action()
    }
  }, [shortcuts, enabled])
  
  useEffect(() => {
    if (enabled) {
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown, enabled])
  
  return { shortcuts }
}

// Common shortcuts for the application
export const createCommonShortcuts = (actions: {
  onSave?: () => void
  onExecute?: () => void
  onNew?: () => void
  onSearch?: () => void
  onHelp?: () => void
  onRefresh?: () => void
  onExport?: () => void
  onUndo?: () => void
  onRedo?: () => void
}): KeyboardShortcut[] => [
  {
    key: "s",
    ctrlKey: true,
    action: actions.onSave || (() => {}),
    description: "Save current work",
    category: "General"
  },
  {
    key: "Enter",
    ctrlKey: true,
    action: actions.onExecute || (() => {}),
    description: "Execute query/action",
    category: "General"
  },
  {
    key: "n",
    ctrlKey: true,
    action: actions.onNew || (() => {}),
    description: "Create new",
    category: "General"
  },
  {
    key: "k",
    ctrlKey: true,
    action: actions.onSearch || (() => {}),
    description: "Search",
    category: "Navigation"
  },
  {
    key: "F1",
    action: actions.onHelp || (() => {}),
    description: "Show help",
    category: "Help"
  },
  {
    key: "F5",
    action: actions.onRefresh || (() => {}),
    description: "Refresh data",
    category: "General"
  },
  {
    key: "e",
    ctrlKey: true,
    shiftKey: true,
    action: actions.onExport || (() => {}),
    description: "Export data",
    category: "Data"
  },
  {
    key: "z",
    ctrlKey: true,
    action: actions.onUndo || (() => {}),
    description: "Undo",
    category: "Edit"
  },
  {
    key: "y",
    ctrlKey: true,
    action: actions.onRedo || (() => {}),
    description: "Redo",
    category: "Edit"
  }
]