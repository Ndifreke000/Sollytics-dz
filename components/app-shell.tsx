"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import { Breadcrumbs } from "@/components/breadcrumbs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Database, Search, BarChart3, Layout, Settings, Plus } from "lucide-react"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/dashboard", label: "Dashboards", icon: Layout },
    { href: "/query", label: "Query", icon: Search },
    { href: "/marketplace", label: "Marketplace", icon: BarChart3 },
    { href: "/contracts", label: "Contracts", icon: Settings }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sollytics
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <WalletConnectButton />
              <ThemeToggle />
              <Button size="sm" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>
        {children}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r bg-muted/10 flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sollytics
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Button asChild className="w-full justify-start gap-2 mb-4">
            <Link href="/query">
              <Plus className="w-4 h-4" />
              New Query
            </Link>
          </Button>
          
          {navItems.map(item => (
            <Button
              key={item.href}
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              asChild
              className="w-full justify-start gap-2"
            >
              <Link href={item.href}>
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <WalletConnectButton />
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <Link href="/" className="flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            <span className="font-bold">Sollytics</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <WalletConnectButton />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background">
          <div className="pt-16 p-4">
            <nav className="space-y-2">
              <Button asChild className="w-full justify-start gap-2 mb-4">
                <Link href="/query" onClick={() => setIsMobileMenuOpen(false)}>
                  <Plus className="w-4 h-4" />
                  New Query
                </Link>
              </Button>
              
              {navItems.map(item => (
                <Button
                  key={item.href}
                  variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
                  asChild
                  className="w-full justify-start gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-4">
          <Breadcrumbs />
        </div>
        {children}
      </main>
    </div>
  )
}