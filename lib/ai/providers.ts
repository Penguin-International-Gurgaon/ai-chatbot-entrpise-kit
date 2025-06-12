import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
  type Provider,
} from 'ai';
import { xai } from '@ai-sdk/xai';
import { isTestEnvironment } from '../constants';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';

let _myProvider: Provider | null = null;

function createProvider(): Provider {
  if (isTestEnvironment) {
    return customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    });
  }

  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    throw new Error('Missing OPENAI_API_KEY in environment variables.');
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    throw new Error('Missing ANTHROPIC_API_KEY in environment variables.');
  }

  const openai = createOpenAI({
    apiKey: openaiKey,
    compatibility: 'strict',
  });

  const anthropic = createAnthropic({
    apiKey: anthropicKey,
  });

  return customProvider({
    languageModels: {
      'chat-model': openai.chat('gpt-4.1-mini'),
      'chat-model-reasoning': wrapLanguageModel({
        model: openai.chat('gpt-4.1-mini'),
        middleware: extractReasoningMiddleware({ tagName: 'think' }),
      }),
      'title-model': openai.chat('gpt-4.1-mini'),
      'artifact-model': openai.chat('gpt-4.1-mini'),
      'openai-gpt-4.1': openai.chat('gpt-4.1'),
      'openai-gpt-4.1-mini': openai.chat('gpt-4.1-mini'),
      'openai-gpt-4.1-nano': openai.chat('gpt-4.1-nano'),
      'openai-gpt-o4-mini': openai.chat('o4-mini'),
      'openai-gpt-o1': openai.chat('o1'),
      'openai-gpt-o3-mini': openai.chat('o3-mini'),
      'openai-gpt-4o': openai.chat('gpt-4o'),
      'openai-gpt-4o-mini': openai.chat('gpt-4o-mini'),
      'openai-gpt-4.5-preview': openai.chat('gpt-4.5-preview'),
      'claude-3-haiku': anthropic('claude-3-haiku-20240307'),
      'claude-3-7-sonnet': anthropic('claude-3-7-sonnet-20250219'),
    },
    imageModels: {
      'small-model': xai.image('grok-2-image'),
    },
  });
}

// Export as a lazily evaluated const
export const myProvider: Provider = new Proxy(
  {},
  {
    get(_target, prop, receiver) {
      if (!_myProvider) {
        _myProvider = createProvider();
      }
      return Reflect.get(_myProvider as Provider, prop, receiver);
    },
  }
) as Provider;
