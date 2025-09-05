"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Share2, Copy, Users, Globe, Lock, Mail, Check } from "lucide-react"
import { type Dashboard } from "@/lib/dashboard"

interface DashboardSharingProps {
  dashboard: Dashboard
  onUpdateSharing: (updates: { isPublic: boolean; collaborators?: string[] }) => void
}

export function DashboardSharing({ dashboard, onUpdateSharing }: DashboardSharingProps) {
  const [shareUrl, setShareUrl] = useState(`${window.location.origin}/dashboard/${dashboard.id}/shared`)
  const [copied, setCopied] = useState(false)
  const [newCollaborator, setNewCollaborator] = useState("")
  const [collaborators, setCollaborators] = useState<Array<{ email: string; role: "viewer" | "editor" }>>([])

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTogglePublic = () => {
    onUpdateSharing({ isPublic: !dashboard.isPublic })
  }

  const handleAddCollaborator = () => {
    if (newCollaborator && !collaborators.find(c => c.email === newCollaborator)) {
      const updated = [...collaborators, { email: newCollaborator, role: "viewer" as const }]
      setCollaborators(updated)
      onUpdateSharing({ isPublic: dashboard.isPublic, collaborators: updated.map(c => c.email) })
      setNewCollaborator("")
    }
  }

  const handleRemoveCollaborator = (email: string) => {
    const updated = collaborators.filter(c => c.email !== email)
    setCollaborators(updated)
    onUpdateSharing({ isPublic: dashboard.isPublic, collaborators: updated.map(c => c.email) })
  }

  const handleRoleChange = (email: string, role: "viewer" | "editor") => {
    const updated = collaborators.map(c => c.email === email ? { ...c, role } : c)
    setCollaborators(updated)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Dashboard
          </CardTitle>
          <CardDescription>
            Control who can access and edit your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Public/Private Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {dashboard.isPublic ? (
                <Globe className="w-5 h-5 text-green-600" />
              ) : (
                <Lock className="w-5 h-5 text-gray-600" />
              )}
              <div>
                <p className="font-medium">
                  {dashboard.isPublic ? "Public Dashboard" : "Private Dashboard"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {dashboard.isPublic 
                    ? "Anyone with the link can view this dashboard"
                    : "Only you and invited collaborators can access"
                  }
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleTogglePublic}>
              {dashboard.isPublic ? "Make Private" : "Make Public"}
            </Button>
          </div>

          {/* Share URL */}
          {dashboard.isPublic && (
            <div className="space-y-2">
              <Label>Share URL</Label>
              <div className="flex gap-2">
                <Input value={shareUrl} readOnly className="font-mono text-sm" />
                <Button variant="outline" onClick={handleCopyUrl} className="gap-2">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Collaborators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Collaborators
          </CardTitle>
          <CardDescription>
            Invite people to view or edit this dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add Collaborator */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter email address"
                value={newCollaborator}
                onChange={(e) => setNewCollaborator(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddCollaborator()}
              />
            </div>
            <Button onClick={handleAddCollaborator} disabled={!newCollaborator} className="gap-2">
              <Mail className="w-4 h-4" />
              Invite
            </Button>
          </div>

          {/* Collaborator List */}
          {collaborators.length > 0 ? (
            <div className="space-y-2">
              {collaborators.map((collaborator) => (
                <div key={collaborator.email} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {collaborator.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{collaborator.email}</p>
                      <Badge variant="secondary" className="text-xs">
                        {collaborator.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={collaborator.role}
                      onValueChange={(role: "viewer" | "editor") => handleRoleChange(collaborator.email, role)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveCollaborator(collaborator.email)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No collaborators yet</p>
              <p className="text-sm">Invite people to collaborate on this dashboard</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}