"use server"

import { getUserByEmail } from '@/utils/user'
import { ResetSchema } from '@/schemas'
import * as z from 'zod'
import { sendPasswordResetEmeail } from '@/lib/mail'
import { generatePasswordResetToken } from '@/lib/tokens'

export const reset = async (values: z.infer<typeof ResetSchema>) => {

  const validatedFields = ResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return{error: "Invalid email."}
  }

  const {email} = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {error: "User not found!"}
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  await sendPasswordResetEmeail(passwordResetToken.email, passwordResetToken.token)

  return {success: "Email sent."}
}