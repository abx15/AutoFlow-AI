# 🚀 AutoFlow AI: The Intelligent Automation Engine

[![AutoFlow CI](https://github.com/abx15/AutoFlow-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/abx15/AutoFlow-AI/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stack: Full-Stack JavaScript](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node.js%20%7C%20Prisma-blue)](https://autoflow.ai)

**AutoFlow AI** is a production-grade, AI-native workflow automation platform. It enables organizations to build, orchestrate, and monitor autonomous agents that seamlessly connect LLMs with over 2,000+ software integrations.

---

## 🏗️ Architecture & Stack

AutoFlow AI is built for high-performance, real-time reactive processing:

- **Frontend**: [Next.js 16.2](https://nextjs.org/) (App Router), Tailwind CSS, Framer Motion, Zustand.
- **Backend**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/), Socket.IO (Real-time), BullMQ (Distributed Queues).
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/).
- **Caching**: [Redis](https://redis.io/) (Upstash/ioredis) for execution state and rate-limiting.
- **AI Integration**: Native native support for OpenAI, Anthropic, and Google Vertex AI.

---

## ⚡ Quick Start

### 1. Prerequisites
- Node.js v18+ 
- PostgreSQL & Redis instances

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/abx15/AutoFlow-AI.git
cd AutoFlow-AI

# Install all dependencies
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Environment Setup
Create a `.env` file in the `server` directory and `.env.local` in the `client` directory using the provided `.env.example` templates.

**Server (`server/.env`):**
```env
PORT=5000
DATABASE_URL="postgresql://..."
REDIS_URL="rediss://..."
JWT_SECRET="your-secret"
ADMIN_SECRET="your-admin-pass"
```

**Client (`client/.env.local`):**
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Initialization
```bash
cd server
npx prisma generate
npx prisma db push
npm run seed  # Seed demo data
```

### 5. Launch
```bash
# Terminal 1: Start Backend Engine
cd server
npm run dev

# Terminal 2: Start Dashboard
cd client
npm run dev
```

---

## 🛠️ Project Structure

```text
autoflow-ai/
├── client/              # Next.js 16 Frontend
│   ├── src/app/         # Routing & Pages (Dashboard, Auth, Marketing)
│   ├── src/components/  # UI Components (Shadcn/UI + Premium visuals)
│   └── src/lib/api/     # API Client & TanStack Hooks
├── server/              # Node.js/Express Backend
│   ├── src/modules/     # API Domains (Workflows, Executions, Team, etc.)
│   ├── src/realtime/    # Socket.IO & Event Streaming
│   ├── src/middlewares/ # Security, Rate-limiting, Tenant Isolation
│   └── prisma/          # Schema & Seed data
└── sdk/                 # Official Developer SDK (Node.js)
```

---

## 🌟 Key Features

### 📊 Performance Command Center
Real-time telemetry and execution monitoring. Track successes, failures, and token usage across your entire organization with high-fidelity charts.

### 🤖 Autonomous Agent Loops
Workflows aren't just one-way pipelines. Our engine supports autonomous reflection, where agents can recover from tool failures in real-time.

### 🛡️ Enterprise Security
- **RBAC**: Granular team permissions and roles.
- **Secure Key Management**: Provision scoped API keys with rotation policies.
- **Tenant Isolation**: Strict data partitioning at the database layer.

---

## 📄 Documentation

- **Interactive API Docs**: Once the server is running, visit `http://localhost:5000/docs`
- **Developer Guides**: [Coming Soon](https://docs.autoflow.ai)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with ⚡ by the **AutoFlow AI Engineering Team**.
