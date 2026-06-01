const redis = require('redis')

class RedisCacheManager {
  constructor(url = 'redis://localhost:6379') {
    this.client = redis.createClient({ url })
    this.client.connect().catch(console.error)
  }

  async get(key) {
    return await this.client.get(key)
  }

  async set(key, value, ttlSeconds = 300) {
    await this.client.set(key, value, { EX: ttlSeconds })
  }
}

module.exports = RedisCacheManager
