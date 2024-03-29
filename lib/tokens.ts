import { getVerificationTokenByEmail } from '@/utils/verification-token'
import { getPasswordResetTokenByEmail } from '@/utils/password-reset-token'
import {v4 as uuidv4} from 'uuid'
import { db } from './db'

export const generatePasswordResetToken = async (email: string) => {

  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getPasswordResetTokenByEmail(email)

  if (existingToken) {
    await db.resetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const passwordResetToken = await db.resetToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return passwordResetToken
}

export const generateVerificationToken = async (email: string) => {
  
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires
    }
  })

  return verificationToken
}