"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Vote, Clock, Users, CheckCircle, XCircle } from "lucide-react"

export function GovernanceTracker() {
  const proposals = [
    {
      id: 1,
      title: "Increase Transaction Fee to 0.001 SOL",
      description: "Proposal to adjust network transaction fees for better sustainability",
      status: "active",
      votesFor: 15420000,
      votesAgainst: 8750000,
      totalVotes: 24170000,
      quorum: 20000000,
      timeLeft: "2 days 14 hours",
      proposer: "Solana Foundation"
    },
    {
      id: 2,
      title: "Enable New Validator Rewards Program",
      description: "Implementation of enhanced rewards for high-performance validators",
      status: "passed",
      votesFor: 28900000,
      votesAgainst: 5200000,
      totalVotes: 34100000,
      quorum: 20000000,
      timeLeft: "Ended",
      proposer: "Validator DAO"
    },
    {
      id: 3,
      title: "Protocol Upgrade v1.18.5",
      description: "Critical security updates and performance improvements",
      status: "pending",
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      quorum: 20000000,
      timeLeft: "Starts in 3 days",
      proposer: "Core Team"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>
      case "passed":
        return <Badge className="bg-emerald-500">Passed</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "active":
        return <Vote className="w-5 h-5 text-blue-500" />
      default:
        return <Clock className="w-5 h-5 text-amber-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Governance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-muted-foreground">Active Proposals</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">45M</div>
            <div className="text-sm text-muted-foreground">Total Voting Power</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">68%</div>
            <div className="text-sm text-muted-foreground">Participation Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">20M</div>
            <div className="text-sm text-muted-foreground">Quorum Required</div>
          </CardContent>
        </Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="w-5 h-5 text-purple-600" />
            Governance Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {proposals.map((proposal) => (
              <div key={proposal.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(proposal.status)}
                    <div>
                      <h3 className="font-bold text-lg">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Proposed by:</span>
                        <span className="font-medium">{proposal.proposer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(proposal.status)}
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {proposal.timeLeft}
                      </div>
                    </div>
                  </div>
                </div>

                {proposal.status === "active" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Voting Progress</span>
                      <span>{((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}% of quorum</span>
                    </div>
                    <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm font-medium">For</span>
                        </div>
                        <div className="text-lg font-bold text-emerald-600">
                          {(proposal.votesFor / 1e6).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%
                        </div>
                      </div>
                      
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium">Against</span>
                        </div>
                        <div className="text-lg font-bold text-red-600">
                          {(proposal.votesAgainst / 1e6).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Vote For
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        Vote Against
                      </Button>
                      <Button size="sm" variant="ghost">
                        View Details
                      </Button>
                    </div>
                  </div>
                )}

                {proposal.status === "passed" && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800 dark:text-emerald-200">
                        Proposal Passed
                      </span>
                    </div>
                    <div className="text-sm text-emerald-700 dark:text-emerald-300">
                      {(proposal.votesFor / 1e6).toFixed(1)}M votes for ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Voting Power */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Your Voting Power
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <div className="text-2xl font-bold text-indigo-600">2,500</div>
              <div className="text-sm text-muted-foreground">Staked SOL</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2,500</div>
              <div className="text-sm text-muted-foreground">Voting Power</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8/12</div>
              <div className="text-sm text-muted-foreground">Votes Cast</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}