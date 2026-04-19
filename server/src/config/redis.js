import { Redis } from '@upstash/redis';
import { env } from './env.js';
import { logger } from '../utils/logger.util.js';

class RedisClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  async connect() {
    if (this.client && this.isConnected) {
      return this.client;
    }

    try {
      // Handle Upstash HTTPS URLs
      if (env.REDIS_URL.startsWith('https://')) {
        // For Upstash, use REST API
        logger.info('Using Upstash Redis (HTTPS) configuration');
        this.client = new Redis({
          url: env.REDIS_URL,
          token: env.UPSTASH_REDIS_REST_TOKEN,
          // Add retry and timeout options for Upstash
          retry: {
            retries: 3,
            factor: 2,
            minTimeout: 1000,
            maxTimeout: 5000
          },
          timeout: 10000
        });
      } else {
        // For regular Redis, use ioredis
        logger.info('Using regular Redis configuration');
        const Redis = await import('ioredis');
        this.client = new Redis.default(env.REDIS_URL, {
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            logger.info(`Redis retry attempt ${times}, delay: ${delay}ms`);
            return delay;
          },
          connectTimeout: 10000,
          enableOfflineQueue: false,
          maxRetriesPerRequest: 3,
          lazyConnect: true,
          // Add connection resilience options
          retryDelayOnFailover: 100,
          enableReadyCheck: true,
          maxLoadingTimeout: 5000,
          // Handle connection resets
          keepAlive: 30000,
          family: 4,
          // Add buffer limits
          commandTimeout: 5000
        });
      }

      // Set up event handlers for both types
      if (this.client.on) {
        this.client.on('connect', () => {
          this.isConnected = true;
          logger.info('Redis connected successfully');
        });

        this.client.on('ready', () => {
          this.isConnected = true;
          logger.info('Redis ready for commands');
        });

        this.client.on('error', (error) => {
          this.isConnected = false;
          logger.error('Redis connection error:', error);
          // Don't exit on connection errors, just log them
        });

        this.client.on('close', () => {
          this.isConnected = false;
          logger.warn('Redis connection closed');
        });

        this.client.on('reconnecting', () => {
          logger.info('Redis reconnecting...');
        });

        this.client.on('end', () => {
          this.isConnected = false;
          logger.warn('Redis connection ended');
        });
      }

      // For Upstash Redis, we don't need to connect
      if (!env.REDIS_URL.startsWith('https://')) {
        await this.client.connect();
      } else {
        // For Upstash, test connection
        try {
          await this.client.ping();
          this.isConnected = true;
          logger.info('Upstash Redis connection verified');
        } catch (pingError) {
          logger.warn('Upstash Redis ping failed:', pingError.message);
          // Still mark as connected for Upstash as it might be a temporary issue
          this.isConnected = true;
        }
      }

      this.isConnected = true;
      return this.client;
    } catch (error) {
      this.isConnected = false;
      logger.error('Failed to connect to Redis:', error.message);
      // Don't throw error, just log it and continue without Redis
      logger.warn('Continuing without Redis connection');
      return null;
    }
  }

  async disconnect() {
    if (this.client) {
      await this.client.quit();
      this.client = null;
      this.isConnected = false;
      logger.info('Redis disconnected');
    }
  }

  async ping() {
    if (!this.client || !this.isConnected) {
      throw new Error('Redis not connected');
    }
    return await this.client.ping();
  }

  getClient() {
    try {
      if (!this.client) {
        logger.warn('Redis client not initialized, attempting to connect...');
        this.connect();
        return null;
      }
      
      if (!this.isConnected) {
        logger.warn('Redis not connected, attempting reconnection...');
        // Don't block, just try to reconnect in background
        this.connect().catch(err => {
          logger.error('Background Redis reconnection failed:', err.message);
        });
      }
      
      return this.client;
    } catch (error) {
      logger.error('Error getting Redis client:', error.message);
      return null;
    }
  }

  isReady() {
    return this.isConnected && this.client;
  }
}

// Create singleton instance
export const redisClient = new RedisClient();

// Export the Redis client instance for direct use
export const redis = redisClient.getClient.bind(redisClient);

// Helper functions for common Redis operations
export const redisHelpers = {
  async get(key) {
    try {
      const client = redisClient.getClient();
      if (!client) return null;
      return await client.get(key);
    } catch (error) {
      // Don't log ECONNRESET errors as they're handled by connection manager
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis GET error for key ${key}:`, error);
      }
      return null;
    }
  },

  async set(key, value, ...args) {
    try {
      const client = redisClient.getClient();
      if (!client) return false;
      
      // Handle different Redis client APIs
      if (args.length === 1 && typeof args[0] === 'object') {
        // Upstash Redis style: set(key, value, { nx: true, ex: ttl })
        return await client.set(key, value, args[0]);
      } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'string') {
        // Regular Redis style: set(key, value, 'NX', 'EX', ttl)
        return await client.set(key, value, args[0], args[1]);
      } else if (args.length === 1 && typeof args[0] === 'number') {
        // Simple TTL: set(key, value, ttlSeconds)
        return await client.setex(key, args[0], value);
      } else {
        // Simple set
        return await client.set(key, value);
      }
    } catch (error) {
      // Don't log ECONNRESET errors as they're handled by connection manager
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis SET error for key ${key}:`, error);
      }
      return null;
    }
  },

  async del(key) {
    try {
      const client = redisClient.getClient();
      if (!client) return 0;
      return await client.del(key);
    } catch (error) {
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis DEL error for key ${key}:`, error);
      }
      return 0;
    }
  },

  async exists(key) {
    try {
      const client = redisClient.getClient();
      if (!client) return 0;
      return await client.exists(key);
    } catch (error) {
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis EXISTS error for key ${key}:`, error);
      }
      return 0;
    }
  },

  async incr(key) {
    try {
      const client = redisClient.getClient();
      if (!client) return 0;
      return await client.incr(key);
    } catch (error) {
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis INCR error for key ${key}:`, error);
      }
      return 0;
    }
  },

  async expire(key, seconds) {
    try {
      const client = redisClient.getClient();
      if (!client) return 0;
      return await client.expire(key, seconds);
    } catch (error) {
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis EXPIRE error for key ${key}:`, error);
      }
      return 0;
    }
  },

  async expireat(key, timestamp) {
    try {
      const client = redisClient.getClient();
      if (!client) return 0;
      return await client.expireat(key, timestamp);
    } catch (error) {
      if (!error.message.includes('ECONNRESET')) {
        logger.error(`Redis EXPIREAT error for key ${key}:`, error);
      }
      return 0;
    }
  },
};

export const isRedisEnabled = true;
