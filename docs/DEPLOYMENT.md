# 🚀 AutoFlow AI Deployment Guide

## Overview

This guide covers deploying AutoFlow AI to various environments, from development setups to production deployments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Development Deployment](#development-deployment)
4. [Production Deployment](#production-deployment)
5. [Docker Deployment](#docker-deployment)
6. [Cloud Deployment](#cloud-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

### System Requirements

**Minimum:**
- CPU: 2 cores
- RAM: 4GB
- Storage: 20GB SSD
- Network: 100 Mbps

**Recommended:**
- CPU: 4+ cores
- RAM: 8GB+
- Storage: 50GB+ SSD
- Network: 1 Gbps

### Software Requirements

- **Node.js**: v18.0+ (LTS recommended)
- **PostgreSQL**: v14+ 
- **Redis**: v6.0+
- **PM2**: Latest (for production process management)

### External Services

- **Database**: PostgreSQL (managed or self-hosted)
- **Cache**: Redis (managed or self-hosted)
- **Email**: SMTP server (Gmail, SendGrid, AWS SES)
- **AI Services**: OpenAI/Anthropic/Google AI API keys

---

## Environment Setup

### Environment Variables

Create `.env` files for each environment:

#### Server Environment (`.env`)
```bash
# Application
NODE_ENV=production
PORT=5000
APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://user:password@host:port/database
REDIS_URL=redis://user:password@host:port

# Authentication (Generate strong secrets)
JWT_ACCESS_SECRET=your-256-bit-access-secret-here
JWT_REFRESH_SECRET=your-256-bit-refresh-secret-here
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
ADMIN_SECRET=your-256-bit-admin-secret-here

# AI Services
ANTHROPIC_API_KEY=sk-ant-api03-...
OPENAI_API_KEY=sk-...
GOOGLE_AI_API_KEY=...

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@your-domain.com

# File Storage (Optional)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=autoflow-files

# Security
WEBHOOK_TIMEOUT=30000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=200
```

#### Client Environment (`.env.local`)
```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=AutoFlow AI
```

---

## Development Deployment

### Local Development Setup

1. **Clone Repository**
```bash
git clone https://github.com/abx15/AutoFlow-AI.git
cd AutoFlow-AI
```

2. **Install Dependencies**
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Setup Database**
```bash
cd server
npx prisma generate
npx prisma db push
npm run db:seed
```

4. **Start Development Servers**
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
cd client
npm run dev
```

### Development with Docker

```bash
# Using Docker Compose
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

---

## Production Deployment

### Build Process

1. **Build Frontend**
```bash
cd client
npm run build
```

2. **Build Backend**
```bash
cd server
npm run build
```

### Production Server Setup

#### Option 1: PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Create ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [
    {
      name: 'autoflow-server',
      script: './server/src/app.js',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
EOF

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Option 2: Systemd (Linux)

```bash
# Create service file
sudo cat > /etc/systemd/system/autoflow.service << EOF
[Unit]
Description=AutoFlow AI
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/autoflow-ai
ExecStart=/usr/bin/node server/src/app.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl enable autoflow
sudo systemctl start autoflow
```

### Web Server Configuration

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Frontend
    location / {
        root /home/ubuntu/autoflow-ai/client/.next;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket Support
    location /socket.io/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Docker Deployment

### Production Docker Compose

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: production
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - JWT_ACCESS_SECRET=${JWT_ACCESS_SECRET}
      - JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

### Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build frontend
FROM base AS frontend
COPY client/ ./client/
WORKDIR /app/client
RUN npm ci
RUN npm run build

# Build backend
FROM base AS backend
COPY server/ ./server/
COPY --from=frontend /app/client/.next ./client/.next
WORKDIR /app/server
RUN npm ci

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy built applications
COPY --from=backend /app/server ./server
COPY --from=frontend /app/client/.next ./client/.next

# Install PM2
RUN npm install -g pm2

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5000

CMD ["pm2-runtime", "start", "server/src/app.js"]
```

---

## Cloud Deployment

### AWS Deployment

#### EC2 + RDS + ElastiCache

1. **Launch EC2 Instance**
```bash
# Using AWS CLI
aws ec2 run-instances \
  --image-id ami-0abcdef123456789 \
  --instance-type t3.medium \
  --key-name your-key-pair \
  --security-group-ids sg-12345678 \
  --subnet-id subnet-12345678 \
  --user-data file://user-data.sh
```

2. **Setup RDS Database**
```bash
aws rds create-db-instance \
  --db-instance-identifier autoflow-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password your-password \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-12345678
```

3. **Setup ElastiCache Redis**
```bash
aws elasticache create-cache-cluster \
  --cache-cluster-id autoflow-redis \
  --cache-node-type cache.t3.micro \
  --engine redis \
  --num-cache-nodes 1 \
  --security-group-ids sg-12345678
```

#### AWS Elastic Beanstalk

Create `Dockerrun.aws.json`:
```json
{
  "AWSEBDockerrunVersion": "1",
  "containerDefinitions": [
    {
      "name": "autoflow",
      "image": "your-registry/autoflow:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 5000,
          "hostPort": 5000
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ]
    }
  ]
}
```

### Google Cloud Platform

#### Cloud Run

```bash
# Build and deploy
gcloud builds submit --tag gcr.io/PROJECT_ID/autoflow

# Deploy to Cloud Run
gcloud run deploy autoflow \
  --image gcr.io/PROJECT_ID/autoflow \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

### Azure Deployment

#### Container Instances

```bash
# Create resource group
az group create --name autoflow-rg --location eastus

# Deploy container
az container create \
  --resource-group autoflow-rg \
  --name autoflow \
  --image your-registry/autoflow:latest \
  --cpu 2 \
  --memory 4 \
  --ports 5000
```

---

## Monitoring & Maintenance

### Health Checks

```bash
# Application health
curl https://your-domain.com/api/v1/health

# Database health
curl https://your-domain.com/api/v1/health/db

# Redis health
curl https://your-domain.com/api/v1/health/redis
```

### Log Management

#### PM2 Logs
```bash
# View all logs
pm2 logs

# View specific app logs
pm2 logs autoflow-server

# Log rotation
pm2 install pm2-logrotate
```

#### System Logs
```bash
# Configure logrotate
sudo cat > /etc/logrotate.d/autoflow << EOF
/home/ubuntu/autoflow-ai/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 ubuntu ubuntu
    postrotate
        pm2 reloadLogs
}
EOF
```

### Backup Strategy

#### Database Backups
```bash
# Automated backups with cron
0 2 * * * /usr/bin/pg_dump autoflow_db | gzip > /backups/db_$(date +\%Y\%m\%d).sql.gz

# AWS RDS automatic backups
aws rds modify-db-instance \
  --db-instance-identifier autoflow-db \
  --backup-retention-period 7 \
  --preferred-backup-window "03:00-04:00"
```

#### File Backups
```bash
# Sync to S3
aws s3 sync /home/ubuntu/autoflow-ai/uploads s3://autoflow-backups/uploads/

# Automated backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backups/files_$DATE.tar.gz /home/ubuntu/autoflow-ai/uploads
aws s3 cp /backups/files_$DATE.tar.gz s3://autoflow-backups/
```

### Performance Monitoring

#### Application Metrics
```javascript
// Custom metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    activeConnections: io.engine.clientsCount,
    requestsPerMinute: getRequestsPerMinute()
  };
  res.json(metrics);
});
```

#### External Monitoring
- **Uptime monitoring**: UptimeRobot, Pingdom
- **APM**: New Relic, DataDog
- **Error tracking**: Sentry
- **Log aggregation**: ELK Stack, Papertrail

---

## Security Considerations

### SSL/TLS Configuration

```bash
# Let's Encrypt certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
0 12 * * * /usr/bin/certbot renew --quiet
```

### Firewall Rules

```bash
# UFW configuration
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Environment Security

```bash
# Secure file permissions
chmod 600 .env
chmod 700 logs/
chmod 755 uploads/

# Remove sensitive files from git
echo ".env" >> .gitignore
echo "logs/" >> .gitignore
echo "uploads/" >> .gitignore
```

---

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check connection
psql $DATABASE_URL

# Test from server
telnet postgres-host 5432
```

#### Redis Connection Issues
```bash
# Test Redis connection
redis-cli -u $REDIS_URL ping

# Check memory usage
redis-cli -u $REDIS_URL info memory
```

#### Memory Issues
```bash
# Monitor memory usage
free -h
top

# Node.js heap dump
kill -USR2 <pid>
```

### Performance Optimization

#### Database Optimization
```sql
-- Add indexes
CREATE INDEX CONCURRENTLY idx_workflows_org_status ON workflows(org_id, status);
CREATE INDEX CONCURRENTLY idx_executions_workflow_created ON executions(workflow_id, created_at);

-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM executions WHERE status = 'running';
```

#### Application Optimization
```javascript
// Enable compression
app.use(compression());

// Configure connection pooling
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

## Rollback Procedures

### Quick Rollback

```bash
# PM2 rollback to previous version
pm2 deploy rollback

# Git rollback
git checkout previous-tag
npm run build
pm2 restart
```

### Database Rollback

```bash
# Restore from backup
psql $DATABASE_URL < backup_20240115.sql

# Point-in-time recovery (PostgreSQL)
pg_basebackup backup_file -D recovery_directory -T
```

---

## Support

For deployment assistance:

- **Documentation**: [docs.autoflow.ai](https://docs.autoflow.ai)
- **Support**: support@autoflow.ai
- **Status Page**: [status.autoflow.ai](https://status.autoflow.ai)
- **GitHub Issues**: [Report Issue](https://github.com/abx15/AutoFlow-AI/issues)
