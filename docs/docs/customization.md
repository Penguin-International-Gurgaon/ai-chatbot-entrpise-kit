---
layout: default
title: "Customization & Branding"
description: "Learn how to customize and brand your Enterprise AI Chatbot Platform using config.toml and other configuration options"
---

<div class="container">

# Customization & Branding

Transform your Enterprise AI Chatbot Platform to match your organization's brand and requirements. This guide covers all customization options available through the `config.toml` file and other configuration methods.

## Configuration Overview

The platform uses a centralized configuration approach with the `config.toml` file located in the root directory. This file controls:

- **Application branding** (titles, descriptions, favicons)
- **Theme colors** and visual styling
- **Footer content** and policies
- **Suggested actions** for users
- **Greeting messages** and welcome text

<div class="info-box">
<strong>📁 Configuration File Location:</strong> The main configuration file is located at <code>config.toml</code> in your project root directory.
</div>

## Configuration Sections

### <span class="step-number">1</span> Layout Configuration

<div class="config-section">
  <h3>🎨 [layout]</h3>
  <p>Controls the main application layout and metadata.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>title</td>
        <td>Application title shown in browser tab</td>
        <td>"PenguinChat"</td>
        <td>"YourCompany AI"</td>
      </tr>
      <tr>
        <td>description</td>
        <td>Meta description for SEO and sharing</td>
        <td>"PenguinChat Application, LLM for everyone!"</td>
        <td>"Enterprise AI Platform"</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code>[layout]
title = "Acme Corp AI Assistant"
description = "Secure AI chatbot platform for Acme Corporation employees"</code></pre>
</div>

### <span class="step-number">2</span> Greeting Configuration

<div class="config-section">
  <h3>👋 [greeting]</h3>
  <p>Customizes the welcome message users see when they first visit the application.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>title</td>
        <td>Main greeting title</td>
        <td>"Welcome to PenguinChat !"</td>
        <td>"Welcome to Acme AI!"</td>
      </tr>
      <tr>
        <td>subtitle</td>
        <td>Subtitle or question prompt</td>
        <td>"How can I help you today?"</td>
        <td>"What would you like to know?"</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code>[greeting]
title = "Welcome to Acme AI Assistant!"
subtitle = "How can I help you be more productive today?"</code></pre>
</div>

### <span class="step-number">3</span> Theme Configuration

<div class="config-section">
  <h3>🎨 [theme]</h3>
  <p>Controls the visual appearance and color scheme of your application.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default</th>
        <th>Format</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>LIGHT_THEME_COLOR</td>
        <td>Primary color for light theme</td>
        <td>hsl(147deg, 50%, 47%) <span class="color-preview" style="background: hsl(147deg, 50%, 47%);"></span></td>
        <td>HSL or HEX</td>
      </tr>
      <tr>
        <td>DARK_THEME_COLOR</td>
        <td>Primary color for dark theme</td>
        <td>hsl(240deg 10% 3.92%) <span class="color-preview" style="background: hsl(240deg, 10%, 3.92%);"></span></td>
        <td>HSL or HEX</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Color Format Options:</strong>
  <pre><code># HSL Format (recommended)
LIGHT_THEME_COLOR = "hsl(220deg, 70%, 50%)"
DARK_THEME_COLOR = "hsl(220deg, 15%, 15%)"

# HEX Format
LIGHT_THEME_COLOR = "#3b82f6"
DARK_THEME_COLOR = "#1e293b"

# RGB Format
LIGHT_THEME_COLOR = "rgb(59, 130, 246)"
DARK_THEME_COLOR = "rgb(30, 41, 59)"</code></pre>

  <strong>Popular Corporate Color Examples:</strong>
  <pre><code># Blue (Professional)
LIGHT_THEME_COLOR = "hsl(220deg, 70%, 50%)"  # Blue
DARK_THEME_COLOR = "hsl(220deg, 15%, 15%)"   # Dark Blue

# Green (Tech/Growth)
LIGHT_THEME_COLOR = "hsl(142deg, 71%, 45%)"  # Green
DARK_THEME_COLOR = "hsl(142deg, 25%, 15%)"   # Dark Green

# Purple (Creative)
LIGHT_THEME_COLOR = "hsl(262deg, 83%, 58%)"  # Purple
DARK_THEME_COLOR = "hsl(262deg, 25%, 15%)"   # Dark Purple</code></pre>
</div>

