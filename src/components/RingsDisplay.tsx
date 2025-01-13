'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getClaimedRings } from '@/utils/blockchain'
import { ringProjects } from '@/lib/constants/ringProjects'
import Image from 'next/image'

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

  useEffect(() => {
    const fetchClaimedRings = async () => {
      try {
        if (!isConnected || !walletAddress) {
          setRings([])
          setSelectedRings(new Set())
          return
        }

        const claimedRings = await getClaimedRings(userNickname, walletAddress)
        const allRings: Ring[] = Array.from({ length: 7 }, (_, i) => {
          const isClaimed = claimedRings.includes(i)
          const ringData = ringProjects.find((ring) => ring.ringId === i)
          const projects = ringData ? ringData.projects : []

          return {
            id: i,
            status: isClaimed ? 'claimed' : 'claimable',
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
          return acc + 1000
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

  const getRingAmount = (ringId: number) => {
    switch (ringId) {
      case 0: return 100
      case 1: return 150
      case 2: return 200
      case 3: return 250
      case 4: return 300
      case 5: return 350
      case 6: return 1000
      default: return 0
    }
  }

  const getTotalSelectedAmount = () => {
    return Array.from(selectedRings).reduce((acc, ringId) => acc + getRingAmount(ringId), 0)
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
            <h2 className="text-white text-2xl mb-2">Hello {userNickname}!</h2>
            <p className="text-[#71717A] text-center">
              Claim your rewards by selecting your completed rings
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 overflow-y-auto pr-4">
            <div className="space-y-4">
              {rings.map((ring) => (
                <div key={ring.id} className="bg-[#2A3144] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white text-lg">Ring {ring.id}</h3>
                      <p className={`text-sm ${
                        ring.status === 'claimable' ? 'text-[#70FFCF]' :
                        'text-[#FF7072]'
                      }`}>
                        {ring.status === 'claimable' 
                          ? `Claim ${getRingAmount(ring.id)} 42ALT Tokens`
                          : ring.status === 'claimed'
                          ? `Claimed for ${getRingAmount(ring.id)} 42ALT Tokens`
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
                      <div className={`w-12 h-6 rounded-full transition-colors  cursor-pointer  relative ${
                        selectedRings.has(ring.id) ? 'bg-[#70FFCF]' : 'bg-[#F0F6FF]'
                      } ${ring.status !== 'claimable' ? 'opacity-50' : ''}`}>
                        <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transform transition-transform bg-[#202537] ${
                          selectedRings.has(ring.id) ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       
      </div>
       {/* Claim Button */}
       <div className="flex justify-end mt-6">
          <button
            onClick={handleClaimAll}
            disabled={selectedRings.size === 0}
            className="bg-[#FFCF70] text-[#202537] px-6 py-3 rounded-lg font-bold uppercase disabled:opacity-50"
          >
            Claim rewards
          </button>
        </div>
      </div>
      
    </div>
  )
}
