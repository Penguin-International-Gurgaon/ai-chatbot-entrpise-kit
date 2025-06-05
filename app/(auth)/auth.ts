import { compare } from "bcrypt-ts"
import NextAuth, { type User, type Session } from "next-auth"
import Credentials from "next-auth/providers/credentials"

import { getUser } from "@/lib/db/queries"

import { authConfig } from "./auth.config"
import { DUMMY_PASSWORD } from "@/lib/constants"

interface ExtendedSession extends Session {
  user: User & { is_admin?: boolean }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const users = await getUser(email)

        if (users.length === 0) {
          await compare(password, DUMMY_PASSWORD)
          return null
        }

        const [user] = users

        if (!user.password) {
          await compare(password, DUMMY_PASSWORD)
          return null
        }

        const passwordsMatch = await compare(password, user.password)

        if (!passwordsMatch) return null

        return {
          id: user.id,
          email: user.email,
          is_admin: user.is_admin,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.is_admin = (user as any).is_admin
      }

      return token
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession
      token: any
    }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.is_admin = token.is_admin as boolean
      }

      return session
    },
  },
})
