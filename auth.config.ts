import Credentials from 'next-auth/providers/credentials'
import { SignInSchema } from './schemas'
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from './helpers/user'
import bcrypt from 'bcryptjs'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = SignInSchema.safeParse(credentials)

        if (validateFields.success) {
          const {email, password} = validateFields.data

          const user = await getUserByEmail(email)

          if(!user || !user.password) return null

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) return user
        }
        return null
      }
    })
  ],
} satisfies NextAuthConfig