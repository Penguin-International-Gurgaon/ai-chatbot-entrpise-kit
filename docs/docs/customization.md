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
<strong>Configuration File Location:</strong> The main configuration file is located at <code>config.toml</code> in your project root directory.
</div>

## Configuration Sections

### <span class="step-number">1</span> Layout Configuration

<div class="config-section">
  <h3><i data-lucide="layout"></i> [layout]</h3>
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
        <td>"Enterprise AI Chat"</td>
        <td>"YourCompany AI"</td>
      </tr>
      <tr>
        <td>description</td>
        <td>Meta description for SEO and sharing</td>
        <td>"Enterprise AI Platform for Teams"</td>
        <td>"AI Assistant for Acme Corp"</td>
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
  <h3><i data-lucide="message-circle"></i> [greeting]</h3>
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
        <td>"Welcome to Enterprise AI!"</td>
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
  <h3><i data-lucide="palette"></i> [theme]</h3>
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
        <td>primary_color</td>
        <td>Primary brand color</td>
        <td>#2563eb</td>
        <td>HEX or HSL</td>
      </tr>
      <tr>
        <td>secondary_color</td>
        <td>Secondary accent color</td>
        <td>#7c3aed</td>
        <td>HEX or HSL</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Color Format Options:</strong>
  <pre><code># HEX Format (recommended)
primary_color = "#3b82f6"
secondary_color = "#7c3aed"

# HSL Format

primary_color = "hsl(220deg, 70%, 50%)"
secondary_color = "hsl(262deg, 83%, 58%)"</code></pre>

<strong>Popular Corporate Color Examples:</strong>

  <pre><code># Blue (Professional)
primary_color = "#2563eb"    # Blue
secondary_color = "#1e40af"  # Dark Blue

# Green (Tech/Growth)
primary_color = "#059669"    # Green
secondary_color = "#047857"  # Dark Green

# Purple (Creative)
primary_color = "#7c3aed"    # Purple
secondary_color = "#6d28d9"  # Dark Purple</code></pre>
</div>

### <span class="step-number">4</span> Header Configuration

<div class="config-section">
  <h3><i data-lucide="header"></i> [header]</h3>
  <p>Customizes the application header, including branding and titles.</p>
  
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
        <td>Main header title</td>
        <td>"Enterprise AI Chatbot"</td>
        <td>"Acme AI"</td>
      </tr>
      <tr>
        <td>subtitle</td>
        <td>Header subtitle/tagline</td>
        <td>"AI for Teams"</td>
        <td>"AI for Productivity"</td>
      </tr>
      <tr>
        <td>show_logo</td>
        <td>Display company logo</td>
        <td>true</td>
        <td>false</td>
      </tr>
    </tbody>
  </table>
  
  <strong>Example Configuration:</strong>
  <pre><code>[header]
title = "Acme AI Assistant"
subtitle = "Enterprise AI Platform"
show_logo = true</code></pre>
</div>

### <span class="step-number">5</span> Footer Configuration

<div class="config-section">
  <h3><i data-lucide="layout"></i> [footer]</h3>
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
        <td>company_name</td>
        <td>Company name in footer</td>
        <td>String</td>
        <td>"Your Company"</td>
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
company_name = "Acme Corporation"
privacy_policy = """
This AI platform is provided by **Acme Corporation** for authorized employees only.

All interactions are logged for security and compliance purposes.
"""
usage_policy = """
**Acme Corp AI Usage Guidelines:**

- Verify all AI-generated content before use
- Do not input confidential or sensitive data
- Use for business purposes only
"""</code></pre>
</div>

### <span class="step-number">6</span> Suggested Actions

<div class="config-section">
  <h3><i data-lucide="lightbulb"></i> [[suggested_actions]]</h3>
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
action = "Create documentation for our new project workflow"</code></pre>

</div>

## Advanced Customization

### Custom Logo and Assets

Replace default assets with your company branding:

**File Structure:**
\`\`\`
public/
├── images/
│ ├── logo.png # Company logo (light theme)
│ ├── logo-dark.png # Company logo (dark theme)
│ ├── favicon.ico # Browser favicon
│ └── og-image.png # Social sharing image
\`\`\`

### Environment-Based Configuration

You can have different configurations for different environments:

**File: `config.production.toml`**
\`\`\`toml
[layout]
title = "Acme AI - Production"
description = "Production AI platform for Acme Corporation"

[header]
title = "Acme AI"
subtitle = "Production Environment"
\`\`\`

## Complete Example Configuration

Here's a complete example of a customized `config.toml` for a fictional company:

\`\`\`toml
[layout]
title = "TechCorp AI Assistant"
description = "Enterprise AI platform for TechCorp employees - boost productivity with secure AI"

[greeting]
title = "Welcome to TechCorp AI!"
subtitle = "How can I help you be more productive today?"

[theme]
primary_color = "#2563eb"
secondary_color = "#1e40af"

[header]
title = "TechCorp AI"
subtitle = "Secure AI for Innovation"
show_logo = true

[footer]
enabled = true
company_name = "TechCorp IT Department"
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
action = "Draft comprehensive technical documentation for our new API endpoints"
\`\`\`

## Testing Your Configuration

### <span class="step-number">1</span> Restart Development Server

After making changes to `config.toml`, restart your development server:

\`\`\`bash

# Stop the server (Ctrl+C)

# Then restart

pnpm dev
\`\`\`

### <span class="step-number">2</span> Clear Browser Cache

Clear your browser cache to see changes:

- **Chrome/Edge:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- **Firefox:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### <span class="step-number">3</span> Test Different Themes

Test both light and dark themes to ensure your colors work well in both modes.

<div class="warning-box">
<strong>Configuration Tips:</strong>
<ul>
<li>Always backup your original <code>config.toml</code> before making changes</li>
<li>Test color contrast for accessibility compliance</li>
<li>Keep suggested actions relevant to your organization's needs</li>
<li>Review policy text with your legal/compliance team</li>
</ul>
</div>

<div class="success-box">
<strong>Configuration Complete!</strong> Your Enterprise AI Chatbot Platform is now customized with your organization's branding and requirements.
</div>

<div class="doc-navigation">
  <h3><i data-lucide="book-open"></i> Related Documentation</h3>
  <div class="doc-nav-grid">
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/getting-started">
        <i data-lucide="rocket" class="nav-icon"></i>
        <strong>Getting Started</strong>
        <div class="nav-desc">Initial setup and installation</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/docs/providers">
        <i data-lucide="plug" class="nav-icon"></i>
        <strong>Add Providers</strong>
        <div class="nav-desc">Configure AI providers</div>
      </a>
    </div>
    <div class="doc-nav-item">
      <a href="/ai-chatbot-entrpise-kit/enterprise">
        <i data-lucide="building-2" class="nav-icon"></i>
        <strong>Enterprise</strong>
        <div class="nav-desc">Advanced features</div>
      </a>
    </div>
  </div>
</div>

<div class="nav-buttons">
  <a href="/ai-chatbot-entrpise-kit/docs/providers" class="nav-button">
    <i data-lucide="arrow-left"></i>
    Add Providers
  </a>
  <a href="/ai-chatbot-entrpise-kit/enterprise" class="nav-button">
    Enterprise
    <i data-lucide="arrow-right"></i>
  </a>
</div>

</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
  });
</script>
