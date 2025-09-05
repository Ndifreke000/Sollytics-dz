"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit3, Eye, Save, Type, Smile } from "lucide-react"

interface DashboardTextWidgetProps {
  initialContent?: string
  title?: string
  onSave?: (content: string, title: string) => void
  isEditable?: boolean
}

const EMOJI_SHORTCUTS = {
  ":)": "😊",
  ":(": "😢",
  ":D": "😃",
  ":P": "😛",
  ";)": "😉",
  ":heart:": "❤️",
  ":fire:": "🔥",
  ":rocket:": "🚀",
  ":chart:": "📊",
  ":money:": "💰",
  ":up:": "📈",
  ":down:": "📉",
  ":warning:": "⚠️",
  ":check:": "✅",
  ":x:": "❌",
  ":info:": "ℹ️"
}

export function DashboardTextWidget({ 
  initialContent = "", 
  title = "Text Widget",
  onSave,
  isEditable = true 
}: DashboardTextWidgetProps) {
  const [content, setContent] = useState(initialContent)
  const [widgetTitle, setWidgetTitle] = useState(title)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write")

  const processEmojis = (text: string) => {
    let processed = text
    Object.entries(EMOJI_SHORTCUTS).forEach(([shortcut, emoji]) => {
      processed = processed.replace(new RegExp(shortcut.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), emoji)
    })
    return processed
  }

  const renderMarkdown = (text: string) => {
    let html = processEmojis(text)
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>')
    
    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')
    
    // Line breaks
    html = html.replace(/\n/g, '<br>')
    
    // Wrap lists
    html = html.replace(/(<li.*?<\/li>)/g, '<ul class="space-y-1">$1</ul>')
    
    return html
  }

  const handleSave = () => {
    if (onSave) {
      onSave(content, widgetTitle)
    }
    setIsEditing(false)
  }

  const insertEmoji = (emoji: string) => {
    setContent(prev => prev + emoji)
  }

  const commonEmojis = ["😊", "📊", "📈", "📉", "🚀", "💰", "⚠️", "✅", "❌", "🔥", "💡", "📝"]

  if (!isEditable && !isEditing) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{widgetTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            {isEditing ? (
              <input
                type="text"
                value={widgetTitle}
                onChange={(e) => setWidgetTitle(e.target.value)}
                className="text-base font-semibold bg-transparent border-b border-gray-300 focus:border-primary outline-none"
                placeholder="Widget title..."
              />
            ) : (
              <span className="text-base font-semibold">{widgetTitle}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} size="sm" className="gap-2">
                  <Save className="w-3 h-3" />
                  Save
                </Button>
                <Button 
                  onClick={() => setIsEditing(false)} 
                  variant="outline" 
                  size="sm"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <Edit3 className="w-3 h-3" />
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="h-[calc(100%-80px)]">
        {isEditing ? (
          <div className="h-full flex flex-col space-y-3">
            <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write" className="gap-2">
                  <Edit3 className="w-3 h-3" />
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="gap-2">
                  <Eye className="w-3 h-3" />
                  Preview
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="flex-1 flex flex-col space-y-3 mt-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">Markdown supported</Badge>
                  <div className="flex items-center gap-1">
                    <Smile className="w-3 h-3" />
                    {commonEmojis.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => insertEmoji(emoji)}
                        className="hover:bg-gray-100 p-1 rounded text-sm"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Dashboard Notes

## Key Metrics 📊
- **Revenue**: $1.2M this quarter 📈
- **Growth**: +15% MoM 🚀

## Important Links
[Analytics Dashboard](https://example.com)

## Todo
* Review Q4 performance
* Update forecasts
* Schedule team meeting

Use **bold**, *italic*, `code`, and emojis! 😊"
                  className="flex-1 resize-none font-mono text-sm"
                />
              </TabsContent>
              
              <TabsContent value="preview" className="flex-1 mt-3">
                <div className="h-full overflow-y-auto border rounded-md p-4 bg-gray-50">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-xs text-muted-foreground">
              Supports: **bold**, *italic*, `code`, # headers, [links](url), * lists, and :emoji: shortcuts
            </div>
          </div>
        ) : (
          <div 
            className="prose prose-sm max-w-none h-full overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        )}
      </CardContent>
    </Card>
  )
}