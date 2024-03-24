import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession['user']  & {
  role: UserRole
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

import {JWT} from "@auth/core/jwt"
import { UserRole } from "@prisma/client";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: "ADMIN" | "USER"
  }
}