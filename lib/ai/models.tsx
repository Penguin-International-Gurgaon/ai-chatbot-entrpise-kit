// lib/ai/models.ts
export const DEFAULT_CHAT_MODEL = 'openai-gpt-4.1-mini';

export type ModelProvider = 'openai' | 'anthropic';

export type ChatModel = {
  id: string;
  name: string;
  description: string;
  provider: ModelProvider;
};

// Full model list (including non-chat models if needed elsewhere)
export const allModels: ChatModel[] = [
  // --- OpenAI Chat Models ---
  {
    id: 'openai-gpt-4.1',
    name: 'OpenAI GPT-4.1',
    description: 'Fast and cost-effective OpenAI model',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-4.1-mini',
    name: 'OpenAI GPT-4.1 Mini',
    description: 'Advanced reasoning with OpenAI GPT-4',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-4.1-nano',
    name: 'OpenAI GPT-4.1 Nano',
    description: 'OpenAI’s faster GPT-4 variant for production use',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-o4-mini',
    name: 'OpenAI GPT-O4 Mini',
    description: 'OpenAI GPT-O4 lightweight model',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-o1',
    name: 'OpenAI GPT-O1',
    description: 'OpenAI GPT-O1 model',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-o3-mini',
    name: 'OpenAI GPT-O3 Mini',
    description: 'OpenAI GPT-O3 mini model',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-4o',
    name: 'OpenAI GPT-4o',
    description: 'OpenAI flagship GPT-4o model',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-4o-mini',
    name: 'OpenAI GPT-4o Mini',
    description: 'OpenAI GPT-4o lightweight version',
    provider: 'openai',
  },
  {
    id: 'openai-gpt-4.5-preview',
    name: 'OpenAI GPT-4.5 Preview',
    description: 'Early preview of GPT-4.5',
    provider: 'openai',
  },

  // --- Anthropic Chat Models ---
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    description: 'Anthropic Claude 3 Haiku (Mar 2024)',
    provider: 'anthropic',
  },
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet',
    description: 'Anthropic Claude 3.7 Sonnet (Feb 2025)',
    provider: 'anthropic',
  },
];

// ✅ Explicitly export only chat-specific models for the selector
export const chatModels: ChatModel[] = allModels.filter((model) =>
  [
    'openai-gpt-4.1',
    'openai-gpt-4.1-mini',
    'openai-gpt-4.1-nano',
    'openai-gpt-o4-mini',
    'openai-gpt-o1',
    'openai-gpt-o3-mini',
    'openai-gpt-4o',
    'openai-gpt-4o-mini',
    'openai-gpt-4.5-preview',
    'claude-3-haiku',
    'claude-3-7-sonnet',
  ].includes(model.id)
);
