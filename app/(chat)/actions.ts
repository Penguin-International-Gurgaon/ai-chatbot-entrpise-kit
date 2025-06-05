'use server';

import { generateText, type Message } from 'ai';
import { cookies } from 'next/headers';

import {
  deleteMessagesByChatIdAfterTimestamp,
  getMessageById,
  updateChatVisiblityById,
  getTokenBudgetByUserIdAndModelId,
  updateTokenUsage,
  createTokenRequest,
} from '@/lib/db/queries';
import type { VisibilityType } from '@/components/visibility-selector';
import { myProvider } from '@/lib/ai/providers';

import { calculateTokens } from "@/lib/utils/token-calculator"

import { auth } from "@/app/(auth)/auth"
import { redirect } from "next/navigation"

export async function saveChatModelAsCookie(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}

export async function generateTitleFromUserMessage({
  message,
}: {
  message: Message;
}) {
  const { text: title } = await generateText({
    model: myProvider.languageModel('title-model'),
    system: `\n
    - you will generate a short title based on the first message a user begins a conversation with
    - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

export async function deleteTrailingMessages({ id }: { id: string }) {
  const [message] = await getMessageById({ id });

  await deleteMessagesByChatIdAfterTimestamp({
    chatId: message.chatId,
    timestamp: message.createdAt,
  });
}

export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}

export async function getTokenBudgetForModel(modelId: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return null
  }

  const budget = await getTokenBudgetByUserIdAndModelId({
    userId: session.user.id,
    modelId,
  })

  return budget || { totalBudget: 0, usedBudget: 0 }
}

export async function updateTokenUsageForChat({
  modelId,
  prompt,
  response,
}: {
  modelId: string
  prompt: string
  response: string
}) {
  const session = await auth()

  if (!session?.user?.id) {
    return
  }

  const tokensUsed = calculateTokens(prompt, response)
  console.debug("calculateTokens")
  console.debug(tokensUsed)

  await updateTokenUsage({
    userId: session.user.id,
    modelId,
    tokensUsed,
  })

  return tokensUsed
}

export async function requestMoreTokens({
  modelId,
  requestedAmount,
}: {
  modelId: string
  requestedAmount: number
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/login")
  }

  return await createTokenRequest({
    userId: session.user.id,
    modelId,
    requestedAmount,
  })
}
