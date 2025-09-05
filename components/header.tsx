"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/auth/user-menu"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl">Sollytics</span>
          </Link>
          <Badge variant="secondary" className="ml-2">
            Live
          </Badge>
        </div>

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
          {isAuthenticated && (
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
            </>
          )}
          <Link href="#docs" className="text-sm font-medium hover:text-primary transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
