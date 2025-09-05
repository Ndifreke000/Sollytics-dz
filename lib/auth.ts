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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (credentials.email === "demo@example.com" && credentials.password === "password") {
      const user: User = {
        id: "demo-user-1",
        email: credentials.email,
        name: "Demo User",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
        createdAt: new Date("2024-01-01"),
        subscription: "pro",
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

    throw new Error("Invalid email or password")
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200))

    // Mock user creation
    const user: User = {
      id: crypto.randomUUID(),
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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

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
