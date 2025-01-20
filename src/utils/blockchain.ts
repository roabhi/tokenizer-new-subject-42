import { createWalletClient, createPublicClient, http, parseUnits } from 'viem'
import { polygonAmoy } from 'wagmi/chains'
import { custom } from 'viem'

// ABI Import
import AltarianTokenABI from '@/abi/AltarianToken.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

// Initialize public client (for reading)
const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(),
})

// Initialize wallet client with window.ethereum
const walletClient =
  typeof window !== 'undefined'
    ? createWalletClient({
        chain: polygonAmoy,
        transport: window?.ethereum ? custom(window.ethereum) : http(),
      })
    : null

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

// /**
//  * Claim a ring on behalf of the student.
//  * @param walletAddress - The address of the wallet.
//  * @param ringId - The ID of the ring to be claimed.
//  */
// export const claimRing = async (walletAddress: string, ringId: number) => {
//   try {
//     // Ensure walletAddress is valid (starts with "0x")
//     const validWalletAddress = walletAddress.startsWith('0x')
//       ? walletAddress
//       : `0x${walletAddress}`

//     // Call the smart contract to claim the ring using the wallet client
//     const tx = await walletClient.writeContract({
//       address: CONTRACT_ADDRESS as `0x${string}`,
//       abi: AltarianTokenABI,
//       functionName: 'claimRing',
//       args: [ringId],
//       account: validWalletAddress as `0x${string}`, // Ensure the address is in the correct format
//     })

//     console.log('Claim Transaction:', tx)
//     return tx
//   } catch (error) {
//     console.error('Error claiming ring:', error)
//   }
// }

export const claimMultipleRings = async (
  nickname: string,
  rings: number[],
  rewardAmount: number,
  account: `0x${string}`
) => {
  if (!walletClient) {
    throw new Error('Wallet client not initialized')
  }

  try {
    const hash = await walletClient.writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: AltarianTokenABI,
      functionName: 'claimReward',
      args: [nickname, rings, parseUnits(rewardAmount.toString(), 18)],
      account,
    })

    // Wait for transaction using publicClient
    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    return receipt
  } catch (error) {
    console.error('Error in claimMultipleRings:', error)
    throw error
  }
}
