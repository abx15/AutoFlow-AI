# 📚 AutoFlow AI API Documentation

## Overview

AutoFlow AI provides a comprehensive RESTful API for building, managing, and executing AI-powered workflows. This API enables programmatic access to all platform features including authentication, workflow management, execution monitoring, and team collaboration.

## Base URL

```
Development: http://localhost:5000/api/v1
Production: https://api.autoflow.ai/v1
```

## Authentication

The AutoFlow AI API uses JWT (JSON Web Tokens) for authentication. You need an access token to access protected endpoints.

### Getting Access Tokens

1. **Register a new account** or **login** to get your access token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your_access_token>
   ```

### Token Types

- **Access Token**: Short-lived (15 minutes) token for API requests
- **Refresh Token**: Long-lived (7 days) token for getting new access tokens

---

## Authentication Endpoints

### Register New User

Create a new user account and organization.

```http
POST /auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "orgName": "John's Organization"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "orgId": "org-uuid"
    },
    "organization": {
      "id": "org-uuid",
      "name": "John's Organization",
      "slug": "johns-organization",
      "plan": "free",
      "tokenQuota": 100000,
      "tokenUsed": 0
    },
    "tokens": {
      "accessToken": "eyJ...",
      "refreshToken": "eyJ..."
    }
  }
}
```

### Login

Authenticate with email and password.

```http
POST /auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "orgId": "org-uuid"
    },
    "organization": {
      "id": "org-uuid",
      "name": "John's Organization",
      "slug": "johns-organization",
      "plan": "pro",
      "tokenQuota": 5000000,
      "tokenUsed": 125000
    },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "context": {
      "plan": "pro",
      "tokenQuota": 5000000,
      "tokenUsed": 125000,
      "activeWorkflows": 3,
      "apiVersion": "v1"
    }
  }
}
```

### Refresh Token

Get a new access token using a refresh token.

```http
POST /auth/refresh
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "new_eyJ...",
    "refreshToken": "new_eyJ..."
  }
}
```

### Get Current User

Get information about the currently authenticated user.

```http
GET /auth/me
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "owner",
    "orgId": "org-uuid",
    "isVerified": true,
    "isActive": true,
    "lastLoginAt": "2024-01-15T10:30:00Z",
    "createdAt": "2024-01-01T12:00:00Z",
    "org": {
      "id": "org-uuid",
      "name": "John's Organization",
      "slug": "johns-organization",
      "plan": "pro",
      "tokenQuota": 5000000,
      "tokenUsed": 125000
    }
  }
}
```

### Logout

Invalidate the current session.

```http
POST /auth/logout
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

## Workflow Endpoints

### Get Workflows

List all workflows for the authenticated user's organization.

