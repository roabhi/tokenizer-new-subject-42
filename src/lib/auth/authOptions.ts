import { NextAuthOptions } from 'next-auth'
import FortyTwoProvider from 'next-auth/providers/42-school'
import type { Account } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    FortyTwoProvider({
      clientId: process.env.FORTY_TWO_CLIENT_ID!,
      clientSecret: process.env.FORTY_TWO_CLIENT_SECRET!,
      authorization: { params: { scope: 'public' } },
    }),
  ],
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account?.access_token) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string | undefined
      return session
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      console.log(url)
      return baseUrl
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
