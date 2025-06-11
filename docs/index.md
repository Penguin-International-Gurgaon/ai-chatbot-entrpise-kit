---
layout: default
title: "Enterprise AI Chatbot Platform"
description: "Centralized AI access with cost controls, user management, and enterprise-grade security for teams"
---

<div class="hero">
  <h1>Enterprise AI Chatbot Platform</h1>
  <p>Empower your entire organization with centralized AI access, comprehensive cost controls, and enterprise-grade security. Give every team member access to cutting-edge AI models while maintaining complete administrative oversight.</p>
  <a href="/ai-chatbot-entrpise-kit/docs/getting-started" class="cta-button">
    <i data-lucide="rocket"></i>
    Get Started
  </a>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="cta-button" style="background: transparent; border: 2px solid var(--accent-blue); color: var(--accent-blue); margin-left: 1rem;">
    <i data-lucide="building-2"></i>
    Enterprise Solutions
  </a> 
</div>

<div class="features">
  <h2>Why Choose Our Platform?</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="shield-check"></i>
      </div>
      <h3>Centralized Control</h3>
      <p>Manage all AI model access from a single dashboard. Set user permissions, budgets, and policies across your entire organization with granular control.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="dollar-sign"></i>
      </div>
      <h3>Cost Management</h3>
      <p>Advanced token budgeting system with real-time usage tracking. Set limits per user, per model, and receive alerts before budget exhaustion.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="lock"></i>
      </div>
      <h3>Enterprise Security</h3>
      <p>Role-based access controls, audit logs, and compliance-ready features. Deploy on-premises or in your private cloud for maximum security.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="zap"></i>
      </div>
      <h3>Multi-Provider Support</h3>
      <p>Access OpenAI, Anthropic, xAI, Google, and more from a single interface. Switch between providers seamlessly based on your needs and budget.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="bar-chart-3"></i>
      </div>
      <h3>Analytics & Insights</h3>
      <p>Comprehensive usage analytics, cost tracking, and performance metrics. Make data-driven decisions about AI adoption in your organization.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <i data-lucide="play-circle"></i>
      </div>
      <h3>Easy Deployment</h3>
      <p>Deploy in minutes with Docker, or let us handle custom enterprise deployments. Full CI/CD pipeline support and infrastructure automation.</p>
    </div>
  </div>
</div>

<div class="stats">
  <div class="stats-grid">
    <div class="stat-item">
      <h3>99.9%</h3>
      <p>Uptime SLA</p>
    </div>
    <div class="stat-item">
      <h3>5 mins</h3>
      <p>Setup Time</p>
    </div>
    <div class="stat-item">
      <h3>10+</h3>
      <p>AI Providers</p>
    </div>
  </div>
</div>

<div class="enterprise">
  <h2>Enterprise Solutions</h2>
  <p>Need custom integrations, enhanced security, or dedicated support? We offer tailored enterprise solutions with custom development, maintenance, and compliance features.</p>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="cta-button">
    <i data-lucide="phone"></i>
    Contact Enterprise Team
  </a>
</div>

## Key Features

### <i data-lucide="settings" style="width: 24px; height: 24px; color: var(--accent-blue); vertical-align: middle; margin-right: 0.5rem;"></i> **Administrative Control**

- **User Management**: Add, remove, and manage user roles with granular permissions
- **Token Budgeting**: Set and monitor token limits per user and per model
- **Usage Analytics**: Real-time dashboards showing consumption patterns and costs
- **Request Management**: Approve or deny user requests for additional token budgets

### <i data-lucide="code" style="width: 24px; height: 24px; color: var(--accent-blue); vertical-align: middle; margin-right: 0.5rem;"></i> **Developer Experience**

- **Multiple AI Providers**: Built-in support for OpenAI, Anthropic, xAI, Google, and extensible to any provider
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, and Vercel AI SDK
- **Database Agnostic**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: NextAuth.js with multiple provider support

### <i data-lucide="shield" style="width: 24px; height: 24px; color: var(--accent-blue); vertical-align: middle; margin-right: 0.5rem;"></i> **Security & Compliance**

- **Role-based Access Control**: Admin, user, and custom role definitions
- **Audit Trails**: Complete logging of all user actions and API calls
- **Environment Isolation**: Separate development, staging, and production environments
- **API Key Management**: Secure storage and rotation of provider API keys

### <i data-lucide="trending-up" style="width: 24px; height: 24px; color: var(--accent-blue); vertical-align: middle; margin-right: 0.5rem;"></i> **Scalability**

- **Multi-tenant Architecture**: Support thousands of users with isolated data
- **Horizontal Scaling**: Load balancing and database sharding support
- **Caching Layer**: Intelligent caching for improved performance
- **Rate Limiting**: Protect against abuse with configurable rate limits

## Supported AI Providers

All popular models are supported directly through the Vercel AI SDK.

## Quick Start

\`\`\`bash

# Clone the repository

git clone https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit.git
cd ai-chatbot-entrpise-kit

# Install dependencies

pnpm install

# Setup environment variables

cp .env.example .env.local

# Run database migrations

pnpm db:migrate

# Create admin user

pnpm run set-admin --email admin@yourcompany.com

# Start the application

pnpm dev
\`\`\`

Visit [Getting Started Guide](/ai-chatbot-entrpise-kit/docs/getting-started) for detailed installation instructions.

---

<div style="text-align: center; padding: 2rem; background: var(--bg-accent); margin-top: 3rem; border-radius: 12px; border: 1px solid var(--border-color);">
  <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Open Source & Community Driven</h3>
  <p style="color: var(--text-secondary); margin-bottom: 2rem;">This project is sponsored by <strong>Penguin International</strong> and actively maintained by our team to contribute to the open source community.</p>
  <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit" class="cta-button">
    <i data-lucide="github"></i>
    View on GitHub
  </a>
</div>

<script>
  // Initialize Lucide icons after content loads
  document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
  });
</script>