```http
GET /workflows
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `status` (string): Filter by status (`draft`, `active`, `paused`, `archived`)
- `search` (string): Search term for workflow names

**Response (200):**
```json
{
  "success": true,
  "data": {
    "workflows": [
      {
        "id": "workflow-uuid",
        "name": "Lead Enrichment",
        "description": "Automatically enrich lead data",
        "status": "active",
        "triggerType": "webhook",
        "lastRunAt": "2024-01-15T14:30:00Z",
        "runCount": 145,
        "successCount": 138,
        "failCount": 7,
        "createdAt": "2024-01-01T12:00:00Z",
        "updatedAt": "2024-01-10T09:15:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3
    }
  }
}
```

### Create Workflow

Create a new workflow.

```http
POST /workflows
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Lead Enrichment",
  "description": "Automatically enrich lead data from website",
  "triggerType": "webhook",
  "steps": [
    {
      "id": "scrape_website",
      "tool": "scrape_webpage",
      "input": {
        "url": "{{trigger.website}}"
      }
    },
    {
      "id": "enrich_data",
      "tool": "transform_data",
      "input": {
        "data": "{{steps.scrape_website.output}}",
        "format": "json"
      }
    },
    {
      "id": "save_to_crm",
      "tool": "http_request",
      "input": {
        "url": "https://api.crm.com/leads",
        "method": "POST",
        "headers": {
          "Authorization": "Bearer {{env.CRM_API_KEY}}"
        },
        "body": "{{steps.enrich_data.output}}"
      }
    }
  ],
  "agentInstruction": "Extract company name, size, industry, and contact information from the scraped website data.",
  "variables": [
    {
      "name": "website",
      "type": "string",
      "description": "Website URL to scrape",
      "required": true
    }
  ],
  "timeoutSeconds": 300,
  "maxRetries": 3
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "workflow-uuid",
    "name": "Lead Enrichment",
    "description": "Automatically enrich lead data from website",
    "status": "draft",
    "triggerType": "webhook",
    "steps": [...],
    "agentInstruction": "Extract company information...",
    "variables": [...],
    "timeoutSeconds": 300,
    "maxRetries": 3,
    "aiModel": "claude",
    "aiConfig": {
      "temperature": 0.7,
      "maxTokens": 4000
    },
    "createdAt": "2024-01-15T15:45:00Z",
    "updatedAt": "2024-01-15T15:45:00Z"
  }
}
```

### Get Workflow

Get a specific workflow by ID.

```http
GET /workflows/:id
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "workflow-uuid",
    "name": "Lead Enrichment",
    "description": "Automatically enrich lead data from website",
    "status": "active",
    "triggerType": "webhook",
    "steps": [...],
    "createdAt": "2024-01-15T15:45:00Z",
    "updatedAt": "2024-01-15T15:45:00Z"
  }
}
```

### Update Workflow

Update an existing workflow.

```http
PUT /workflows/:id
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:** Same as create workflow

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "workflow-uuid",
    "name": "Updated Lead Enrichment",
    // ... updated fields
  }
}
```

### Delete Workflow

Delete a workflow.

```http
DELETE /workflows/:id
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Workflow deleted successfully"
  }
}
```

---

## Execution Endpoints

### Execute Workflow

Manually trigger a workflow execution.

```http
POST /workflows/:id/run
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "data": {
    "website": "https://example.com",
    "email": "contact@example.com",
    "name": "John Doe"
  }
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "execution-uuid",
    "workflowId": "workflow-uuid",
    "status": "pending",
    "triggeredBy": "user",
    "triggerData": {
      "website": "https://example.com",
      "email": "contact@example.com",
      "name": "John Doe"
    },
    "createdAt": "2024-01-15T16:00:00Z"
  }
}
```

### Get Executions

List workflow executions.

```http
GET /executions
Authorization: Bearer <access_token>
```

**Query Parameters:**
- `workflowId` (string): Filter by workflow ID
- `status` (string): Filter by status (`pending`, `running`, `success`, `failed`, `timeout`)
- `page` (number): Page number
- `limit` (number): Items per page

**Response (200):**
```json
{
  "success": true,
  "data": {
    "executions": [
      {
        "id": "execution-uuid",
        "workflowId": "workflow-uuid",
        "status": "success",
        "triggeredBy": "webhook",
        "startedAt": "2024-01-15T16:00:00Z",
        "completedAt": "2024-01-15T16:01:30Z",
        "durationMs": 90000,
        "tokensUsed": 1250,
        "output": {
          "company": "Example Corp",
          "industry": "Technology",
          "size": "50-100"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
}
```

### Get Execution Details

Get detailed information about a specific execution.

```http
GET /executions/:id
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "execution-uuid",
    "workflowId": "workflow-uuid",
    "status": "success",
    "triggeredBy": "webhook",
    "triggerData": {...},
    "startedAt": "2024-01-15T16:00:00Z",
    "completedAt": "2024-01-15T16:01:30Z",
    "durationMs": 90000,
    "tokensUsed": 1250,
    "output": {...},
    "steps": [
      {
        "id": "step-uuid",
        "stepId": "scrape_website",
        "stepName": "Scrape Website",
        "toolName": "scrape_webpage",
        "status": "success",
        "input": {...},
        "output": {...},
        "startedAt": "2024-01-15T16:00:00Z",
        "completedAt": "2024-01-15T16:00:45Z",
        "durationMs": 45000
      }
    ],
    "agentMessages": [
      {
        "id": "message-uuid",
        "role": "assistant",
        "content": "I've successfully scraped the website and extracted company information.",
        "tokensIn": 500,
        "tokensOut": 300,
        "sequence": 1,
        "createdAt": "2024-01-15T16:00:30Z"
      }
    ]
  }
}
```

---

## API Keys Endpoints

### Create API Key

Generate a new API key for programmatic access.

```http
POST /api-keys
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Production API Key",
  "permissions": ["read", "write"],
  "expiresAt": "2025-01-15T00:00:00Z"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "key-uuid",
    "name": "Production API Key",
    "key": "ak_live_xxxxxxxxxxxx",
    "keyPrefix": "ak_live",
    "permissions": ["read", "write"],
    "expiresAt": "2025-01-15T00:00:00Z",
    "isActive": true,
    "createdAt": "2024-01-15T16:30:00Z"
  }
}
```

### List API Keys

Get all API keys for the organization.

```http
GET /api-keys
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "apiKeys": [
      {
        "id": "key-uuid",
        "name": "Production API Key",
        "keyPrefix": "ak_live",
        "permissions": ["read", "write"],
        "lastUsedAt": "2024-01-15T14:20:00Z",
        "expiresAt": "2025-01-15T00:00:00Z",
        "isActive": true,
        "createdAt": "2024-01-10T10:00:00Z"
      }
    ]
  }
}
```

---

## Error Handling

The API uses standard HTTP status codes and returns detailed error information.

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  },
  "meta": {
    "requestId": "req_123456789",
    "timestamp": "2024-01-15T16:30:00Z",
    "version": "v1"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|-------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Default**: 60 requests per minute per IP
- **Authenticated**: 200 requests per minute per user
- **Premium Plans**: Higher limits based on subscription

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X-RateLimit-Reset: 60
```

---

## SDKs & Libraries

### Official SDKs

- **Node.js**: `npm install @autoflow/sdk`
- **Python**: `pip install autoflow-python`
- **JavaScript/TypeScript**: Available on npm

### Community Libraries

- **React**: `@autoflow/react`
- **Python**: `autoflow-py`

---

## Webhooks

AutoFlow AI supports webhooks for real-time event notifications:

### Supported Events

- `execution.started` - Workflow execution started
- `execution.completed` - Workflow execution completed successfully
- `execution.failed` - Workflow execution failed
- `workflow.created` - New workflow created
- `workflow.updated` - Workflow updated

### Webhook Configuration

```http
POST /webhooks
Authorization: Bearer <access_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Production Webhook",
  "url": "https://your-app.com/webhooks/autoflow",
  "events": ["execution.completed", "execution.failed"],
  "secret": "your-webhook-secret"
}
```

---

## Support

For API support and questions:

- **Documentation**: [docs.autoflow.ai](https://docs.autoflow.ai)
- **API Status**: [status.autoflow.ai](https://status.autoflow.ai)
- **Support Email**: api-support@autoflow.ai
- **GitHub Issues**: [Create Issue](https://github.com/abx15/AutoFlow-AI/issues)

---

## Changelog

### v1.0.0 (2024-01-15)
- Initial API release
- Authentication endpoints
- Workflow management
- Execution monitoring
- API key management
- Webhook support
