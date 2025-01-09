'use client'

// ? imports from next

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { ProjectUser, ProjectsUserList } from '../../types/42api'

import RingsDisplay from '@/components/RingsDisplay'
import SignInButton from '@/components/SignInButton'
// import { ConnectKitButton } from 'connectkit'

// ? entry point

export default function HomePage() {
  const [userName, setUserName] = useState('')

  const [userNickname, setUserNickname] = useState<string>('') // Store user nickname
  const [myProjects, setMyProjects] = useState<ProjectUser[]>([]) // Store projects data
  const [metamaskAccount, setMetamaskAccount] = useState<string | null>(null) // Store MetaMask account

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Don't redirect during loading
    if (!session) {
      router.push('/auth') // Redirect to auth if not authenticated
    }

    if (session && session?.accessToken) {
      console.log('session token is ', session.accessToken)

      const fetchData = async () => {
        const response = await fetch(
          `/api/42proxy?accessToken=${session.accessToken}`
        )

        // Check for a successful response
        if (!response.ok) {
          console.error('Failed to fetch data:', response.statusText)
          return
        }

        const data = await response.json()
        console.log(data)

        setUserName(data.first_name)
        setUserNickname(data.login) // Set user nickname
        setMyProjects(data.projects_users || [])

        const projectsData: ProjectsUserList = data.projects_users

        // console.log(projectsData)

        if (projectsData?.projects_users?.length > 0) {
          projectsData.projects_users.forEach((userProject) => {
            const isCompleted =
              userProject.status === 'completed' ||
              userProject.validated === true
            const isInProgress =
              userProject.status === 'in_progress' &&
              userProject.validated === null

            console.log(
              `Project ${userProject.project.name} is ${
                isCompleted
                  ? 'Completed'
                  : isInProgress
                  ? 'In Progress'
                  : 'Not Started'
              }`
            )
          })
        } else {
          console.error('No project data yet')
        }
      }

      fetchData()
    }
  }, [session, status, router])

  // Callback for when MetaMask is connected
  const handleMetamaskConnected = (account: string) => {
    setMetamaskAccount(account)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* {session && (
        <div className="absolute top-4 right-4">
          <ConnectKitButton />
        </div>
      )} */}
      <h1 className="max-w-[40rem] mx-auto w-full text-3xl font-bold mb-4 text-center">
        Claim your Rewards for completing your Common Core rings!
      </h1>
      <p className="mb-6">Hello {userName}!</p>

      {/* Render SignInButton if the user is not authenticated */}
      {!session ? (
        <SignInButton />
      ) : (
        <>
          {/* Render MetamaskButton only after the user is authenticated with 42 */}
          {/* <MetamaskButton onConnected={handleMetamaskConnected} /> */}

          {/* If MetaMask is connected, display the account */}
          {/* {metamaskAccount && (
            <p className="text-green-600 mt-4">
              MetaMask Connected: {metamaskAccount}
            </p>
          )} */}

          {/* Render RingsDisplay if the user is authenticated and has projects data */}
          <RingsDisplay userNickname={userNickname} myProjects={myProjects} />
        </>
      )}
    </div>
  )
}
