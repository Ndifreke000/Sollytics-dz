"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/auth/user-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Database } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Sollytics
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Analytics Platform</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              pathname === "/" ? "text-primary" : ""
            }`}
          >
            Features
          </Link>
          <Link
            href="/#metrics"
            className={`text-sm font-medium hover:text-primary transition-colors ${
              pathname === "/" ? "text-primary" : ""
            }`}
          >
            Live Metrics
          </Link>
          {isClient && isAuthenticated && (
            <>
              <Link
                href="/query"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/query" ? "text-primary" : ""
                }`}
              >
                Query Editor
              </Link>
              <Link
                href="/dashboard"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname.startsWith("/dashboard") ? "text-primary" : ""
                }`}
              >
                Dashboards
              </Link>
              <Link
                href="/stablecoins"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/stablecoins" ? "text-primary" : ""
                }`}
              >
                Stablecoins
              </Link>
              <Link
                href="/marketplace"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/marketplace" ? "text-primary" : ""
                }`}
              >
                Marketplace
              </Link>
              <Link
                href="/visual-query"
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  pathname === "/visual-query" ? "text-primary" : ""
                }`}
              >
                Visual Query
              </Link>
            </>
          )}
          <Link href="/docs" className={`text-sm font-medium hover:text-primary transition-colors ${
            pathname === "/docs" ? "text-primary" : ""
          }`}>
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isClient && isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
                  <Link href="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link 
              href="/#features" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#metrics" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Metrics
            </Link>
            {isClient && isAuthenticated && (
              <>
                <Link
                  href="/query"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Query Editor
                </Link>
                <Link
                  href="/dashboard"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboards
                </Link>
                <Link
                  href="/stablecoins"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Stablecoins
                </Link>
                <Link
                  href="/marketplace"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="/visual-query"
                  className="block text-sm font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Visual Query
                </Link>
              </>
            )}
            <Link 
              href="/docs" 
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <div className="pt-3 border-t">
              {isClient && isAuthenticated ? (
                <UserMenu />
              ) : (
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
