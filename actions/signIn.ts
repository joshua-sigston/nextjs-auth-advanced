"use server"

import { SignInSchema } from '@/schemas'
import * as z from 'zod'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  const validatedField = SignInSchema.safeParse(values)

  if(!validatedField.success) {
    return {error: 'Invalid fields.'}
  }

  return {success: "Email sent."}
}