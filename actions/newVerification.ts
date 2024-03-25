"use server"

import { db } from "@/lib/db"
import { getUserByEmail } from "@/helpers/user"
import { getVerificationTokenByToken } from "@/helpers/verification-token"

export const newVerificaiont = async (token: string) => {

  // aquire token from verification email
  const existingToken = await getVerificationTokenByToken(token)

  // if user does not have a token
  if (!existingToken) {
    return {error: "Token does not exist!"}
  }

  // check if token has expired, old email.
  const hasExpired = new Date(existingToken.expires) < new Date()

  if(hasExpired) {
    return {error: "Token has expired"}
  }

  // look for user by checking the email sent in token
  const existingUser = await getUserByEmail(existingToken.email)

  if(!existingToken) {
    return {error: "Email does not exist"}
  }

  // use existingToken.email incase user changes email
  await db.user.update({
    where: {id: existingUser?.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })
  
  await db.verificationToken.delete({
    where: {id: existingToken.id}
  })

  return {success: "Email is verified"}
}