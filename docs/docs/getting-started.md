<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Getting Started - Enterprise AI Chatbot Platform</title>
    <meta name="description" content="Complete guide to setting up and deploying your Enterprise AI Chatbot Platform">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide  rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <link rel="stylesheet" href="../assets/css/docs.css">
</head>
<body>
    <header class="header">
        <div class="header-content">
            <a href="../index.html" class="logo">
                <i data-lucide="bot" class="logo-icon"></i>
                Enterprise AI Chatbot
            </a>
            
            <nav class="nav" id="nav-menu">
                <a href="../index.html">
                    <i data-lucide="home"></i>
                    Home
                </a>
                <a href="getting-started.html" class="active">
                    <i data-lucide="book-open"></i>
                    Documentation
                </a>
                <a href="../enterprise.html">
                    <i data-lucide="building-2"></i>
                    Enterprise
                </a>
                <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit" class="github-link" target="_blank">
                    <i data-lucide="github"></i>
                    GitHub
                </a>
            </nav>
            
            <button class="mobile-menu-toggle" onclick="toggleMobileMenu()">
                <i data-lucide="menu"></i>
            </button>
        </div>
    </header>

    <main class="main-content">
        <div class="container">
            <div class="docs-layout">
                <aside class="docs-sidebar">
                    <nav class="docs-nav">
                        <a href="getting-started.html" class="active">
                            <i data-lucide="rocket"></i>
                            Getting Started
                        </a>
                        <a href="docker.html">
                            <i data-lucide="container"></i>
                            Docker Deployment
                        </a>
                        <a href="providers.html">
                            <i data-lucide="plug"></i>
                            AI Providers
                        </a>
                        <a href="customization.html">
                            <i data-lucide="palette"></i>
                            Customization
                        </a>
                        <a href="scripts.html">
                            <i data-lucide="terminal"></i>
                            Scripts & Tools
                        </a>
                    </nav>
                </aside>

                <div class="docs-content">
                    <h1>Getting Started</h1>
                    <p class="lead">Welcome to the Enterprise AI Chatbot Platform! This guide will walk you through setting up and deploying your own instance of the platform.</p>

                    <div class="info-box">
                        <i data-lucide="info"></i>
                        <div>
                            <strong>Before You Begin:</strong> This guide assumes you have basic knowledge of Node.js, PostgreSQL, and command-line operations. If you need help with enterprise deployment, <a href="../enterprise.html">contact our enterprise team</a>.
                        </div>
                    </div>

                    <h2>Prerequisites</h2>

                    <div class="requirements-grid">
                        <div class="requirement-item">
                            <div class="requirement-icon">
                                <i data-lucide="server"></i>
                            </div>
                            <h3>Node.js</h3>
                            <p>Version 18.x or higher</p>
                            <code>node --version</code>
                        </div>

                        <div class="requirement-item">
                            <div class="requirement-icon">
                                <i data-lucide="package"></i>
                            </div>
                            <h3>pnpm</h3>
                            <p>Package manager</p>
                            <code>npm install -g pnpm</code>
                        </div>

                        <div class="requirement-item">
                            <div class="requirement-icon">
                                <i data-lucide="database"></i>
                            </div>
                            <h3>PostgreSQL</h3>
                            <p>Version 14+ recommended</p>
                            <code>psql --version</code>
                        </div>

                        <div class="requirement-item">
                            <div class="requirement-icon">
                                <i data-lucide="key"></i>
                            </div>
                            <h3>API Keys</h3>
                            <p>For AI providers</p>
                            <small>OpenAI, Claude, Vertex, and others</small>
                        </div>
                    </div>

                    <h2>Installation</h2>

                    <h3><span class="step-number">1</span> Clone the Repository</h3>
                    <pre><code>git clone https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit.git

cd ai-chatbot-entrpise-kit</code></pre>

                    <h3><span class="step-number">2</span> Install Dependencies</h3>
                    <pre><code>pnpm install</code></pre>

                    <div class="info-box">
                        <i data-lucide="info"></i>
                        <div>
                            <strong>Tip:</strong> If you prefer npm or yarn, you can use those instead, but pnpm is recommended for better performance and disk space efficiency.
                        </div>
                    </div>

                    <h3><span class="step-number">3</span> Environment Setup</h3>
                    <p>Create your environment configuration file:</p>
                    <pre><code>cp .env.example .env.local</code></pre>

                    <p>Edit <code>.env.local</code> with your configuration:</p>
                    <pre><code># Authentication

AUTH_SECRET=your-super-secret-auth-key-here
NEXTAUTH_URL=http://localhost:3000

# Database

DATABASE_URL=postgresql://username:password@localhost:5432/ai_chatbot