### <span class="step-number">4</span> Header Configuration

<div class="config-section">
  <h3>📄 [header]</h3>
  <p>Customizes the application header, including favicon and titles.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Default</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>favicon</td>
        <td>Emoji or icon for browser tab</td>
        <td>"🐧"</td>
        <td>"🤖", "💼", "🏢"</td>
      </tr>
      <tr>
        <td>title</td>
        <td>Main header title</td>
        <td>"PenguinChat"</td>
        <td>"Acme AI"</td>
      </tr>
      <tr>
        <td>subtitle</td>
        <td>Header subtitle/tagline</td>
        <td>"LLM for Everyone"</td>
        <td>"AI for Productivity"</td>
      </tr>
      <tr>
        <td>custom_header_note</td>
        <td>Additional header text</td>
        <td>"LLM for Everyone in your team"</td>
        <td>"Secure AI for Enterprise"</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code>[header]
favicon = "🏢"
title = "Acme AI Assistant"
subtitle = "Enterprise AI Platform"
custom_header_note = "Secure AI solutions for your team"</code></pre>
</div>

### <span class="step-number">5</span> Footer Configuration

<div class="config-section">
  <h3>📝 [footer]</h3>
  <p>Controls footer visibility, company information, and policy text.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Type</th>
        <th>Default</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>enabled</td>
        <td>Show/hide footer</td>
        <td>Boolean</td>
        <td>true</td>
      </tr>
      <tr>
        <td>text</td>
        <td>Footer company text</td>
        <td>String</td>
        <td>"Built by PenguinOne"</td>
      </tr>
      <tr>
        <td>privacy_policy</td>
        <td>Privacy policy content</td>
        <td>Multiline String</td>
        <td>Default policy text</td>
      </tr>
      <tr>
        <td>usage_policy</td>
        <td>Usage guidelines</td>
        <td>Multiline String</td>
        <td>Default usage guidelines</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code>[footer]
enabled = true
text = "Built by Acme Corporation IT Department"
privacy_policy = """
This AI platform is provided by **Acme Corporation** for authorized employees only.

All interactions are logged for security and compliance purposes. Do not share confidential information.
"""
usage_policy = """
**Acme Corp AI Usage Guidelines:**
- Verify all AI-generated content before use
- Do not input confidential or sensitive data
- Use for business purposes only
- Report any issues to IT support
"""</code></pre>
</div>

### <span class="step-number">6</span> Suggested Actions

<div class="config-section">
  <h3>💡 [[suggested_actions]]</h3>
  <p>Define suggested prompts that appear on the main page to help users get started.</p>
  
  <table class="option-table">
    <thead>
      <tr>
        <th>Option</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>title</td>
        <td>First line of the suggestion</td>
        <td>"Write an email to"</td>
      </tr>
      <tr>
        <td>label</td>
        <td>Second line of the suggestion</td>
        <td>"schedule a team meeting"</td>
      </tr>
      <tr>
        <td>action</td>
        <td>Full prompt sent when clicked</td>
        <td>"Write an email to schedule a team meeting"</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code># Business Communication
[[suggested_actions]]
title = "Draft a professional email"
label = "for client follow-up"
action = "Draft a professional email for client follow-up"

# Data Analysis
[[suggested_actions]]
title = "Analyze this spreadsheet data"
label = "and provide insights"
action = "Analyze this spreadsheet data and provide key insights"

# Documentation
[[suggested_actions]]
title = "Create documentation for"
label = "our new project workflow"
action = "Create documentation for our new project workflow"

# Meeting Preparation
[[suggested_actions]]
title = "Prepare talking points for"
label = "quarterly review meeting"
action = "Prepare talking points for quarterly review meeting"</code></pre>
</div>

## Advanced Customization

### Custom CSS Styling

For advanced visual customization beyond the theme colors, you can modify the CSS variables in your Tailwind configuration:

<strong>File: `tailwind.config.ts`</strong>
<pre><code>export default {
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          primary: 'hsl(var(--brand-primary))',
          secondary: 'hsl(var(--brand-secondary))',
        },
        // Override default colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
}</code></pre>

### Logo and Assets

Replace default assets with your company branding:

<strong>File: `public/images/`</strong>
<pre><code># Replace these files with your branding:
public/
├── images/
│   ├── logo.png              # Company logo
│   ├── logo-dark.png         # Dark theme logo
│   ├── favicon.ico           # Browser favicon
│   └── og-image.png          # Social sharing image</code></pre>

