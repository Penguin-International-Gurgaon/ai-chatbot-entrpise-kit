"use server"

import { auth } from "@/app/(auth)/auth"
import { redirect } from "next/navigation"
import {
  updateUserAdminStatus as dbUpdateUserAdminStatus,
  upsertTokenBudget as dbUpsertTokenBudget,
  updateTokenRequestStatus as dbUpdateTokenRequestStatus,
} from "@/lib/db/queries"

// Helper function to check if the current user is an admin
async function checkAdmin() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const user = session.user as any
  if (!user.is_admin) {
    throw new Error("Unauthorized: Admin access required")
  }

  return user
}

export async function updateUserAdminStatus({
  userId,
  is_admin,
}: {
  userId: string
  is_admin: boolean
}) {
  await checkAdmin()
  return await dbUpdateUserAdminStatus({ userId, is_admin })
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
  await checkAdmin()
  return await dbUpsertTokenBudget({ userId, modelId, totalBudget })
}

export async function updateTokenRequestStatus({
  requestId,
  status,
}: {
  requestId: string
  status: "approved" | "rejected"
}) {
  await checkAdmin()
  return await dbUpdateTokenRequestStatus({ requestId, status })
}

export async function updateUserTokenBudget({
  userId,
  modelId,
  totalBudget,
}: {
  userId: string
  modelId: string
  totalBudget: number
}) {
  await checkAdmin()
  return await dbUpsertTokenBudget({ userId, modelId, totalBudget })
}

export async function setTokenBudgetToZero({
  userId,
  modelId,
}: {
  userId: string
  modelId: string
}) {
  await checkAdmin()
  return await dbUpsertTokenBudget({ userId, modelId, totalBudget: 0 })
}

export async function bulkUpdateTokenBudget({
  userIds,
  modelId,
  totalBudget,
}: {
  userIds: string[]
  modelId: string
  totalBudget: number
}) {
  await checkAdmin()

  const results = await Promise.all(userIds.map((userId) => dbUpsertTokenBudget({ userId, modelId, totalBudget })))

  return results
}

export async function bulkSetTokenBudgetToZero({
  userIds,
  modelIds,
}: {
  userIds: string[]
  modelIds: string[]
}) {
  await checkAdmin()

  const results = await Promise.all(
    userIds.flatMap((userId) => modelIds.map((modelId) => dbUpsertTokenBudget({ userId, modelId, totalBudget: 0 }))),
  )

  return results
}

export async function bulkUpdateTokenRequestStatus({
  requestIds,
  status,
}: {
  requestIds: string[]
  status: "approved" | "rejected"
}) {
  await checkAdmin()

  const results = await Promise.all(requestIds.map((requestId) => dbUpdateTokenRequestStatus({ requestId, status })))

  return results
}
