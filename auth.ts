import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {UserRole} from '@prisma/client'
import { db } from "./lib/db"
import {PrismaAdapter} from '@auth/prisma-adapter'
import { getUserById } from "./utils/user" 
import { getTwoFactorConfirmationByUserId } from "./utils/two-factor-confirmation"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages: {
    signIn: '/auth/signIn',
    error: '/auth/error'
  },
  events: {
    async linkAccount({user}) {
      await db.user.update({
        where: {id: user.id},
        data: {emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({user, account}) {
      // Allow OAuth without email verification
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id as string)

      // blocks user from signing in without verifiying their email
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        console.log('twoFactorConfirmation: ' + {twoFactorConfirmation})
        if(!twoFactorConfirmation) return false

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        })
      }
      
      return true
    },
    async session({token, session}) {
      // console.log({sessionToken: token, session})
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({token}) {
      // console.log({token})
      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.role = existingUser.role

      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
})