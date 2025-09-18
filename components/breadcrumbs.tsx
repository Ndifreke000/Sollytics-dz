"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbs = [
    { label: "Home", href: "/", icon: Home },
    ...segments.map((segment, index) => ({
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
      href: "/" + segments.slice(0, index + 1).join("/"),
      icon: null
    }))
  ]

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
          <Link
            href={crumb.href}
            className={`hover:text-foreground transition-colors ${
              index === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""
            }`}
          >
            <div className="flex items-center gap-1">
              {crumb.icon && <crumb.icon className="w-4 h-4" />}
              {crumb.label}
            </div>
          </Link>
        </div>
      ))}
    </nav>
  )
}