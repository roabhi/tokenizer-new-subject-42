import { createWalletClient, createPublicClient, http } from 'viem'
import { polygonAmoy } from 'wagmi/chains'

// ABI Import
import AltarianTokenABI from '@/abi/AltarianToken.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

// Initialize public client (for reading)
const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(),
})

// Initialize wallet client (for writing transactions)
const walletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http(),
})

// blockchain.ts

export const getClaimedRings = async (
  userNickname: string,
  walletAddress: string
): Promise<number[]> => {
  try {
    const result = await publicClient.readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: AltarianTokenABI,
      functionName: 'getClaimedRings',
      args: [userNickname],
    })

    return (result as bigint[]).map((ring) => Number(ring))
  } catch (error) {
    console.error('Error fetching claimed rings:', error)
    return []
  }
}

/**
 * Claim a ring on behalf of the student.
 * @param walletAddress - The address of the wallet.
 * @param ringId - The ID of the ring to be claimed.
 */
export const claimRing = async (walletAddress: string, ringId: number) => {
  try {
    // Ensure walletAddress is valid (starts with "0x")
    const validWalletAddress = walletAddress.startsWith('0x')
      ? walletAddress
      : `0x${walletAddress}`

    // Call the smart contract to claim the ring using the wallet client
    const tx = await walletClient.writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: AltarianTokenABI,
      functionName: 'claimRing',
      args: [ringId],
      account: validWalletAddress as `0x${string}`, // Ensure the address is in the correct format
    })

    console.log('Claim Transaction:', tx)
    return tx
  } catch (error) {
    console.error('Error claiming ring:', error)
  }
}
