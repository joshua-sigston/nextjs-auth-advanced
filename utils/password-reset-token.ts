import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {

  try {
    const passwordResetToken = await db.resetToken.findUnique({
      where: {
        token
      }
    })
    return passwordResetToken
  } catch (error) {
    console.error(error)
  }
}

export const getPasswordResetTokenByEmail = async (email: string) => {

  try {
    const passwordResetToken = await db.resetToken.findFirst({
      where: {
        email
      }
    })
    return passwordResetToken
  } catch (error) {
    console.error(error)
  }
}