'use client' // This ensures the component is rendered on the client side

import { signIn } from 'next-auth/react'

export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Authenticate</h1>
      <p className="mb-6">Please sign in to access your data.</p>
      <button
        onClick={() => signIn('42-school')}
        className="px-4 py-2 bg-[#202537] text-white rounded"
      >
        Sign in with 42
      </button>
    </div>
  )
}
