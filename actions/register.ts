"use server"

import { RegisterSchema } from '@/schemas'
import * as z from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { error } from 'console'
import { getUserByEmail } from '@/helpers/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values)

  if(!validatedField.success) {
    return {error: 'Invalid fields.'}
  }

  const {email, password, name} = validatedField.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if(existingUser) {
    return {error: 'Email already in use.'}
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  })

  return {success: "User created"}
}