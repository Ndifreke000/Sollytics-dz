const { database } = require('../../lib/database')

describe('Database Operations', () => {
  test('should cache and retrieve data', async () => {
    const testKey = 'test-key'
    const testData = { value: 123 }
    
    await database.cacheAnalyticsData(testKey, testData, 60)
    const retrieved = await database.getCachedData(testKey)
    
    expect(retrieved).toEqual(testData)
  })
  
  test('should return null for expired cache', async () => {
    const testKey = 'expired-key'
    const testData = { value: 456 }
    
    await database.cacheAnalyticsData(testKey, testData, -1) // Expired
    const retrieved = await database.getCachedData(testKey)
    
    expect(retrieved).toBeNull()
  })
})