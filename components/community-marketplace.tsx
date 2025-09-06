"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Download, Eye, TrendingUp } from "lucide-react"

interface MarketplaceItem {
  id: string
  name: string
  description: string
  author: string
  category: string
  downloads: number
  rating: number
  tags: string[]
  preview?: string
}

export function CommunityMarketplace() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const items: MarketplaceItem[] = [
    {
      id: '1',
      name: 'DeFi Protocol Dashboard',
      description: 'Track lending protocols, DEX volumes, and yield farming metrics',
      author: 'defi_analyst',
      category: 'dashboard',
      downloads: 1250,
      rating: 4.8,
      tags: ['DeFi', 'Lending', 'DEX']
    },
    {
      id: '2',
      name: 'NFT Collection Tracker',
      description: 'Monitor NFT floor prices, volume, and holder distribution',
      author: 'nft_tracker',
      category: 'dashboard',
      downloads: 890,
      rating: 4.6,
      tags: ['NFT', 'Collections', 'Analytics']
    },
    {
      id: '3',
      name: 'Validator Performance Query',
      description: 'SQL query to analyze validator uptime and rewards',
      author: 'validator_pro',
      category: 'query',
      downloads: 650,
      rating: 4.9,
      tags: ['Validators', 'Performance', 'Rewards']
    }
  ]

  const categories = ['all', 'dashboard', 'query', 'widget']

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search dashboards, queries, widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {item.author}</p>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {item.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{item.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {item.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {item.rating}
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {item.downloads.toLocaleString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 gap-1"
                  onClick={() => alert(`Previewing ${item.name}`)}
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => {
                    alert(`Using ${item.name} - Added to your library!`)
                    // Simulate download increment
                    item.downloads += 1
                  }}
                >
                  <Download className="w-3 h-3" />
                  Use
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  )
}