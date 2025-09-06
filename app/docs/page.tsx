"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  BookOpen, Search, Database, BarChart3, Brain, 
  Code, Play, Save, Share, MessageCircle, Send 
} from "lucide-react"

export default function DocsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [aiQuestion, setAiQuestion] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAsking, setIsAsking] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('sollytics-onboarding-seen')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem('sollytics-onboarding-seen', 'true')
    setShowOnboarding(false)
  }

  const docs = [
    {
      id: "getting-started",
      title: "Getting Started",
      category: "Basics",
      content: `# Getting Started with Sollytics

Welcome to Sollytics, your comprehensive Solana blockchain analytics platform.

## Quick Start
1. **Sign Up**: Create your account to access all features
2. **Explore**: Browse live network metrics on the homepage
3. **Query**: Use the Query Editor to analyze blockchain data
4. **Visualize**: Create charts and graphs from your query results
5. **Dashboard**: Build custom dashboards with your saved queries

## Key Features
- Real-time Solana network monitoring
- SQL-like query interface for blockchain data
- AI-powered query assistance and optimization
- Interactive data visualizations
- Custom dashboard creation and sharing`
    },
    {
      id: "query-editor",
      title: "Query Editor",
      category: "Features",
      content: `# Query Editor Guide

The Query Editor allows you to analyze Solana blockchain data using SQL-like syntax.

## Basic Usage
SELECT * FROM transactions 
WHERE block_time > NOW() - INTERVAL '1 hour'
LIMIT 100;

## AI Assistant
- Click the **AI icon** to get query suggestions
- **Generate**: Creates new queries when editor is empty
- **Refine**: Optimizes existing queries for better performance

## Available Tables
- transactions - All network transactions
- blocks - Block information
- validators - Validator data
- performance_samples - Network performance metrics

## Keyboard Shortcuts
- Ctrl+Enter - Execute query
- Ctrl+S - Save query`
    },
    {
      id: "visualizations",
      title: "Data Visualizations",
      category: "Features", 
      content: `# Creating Visualizations

Transform your query results into interactive charts and graphs.

## Chart Types
- **Bar Chart**: Compare categories
- **Line Chart**: Show trends over time  
- **Pie Chart**: Display proportions
- **Counter**: Single metric display

## Creating Charts
1. Execute a query with results
2. Click the **Visualize** tab
3. Select chart type and columns
4. Customize colors and styling
5. Save to your library

## Multiple Visualizations
You can create multiple charts from the same query:
- Each visualization is saved separately
- Mix different chart types
- Customize each visualization independently`
    },
    {
      id: "dashboards",
      title: "Dashboard Creation",
      category: "Features",
      content: `# Building Dashboards

Create custom dashboards with your saved queries and visualizations.

## Creating a Dashboard
1. Click **Create Dashboard**
2. Enter name, description, and tags
3. Add widgets from your saved queries
4. Arrange widgets in the grid layout
5. Save and share your dashboard

## Widget Types
- **Query Results**: Display data tables
- **Visualizations**: Show charts and graphs
- **Text Widgets**: Add notes with Markdown support

## Sharing Dashboards
- Generate public links for sharing
- Export dashboards as images
- Collaborate with team members`
    }
  ]

  const filteredDocs = docs.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return
    
    setIsAsking(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const responses = [
      `To ${aiQuestion.toLowerCase()}, you can use the Query Editor with SQL-like syntax. The AI assistant can help generate and optimize your queries.`,
      `For ${aiQuestion.toLowerCase()}, I recommend starting with the dashboard creation feature. You can save your queries and visualizations, then combine them into custom dashboards.`,
      `Regarding ${aiQuestion.toLowerCase()}, Sollytics provides real-time blockchain analytics with AI-powered insights. You can create visualizations from your query results.`
    ]
    
    setAiResponse(responses[Math.floor(Math.random() * responses.length)])
    setIsAsking(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {showOnboarding && <OnboardingWizard onComplete={handleOnboardingComplete} />}

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground">
            Learn how to use Sollytics for Solana blockchain analytics and visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search docs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <Brain className="w-4 h-4 text-purple-600" />
                    Ask AI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input
                    placeholder="Ask a question..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAskAI()}
                  />
                  <Button 
                    onClick={handleAskAI} 
                    disabled={isAsking || !aiQuestion.trim()}
                    size="sm" 
                    className="w-full gap-2"
                  >
                    {isAsking ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Ask
                  </Button>
                  
                  {aiResponse && (
                    <div className="bg-purple-50 p-3 rounded-lg text-sm">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <p className="text-purple-800">{aiResponse}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-8">
                {filteredDocs.map(doc => (
                  <Card key={doc.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {doc.category === "Basics" && <BookOpen className="w-5 h-5" />}
                          {doc.category === "Features" && <BarChart3 className="w-5 h-5" />}
                          {doc.title}
                        </CardTitle>
                        <Badge variant="outline">{doc.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                          {doc.content}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </main>
    </div>
  )
}