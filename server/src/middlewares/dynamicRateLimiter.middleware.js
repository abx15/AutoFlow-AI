import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import { redisClient } from '../config/redis.js';
import { RATE_LIMIT_TIERS } from '../config/rateLimitTiers.js';
import { cacheUtil } from '../utils/cache.util.js';
import { logger } from '../utils/logger.util.js';

/**
 * Dynamic Rate Limiter Middleware
 * Applies different limits based on organization's plan tier
 */
export const dynamicRateLimiter = async (req, res, next) => {
  const orgId = req.user?.orgId;
  
  // Default to free tier if not authenticated or no orgId
  let plan = 'free';
  
  if (orgId) {
    try {
      const org = await cacheUtil.getOrgCached(orgId);
      plan = org?.plan || 'free';
    } catch (error) {
      logger.error(`Error fetching org plan for rate limiting:`, error);
    }
  }

  const tier = RATE_LIMIT_TIERS[plan] || RATE_LIMIT_TIERS.free;
  const config = tier.api;

  // Skip if limit is -1 (unlimited)
  if (config.max === -1) {
    res.setHeader('X-RateLimit-Tier', plan);
    return next();
  }

  const client = redisClient.isReady() ? redisClient.getClient() : null;
  const useRedis = client && typeof client.call === 'function';

  const limiter = rateLimit({
    windowMs: config.windowMs,
    max: config.max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
      return orgId ? `rate_limit:${orgId}` : `rate_limit:${req.ip}`;
    },
    store: useRedis ? new RedisStore({
      sendCommand: (...args) => client.call(...args),
      prefix: 'rl:',
    }) : undefined, // Falls back to internal MemoryStore
    handler: (req, res) => {
      logger.warn(`Rate limit exceeded for org: ${orgId || req.ip}`, { plan });
      res.status(429).json({
        success: false,
        message: 'Too many requests. Please upgrade your plan for higher limits.',
        tier: plan,
        retryAfter: res.getHeader('Retry-After')
      });
    },
  });

  // Inject tier info headers after rate limit processing
  res.setHeader('X-RateLimit-Tier', plan);
  
  return limiter(req, res, next);
};

/**
 * Specialized rate limiters for specific resource types
 */
export const resourceRateLimiter = (resourceType) => {
  return async (req, res, next) => {
    const orgId = req.user?.orgId;
    let plan = 'free';
    
    if (orgId) {
      const org = await cacheUtil.getOrgCached(orgId);
      plan = org?.plan || 'free';
    }

    const tier = RATE_LIMIT_TIERS[plan] || RATE_LIMIT_TIERS.free;
    const config = tier[resourceType] || tier.api;

    if (config.max === -1) return next();

    const client = redisClient.isReady() ? redisClient.getClient() : null;
    const useRedis = client && typeof client.call === 'function';

    return rateLimit({
      windowMs: config.windowMs,
      max: config.max,
      keyGenerator: (req) => `${resourceType}_limit:${orgId || req.ip}`,
      store: useRedis ? new RedisStore({
        sendCommand: (...args) => client.call(...args),
        prefix: `rl_${resourceType}:`,
      }) : undefined,
    })(req, res, next);
  };
};
