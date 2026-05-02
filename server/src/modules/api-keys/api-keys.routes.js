import { Router } from 'express';
import { apiKeyController } from './api-keys.controller.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { requirePermission } from '../../middlewares/rbac.middleware.js';
import { validate } from '../../middlewares/validation.middleware.js';
import { createApiKeySchema, listApiKeysSchema, createUserApiKeySchema, listUserApiKeysSchema } from './api-keys.schema.js';
import { idempotencyCheck } from '../../middlewares/idempotency.middleware.js';

const router = Router();

// All routes require JWT authentication (not API key authentication)
router.use(authenticate);

// GET /api/api-keys - List API keys
router.get('/', 
  requirePermission('apikey:manage'),
  validate(listApiKeysSchema, 'query'),
  apiKeyController.listApiKeys
);

// POST /api/v1/api-keys - Generate new API key
router.post('/',
  requirePermission('apikey:manage'),
  validate(createApiKeySchema),
  idempotencyCheck,
  apiKeyController.generateApiKey
);

// GET /api/api-keys/stats - Get API key statistics
router.get('/stats',
  requirePermission('apikey:manage'),
  apiKeyController.getApiKeyStats
);

// GET /api/api-keys/:id - Get specific API key
router.get('/:id',
  requirePermission('apikey:manage'),
  apiKeyController.getApiKey
);

// DELETE /api/api-keys/:id - Revoke API key
router.delete('/:id',
  requirePermission('apikey:manage'),
  apiKeyController.revokeApiKey
);

// User-specific API key routes (no admin permissions required - users manage their own keys)
// POST /api/api-keys/user - Generate new user API key
router.post('/user',
  validate(createUserApiKeySchema),
  idempotencyCheck,
  apiKeyController.generateUserApiKey
);

// GET /api/api-keys/user - List user's API keys
router.get('/user',
  validate(listUserApiKeysSchema, 'query'),
  apiKeyController.listUserApiKeys
);

// DELETE /api/api-keys/user/:id - Revoke user API key
router.delete('/user/:id',
  apiKeyController.revokeUserApiKey
);

export { router as apiKeyRoutes };
