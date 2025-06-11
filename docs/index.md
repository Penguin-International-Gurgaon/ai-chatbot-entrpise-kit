---
layout: default
title: "Enterprise AI Chatbot Platform"
description: "Empower your entire organization with centralized AI access, cost controls, and enterprise-grade security"
---

<style>
  :root {
    --bg-primary: #0f0f23;
    --bg-secondary: #1a1a2e;
    --bg-accent: #16213e;
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    --accent-blue: #3b82f6;
    --accent-purple: #8b5cf6;
    --accent-green: #10b981;
    --border-color: #334155;
  }
  
  body {
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }
  
  .hero {
    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-accent) 100%);
    padding: 4rem 2rem;
    text-align: center;
    border-bottom: 1px solid var(--border-color);
  }
  
  .hero h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  .cta-button {
    display: inline-block;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 0 0.5rem;
  }
  
  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  }
  
  .cta-secondary {
    background: transparent;
    border: 2px solid var(--accent-blue);
    color: var(--accent-blue);
  }
  
  .features {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .features h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--text-primary);
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  .feature-card {
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 2rem;
    transition: transform 0.2s, border-color 0.2s;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: var(--accent-blue);
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  
  .feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .feature-card p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .stats {
    background: var(--bg-accent);
    padding: 3rem 2rem;
    text-align: center;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .stat-item h3 {
    font-size: 2.5rem;
    color: var(--accent-green);
    margin-bottom: 0.5rem;
  }
  
  .stat-item p {
    color: var(--text-secondary);
    font-size: 1.1rem;
  }
  
  .enterprise {
    padding: 4rem 2rem;
    text-align: center;
    background: var(--bg-secondary);
  }
  
  .enterprise h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  .enterprise p {
    font-size: 1.2rem;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }
    .hero p {
      font-size: 1.1rem;
    }
    .cta-button {
      display: block;
      margin: 0.5rem auto;
      max-width: 200px;
    }
  }
</style>

<div class="hero">
  <h1>Enterprise AI Chatbot Platform</h1>
  <p>Empower your entire organization with centralized AI access, comprehensive cost controls, and enterprise-grade security. Give every employee access to advanced AI models while maintaining complete administrative oversight.</p>
  <a href="/ai-chatbot-entrpise-kit/docs/getting-started" class="cta-button">Get Started</a>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="cta-button cta-secondary">Enterprise Solutions</a>
</div>

<div class="features">
  <h2>Why Choose Our Platform?</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">🏢</div>
      <h3>Centralized Control</h3>
      <p>Manage all AI model access from a single dashboard. Set user permissions, budgets, and policies across your entire organization with granular control.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">💰</div>
      <h3>Cost Management</h3>
      <p>Advanced token budgeting system with real-time usage tracking. Set limits per user, per model, and receive alerts before budget exhaustion.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">🔒</div>
      <h3>Enterprise Security</h3>
      <p>Role-based access controls, audit logs, and compliance-ready features. Deploy on-premises or in your private cloud for maximum security.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h3>Multi-Provider Support</h3>
      <p>Access OpenAI, Anthropic, xAI, and more from a single interface. Switch between providers seamlessly based on your needs and budget.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">📊</div>
      <h3>Analytics & Insights</h3>
      <p>Comprehensive usage analytics, cost tracking, and performance metrics. Make data-driven decisions about AI adoption in your organization.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">🚀</div>
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
    <div class="stat-item">
      <h3>24/7</h3>
      <p>Enterprise Support</p>
    </div>
  </div>
</div>

<div class="enterprise">
  <h2>Enterprise Solutions</h2>
  <p>Need custom integrations, enhanced security, or dedicated support? We offer tailored enterprise solutions with custom development, maintenance, and compliance features.</p>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="cta-button">Contact Enterprise Team</a>
</div>

## Key Features

### 🏗️ **Administrative Control**
- **User Management**: Add, remove, and manage user roles with granular permissions
- **Token Budgeting**: Set and monitor token limits per user and per model
- **Usage Analytics**: Real-time dashboards showing consumption patterns and costs
- **Request Management**: Approve or deny user requests for additional token budgets

### 🔧 **Developer Experience**
- **Multiple AI Providers**: Built-in support for OpenAI, Anthropic, xAI, and extensible to any provider
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS, and Vercel AI SDK
- **Database Agnostic**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: NextAuth.js with multiple provider support

### 🛡️ **Security & Compliance**
- **Role-based Access Control**: Admin, user, and custom role definitions
- **Audit Trails**: Complete logging of all user actions and API calls
- **Environment Isolation**: Separate development, staging, and production environments
- **API Key Management**: Secure storage and rotation of provider API keys

### 📈 **Scalability**
- **Multi-tenant Architecture**: Support thousands of users with isolated data
- **Horizontal Scaling**: Load balancing and database sharding support
- **Caching Layer**: Intelligent caching for improved performance
- **Rate Limiting**: Protect against abuse with configurable rate limits

## Supported AI Providers

| Provider  | Models Available | Features |
|-----------|------------------|----------|
| **OpenAI** | GPT-4.1, GPT-4o, GPT-4.1-mini, o1, o3-mini | Chat, reasoning, code generation |
| **Anthropic** | Claude 3 Haiku, Claude 3.7 Sonnet | Advanced reasoning, long context |
| **xAI** | Grok 2 Image | Image generation, creative tasks |
| **Custom** | Extensible via Vercel AI SDK | Add any provider with minimal code |

## Quick Start

```bash
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
```

Visit [Getting Started Guide](/ai-chatbot-entrpise-kit/docs/getting-started) for detailed installation instructions.

---

<div style="text-align: center; padding: 2rem; background: var(--bg-accent); margin-top: 3rem; border-radius: 12px;">
  <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Ready to Transform Your AI Strategy?</h3>
  <p style="color: var(--text-secondary); margin-bottom: 2rem;">Join leading organizations who trust our platform for their AI infrastructure.</p>
  <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit" class="cta-button">View on GitHub</a>
</div>