'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getClaimedRings, claimMultipleRings } from '@/utils/blockchain'
import { ringProjects } from '@/lib/constants/ringProjects'
import Image from 'next/image'
import { checkRingEligibility } from '@/utils/eligibilityChecker'
import { toast } from 'react-hot-toast'

interface RingsDisplayProps {
  userNickname: string
  myProjects: any[]
  userImage: string
}

type RingStatus = 'claimed' | 'claimable' | 'unavailable'

interface Ring {
  id: number
  status: RingStatus
  projects: { id: number; name: string; validated: boolean }[]
}

export default function RingsDisplay({
  userNickname,
  myProjects,
  userImage,
}: RingsDisplayProps) {
  const { address: walletAddress, isConnected } = useAccount()
  const [rings, setRings] = useState<Ring[]>([])
  const [selectedRings, setSelectedRings] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState(false)

  const fetchClaimedRings = async () => {
    try {
      if (!isConnected || !walletAddress) {
        setRings([])
        setSelectedRings(new Set())
        return
      }

      const claimedRings = await getClaimedRings(userNickname, walletAddress)
      console.log('Claimed rings:', claimedRings)

      const allRings: Ring[] = Array.from({ length: 7 }, (_, i) => {
        // Check eligibility with all projects (filtering happens inside checkRingEligibility)
        const isEligible = checkRingEligibility(i, myProjects)
        console.log(`Ring ${i} - Is eligible:`, isEligible)

        // Check if claimed
        const isClaimed = claimedRings.includes(i)
        console.log(`Ring ${i} - Is claimed:`, isClaimed)

        const ringData = ringProjects.find((ring) => ring.ringId === i)
        const projects = ringData ? ringData.projects : []

        const status = isClaimed
          ? 'claimed'
          : isEligible
          ? 'claimable'
          : 'unavailable'

        console.log(`Ring ${i} - Final status:`, status)

        return {
          id: i,
          status,
          projects,
        }
      })

      setRings(allRings)
    } catch (error) {
      console.error('Error fetching claimed rings:', error)
    }
  }

  useEffect(() => {
    fetchClaimedRings()
  }, [userNickname, walletAddress, isConnected, myProjects])

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#202537] text-2xl">
          Please connect your wallet
        </div>
      </div>
    )
  }

  const handleClaim = async (ringId: number) => {
    try {
      console.log(`Claiming ring ${ringId}`)
      // Add your claim logic here
    } catch (error) {
      console.error('Error claiming ring:', error)
    }
  }

  // const toggleExpandRing = (ringId: number) => {
  //   setExpandedRing((prev) => {
  //     const newSet = new Set(prev)
  //     if (newSet.has(ringId)) {
  //       newSet.delete(ringId)
  //     } else {
  //       newSet.add(ringId)
  //     }
  //     return newSet
  //   })
  // }

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

  const handleClaimAll = async () => {
    try {
      if (!walletAddress || selectedRings.size === 0) {
        console.log('No wallet connected or no rings selected')
        return
      }

      const selectedRingsArray = Array.from(selectedRings)
      const totalAmount = selectedRingsArray.reduce((acc, ringId) => {
        return acc + getRingAmount(ringId)
      }, 0)

      console.log('Attempting to claim with:', {
        nickname: userNickname,
        rings: selectedRingsArray,
        amount: totalAmount,
        wallet: walletAddress,
      })

      await handleClaimRings()
    } catch (error) {
      console.error('Error claiming rings:', error)
    }
  }

  const handleClaimRings = async () => {
    try {
      setIsLoading(true)
      const ringsToClaimArray = Array.from(selectedRings)

      const rewardAmount = Array.from(selectedRings).reduce(
        (acc, ringId) => acc + getRingAmount(ringId),
        0
      )

      const receipt = await claimMultipleRings(
        userNickname,
        ringsToClaimArray,
        rewardAmount,
        walletAddress as `0x${string}`
      )

      if (receipt.status === 'success') {
        await fetchClaimedRings()
        setSelectedRings(new Set())
        toast.success('Rings claimed successfully!')
      } else {
        toast.error('Transaction failed')
      }
    } catch (error) {
      console.error('Error claiming rings:', error)
      toast.error('Failed to claim rings')
    } finally {
      setIsLoading(false)
    }
  }

  const getRingAmount = (ringId: number) => {
    switch (ringId) {
      case 0:
        return 100
      case 1:
        return 150
      case 2:
        return 200
      case 3:
        return 250
      case 4:
        return 300
      case 5:
        return 350
      case 6:
        return 1000
      default:
        return 0
    }
  }

  const getTotalSelectedAmount = () => {
    return Array.from(selectedRings).reduce(
      (acc, ringId) => acc + getRingAmount(ringId),
      0
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <div className="min-w-[49.375rem] h-[29.6875rem] bg-[#202537] rounded-[1rem] p-8 flex flex-col z-10 shadow-[0_0.25rem_1.125rem_rgba(0,0,0,0.25)]">
          <div className="flex h-full">
            {/* Left Section */}
            <div className="flex-1 flex flex-col items-center justify-center pr-8">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-6 border-[0.625rem] border-[#4A5062]">
                <Image
                  src={userImage}
                  alt={userNickname}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-white text-2xl mb-2">
                Hello <b>{userNickname}</b>!
              </h2>
              <p className="text-[#71717A] text-center">
                Claim your rewards by selecting your completed rings
              </p>
              {selectedRings.size > 0 && (
                <button
                  onClick={handleClaimRings}
                  disabled={isLoading}
                  className="mt-4 bg-[#70FFCF] text-[#202537] px-6 py-2 rounded-lg font-semibold hover:bg-[#5CDEB3] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? 'Claiming...'
                    : `Claim ${getTotalSelectedAmount()} 42ALT Tokens`}
                </button>
              )}
            </div>

            {/* Right Section */}
            <div className="flex-1 overflow-y-auto pr-4">
              <div className="space-y-4">
                {rings.map((ring) => (
                  <div key={ring.id} className="bg-[#2A3144] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white text-lg">Ring {ring.id}</h3>
                        <p
                          className={`text-sm ${
                            ring.status === 'claimable'
                              ? 'text-[#70FFCF]'
                              : 'text-[#FF7072]'
                          }`}
                        >
                          {ring.status === 'claimable'
                            ? `Claim ${getRingAmount(ring.id)} 42ALT Tokens`
                            : ring.status === 'claimed'
                            ? `Claimed for ${getRingAmount(
                                ring.id
                              )} 42ALT Tokens`
                            : 'Not claimable yet'}
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={selectedRings.has(ring.id)}
                          onChange={() => handleCheckboxChange(ring.id)}
                          disabled={ring.status !== 'claimable'}
                          className="hidden"
                        />
                        <div
                          className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                            selectedRings.has(ring.id) &&
                            ring.status === 'claimable'
                              ? 'bg-[#70FFCF]'
                              : ring.status === 'claimed'
                              ? 'bg-[#4A5062] opacity-65'
                              : 'bg-[#363C4F] opacity-65'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full transform transition-transform duration-200 ease-in-out translate-y-0.5 ${
                              ring.status === 'claimable'
                                ? 'bg-white'
                                : 'bg-[#202537]'
                            } ${
                              selectedRings.has(ring.id) &&
                              ring.status === 'claimable'
                                ? 'translate-x-7'
                                : 'translate-x-0.5'
                            }`}
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
