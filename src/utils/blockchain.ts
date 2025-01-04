import { createPublicClient, http } from 'viem'
import { polygonAmoy } from 'wagmi/chains'

// ABI Import
import AltarianTokenABI from '@/abi/AltarianToken.json'

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

// Initialize viem clients
const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http(),
})

/**
 * Fetch claimed rings for a student by nickname.
 * @param userNickname - The nickname of the student.
 * @returns Array of claimed ring numbers.
 */
export const getClaimedRings = async (
  userNickname: string,
  walletAddress: string
): Promise<number[]> => {
  try {
    if (!walletAddress) {
      throw new Error('No connected wallet address provided.')
    }

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
