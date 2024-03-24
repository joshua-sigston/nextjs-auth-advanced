/** 
 * routes accessible to the public
 * do not require authentication
 * @type {string[]}
*/
export const publicRoutes = ['/']

export const authRoutes = ['/auth/signIn', '/auth/register', '/auth/error']

export const apiAuthPrefix = '/api/auth'

export const DEFAULT_SIGNIN_REDIRECT = '/settings'