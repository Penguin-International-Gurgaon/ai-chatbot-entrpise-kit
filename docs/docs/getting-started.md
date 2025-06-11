---
layout: default
title: "Getting Started"
description: "Complete guide to setting up and deploying your Enterprise AI Chatbot Platform"
---

<div class="container">

# Getting Started

Welcome to the Enterprise AI Chatbot Platform! This guide will walk you through setting up and deploying your own instance of the platform.

<div class="info-box">
<strong>📋 Before You Begin:</strong> This guide assumes you have basic knowledge of Node.js, PostgreSQL, and command-line operations. If you need help with enterprise deployment, <a href="/ai-chatbot-entrpise-kit/enterprise">contact our enterprise team</a>.
</div>

## Prerequisites

<div class="requirements-grid">
  <div class="requirement-item">
    <div class="requirement-icon">🟢</div>
    <h3>Node.js</h3>
    <p>Version 18.x or higher</p>
    <code>node --version</code>
  </div>
  
  <div class="requirement-item">
    <div class="requirement-icon">📦</div>
    <h3>pnpm</h3>
    <p>Package manager</p>
    <code>npm install -g pnpm</code>
  </div>
  
  <div class="requirement-item">
    <div class="requirement-icon">🐘</div>
    <h3>PostgreSQL</h3>
    <p>Version 14+ recommended</p>
    <code>psql --version</code>
  </div>
  
  <div class="requirement-item">
    <div class="requirement-icon">🔑</div>
    <h3>API Keys</h3>
    <p>For AI providers</p>
    <small>OpenAI, Anthropic, etc.</small>
  </div>
</div>

## Installation

### <span class="step-number">1</span> Clone the Repository

```bash
git clone https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit.git
cd ai-chatbot-entrpise-kit
```

### <span class="step-number">2</span> Install Dependencies

```bash
pnpm install
```

<div class="info-box">
<strong>💡 Tip:</strong> If you prefer npm or yarn, you can use those instead, but pnpm is recommended for better performance and disk space efficiency.
</div>

### <span class="step-number">3</span> Environment Setup

Create your environment configuration file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Authentication
AUTH_SECRET=your-super-secret-auth-key-here
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ai_chatbot

# AI Provider API Keys
OPENAI_API_KEY=sk-your-openai-api-key-here
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key-here

# Admin Configuration
ADMIN_EMAIL=admin@yourcompany.com

# Optional: Additional Providers
XAI_API_KEY=your-xai-api-key
GOOGLE_API_KEY=your-google-api-key
```

<div class="warning-box">
<strong>⚠️ Security Note:</strong> Never commit your `.env.local` file to version control. It contains sensitive API keys and secrets.
</div>

### <span class="step-number">4</span> Database Setup

Initialize your PostgreSQL database:

```bash
# Create database (if not already created)
createdb ai_chatbot

# Run migrations to set up tables
pnpm db:migrate
```

### <span class="step-number">5</span> Create Admin User

Set up your first admin user:

```bash
pnpm run set-admin --email admin@yourcompany.com
```

<div class="success-box">
<strong>✅ Success:</strong> Your admin user has been created! You can now log in with this email address.
</div>

### <span class="step-number">6</span> Start the Application

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start
```

Visit [http://localhost:3000](http://localhost:3000) to access your application.

## Configuration

### Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `AUTH_SECRET` | Secret key for authentication | ✅ | - |
| `DATABASE_URL` | PostgreSQL connection string | ✅ | - |
| `OPENAI_API_KEY` | OpenAI API key | ✅ | - |
| `ANTHROPIC_API_KEY` | Anthropic API key | ❌ | - |
| `XAI_API_KEY` | xAI API key | ❌ | - |
| `ADMIN_EMAIL` | Default admin email | ✅ | - |
| `NEXTAUTH_URL` | Application URL | ✅ | `http://localhost:3000` |

### Database Configuration

The application uses PostgreSQL with Drizzle ORM. You can configure your database connection in several ways:

**Local PostgreSQL:**
```env
DATABASE_URL=postgresql://username:password@localhost:5432/ai_chatbot
```

**Docker PostgreSQL:**
```bash
docker run --name ai-chatbot-db -e POSTGRES_DB=ai_chatbot -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14
```

**Cloud PostgreSQL (Supabase, Neon, etc.):**
```env
DATABASE_URL=postgresql://username:password@your-host:5432/database_name?sslmode=require
```

## First Steps After Installation

### 1. Login as Admin

1. Navigate to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter the admin email you configured
3. Complete the authentication process

### 2. Configure AI Providers

1. Go to **Admin Dashboard** → **Settings**
2. Add your AI provider API keys
3. Test the connections to ensure they're working

### 3. Create Your First User

1. In the **Admin Dashboard**, go to **User Management**
2. Click **Add User**
3. Set up token budgets for the user
4. Assign appropriate roles

### 4. Set Token Budgets

1. Navigate to **Token Analytics**
2. Set default budgets for different user roles
3. Configure budget request workflows

## Production Deployment

### Docker Deployment

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/ai_chatbot
      - AUTH_SECRET=your-production-secret
      - OPENAI_API_KEY=your-openai-key
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=ai_chatbot
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Cloud Deployment Options

**Vercel (Recommended for small-medium teams):**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**AWS/Azure/GCP:**
- Use Docker containers with managed databases
- Set up load balancers for high availability
- Configure auto-scaling based on usage

**Self-hosted:**
- Use reverse proxy (nginx/Apache)
- Set up SSL certificates
- Configure monitoring and logging

## Troubleshooting

### Common Issues

**Database Connection Failed:**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

**Authentication Not Working:**
- Verify AUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

**API Keys Not Working:**
- Verify API keys are correct and active
- Check rate limits haven't been exceeded
- Ensure billing is set up for AI providers

**Build Errors:**
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Check Node.js version compatibility
- Verify all environment variables are set

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit/issues)
2. Review the [troubleshooting guide](https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit/wiki/Troubleshooting)
3. Contact [enterprise support](/ai-chatbot-entrpise-kit/enterprise) for business-critical issues

## Next Steps

<div class="success-box">
<strong>🎉 Congratulations!</strong> Your Enterprise AI Chatbot Platform is now running. Here's what to do next:
</div>

<div class="doc-navigation">
  <h3>📚 Documentation Quick Access</h3>
  <div class="doc-nav-grid">
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/providers">
        <span class="nav-icon">🔌</span>
        <strong>Add Providers</strong>
        <div class="nav-desc">Configure OpenAI, Anthropic, xAI, and more</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/customization">
        <span class="nav-icon">🎨</span>
        <strong>Customization</strong>
        <div class="nav-desc">Brand your platform with config.toml</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/enterprise">
        <span class="nav-icon">🏢</span>
        <strong>Enterprise</strong>
        <div class="nav-desc">Advanced features and support</div>
      </a>
    </div>
  </div>
</div>

<div class="quick-start-box">
  <h3>🚀 Quick Actions</h3>
  <div class="quick-start-grid">
    <div class="quick-start-item">
      <a href="http://localhost:3000/login">Login to Platform</a>
    </div>
    <div class="quick-start-item">
      <a href="http://localhost:3000/admin">Admin Dashboard</a>
    </div>
    <div class="quick-start-item">
      <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit/issues">Get Support</a>
    </div>
    <div class="quick-start-item">
      <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit">View Source</a>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <a href="/ai-chatbot-entrpise-kit/" class="nav-button">← Back to Home</a>
  <a href="/ai-chatbot-entrpise-kit/docs/providers" class="nav-button">Add Providers →</a>
</div>

</div>