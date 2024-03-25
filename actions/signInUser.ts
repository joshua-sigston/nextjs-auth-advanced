"use server"

import { SignInSchema } from '@/schemas'
import * as z from 'zod'
import { signIn } from '@/auth'
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { generateVerificationToken } from '@/lib/tokens'
import { getUserByEmail } from '@/helpers/user'
import { sendVerificationEmail } from '@/lib/mail'

export const signInUser = async (values: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(values)

  if(!validatedFields.success) {
    return {error: 'Invalid fields.'}
  }

  const {email, password} = validatedFields.data

  const existingUser = await getUserByEmail(email)
  console.log(existingUser)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {error: "Email does not exist."}
  }
  
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)

    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: "Confirmation email sent."}
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