# AI Provider API Keys

OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here

# Optional: Additional Providers

GOOGLE_API_KEY=your-google-api-key
VERTEX_API_KEY=your-vertex-api-key</code></pre>

                    <div class="warning-box">
                        <i data-lucide="alert-triangle"></i>
                        <div>
                            <strong>Security Note:</strong> Never commit your <code>.env.local</code> file to version control. It contains sensitive API keys and secrets.
                        </div>
                    </div>

                    <h3><span class="step-number">4</span> Database Setup</h3>
                    <p>Initialize your PostgreSQL database:</p>
                    <pre><code># Create database (if not already created)

createdb ai_chatbot

# Run migrations to set up tables

pnpm db:migrate</code></pre>

                    <h3><span class="step-number">5</span> Create Admin User</h3>
                    <p>Set up your first admin user:</p>
                    <pre><code>pnpm run set-admin --email admin@yourcompany.com</code></pre>

                    <div class="success-box">
                        <i data-lucide="check-circle"></i>
                        <div>
                            <strong>Success:</strong> Your admin user has been created! You can now log in with this email address.
                        </div>
                    </div>

                    <h3><span class="step-number">6</span> Start the Application</h3>
                    <pre><code># Development mode

pnpm dev

# Production mode

pnpm build
pnpm start</code></pre>

                    <p>Visit <a href="http://localhost:3000">http://localhost:3000</a> to access your application.</p>

                    <h2>Configuration</h2>

                    <h3>Environment Variables Reference</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Description</th>
                                <th>Required</th>
                                <th>Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>AUTH_SECRET</code></td>
                                <td>Secret key for authentication</td>
                                <td><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><code>DATABASE_URL</code></td>
                                <td>PostgreSQL connection string</td>
                                <td><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><code>OPENAI_API_KEY</code></td>
                                <td>OpenAI API key</td>
                                <td><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><code>ANTHROPIC_API_KEY</code></td>
                                <td>Anthropic API key</td>
                                <td><i data-lucide="x" style="color: var(--text-muted); width: 16px; height: 16px;"></i></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><code>ADMIN_EMAIL</code></td>
                                <td>Default admin email</td>
                                <td><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td><code>NEXTAUTH_URL</code></td>
                                <td>Application URL</td>
                                <td><i data-lucide="check" style="color: var(--accent-green); width: 16px; height: 16px;"></i></td>
                                <td><code>http://localhost:3000</code></td>
                            </tr>
                        </tbody>
                    </table>

                    <h3>Database Configuration</h3>
                    <p>The application uses PostgreSQL with Drizzle ORM. You can configure your database connection in several ways:</p>

                    <p><strong>Local PostgreSQL:</strong></p>
                    <pre><code>DATABASE_URL=postgresql://username:password@localhost:5432/ai_chatbot</code></pre>

                    <p><strong>Docker PostgreSQL:</strong></p>
                    <pre><code>docker run --name ai-chatbot-db -e POSTGRES_DB=ai_chatbot -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14</code></pre>

                    <p><strong>Cloud PostgreSQL (Supabase, Neon, etc.):</strong></p>
                    <pre><code>DATABASE_URL=postgresql://username:password@your-host:5432/database_name?sslmode=require</code></pre>

                    <h2>First Steps After Installation</h2>

                    <h3>1. Login as Admin</h3>
                    <ol>
                        <li>Navigate to <a href="http://localhost:3000/login">http://localhost:3000/login</a></li>
                        <li>Enter the admin email you configured</li>
                        <li>Complete the authentication process</li>
                    </ol>

                    <h3>2. Configure AI Providers</h3>
                    <ol>
                        <li>Go to <strong>Admin Dashboard</strong> → <strong>Settings</strong></li>
                        <li>Add your AI provider API keys</li>
                        <li>Test the connections to ensure they're working</li>
                    </ol>

                    <h3>3. Create Your First User</h3>
                    <ol>
                        <li>In the <strong>Admin Dashboard</strong>, go to <strong>User Management</strong></li>
                        <li>Click <strong>Add User</strong></li>
                        <li>Set up usage budgets for the user</li>
                        <li>Assign appropriate roles</li>
                    </ol>

                    <h3>4. Set Usage Budgets</h3>
                    <ol>
                        <li>Navigate to <strong>Usage Analytics</strong></li>
                        <li>Set default budgets for different user roles</li>
                        <li>Configure budget request workflows</li>
                    </ol>

                    <h2>Production Deployment</h2>

                    <h3>Docker Deployment</h3>
                    <p>Create a <code>docker-compose.yml</code> file:</p>
                    <pre><code>version: '3.8'

