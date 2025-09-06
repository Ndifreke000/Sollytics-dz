import { supabase } from './supabase'

class Database {
  // User operations
  async createUser(userData: any) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async findUser(query: any) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .match(query)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  }

  // Dashboard operations
  async saveDashboard(dashboardData: any) {
    const { data, error } = await supabase
      .from('dashboards')
      .insert(dashboardData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async getUserDashboards(userId: string) {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  }

  // Query operations
  async saveQuery(queryData: any) {
    const { data, error } = await supabase
      .from('saved_queries')
      .insert(queryData)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Analytics data caching
  async cacheAnalyticsData(key: string, data: any, ttl: number = 300) {
    const expiresAt = new Date(Date.now() + ttl * 1000).toISOString()
    
    const { data: result, error } = await supabase
      .from('analytics_cache')
      .upsert({ key, data, expires_at: expiresAt })
      .select()
      .single()
    
    if (error) throw error
    return result
  }

  async getCachedData(key: string) {
    const { data, error } = await supabase
      .from('analytics_cache')
      .select('data')
      .eq('key', key)
      .gt('expires_at', new Date().toISOString())
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data?.data || null
  }
}

export const database = new Database()