'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Web3Provider } from './providers/WagmiProvider'
import { SessionProvider } from 'next-auth/react'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <Web3Provider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="max-w-container mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </Web3Provider>
    </SessionProvider>
  )
}
