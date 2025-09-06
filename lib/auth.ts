export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  subscription: "free" | "pro" | "enterprise"
  preferences: {
    theme: "light" | "dark" | "system"
    notifications: boolean
    defaultDashboard?: string
  }
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  name: string
}

class AuthManager {
  private currentUser: User | null = null
  private listeners: ((user: User | null) => void)[] = []

  constructor() {
    // Simulate checking for existing session
    this.loadUserFromStorage()
  }

  private loadUserFromStorage() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("solana-query-tool-user")
      if (stored) {
        try {
          this.currentUser = JSON.parse(stored)
        } catch {
          localStorage.removeItem("solana-query-tool-user")
        }
      }
    }
  }

  private saveUserToStorage(user: User | null) {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("solana-query-tool-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("solana-query-tool-user")
      }
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentUser))
  }

  subscribe(listener: (user: User | null) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const { supabase } = await import('./supabase')
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) throw new Error(error.message)
    if (!data.user) throw new Error("Login failed")

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()

    const user: User = {
      id: data.user.id,
      email: data.user.email!,
      name: profile?.name || data.user.user_metadata?.name || "User",
      avatar: profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`,
      createdAt: new Date(profile?.created_at || data.user.created_at),
      subscription: profile?.subscription || "free",
      preferences: profile?.preferences || {
        theme: "system",
        notifications: true,
      },
    }

    this.currentUser = user
    this.saveUserToStorage(user)
    this.notifyListeners()
    return user
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    const { supabase } = await import('./supabase')
    
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          name: credentials.name,
        },
      },
    })

    if (error) throw new Error(error.message)
    if (!data.user) throw new Error("Signup failed")

    // Create user profile
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email: credentials.email,
        name: credentials.name,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        subscription: "free",
        preferences: {
          theme: "system",
          notifications: true,
        },
      })

    if (profileError) throw new Error(profileError.message)

    const user: User = {
      id: data.user.id,
      email: credentials.email,
      name: credentials.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
      createdAt: new Date(),
      subscription: "free",
      preferences: {
        theme: "system",
        notifications: true,
      },
    }

    this.currentUser = user
    this.saveUserToStorage(user)
    this.notifyListeners()
    return user
  }

  async logout(): Promise<void> {
    const { supabase } = await import('./supabase')
    
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)

    this.currentUser = null
    this.saveUserToStorage(null)
    this.notifyListeners()
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    if (!this.currentUser) {
      throw new Error("Not authenticated")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    this.currentUser = { ...this.currentUser, ...updates }
    this.saveUserToStorage(this.currentUser)
    this.notifyListeners()
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null
  }
}

export const authManager = new AuthManager()
