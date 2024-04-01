"use server"

import { SignInSchema } from '@/schemas'
import * as z from 'zod'
import { signIn } from '@/auth'
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/utils/user'
import { sendVerificationEmail, sendTwoFactorTokenEmail } from '@/lib/mail'
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens'
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token'
import { db } from '@/lib/db'
import { getTwoFactorConfirmationByUserId } from '@/utils/two-factor-confirmation'

export const signInUser = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values)

  if(!validatedFields.success) {
    return {error: 'Invalid fields.'}
  }

  const {email, password, code} = validatedFields.data

  const existingUser = await getUserByEmail(email)
  console.log(existingUser)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Email does not exist."}
  }
  
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    // if not verified, send email again to verify
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: "Confirmation email sent."}
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken) {
        return {error: "Invalid Code."}
      }

      if (twoFactorToken.token !== code) {
        return {error: "Invalid Code."}
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return {error: "Code has expired."}
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        })
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )
  
      return {twoFactor: true}
    }
  }

  try {
    console.log('in try catch')
    await signIn("credentials", { email, password, redirectTo: DEFAULT_SIGNIN_REDIRECT})
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Invalid credentials"}
        default:
          return {error: "Something went wrong."}
      }
    }

    throw error
  }
}