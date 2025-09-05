import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sollytics'

class Database {
  private client: MongoClient | null = null
  private db: Db | null = null

  async connect(): Promise<Db> {
    if (this.db) return this.db

    this.client = new MongoClient(MONGODB_URI)
    await this.client.connect()
    this.db = this.client.db()
    
    return this.db
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
      this.db = null
    }
  }

  async getCollection(name: string) {
    const db = await this.connect()
    return db.collection(name)
  }

  // User operations
  async createUser(userData: any) {
    const users = await this.getCollection('users')
    return users.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async findUser(query: any) {
    const users = await this.getCollection('users')
    return users.findOne(query)
  }

  // Dashboard operations
  async saveDashboard(dashboardData: any) {
    const dashboards = await this.getCollection('dashboards')
    return dashboards.insertOne({
      ...dashboardData,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async getUserDashboards(userId: string) {
    const dashboards = await this.getCollection('dashboards')
    return dashboards.find({ userId }).toArray()
  }

  // Query operations
  async saveQuery(queryData: any) {
    const queries = await this.getCollection('saved_queries')
    return queries.insertOne({
      ...queryData,
      createdAt: new Date()
    })
  }

  // Analytics data caching
  async cacheAnalyticsData(key: string, data: any, ttl: number = 300) {
    const cache = await this.getCollection('analytics_cache')
    return cache.replaceOne(
      { key },
      { 
        key, 
        data, 
        expiresAt: new Date(Date.now() + ttl * 1000) 
      },
      { upsert: true }
    )
  }

  async getCachedData(key: string) {
    const cache = await this.getCollection('analytics_cache')
    const result = await cache.findOne({ 
      key, 
      expiresAt: { $gt: new Date() } 
    })
    return result?.data || null
  }
}

export const database = new Database()