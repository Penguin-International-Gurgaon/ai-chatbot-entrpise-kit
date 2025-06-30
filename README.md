# Enterprise AI Chatbot Platform

<div align="center">
  <img alt="Enterprise-ready AI chatbot with admin controls and token management" src="app/(chat)/demo-image.png" width="600">
  <h2>Centralized AI Access for Enterprise</h2>
  <p><strong>Built by Penguin International • Designed for Organizations</strong></p>
</div>

<p align="center">
  Provide your entire organization/team with access to advanced AI models with ease and full-control.
</p>

<p align="center">
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/"><strong>Documentation</strong></a> ·
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/docs/getting-started"><strong>Quick Start</strong></a> ·
  <a href="https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/enterprise"><strong>Enterprise</strong></a> ·
  <a href="#features"><strong>Features</strong></a>
</p>

<div align="center">

---

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Maintained by Penguin International](https://img.shields.io/badge/Maintained%20by-Penguin%20International-orange)](https://github.com/Pengdhruv)

</div>

---

## Why Choose This Platform?

This platform provides enterprises with a ready-to-deploy and extendable solution offering:

- **Centralized API Management** for all LLM providers
- **Comprehensive Cost Controls**, including token budgeting and usage tracking
- **Team Collaboration** through multi-user support and role-based access
- **Detailed Usage Analytics** for AI consumption monitoring

It is ideal for teams seeking to scale AI adoption with governance, visibility, and control.

---

## Features

### Admin Dashboard

- User and role management
- Token budget controls
- Real-time usage dashboards

### Token Management

- Assign tokens per user
- Real-time consumption monitoring
- Efficient handling of budget requests

### Security & Compliance

- Robust role-based access controls

### LLM Provider Support

- Easily extendable to any LLM provider via Vercel AI SDK

---

## Deployment

This platform can be deployed across various infrastructures:

### Supported Environments

- **Cloud Providers**: AWS, Azure, GCP
- **On-Premises**: Secure internal environments
- **Hybrid Deployments**: Combination of Cloud and On-Premises

> Contact us for tailored deployment scripts, Docker support, and CI/CD pipeline guidance.

---

## Quick Start

### Prerequisites

- Node.js (v18+)
- `pnpm` package manager
- PostgreSQL database
- API keys for chosen LLM providers

### 1. Clone and Install

```bash
git clone https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit.git
cd ai-chatbot-entrpise-kit
pnpm install
```

### 2. Environment Setup

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

### 3. Database Migrations and Seeding

```bash
pnpm db:migrate
pnpm db:seed
```

### 4. Create Admin User (initial setup only)

```bash
pnpm run set-admin --email admin@yourcompany.com --admin=True --pgurl=yourPGurl
```

### 5. Start Application

```bash
pnpm dev
```

### Or start with Docker:

```bash
./scripts/start-dev.sh
```

This will initialize all necessary application components.

Access your app at [http://localhost:3000](http://localhost:3000)

> For detailed documentation, visit [our documentation website](https://penguin-international-gurgaon.github.io/ai-chatbot-entrpise-kit/).

---

## Project Structure

```
├── app/
│   ├── (auth)/          # Authentication logic
│   ├── (chat)/          # Chat functionality
│   └── admin/           # Admin interface
├── components/
│   ├── admin/           # Admin UI components
│   ├── chat/            # Chat UI components
│   └── ui/              # Shared components
├── lib/
│   ├── ai/              # Model integrations
│   ├── db/              # ORM and database queries
│   └── middleware/      # Middleware for authentication and budgeting
└── hooks/               # Custom React hooks
```

---

## Customization & Configuration

### Adding a New LLM Provider

1. Update `lib/ai/providers.ts`
2. Add models in `lib/ai/models.tsx`
3. Reflect changes in the Admin panel

### Configuring Token Budgets

- Set global/user limits via admin
- Enable user-driven request systems
- Configure email/notification integrations

### Branding & Theming

- Modify `tailwind.config.ts`
- Replace assets in `public/`
- Adjust layouts via `app/layout.tsx`

---

## Admin Dashboard

Visit `/admin` as an administrator to manage:

### Users

- View user list
- Assign budgets and roles
- Manage user access

### Analytics

- Monitor usage across users and models
- Track costs by team and model

### Budgeting

- View live token usage
- Approve token requests
- Configure usage alerts

---

## API Reference

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

## Contributing

We welcome contributions to enhance this platform:

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Submit a pull request

### Development Guidelines

- Write type-safe code (TypeScript)
- Include unit and integration tests
- Adhere to security best practices
- Keep documentation current

---

## License

This project is licensed under the **Apache License** by Penguin International, Gurugram, India. See [LICENSE](LICENSE) for details.

Built upon the powerful [Vercel AI SDK](https://sdk.vercel.ai)—special thanks to the Vercel team for their solid foundation.

---

## Support & Community

- **GitHub Issues** – For bug reports or feature requests
- **GitHub Discussions** – General Q\&A
- **Enterprise Support** – Contact us for SLAs and onboarding assistance
- **Documentation** – Comprehensive in-code and standalone guides

---

<div align="center">
  <p><strong>Built for Enterprise • Maintained by Penguin International</strong></p>
  <p>Star us if this platform helps your team succeed with AI.</p>
</div>
