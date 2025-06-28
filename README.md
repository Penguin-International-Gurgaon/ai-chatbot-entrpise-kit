# Enterprise AI Chatbot Platform

<div align="center">
  <img alt="Enterprise-ready AI chatbot with admin controls and token management" src="app/(chat)/demo-image.png" width="600">
  <h2>🚀 Centralized AI Access for Enterprise</h2>
  <p><strong>Built by Penguin International • Designed for Organizations</strong></p>
</div>

<p align="center">
  Give your entire organization access to advanced AI models while maintaining complete cost control and administrative oversight. Built with Next.js, featuring comprehensive token budgeting, user management, and enterprise-grade security.
</p>

<p align="center">
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/"><strong>📖 Documentation</strong></a> ·
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/docs/getting-started"><strong>🚀 Quick Start</strong></a> ·
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/enterprise"><strong>🏢 Enterprise</strong></a> ·
  <a href="#-features"><strong>✨ Features</strong></a>
</p>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Maintained by Penguin International](https://img.shields.io/badge/Maintained%20by-Penguin%20International-orange)](https://github.com/Pengdhruv)

</div>

---

## 🎯 Why This Platform?

This platform provides enterprises with a **ready-to-deploy and extend** solution that offers:

- **Centralized API Management** for all LLM providers
- **Way to Cost Controls** like token budgeting and usage tracking
- **Team Collaboration** via multi-user support and role-based access
- **Usage Analytics** for AI consumption monitoring

It is the perfect solution for teams aiming to scale AI adoption with governance, visibility, and control.

---

## ✨ Features

### Admin Dashboard

- User and role management
- Token budget controls
- Real-time usage dashboards

### Token Management

- Assign per-user
- Monitor consumption in real-time
- Handle budget requests seamlessly

### Security & Compliance

- Role-based access controls

### LLM Provider Support

- Extendable to any LLM provider via Vercel AI SDK package

---

## Deployment

This platform can be deployed on various infrastructures:

### Supported Environments

- **Cloud Providers**: AWS, Azure, GCP
- **On-Premise**: Secure, internal environments
- **Hybrid Deployments**: Cloud + On-Premise mix

> Contact us for tailored deployment scripts, Docker support, and CI/CD pipeline guidance.

---

## Quick Start

### Prerequisites

- Node.js (v18+)
- `pnpm` package manager
- PostgreSQL database
- API keys for selected LLMs

### 1. Clone and Install

```bash
git clone https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit.git
cd ai-chatbot-entrpise-kit
pnpm install
```

### 2. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
AUTH_SECRET=your-auth-secret
DATABASE_URL=postgresql://user:pass@host:port/dbname
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
ADMIN_EMAIL=admin@yourcompany.com
```

### 3. Run Migrations and Seeds

```bash
pnpm db:migrate
pnpm db:seed
```

### 4. Create Admin (required only first time)

```bash
pnpm run set-admin --email admin@yourcompany.com --admin=True --pgurl= yourPGurl
```

### 5. Start Application

```bash
pnpm dev
```

### or

Simply start with dockers by using following scripts -

```bash
./scripts/start-dev.sh
```

This will boot up all the required components for the application.

Access your app at [http://localhost:3000](http://localhost:3000)

> **📖 For detailed documentation, visit [our documentation website](https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/)**

---

## 📁 Project Structure

```
├── app/
│   ├── (auth)/          # Auth logic
│   ├── (chat)/          # Chat functionality
│   └── admin/           # Admin interface
├── components/
│   ├── admin/           # Admin UI
│   ├── chat/            # Chat UI
│   └── ui/              # Shared components
├── lib/
│   ├── ai/              # Model integrations
│   ├── db/              # ORM and queries
│   └── middleware/      # Middleware for auth/budgets
└── hooks/               # Custom React hooks
```

---

## 🔧 Customization & Configuration

### Add a New LLM Provider

1. Update `lib/ai/providers.ts`
2. Add models to `lib/ai/models.tsx`
3. Reflect changes in the Admin panel

### Configure Token Budgets

- Set global/user limits via admin
- Enable user-driven request system
- Configure email/notification hooks

### Branding & Theming

- Update `tailwind.config.ts`
- Replace assets in `public/`
- Tweak layouts via `app/layout.tsx`

---

## 📊 Admin Dashboard

Visit `/admin` as an admin to manage:

### Users

- View all users
- Assign budgets and roles
- Remove or restrict access

### Analytics

- View usage across users/models
- Track costs by team/model

### Budgeting

- Monitor live token usage
- Approve token requests
- Set alerts for thresholds

---

## 🛠️ API Reference

### Chat API

```ts
POST /api/chat
{
  "messages": [...],
  "selectedChatModel": "openai-gpt-4",
  "chatId": "uuid"
}
```

### Admin APIs

```ts
GET /api/admin/users
POST /api/admin/users/:id/budget
DELETE /api/admin/users/:id

GET /api/admin/analytics/usage
GET /api/admin/analytics/costs
```

---

## 🤝 Contributing

We encourage contributions to improve this platform:

### How to Contribute

1. Fork this repo
2. Create a feature branch
3. Implement your changes
4. Submit a pull request

### Dev Guidelines

- Type-safe code (TypeScript)
- Unit and integration tests
- Follow security best practices
- Keep documentation updated

---

## 📜 License

This project is licensed under the **Apache License** by Penguin International, Gurugram, India. See [LICENSE](LICENSE) for details.

Built upon the powerful [Vercel AI SDK](https://sdk.vercel.ai) — thanks to the Vercel team for the inspiration and solid foundation.

---

## 🌟 Support & Community

- **GitHub Issues** – For bug reports or features
- **GitHub Discussions** – For general Q\&A
- **Enterprise Support** – Reach out for SLAs and onboarding help
- **Documentation** – In-code and standalone guides

---

<div align="center">
  <p><strong>Built for Enterprise • Maintained by Penguin International</strong></p>
  <p>⭐ Star us if this helps your team succeed with AI!</p>
</div>
