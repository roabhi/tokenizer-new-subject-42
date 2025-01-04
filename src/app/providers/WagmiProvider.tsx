'use client' // ? This is a client component

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, createConfig, WagmiProvider } from 'wagmi'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { polygonAmoy } from 'wagmi/chains'

const config = createConfig(
  getDefaultConfig({
    // ? array of chains
    chains: [polygonAmoy],
    // ? RPC URL for each chain
    transports: {
      [polygonAmoy.id]: http(
        `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`
      ),
    },

    // ? Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',

    // ? Required App Info
    appName: 'Swap app build upon sepolia testnet and 0x api',
    // ? Optional Info
    appDescription: 'Swap App',
    appUrl: 'https://localhost:3000',
    appIcon: 'https://localhost:300/swap-icon-512-512.png',
  })
)

// ? use tanstack for querying / catching, etc...
const queryClient = new QueryClient()

// ? Return the jsx with the Contexts hierarchy in order Wagmi -> Tanstack -> ConnectKit

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
