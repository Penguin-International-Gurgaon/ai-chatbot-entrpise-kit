import type React from "react"
import { auth } from "@/app/(auth)/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Check if user is admin
  const user = session.user as any
  if (!user.is_admin) {
    redirect("/")
  }

  return <div className="flex min-h-screen flex-col">{children}</div>
}
