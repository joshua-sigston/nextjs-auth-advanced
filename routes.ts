/** 
 * routes accessible to the public
 * do not require authentication
 * @type {string[]}
*/
export const publicRoutes = ['/', '/auth/new-verification']

export const authRoutes = ['/auth/signIn', '/auth/register', '/auth/error', '/auth/reset', '/auth/new-password']

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_SIGNIN_REDIRECT = '/settings'