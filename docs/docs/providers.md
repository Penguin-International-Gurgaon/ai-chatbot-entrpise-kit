---
layout: default
title: "Adding AI Providers & Models"
description: "Learn how to add new AI providers and models to your Enterprise AI Chatbot Platform"
---

<div class="container">

# Adding AI Providers & Models

This guide will show you how to extend your Enterprise AI Chatbot Platform with additional AI providers and models. The platform is built on the Vercel AI SDK, making it easy to add virtually any AI provider.

## Supported Providers

### Current Providers

<div class="provider-card">
  <div class="provider-header">
    <div class="provider-icon openai">🤖</div>
    <div>
      <h3>OpenAI</h3>
      <p>GPT-4.1, GPT-4o, GPT-4.1-mini, o1, o3-mini series</p>
    </div>
  </div>
  <div class="model-list">
    <div class="model-item">gpt-4.1</div>
    <div class="model-item">gpt-4.1-mini</div>
    <div class="model-item">gpt-4.1-nano</div>
    <div class="model-item">gpt-4o</div>
    <div class="model-item">gpt-4o-mini</div>
    <div class="model-item">o1</div>
    <div class="model-item">o3-mini</div>
    <div class="model-item">gpt-4.5-preview</div>
  </div>
</div>

<div class="provider-card">
  <div class="provider-header">
    <div class="provider-icon anthropic">🧠</div>
    <div>
      <h3>Anthropic</h3>
      <p>Claude 3 Haiku, Claude 3.7 Sonnet</p>
    </div>
  </div>
  <div class="model-list">
    <div class="model-item">claude-3-haiku</div>
    <div class="model-item">claude-3-7-sonnet</div>
  </div>
</div>

<div class="provider-card">
  <div class="provider-header">
    <div class="provider-icon xai">🚀</div>
    <div>
      <h3>xAI</h3>
      <p>Grok 2 Image generation</p>
    </div>
  </div>
  <div class="model-list">
    <div class="model-item">grok-2-image</div>
  </div>
</div>

## Adding a New Provider

### <span class="step-number">1</span> Install Provider SDK

First, install the AI SDK package for your desired provider:

```bash
# Example: Adding Google Gemini
pnpm add @ai-sdk/google

# Example: Adding Mistral AI
pnpm add @ai-sdk/mistral

# Example: Adding Cohere
pnpm add @ai-sdk/cohere
```

### <span class="step-number">2</span> Update Environment Variables

Add the API key for your new provider to `.env.local`:

```env
# Add to your existing .env.local file
GOOGLE_API_KEY=your-google-api-key-here
MISTRAL_API_KEY=your-mistral-api-key-here
COHERE_API_KEY=your-cohere-api-key-here
```

### <span class="step-number">3</span> Configure Provider in Code

Edit `lib/ai/providers.ts` to add your new provider:

```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; // New import
import { mistral } from '@ai-sdk/mistral'; // New import
import { xai } from '@ai-sdk/xai';

// Existing providers...
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Add new providers
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistralProvider = mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const myProvider = customProvider({
  languageModels: {
    // Existing models...
    'openai-gpt-4.1': openai.chat('gpt-4.1'),
    'claude-3-7-sonnet': anthropic('claude-3-7-sonnet-20250219'),
    
    // Add new models
    'google-gemini-pro': google('gemini-pro'),
    'google-gemini-pro-vision': google('gemini-pro-vision'),
    'mistral-large': mistralProvider('mistral-large-latest'),
    'mistral-medium': mistralProvider('mistral-medium-latest'),
  },
  imageModels: {
    'grok-2-image': xai.image('grok-2-image'),
    // Add image models if supported
    'google-imagen': google.image('imagen-2'),
  },
});
```

### <span class="step-number">4</span> Update Model Configuration

Add your new models to the model selector by editing `lib/ai/models.tsx`:

```typescript
export const models = [
  // Existing models...
  {
    id: 'openai-gpt-4.1',
    name: 'GPT-4.1',
    provider: 'OpenAI',
    description: 'Most capable GPT-4 model',
  },
  
  // Add new models
  {
    id: 'google-gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Google\'s most capable multimodal model',
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    description: 'Mistral\'s largest and most capable model',
  },
];
```

## Adding Custom Models

### Creating a Custom Provider

For providers not supported by Vercel AI SDK, you can create a custom implementation:

```typescript
import { customProvider, generateObject } from 'ai';

// Create a custom provider wrapper
const customApiProvider = customProvider({
  languageModels: {
    'custom-model': {
      async doGenerate(options) {
        // Your custom API call implementation
        const response = await fetch('https://api.custom-provider.com/generate', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.CUSTOM_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: options.prompt,
            max_tokens: options.maxTokens,
            temperature: options.temperature,
          }),
        });
        
        const data = await response.json();
        
        return {
          text: data.choices[0].message.content,
          usage: {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
          },
        };
      },
    },
  },
});
```

### Adding Reasoning Models

