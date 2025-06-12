import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
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

const openaikey = process.env.OPENAI_API_KEY;
if (!openaikey) {
  throw new Error ('Missing OPENAI_API_KEY in environment variables.')
}

const openai = createOpenAI({
  apiKey: openaikey,
  compatibility: 'strict',
});


const anthropicapikey = process.env.OPENAI_API_KEY;
if (!anthropicapikey) {
  throw new Error ('Missing ANTHROPIC_API_KEY in environment variables.')
}

const anthropic = createAnthropic({
  apiKey: anthropicapikey,
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': openai.chat('gpt-4.1-mini'),
        'chat-model-reasoning': wrapLanguageModel({
          model: openai.chat('gpt-4.1-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': openai.chat('gpt-4.1-mini'),
        'artifact-model': openai.chat('gpt-4.1-mini'),
        //OpenAI models
        'openai-gpt-4.1': openai.chat('gpt-4.1'),
        'openai-gpt-4.1-mini': openai.chat('gpt-4.1-mini'),
        'openai-gpt-4.1-nano': openai.chat('gpt-4.1-nano'),
        'openai-gpt-o4-mini': openai.chat('o4-mini'),
        'openai-gpt-o1': openai.chat('o1'),
        'openai-gpt-o3-mini': openai.chat('o3-mini'),
        'openai-gpt-4o': openai.chat('gpt-4o'),
        'openai-gpt-4o-mini': openai.chat('gpt-4o-mini'),
        'openai-gpt-4.5-preview': openai.chat('gpt-4.5-preview'),
        //Anthropic models
        'claude-3-haiku' : anthropic('claude-3-haiku-20240307'), 
        'claude-3-7-sonnet' : anthropic('claude-3-7-sonnet-20250219'),


      },
      imageModels: {
        'small-model': xai.image('grok-2-image'),
      },
    });
