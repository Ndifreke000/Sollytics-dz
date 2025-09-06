"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, BarChart3, Database, Share } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Welcome to Sollytics",
    description: "Your Solana analytics platform",
    icon: CheckCircle,
    action: "Get Started"
  },
  {
    id: 2,
    title: "Create Your First Query",
    description: "Build SQL queries to analyze blockchain data",
    icon: Database,
    action: "Try Query Builder"
  },
  {
    id: 3,
    title: "Build a Dashboard",
    description: "Visualize your data with charts and widgets",
    icon: BarChart3,
    action: "Create Dashboard"
  },
  {
    id: 4,
    title: "Share Your Work",
    description: "Make your dashboards public or collaborate",
    icon: Share,
    action: "Learn Sharing"
  }
]

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>{step.title}</CardTitle>
          <p className="text-muted-foreground">{step.description}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="flex justify-between">
            <Badge variant="outline">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Button onClick={nextStep} className="gap-2">
              {step.action}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}