For models that support reasoning (like OpenAI's o1 series), wrap them with reasoning middleware:

```typescript
import { wrapLanguageModel, extractReasoningMiddleware } from 'ai';

export const myProvider = customProvider({
  languageModels: {
    // Regular model
    'openai-gpt-4.1': openai.chat('gpt-4.1'),
    
    // Reasoning model
    'openai-o1': wrapLanguageModel({
      model: openai.chat('o1'),
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),
  },
});
```

## Provider-Specific Configuration

### OpenAI Configuration

```typescript
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // For better compatibility
  baseURL: 'https://api.openai.com/v1', // Custom endpoint if needed
  organization: 'your-org-id', // Optional organization ID
});
```

### Anthropic Configuration

```typescript
const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: 'https://api.anthropic.com', // Custom endpoint
});
```

### Google Configuration

```typescript
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta',
});
```

## Testing New Providers

### <span class="step-number">1</span> Create Test Environment

Add your new provider to the test configuration in `lib/ai/models.test.ts`:

```typescript
export const testModels = {
  'test-google-gemini': {
    // Mock implementation for testing
    provider: 'google',
    model: 'gemini-pro',
  },
};
```

### <span class="step-number">2</span> Test API Connection

Create a simple test script to verify your provider works:

```typescript
// scripts/test-provider.ts
import { generateText } from 'ai';
import { myProvider } from '../lib/ai/providers';

async function testProvider() {
  try {
    const result = await generateText({
      model: myProvider.languageModel('google-gemini-pro'),
      prompt: 'Hello, world!',
    });
    
    console.log('✅ Provider test successful:', result.text);
  } catch (error) {
    console.error('❌ Provider test failed:', error);
  }
}

testProvider();
```

Run the test:

```bash
npx tsx scripts/test-provider.ts
```

## Model Capabilities

### Supported Features by Provider

| Provider | Chat | Reasoning | Image Gen | Vision | Function Calling |
|----------|------|-----------|-----------|--------|------------------|
| OpenAI | ✅ | ✅ (o1) | ❌ | ✅ | ✅ |
| Anthropic | ✅ | ✅ | ❌ | ✅ | ✅ |
| xAI | ✅ | ❌ | ✅ | ✅ | ✅ |
| Google | ✅ | ❌ | ✅ | ✅ | ✅ |
| Mistral | ✅ | ❌ | ❌ | ❌ | ✅ |

### Adding Function Calling Support

To enable function calling for your models, update the model configuration:

```typescript
{
  id: 'google-gemini-pro',
  name: 'Gemini Pro',
  provider: 'Google',
  description: 'Google\'s most capable multimodal model',
  capabilities: {
    functionCalling: true,
    vision: true,
    reasoning: false,
  },
}
```

## Token Budget Configuration

### Setting Up Budgets for New Models

When adding new models, you'll need to configure token budgets in the admin dashboard:

1. **Go to Admin Dashboard** → **Token Analytics**
2. **Add New Model** with appropriate cost per token
3. **Set Default Budgets** for different user roles
4. **Configure Rate Limits** if needed

### Model Pricing Configuration

Add pricing information for accurate budget tracking:

```typescript
// lib/utils/token-calculator.ts
export const modelPricing = {
  // Existing models...
  'openai-gpt-4.1': {
    inputCost: 0.03,  // per 1K tokens
    outputCost: 0.04, // per 1K tokens
  },
  
  // Add new models
  'google-gemini-pro': {
    inputCost: 0.001,
    outputCost: 0.002,
  },
  'mistral-large': {
    inputCost: 0.004,
    outputCost: 0.012,
  },
};
```

## Troubleshooting

### Common Issues

<div class="warning-box">
<strong>⚠️ API Key Issues:</strong>
<ul>
<li>Verify API key is correct and has proper permissions</li>
<li>Check if billing is set up for the provider</li>
<li>Ensure rate limits haven't been exceeded</li>
</ul>
</div>

<div class="warning-box">
<strong>⚠️ Model Not Available:</strong>
<ul>
<li>Check if the model ID is correct</li>
<li>Verify your account has access to the model</li>
<li>Some models may be in limited beta</li>
</ul>
</div>

### Debugging Steps

1. **Check Environment Variables:**
   ```bash
   echo $GOOGLE_API_KEY
   ```

2. **Test Provider Connection:**
   ```bash
   npx tsx scripts/test-provider.ts
   ```

3. **Check Application Logs:**
   ```bash
   pnpm dev
   # Check console for errors
   ```

## Best Practices

### Security

- **Never commit API keys** to version control
- **Use environment variables** for all sensitive configuration
- **Rotate API keys regularly** in production
- **Set up monitoring** for API usage and costs

### Performance

- **Cache model responses** when appropriate
- **Set reasonable timeouts** for API calls
- **Implement retry logic** for failed requests
- **Monitor token usage** to prevent budget overruns

### User Experience

- **Provide clear model descriptions** to help users choose
- **Set appropriate default models** for different use cases
- **Show estimated costs** before expensive operations
- **Implement graceful fallbacks** when models are unavailable

<div class="success-box">
<strong>✅ Provider Added Successfully!</strong> Your new AI provider should now be available in the model selector. Users can start using it immediately based on their token budgets.
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
      <a href="/ai-chatbot-entrpise-kit/docs/customization">
        <span class="nav-icon">🎨</span>
        <strong>Customization</strong>
        <div class="nav-desc">Brand your platform</div>
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
  <a href="/ai-chatbot-entrpise-kit/docs/getting-started" class="nav-button">← Getting Started</a>
  <a href="/ai-chatbot-entrpise-kit/docs/customization" class="nav-button">Customization →</a>
</div>

</div>