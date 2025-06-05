import 'server-only';

import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  lt,
  type SQL,
} from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import {
  user,
  chat,
  type User,
  document,
  type Suggestion,
  suggestion,
  message,
  vote,
  type DBMessage,
  type Chat,
  tokenBudget,
  tokenRequest,
} from './schema';
import type { ArtifactKind } from '@/components/artifact';
import { generateHashedPassword } from './utils';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error('Failed to get user from database');
    throw error;
  }
}

export async function createUser(email: string, password: string) {
  const hashedPassword = generateHashedPassword(password);

  try {
    return await db.insert(user).values({ email, password: hashedPassword });
  } catch (error) {
    console.error('Failed to create user in database');
    throw error;
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
    });
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(vote).where(eq(vote.chatId, id));
    await db.delete(message).where(eq(message.chatId, id));

    const [chatsDeleted] = await db
      .delete(chat)
      .where(eq(chat.id, id))
      .returning();
    return chatsDeleted;
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<any>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id),
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Array<Chat> = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<DBMessage>;
}) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: string;
  messageId: string;
  type: 'up' | 'down';
}) {
  try {
    const [existingVote] = await db
      .select()
      .from(vote)
      .where(and(eq(vote.messageId, messageId)));

    if (existingVote) {
      return await db
        .update(vote)
        .set({ isUpvoted: type === 'up' })
        .where(and(eq(vote.messageId, messageId), eq(vote.chatId, chatId)));
    }
    return await db.insert(vote).values({
      chatId,
      messageId,
      isUpvoted: type === 'up',
    });
  } catch (error) {
    console.error('Failed to upvote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ id }: { id: string }) {
  try {
    return await db.select().from(vote).where(eq(vote.chatId, id));
  } catch (error) {
    console.error('Failed to get votes by chat id from database', error);
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: string;
  title: string;
  kind: ArtifactKind;
  content: string;
  userId: string;
}) {
  try {
    return await db
      .insert(document)
      .values({
        id,
        title,
        kind,
        content,
        userId,
        createdAt: new Date(),
      })
      .returning();
  } catch (error) {
    console.error('Failed to save document in database');
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const documents = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(asc(document.createdAt));

    return documents;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const [selectedDocument] = await db
      .select()
      .from(document)
      .where(eq(document.id, id))
      .orderBy(desc(document.createdAt));

    return selectedDocument;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    await db
      .delete(suggestion)
      .where(
        and(
          eq(suggestion.documentId, id),
          gt(suggestion.documentCreatedAt, timestamp),
        ),
      );

    return await db
      .delete(document)
      .where(and(eq(document.id, id), gt(document.createdAt, timestamp)))
      .returning();
  } catch (error) {
    console.error(
      'Failed to delete documents by id after timestamp from database',
    );
    throw error;
  }
}

export async function saveSuggestions({
  suggestions,
}: {
  suggestions: Array<Suggestion>;
}) {
  try {
    return await db.insert(suggestion).values(suggestions);
  } catch (error) {
    console.error('Failed to save suggestions in database');
    throw error;
  }
}

export async function getSuggestionsByDocumentId({
  documentId,
}: {
  documentId: string;
}) {
  try {
    return await db
      .select()
      .from(suggestion)
      .where(and(eq(suggestion.documentId, documentId)));
  } catch (error) {
    console.error(
      'Failed to get suggestions by document version from database',
    );
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    return await db.select().from(message).where(eq(message.id, id));
  } catch (error) {
    console.error('Failed to get message by id from database');
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const messagesToDelete = await db
      .select({ id: message.id })
      .from(message)
      .where(
        and(eq(message.chatId, chatId), gte(message.createdAt, timestamp)),
      );

    const messageIds = messagesToDelete.map((message) => message.id);

    if (messageIds.length > 0) {
      await db
        .delete(vote)
        .where(
          and(eq(vote.chatId, chatId), inArray(vote.messageId, messageIds)),
        );

      return await db
        .delete(message)
        .where(
          and(eq(message.chatId, chatId), inArray(message.id, messageIds)),
        );
    }
  } catch (error) {
    console.error(
      'Failed to delete messages by id after timestamp from database',
    );
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    return await db.update(chat).set({ visibility }).where(eq(chat.id, chatId));
  } catch (error) {
    console.error('Failed to update chat visibility in database');
    throw error;
  }
}

export async function getAllUsers() {
  try {
    return await db.select().from(user).orderBy(asc(user.email))
  } catch (error) {
    console.error("Failed to get all users from database")
    throw error
  }
}

export async function updateUserAdminStatus({ userId, is_admin }: { userId: string; is_admin: boolean }) {
  try {
    return await db.update(user).set({ is_admin }).where(eq(user.id, userId))
  } catch (error) {
    console.error("Failed to update user admin status in database")
    throw error
  }
}

export async function getTokenBudgetByUserIdAndModelId({ userId, modelId }: { userId: string; modelId: string }) {

  try {
    const [budget] = await db
      .select()
      .from(tokenBudget)
      .where(and(eq(tokenBudget.userId, userId), eq(tokenBudget.modelId, modelId)))

    return budget
  } catch (error) {
    console.error(error)
    console.error("Failed to get token budget from database")
    throw error
  }
}

export async function getAllTokenBudgetsByUserId({ userId }: { userId: string }) {
  try {
    return await db.select().from(tokenBudget).where(eq(tokenBudget.userId, userId))
  } catch (error) {
    console.error("Failed to get all token budgets for user from database")
    throw error
  }
}

export async function upsertTokenBudget({
  userId,
  modelId,
  totalBudget,
}: {
  userId: string
  modelId: string
  totalBudget: number
}) {
  try {
    const [existingBudget] = await db
      .select()
      .from(tokenBudget)
      .where(and(eq(tokenBudget.userId, userId), eq(tokenBudget.modelId, modelId)))

    if (existingBudget) {
      return await db
        .update(tokenBudget)
        .set({
          totalBudget,
          updatedAt: new Date(),
        })
        .where(and(eq(tokenBudget.userId, userId), eq(tokenBudget.modelId, modelId)))
        .returning()
    }

    return await db
      .insert(tokenBudget)
      .values({
        userId,
        modelId,
        totalBudget,
        usedBudget: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  } catch (error) {
    console.error("Failed to upsert token budget in database")
    throw error
  }
}

export async function updateTokenUsage({
  userId,
  modelId,
  tokensUsed,
}: {
  userId: string
  modelId: string
  tokensUsed: number
}) {
  try {
    const [budget] = await db
      .select()
      .from(tokenBudget)
      .where(and(eq(tokenBudget.userId, userId), eq(tokenBudget.modelId, modelId)))

    if (!budget) {
      throw new Error(`No budget found for user ${userId} and model ${modelId}`)
    }

    return await db
      .update(tokenBudget)
      .set({
        usedBudget: budget.usedBudget + tokensUsed,
        updatedAt: new Date(),
      })
      .where(and(eq(tokenBudget.userId, userId), eq(tokenBudget.modelId, modelId)))
      .returning()
  } catch (error) {
    console.error("Failed to update token usage in database")
    throw error
  }
}

export async function createTokenRequest({
  userId,
  modelId,
  requestedAmount,
}: {
  userId: string
  modelId: string
  requestedAmount: number
}) {
  try {
    return await db
      .insert(tokenRequest)
      .values({
        userId,
        modelId,
        requestedAmount,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
  } catch (error) {
    console.error("Failed to create token request in database")
    throw error
  }
}

export async function getAllTokenRequests() {
  try {
    return await db
      .select({
        request: tokenRequest,
        user: {
          id: user.id,
          email: user.email,
        },
      })
      .from(tokenRequest)
      .innerJoin(user, eq(tokenRequest.userId, user.id))
      .where(eq(tokenRequest.status, "pending"))
      .orderBy(desc(tokenRequest.createdAt))
  } catch (error) {
    console.error("Failed to get all token requests from database")
    throw error
  }
}

export async function updateTokenRequestStatus({
  requestId,
  status,
}: {
  requestId: string
  status: "approved" | "rejected"
}) {
  try {
    const [updatedRequest] = await db
      .update(tokenRequest)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(tokenRequest.id, requestId))
      .returning()

    if (status === "approved" && updatedRequest) {
      // If approved, update the user's token budget
      await upsertTokenBudget({
        userId: updatedRequest.userId,
        modelId: updatedRequest.modelId,
        totalBudget:
          (
            await getTokenBudgetByUserIdAndModelId({
              userId: updatedRequest.userId,
              modelId: updatedRequest.modelId,
            })
          )?.totalBudget + updatedRequest.requestedAmount || updatedRequest.requestedAmount,
      })
    }

    return updatedRequest
  } catch (error) {
    console.error("Failed to update token request status in database")
    throw error
  }
}

import { sql } from "drizzle-orm"

export async function getTokenUsageData() {
  try {
    // Get time series data for token usage
    const timeSeriesData = await db
      .select({
        date: sql`DATE_TRUNC('day', ${tokenBudget.updatedAt})::date`,
        modelId: tokenBudget.modelId,
        userId: tokenBudget.userId,
        tokensUsed: sql`SUM(${tokenBudget.usedBudget})`,
      })
      .from(tokenBudget)
      .groupBy(sql`DATE_TRUNC('day', ${tokenBudget.updatedAt})::date`, tokenBudget.modelId, tokenBudget.userId)
      .orderBy(sql`DATE_TRUNC('day', ${tokenBudget.updatedAt})::date`)

    // Get available models
    const models = await db.select({ modelId: tokenBudget.modelId }).from(tokenBudget).groupBy(tokenBudget.modelId)

    // Get available users
    const users = await db
      .select({
        id: user.id,
        email: user.email,
      })
      .from(user)

    // Get top users by token usage
    const topUsers = await db
      .select({
        userId: tokenBudget.userId,
        email: user.email,
        tokensUsed: sql`SUM(${tokenBudget.usedBudget})`,
      })
      .from(tokenBudget)
      .innerJoin(user, eq(tokenBudget.userId, user.id))
      .groupBy(tokenBudget.userId, user.email)
      .orderBy(sql`SUM(${tokenBudget.usedBudget})`, "desc")
      .limit(10)

    return {
      timeSeriesData,
      availableModels: models.map((m) => m.modelId),
      availableUsers: users,
      topUsers,
    }
  } catch (error) {
    console.error("Failed to get token usage data from database")
    throw error
  }
}

export async function getUserTokenUsage() {
  try {
    // Get user token usage data
    const userTokenUsage = await db
      .select({
        id: user.id,
        email: user.email,
        lastActive: sql`MAX(${tokenBudget.updatedAt})`,
        totalTokensUsed: sql`SUM(${tokenBudget.usedBudget})`,
      })
      .from(user)
      .leftJoin(tokenBudget, eq(user.id, tokenBudget.userId))
      .groupBy(user.id, user.email)

    // For each user, get their model usage
    const result = await Promise.all(
      userTokenUsage.map(async (userData) => {
        const modelUsage = await db
          .select({
            modelId: tokenBudget.modelId,
            totalBudget: tokenBudget.totalBudget,
            usedBudget: tokenBudget.usedBudget,
          })
          .from(tokenBudget)
          .where(eq(tokenBudget.userId, userData.id))

        return {
          ...userData,
          modelUsage,
        }
      }),
    )

    return result
  } catch (error) {
    console.error("Failed to get user token usage from database")
    throw error
  }
}
