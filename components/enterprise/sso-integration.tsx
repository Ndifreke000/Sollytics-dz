"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Users, Building } from "lucide-react"

export function SSOIntegration() {
  const [ssoEnabled, setSSOEnabled] = useState(false)
  const [providers, setProviders] = useState({
    google: { enabled: false, clientId: '', clientSecret: '' },
    microsoft: { enabled: false, tenantId: '', clientId: '', clientSecret: '' },
    okta: { enabled: false, domain: '', clientId: '', clientSecret: '' }
  })

  const handleProviderToggle = (provider: string, enabled: boolean) => {
    setProviders(prev => ({
      ...prev,
      [provider]: { ...prev[provider as keyof typeof prev], enabled }
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Single Sign-On (SSO)
            <Badge variant="outline">Enterprise</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable SSO</h4>
              <p className="text-sm text-muted-foreground">Allow users to sign in with enterprise identity providers</p>
            </div>
            <Switch checked={ssoEnabled} onCheckedChange={setSSOEnabled} />
          </div>

          {ssoEnabled && (
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">G</span>
                      </div>
                      <span className="font-medium">Google Workspace</span>
                    </div>
                    <Switch 
                      checked={providers.google.enabled} 
                      onCheckedChange={(enabled) => handleProviderToggle('google', enabled)}
                    />
                  </div>
                </CardHeader>
                {providers.google.enabled && (
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Client ID</Label>
                      <Input placeholder="Google OAuth Client ID" />
                    </div>
                    <div>
                      <Label>Client Secret</Label>
                      <Input type="password" placeholder="Google OAuth Client Secret" />
                    </div>
                  </CardContent>
                )}
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">M</span>
                      </div>
                      <span className="font-medium">Microsoft Azure AD</span>
                    </div>
                    <Switch 
                      checked={providers.microsoft.enabled} 
                      onCheckedChange={(enabled) => handleProviderToggle('microsoft', enabled)}
                    />
                  </div>
                </CardHeader>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Team Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Workspace Access</div>
                  <div className="text-sm text-muted-foreground">Control who can access your workspace</div>
                </div>
              </div>
              <Badge variant="outline">5 members</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
                <Key className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Role-based Access</div>
                  <div className="text-sm text-muted-foreground">Admin, Editor, Viewer permissions</div>
                </div>
              </div>
              <Badge variant="outline">Configured</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}