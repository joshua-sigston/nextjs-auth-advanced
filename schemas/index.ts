import * as z from 'zod'

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: "Password is required"
  }),
  code: z.optional(z.string())
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
})

export const ResetPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of six characters"
  }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(6, {
    message: "Minimum of six characters"
  }),
  name: z.string().min(3, {
    message: 'Name is required'
  })
})