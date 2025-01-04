'use client'
import { signIn } from 'next-auth/react'

export default function SignInButton() {
  return (
    <button onClick={() => signIn('42-school')}>Sign in with 42 School</button>
  )
}
