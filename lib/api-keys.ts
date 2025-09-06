import { supabase } from './supabase'
import { randomBytes } from 'crypto'

export interface ApiKey {
  id: string
  user_id: string
  name: string
  key: string
  permissions: string[]
  rate_limit: number
  created_at: string
  last_used?: string
}

export class ApiKeyManager {
  async generateKey(userId: string, name: string, permissions: string[] = ['read']) {
    const key = `sk_${randomBytes(32).toString('hex')}`
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: userId,
        name,
        key,
        permissions,
        rate_limit: 1000
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  async validateKey(key: string) {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', key)
      .single()
    
    if (error || !data) return null
    
    // Update last used
    await supabase
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('id', data.id)
    
    return data
  }

  async getUserKeys(userId: string) {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, permissions, rate_limit, created_at, last_used')
      .eq('user_id', userId)
    
    if (error) throw error
    return data || []
  }

  async revokeKey(keyId: string, userId: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', keyId)
      .eq('user_id', userId)
    
    if (error) throw error
  }
}

export const apiKeyManager = new ApiKeyManager()