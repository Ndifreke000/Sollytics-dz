"use client"

import { AppShell } from "@/components/app-shell"
import { CommandPalette } from "@/components/command-palette"
import { WalletSettings } from "@/components/admin/wallet-settings"
import { SSOIntegration } from "@/components/enterprise/sso-integration"
import { ProtectedRoute } from "@/components/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Settings, Wallet, Shield, Users, BarChart3 } from "lucide-react"

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <CommandPalette />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage platform settings, payments, and enterprise features
            </p>
          </div>

          <Tabs defaultValue="payments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payments">
              <WalletSettings />
            </TabsContent>

            <TabsContent value="security">
              <SSOIntegration />
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-muted-foreground">Total Users</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">89</div>
                      <div className="text-sm text-muted-foreground">Pro Subscribers</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-muted-foreground">Enterprise Clients</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">45,892</div>
                      <div className="text-sm text-muted-foreground">Queries Executed</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">2,341</div>
                      <div className="text-sm text-muted-foreground">Dashboards Created</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">$12,450</div>
                      <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold">98.5%</div>
                      <div className="text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </ProtectedRoute>
  )
}