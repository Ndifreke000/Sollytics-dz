"use client"

import { useState, useEffect, useCallback } from "react"
import { authManager, type User, type LoginCredentials, type SignupCredentials } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(authManager.getCurrentUser())
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setUser)
    return unsubscribe
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      await authManager.login(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signup = useCallback(async (credentials: SignupCredentials) => {
    setIsLoading(true)
    setError(null)

    try {
      await authManager.signup(credentials)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      await authManager.logout()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    setIsLoading(true)
    setError(null)

    try {
      await authManager.updateProfile(updates)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Profile update failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    user,
    isAuthenticated: authManager.isAuthenticated(),
    isLoading,
    error,
    login,
    signup,
    logout,
    updateProfile,
  }
}