services:
app:
build: .
ports: - "3000:3000"
environment: - DATABASE_URL=postgresql://postgres:password@db:5432/ai_chatbot - AUTH_SECRET=your-production-secret - OPENAI_API_KEY=your-openai-key
depends_on: - db

db:
image: postgres:14
environment: - POSTGRES_DB=ai_chatbot - POSTGRES_USER=postgres - POSTGRES_PASSWORD=password
volumes: - postgres_data:/var/lib/postgresql/data

volumes:
postgres_data:</code></pre>

                    <h3>Cloud Deployment Options</h3>
                    <p><strong>Vercel (Recommended for small-medium teams):</strong></p>
                    <pre><code># Install Vercel CLI

npm install -g vercel

# Deploy

vercel --prod</code></pre>

                    <p><strong>AWS/Azure/GCP:</strong></p>
                    <ul>
                        <li>Use Docker containers with managed databases</li>
                        <li>Set up load balancers for high availability</li>
                        <li>Configure auto-scaling based on usage</li>
                    </ul>

                    <p><strong>Self-hosted:</strong></p>
                    <ul>
                        <li>Use reverse proxy (nginx/Apache)</li>
                        <li>Set up SSL certificates</li>
                        <li>Configure monitoring and logging</li>
                    </ul>

                    <h2>Troubleshooting</h2>

                    <h3>Common Issues</h3>
                    <p><strong>Database Connection Failed:</strong></p>
                    <ul>
                        <li>Verify PostgreSQL is running</li>
                        <li>Check DATABASE_URL format</li>
                        <li>Ensure database exists</li>
                    </ul>

                    <p><strong>Authentication Not Working:</strong></p>
                    <ul>
                        <li>Verify AUTH_SECRET is set</li>
                        <li>Check NEXTAUTH_URL matches your domain</li>
                        <li>Clear browser cookies and try again</li>
                    </ul>

                    <p><strong>API Keys Not Working:</strong></p>
                    <ul>
                        <li>Verify API keys are correct and active</li>
                        <li>Check rate limits haven't been exceeded</li>
                        <li>Ensure billing is set up for AI providers</li>
                    </ul>

                    <p><strong>Build Errors:</strong></p>
                    <ul>
                        <li>Clear node_modules and reinstall: <code>rm -rf node_modules && pnpm install</code></li>
                        <li>Check Node.js version compatibility</li>
                        <li>Verify all environment variables are set</li>
                    </ul>

                    <h3>Getting Help</h3>
                    <p>If you encounter issues:</p>
                    <ol>
                        <li>Check the <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit/issues">GitHub Issues</a></li>
                        <li>Review the <a href="https://github.com/Penguin-International-Gurgaon/ai-chatbot-entrpise-kit/wiki/Troubleshooting">troubleshooting guide</a></li>
                        <li>Contact <a href="../enterprise.html">enterprise support</a> for business-critical issues</li>
                    </ol>

                    <h2>Next Steps</h2>

                    <div class="success-box">
                        <i data-lucide="check-circle"></i>
                        <div>
                            <strong>Congratulations!</strong> Your Enterprise AI Chatbot Platform is now running. Here's what to do next:
                        </div>
                    </div>

                    <div class="doc-navigation">
                        <h3><i data-lucide="book-open"></i> Documentation Quick Access</h3>
                        <div class="doc-nav-grid">
                            <div class="doc-nav-item">
                                <a href="providers.html">
                                    <i data-lucide="plug" class="nav-icon"></i>
                                    <strong>Add Providers</strong>
                                    <div class="nav-desc">Configure all major AI providers</div>
                                </a>
                            </div>
                            <div class="doc-nav-item">
                                <a href="customization.html">
                                    <i data-lucide="palette" class="nav-icon"></i>
                                    <strong>Customization</strong>
                                    <div class="nav-desc">Brand your platform with config.toml</div>
                                </a>
                            </div>
                            <div class="doc-nav-item">
                                <a href="../enterprise.html">
                                    <i data-lucide="building-2" class="nav-icon"></i>
                                    <strong>Enterprise</strong>
                                    <div class="nav-desc">Advanced features and support</div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="quick-start-box">
                        <h3><i data-lucide="zap"></i> Quick Actions</h3>
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
                        <a href="../index.html" class="nav-button">
                            <i data-lucide="arrow-left"></i>
                            Back to Home
                        </a>
                        <a href="providers.html" class="nav-button">
                            Add Providers
                            <i data-lucide="arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-bottom">
            <p>&copy; 2025 Sponsored by <strong>Penguin International</strong>. Open source project actively maintained for the community.</p>
        </div>
    </footer>

    <script src="../assets/js/docs.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            lucide.createIcons();
        });
    </script>

</body>
</html>
