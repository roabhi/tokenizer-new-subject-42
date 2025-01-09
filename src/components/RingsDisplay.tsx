import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi' // Import useAccount hook from wagmi
import { getClaimedRings } from '@/utils/blockchain'
import { ringProjects } from '@/lib/constants/ringProjects' // Import the ringProjects

interface RingsDisplayProps {
  userNickname: string
  myProjects: any[] // Adjust the type if you have a specific type for your projects
}

type RingStatus = 'claimed' | 'claimable' | 'unavailable'

interface Ring {
  id: number
  status: RingStatus
  projects: { id: number; name: string; validated: boolean }[] // Projects in each ring
}

export default function RingsDisplay({
  userNickname,
  myProjects,
}: RingsDisplayProps) {
  const [rings, setRings] = useState<Ring[]>([])
  const { address: walletAddress, isConnected } = useAccount()

  const [expandedRing, setExpandedRing] = useState<Set<number>>(new Set())
  const [selectedRings, setSelectedRings] = useState<Set<number>>(new Set())

  useEffect(() => {
    const fetchClaimedRings = async () => {
      try {
        if (!isConnected || !walletAddress) {
          console.warn('Wallet not connected. Cannot fetch claimed rings.')
          return
        }

        // Get the claimed rings for the user
        const claimedRings = await getClaimedRings(userNickname, walletAddress)

        // Generate all 7 rings and determine their statuses
        const allRings: Ring[] = Array.from({ length: 7 }, (_, i) => {
          const isClaimed = claimedRings.includes(i)

          const ringData = ringProjects.find((ring) => ring.ringId === i)
          const projects = ringData ? ringData.projects : []

          return {
            id: i,
            status: isClaimed ? 'claimed' : 'claimable', // Explicitly set the status
            projects,
          }
        })

        setRings(allRings)
      } catch (error) {
        console.error('Error fetching claimed rings:', error)
      }
    }

    fetchClaimedRings()
  }, [userNickname, walletAddress, isConnected])

  const handleClaim = async (ringId: number) => {
    try {
      console.log(`Claiming ring ${ringId}`)
      // Add your claim logic here
    } catch (error) {
      console.error('Error claiming ring:', error)
    }
  }

  const toggleExpandRing = (ringId: number) => {
    setExpandedRing((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(ringId)) {
        newSet.delete(ringId)
      } else {
        newSet.add(ringId)
      }
      return newSet
    })
  }

  const handleCheckboxChange = (ringId: number) => {
    setSelectedRings((prevSelectedRings) => {
      const newSet = new Set(prevSelectedRings)
      if (newSet.has(ringId)) {
        newSet.delete(ringId)
      } else {
        newSet.add(ringId)
      }
      return newSet
    })
  }

  const handleClaimAll = () => {
    // Handle claim for all selected rings
    const amount = Array.from(selectedRings).reduce((acc, ringId) => {
      switch (ringId) {
        case 0:
          return acc + 100
        case 1:
          return acc + 150
        case 2:
          return acc + 200
        case 3:
          return acc + 250
        case 4:
          return acc + 300
        case 5:
          return acc + 350
        case 6:
          return acc + 500
        default:
          return acc
      }
    }, 0)

    console.log(
      `Claiming rings: ${Array.from(
        selectedRings
      )} with total amount: ${amount}`
    )
    // Add your transaction logic here with the selected rings and the calculated amount
  }

  return (
    <div className="max-w-[74rem] mx-auto">
      {/* <h2 className="text-center mb-8">Claimed Rings</h2> */}

      {isConnected ? (
        <>
          {/* Parent container with flex for all rings */}
          <div className="flex gap-16">
            {/* Left column: Rings 0, 1, 2 */}
            <div className="flex flex-col w-1/2 gap-8">
              {rings.slice(0, 3).map((ring) => (
                <div
                  key={ring.id}
                  className="flex justify-between items-center space-x-8 p-4 border-b"
                >
                  {/* Left column: Title and expandable project list */}
                  <div className="flex flex-col w-3/4 items-start">
                    <h3
                      className="text-xl font-bold cursor-pointer mb-4"
                      onClick={() => toggleExpandRing(ring.id)}
                    >
                      Ring {ring.id}{' '}
                      {ring.status === 'claimed' ? '(Claimed)' : '(Claimable)'}
                    </h3>

                    {expandedRing.has(ring.id) && (
                      <div className="pl-4 mt-2">
                        <h4 className="text-lg font-semibold">Projects</h4>
                        <ul>
                          {ring.projects.map((project) => (
                            <li
                              key={project.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={project.validated}
                                disabled={!project.validated}
                                onChange={() => {}}
                              />
                              <span>{project.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right column: Checkbox for claim */}
                  <div className="flex items-center justify-end w-1/4">
                    <input
                      type="checkbox"
                      checked={selectedRings.has(ring.id)}
                      onChange={() => handleCheckboxChange(ring.id)}
                      disabled={ring.status === 'claimed'}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Right column: Rings 3, 4, 5, 6 */}
            <div className="flex flex-col w-1/2 gap-8">
              {rings.slice(3).map((ring) => (
                <div
                  key={ring.id}
                  className="flex justify-between items-center space-x-8 p-4 border-b"
                >
                  {/* Left column: Title and expandable project list */}
                  <div className="flex flex-col w-3/4 items-start">
                    <h3
                      className="text-xl font-bold cursor-pointer mb-4"
                      onClick={() => toggleExpandRing(ring.id)}
                    >
                      Ring {ring.id}{' '}
                      {ring.status === 'claimed' ? '(Claimed)' : '(Claimable)'}
                    </h3>

                    {expandedRing.has(ring.id) && (
                      <div className="pl-4 mt-2">
                        <h4 className="text-lg font-semibold">Projects</h4>
                        <ul>
                          {ring.projects.map((project) => (
                            <li
                              key={project.id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                checked={project.validated}
                                disabled={!project.validated}
                                onChange={() => {}}
                              />
                              <span>{project.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right column: Checkbox for claim */}
                  <div className="flex items-center justify-end w-1/4">
                    <input
                      type="checkbox"
                      checked={selectedRings.has(ring.id)}
                      onChange={() => handleCheckboxChange(ring.id)}
                      disabled={ring.status === 'claimed'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* "Claim All Selected" Button */}
          <div className="flex justify-center mt-8 mb-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded"
              onClick={handleClaimAll}
              disabled={selectedRings.size === 0}
            >
              Claim All Selected Rings
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600">
          Please connect your wallet to view and claim rings
        </div>
      )}
    </div>
  )

  
}
