import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken?: string // Make the accessToken optional
    user?: FortyTwoProfile // Optionally extend user with FortyTwoProfile if you want to include it in session
  }
}

declare module 'next-auth/jwt' {
  /** Extended JWT interface */
  interface JWT {
    accessToken?: string // Include accessToken in JWT
    idToken?: string // If you need idToken, keep this
  }
}
