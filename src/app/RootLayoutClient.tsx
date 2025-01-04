'use client'

import { SessionProvider } from 'next-auth/react'
// import '@/styles/globals.css'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return <SessionProvider>{children}</SessionProvider>
}