### Environment-Based Configuration

You can have different configurations for different environments:

<strong>File: `config.production.toml`</strong>
<pre><code>[layout]
title = "Acme AI - Production"
description = "Production AI platform for Acme Corporation"

[header]
favicon = "🏢"
title = "Acme AI"
subtitle = "Production Environment"</code></pre>

## Complete Example Configuration

Here's a complete example of a customized `config.toml` for a fictional company:

<pre><code>[layout]
title = "TechCorp AI Assistant"
description = "Enterprise AI platform for TechCorp employees - boost productivity with secure AI"

[greeting]
title = "Welcome to TechCorp AI!"
subtitle = "How can I help you be more productive today?"

[theme]
LIGHT_THEME_COLOR = "hsl(220deg, 70%, 50%)"
DARK_THEME_COLOR = "hsl(220deg, 15%, 15%)"

[header]
favicon = "🚀"
title = "TechCorp AI"
subtitle = "Secure AI for Innovation"
custom_header_note = "Empowering teams with responsible AI"

[footer]
enabled = true
text = "Built by TechCorp IT Department | v2.0"
privacy_policy = """
This AI platform is provided by **TechCorp** for authorized employees only.

**Data Handling:**
- All conversations are encrypted and stored securely
- Usage data is collected for improvement and compliance
- No personal conversations are reviewed unless required for security

**Contact:** For privacy concerns, contact privacy@techcorp.com
"""
usage_policy = """
**TechCorp AI Usage Guidelines:**

**Acceptable Use:**
✓ Business research and analysis
✓ Document drafting and editing
✓ Code review and debugging
✓ Meeting preparation and notes

**Prohibited Use:**
✗ Sharing confidential client data
✗ Personal or non-business use
✗ Generating inappropriate content
✗ Attempting to bypass security measures

**Best Practices:**
- Always review AI output before use
- Verify facts and calculations
- Don't rely solely on AI for critical decisions
"""

[[suggested_actions]]
title = "Analyze market trends"
label = "for Q4 planning"
action = "Analyze current market trends for Q4 strategic planning"

[[suggested_actions]]
title = "Write a project proposal"
label = "for cloud migration"
action = "Write a project proposal for cloud migration including timeline and budget"

[[suggested_actions]]
title = "Create a meeting agenda"
label = "for product roadmap review"
action = "Create a detailed meeting agenda for product roadmap review"

[[suggested_actions]]
title = "Draft technical documentation"
label = "for API endpoints"
action = "Draft comprehensive technical documentation for our new API endpoints"</code></pre>

## Testing Your Configuration

### <span class="step-number">1</span> Restart Development Server

After making changes to `config.toml`, restart your development server:

<pre><code># Stop the server (Ctrl+C)
# Then restart
pnpm dev</code></pre>

### <span class="step-number">2</span> Clear Browser Cache

Clear your browser cache to see changes:
- **Chrome/Edge:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### <span class="step-number">3</span> Test Different Themes

Test both light and dark themes to ensure your colors work well in both modes.

<div class="warning-box">
<strong>⚠️ Configuration Tips:</strong>
<ul>
<li>Always backup your original <code>config.toml</code> before making changes</li>
<li>Test color contrast for accessibility compliance</li>
<li>Keep suggested actions relevant to your organization's needs</li>
<li>Review policy text with your legal/compliance team</li>
</ul>
</div>

<div class="success-box">
<strong>✅ Configuration Complete!</strong> Your Enterprise AI Chatbot Platform is now customized with your organization's branding and requirements.
</div>

<div class="doc-navigation">
  <h3>📚 Related Documentation</h3>
  <div class="doc-nav-grid">
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/getting-started">
        <span class="nav-icon">🚀</span>
        <strong>Getting Started</strong>
        <div class="nav-desc">Initial setup and installation</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/providers">
        <span class="nav-icon">🔌</span>
        <strong>Add Providers</strong>
        <div class="nav-desc">Configure AI providers</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/enterprise">
        <span class="nav-icon">🏢</span>
        <strong>Enterprise</strong>
        <div class="nav-desc">Advanced features</div>
      </a>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <a href="/ai-chatbot-entrpise-kit/docs/providers" class="nav-button">← Add Providers</a>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="nav-button">Enterprise →</a>
</div>

</div>