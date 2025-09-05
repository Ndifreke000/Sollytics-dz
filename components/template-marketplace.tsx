"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Download, Eye, Filter, TrendingUp, Users, Zap } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: string
  author: string
  rating: number
  downloads: number
  tags: string[]
  preview: string
  isPremium: boolean
  widgets: number
}

const MARKETPLACE_TEMPLATES: Template[] = [
  {
    id: "defi-analytics",
    name: "DeFi Analytics Pro",
    description: "Comprehensive DeFi protocol analysis with yield tracking, liquidity metrics, and risk assessment",
    category: "DeFi",
    author: "CryptoAnalyst",
    rating: 4.8,
    downloads: 1247,
    tags: ["yield", "liquidity", "risk", "protocols"],
    preview: "/defi-dashboard-preview.jpg",
    isPremium: true,
    widgets: 12
  },
  {
    id: "nft-tracker",
    name: "NFT Collection Tracker",
    description: "Track NFT collections, floor prices, volume, and market trends across Solana marketplaces",
    category: "NFT",
    author: "NFTExpert",
    rating: 4.6,
    downloads: 892,
    tags: ["nft", "collections", "marketplace", "trends"],
    preview: "/nft-dashboard-preview.jpg",
    isPremium: false,
    widgets: 8
  },
  {
    id: "validator-performance",
    name: "Validator Performance Suite",
    description: "Monitor validator performance, stake distribution, and network health metrics",
    category: "Validators",
    author: "ValidatorPro",
    rating: 4.9,
    downloads: 2156,
    tags: ["validators", "staking", "performance", "network"],
    preview: "/validator-dashboard-preview.jpg",
    isPremium: false,
    widgets: 15
  },
  {
    id: "trading-dashboard",
    name: "Advanced Trading Dashboard",
    description: "Real-time trading metrics, P&L tracking, and portfolio analysis for active traders",
    category: "Trading",
    author: "TraderBot",
    rating: 4.7,
    downloads: 1834,
    tags: ["trading", "portfolio", "pnl", "metrics"],
    preview: "/trading-dashboard-preview.jpg",
    isPremium: true,
    widgets: 18
  }
]

interface TemplateMarketplaceProps {
  onInstallTemplate: (templateId: string) => void
  onPreviewTemplate: (templateId: string) => void
}

export function TemplateMarketplace({ onInstallTemplate, onPreviewTemplate }: TemplateMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "recent">("popular")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)

  const categories = ["all", ...Array.from(new Set(MARKETPLACE_TEMPLATES.map(t => t.category)))]

  const filteredTemplates = MARKETPLACE_TEMPLATES
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
      const matchesPremium = !showPremiumOnly || template.isPremium
      
      return matchesSearch && matchesCategory && matchesPremium
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular": return b.downloads - a.downloads
        case "rating": return b.rating - a.rating
        case "recent": return b.id.localeCompare(a.id) // Simulate recent by ID
        default: return 0
      }
    })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant={showPremiumOnly ? "default" : "outline"}
          onClick={() => setShowPremiumOnly(!showPremiumOnly)}
          className="gap-2"
        >
          <Zap className="w-4 h-4" />
          Premium
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="group hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {template.name}
                    {template.isPremium && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        <Zap className="w-3 h-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-1 line-clamp-2">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  {renderStars(template.rating)}
                  <span className="ml-1">{template.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {template.downloads.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {template.widgets} widgets
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  by {template.author}
                </div>
                <Badge variant="secondary">{template.category}</Badge>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPreviewTemplate(template.id)}
                  className="flex-1 gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  onClick={() => onInstallTemplate(template.id)}
                  className="flex-1 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse different categories
          </p>
        </div>
      )}
    </div>
  )
}