import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi' // Import useAccount hook from wagmi
import { getClaimedRings } from '@/utils/blockchain'

interface RingsDisplayProps {
  userNickname: string
  myProjects: any[] // Adjust the type if you have a specific type for your projects
}

export default function RingsDisplay({
  userNickname,
  myProjects,
}: RingsDisplayProps) {
  const [claimedRings, setClaimedRings] = useState<number[]>([])
  const { address: walletAddress, isConnected } = useAccount()

  useEffect(() => {
    const fetchClaimedRings = async () => {
      try {
        if (!isConnected || !walletAddress) {
          console.warn('Wallet not connected. Cannot fetch claimed rings.')
          return
        }

        const rings = await getClaimedRings(userNickname, walletAddress)
        setClaimedRings(rings)
      } catch (error) {
        console.error('Error fetching claimed rings:', error)
      }
    }

    fetchClaimedRings()
  }, [userNickname, walletAddress, isConnected])

  return (
    <div>
      <h2>Claimed Rings</h2>
      {isConnected ? (
        claimedRings.length > 0 ? (
          <ul>
            {claimedRings.map((ring, index) => (
              <li key={index}>Ring {ring}</li>
            ))}
          </ul>
        ) : (
          <p>No rings claimed yet.</p>
        )
      ) : (
        <p>Please connect your wallet to view claimed rings.</p>
      )}
    </div>
  )
}
