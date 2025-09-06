import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://yxpbcuoyahjdharayzgs.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cGJjdW95YWhqZGhhcmF5emdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Njc2NzIsImV4cCI6MjA3MTU0MzY3Mn0.sH4CrEtGEnfO1ns9k6Ppt24kRG398HHznVgkX9EGlQs'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar?: string
          subscription: 'free' | 'pro' | 'enterprise'
          preferences: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar?: string
          subscription?: 'free' | 'pro' | 'enterprise'
          preferences?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar?: string
          subscription?: 'free' | 'pro' | 'enterprise'
          preferences?: any
          updated_at?: string
        }
      }
      dashboards: {
        Row: {
          id: string
          user_id: string
          name: string
          description?: string
          widgets: any
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string
          widgets?: any
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string
          widgets?: any
          is_public?: boolean
          updated_at?: string
        }
      }
      saved_queries: {
        Row: {
          id: string
          user_id: string
          name: string
          query: string
          visualizations: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          query: string
          visualizations?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          query?: string
          visualizations?: any
        }
      }
      analytics_cache: {
        Row: {
          id: string
          key: string
          data: any
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          key: string
          data: any
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          key?: string
          data?: any
          expires_at?: string
        }
      }
    }
  }
}