"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Activity, 
  Search, 
  LayoutDashboard, 
  Coins, 
  Store, 
  MousePointer, 
  Code, 
  BookOpen,
  Wallet,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { href: "/#features", label: "Features", icon: BarChart3 },
    { href: "/#metrics", label: "Live Metrics", icon: Activity },
    { href: "/query", label: "Query Editor", icon: Search },
    { href: "/dashboard", label: "Dashboards", icon: LayoutDashboard },
    { href: "/stablecoins", label: "Stablecoins", icon: Coins },
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/visual-query", label: "Visual Query", icon: MousePointer },
    { href: "/contracts", label: "Contracts", icon: Code },
    { href: "/docs", label: "Docs", icon: BookOpen }
  ]

  return (
    <aside className={`fixed left-0 top-0 h-full bg-background border-r transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <div className="font-bold text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Sollytics
                  </div>
                  <div className="text-xs text-muted-foreground">Analytics Platform</div>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href.startsWith('/dashboard') && pathname.startsWith('/dashboard'))
            
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-3'}`}
                  size="sm"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>



        {/* Profile Section */}
        {user && (
          <div className="p-2 border-t">
            {!isCollapsed ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{user.email}</div>
                    <div className="text-xs text-muted-foreground">Pro Plan</div>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full justify-start gap-3">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
                
                <Button variant="ghost" size="sm" className="w-full justify-start gap-3">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full p-2">
                  <User className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="w-full p-2">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full p-2 text-red-600 hover:text-red-700"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}