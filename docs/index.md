<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enterprise AI Chatbot Platform - Open Source AI SDK Kit</title>
    <meta name="description" content="Open source AI SDK kit for centralized usage control and team management">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <main class="main-content">
        <div class="content-wrapper">
            <div class="hero">
                <h1>Open Source AI SDK Kit</h1>
                <p>Empower your team with centralized AI access and comprehensive usage controls. An open source platform that gives every team member access to major AI providers while maintaining complete administrative oversight.</p>
                <a href="docs/getting-started.html" class="cta-button">
                    <i data-lucide="rocket"></i>
                    Get Started
                </a>
                <a href="enterprise.html" class="cta-button" style="background: transparent; border: 2px solid var(--accent-green); color: var(--accent-green); margin-left: 1rem;">
                    <i data-lucide="building-2"></i>
                    Enterprise Solutions
                </a>
            </div>

            <div class="features">
                <h2>Why Choose Our Open Source Platform?</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="shield-check"></i>
                        </div>
                        <h3>Centralized Control</h3>
                        <p>Manage all AI model access from a single dashboard. Set user permissions, usage limits, and policies across your entire organization with granular control.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="users"></i>
                        </div>
                        <h3>Usage Management</h3>
                        <p>Advanced usage control system with real-time tracking. Set limits per user, per model, and receive alerts to maintain optimal usage patterns.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="code"></i>
                        </div>
                        <h3>Open Source SDK</h3>
                        <p>Built on modern technologies with full source code access. Customize, extend, and integrate with your existing systems. Community-driven development.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="zap"></i>
                        </div>
                        <h3>Multi-Provider Support</h3>
                        <p>Access all major AI providers - OpenAI, Claude, Vertex, and others from a single interface. Switch between providers seamlessly based on your needs.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="bar-chart-3"></i>
                        </div>
                        <h3>Analytics & Insights</h3>
                        <p>Comprehensive usage analytics, tracking, and performance metrics. Make data-driven decisions about AI adoption in your organization.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">
                            <i data-lucide="play-circle"></i>
                        </div>
                        <h3>Easy Deployment</h3>
                        <p>Deploy in minutes with Docker, or customize for your infrastructure. Full CI/CD pipeline support and automation tools included.</p>
                    </div>
                </div>
            </div>

            <div class="stats">
                <div class="stats-grid">
                    <div class="stat-item">
                        <h3>100%</h3>
                        <p>Open Source</p>
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
                <p>Need advanced controls, enhanced compliance, or dedicated support? We offer tailored enterprise solutions with custom development, maintenance, and professional services.</p>
                <a href="enterprise.html" class="cta-button">
                    <i data-lucide="phone"></i>
                    Contact Enterprise Team
                </a>
            </div>

            <h2>Key Features</h2>

            <h3><i data-lucide="settings" style="width: 24px; height: 24px; color: var(--accent-green); vertical-align: middle; margin-right: 0.5rem;"></i> Administrative Control</h3>
            <ul>
                <li><strong>User Management</strong>: Add, remove, and manage user roles with granular permissions</li>
                <li><strong>Usage Budgeting</strong>: Set and monitor usage limits per user and per model</li>
                <li><strong>Usage Analytics</strong>: Real-time dashboards showing consumption patterns and trends</li>
                <li><strong>Request Management</strong>: Approve or deny user requests for additional usage allowances</li>
            </ul>

            <h3><i data-lucide="code" style="width: 24px; height: 24px; color: var(--accent-green); vertical-align: middle; margin-right: 0.5rem;"></i> Developer Experience</h3>
            <ul>
                <li><strong>Multiple AI Providers</strong>: Built-in support for all major AI providers with extensible architecture</li>
                <li><strong>Modern Stack</strong>: Next.js 15, TypeScript, Tailwind CSS, and Vercel AI SDK</li>
                <li><strong>Database Agnostic</strong>: PostgreSQL with Drizzle ORM for type-safe database operations</li>
                <li><strong>Authentication</strong>: NextAuth.js with multiple provider support</li>
            </ul>

            <h3><i data-lucide="users" style="width: 24px; height: 24px; color: var(--accent-green); vertical-align: middle; margin-right: 0.5rem;"></i> Team Management</h3>
            <ul>
                <li><strong>Role-based Access Control</strong>: Admin, user, and custom role definitions</li>
                <li><strong>Usage Tracking</strong>: Complete logging of all user actions and API calls</li>
                <li><strong>Environment Support</strong>: Separate development, staging, and production environments</li>
                <li><strong>API Key Management</strong>: Secure storage and rotation of provider API keys</li>
            </ul>

            <h3><i data-lucide="trending-up" style="width: 24px; height: 24px; color: var(--accent-green); vertical-align: middle; margin-right: 0.5rem;"></i> Scalability</h3>
            <ul>
                <li><strong>Multi-tenant Architecture</strong>: Support thousands of users with isolated data</li>
                <li><strong>Horizontal Scaling</strong>: Load balancing and database sharding support</li>
                <li><strong>Caching Layer</strong>: Intelligent caching for improved performance</li>
                <li><strong>Rate Limiting</strong>: Protect against abuse with configurable rate limits</li>
            </ul>

            <h2>Supported AI Providers</h2>
            <p>All major AI providers are supported directly through the Vercel AI SDK - OpenAI, Claude, Vertex, and others.</p>

            <h2>Quick Start</h2>
            <pre><code># Clone the repository

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

pnpm dev</code></pre>

            <p>Visit <a href="docs/getting-started.html">Getting Started Guide</a> for detailed installation instructions.</p>

            <hr>

            <div style="text-align: center; padding: 2rem; background: var(--bg-accent); margin-top: 3rem; border-radius: 12px; border: 1px solid var(--border-color);">
                <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Open Source & Community Driven</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">This project is sponsored by <strong>Penguin International</strong> and actively maintained by our team to contribute to the open source community.</p>
                <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit" class="cta-button">
                    <i data-lucide="github"></i>
                    View on GitHub
                </a>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-bottom">
            <p>&copy; 2025 Sponsored by <strong>Penguin International</strong>. Open source project actively maintained for the community.</p>
        </div>
    </footer>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        function toggleMobileMenu() {
            const nav = document.getElementById('nav-menu');
            nav.classList.toggle('active');
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const nav = document.getElementById('nav-menu');
            const toggle = document.querySelector('.mobile-menu-toggle');

            if (!nav.contains(event.target) && !toggle.contains(event.target)) {
                nav.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Re-initialize icons after dynamic content loads
        document.addEventListener('DOMContentLoaded', function() {
            lucide.createIcons();
        });
    </script>

</body>
</html>
