"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { OnboardingWizard } from "@/components/onboarding-wizard"
import { useAuth } from "@/hooks/use-auth"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleAuthSuccess = () => {
    const hasSeenOnboarding = localStorage.getItem('sollytics-onboarding-seen')
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    } else {
      router.push("/dashboard")
    }
  }

  const handleOnboardingComplete = () => {
    localStorage.setItem('sollytics-onboarding-seen', 'true')
    setShowOnboarding(false)
    router.push("/dashboard")
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {showOnboarding && <OnboardingWizard onComplete={handleOnboardingComplete} />}
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm onSuccess={handleAuthSuccess} onSwitchToSignup={() => setIsLogin(false)} />
        ) : (
          <SignupForm onSuccess={handleAuthSuccess} onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  )
}
