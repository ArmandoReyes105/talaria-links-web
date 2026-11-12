"use client"

import { useAuth } from "@/providers/auth-provider"

interface SignedOutProps {
  children: React.ReactNode
}

const SignedOut = ({ children }: SignedOutProps) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading || user || isAuthenticated) return
  return children
}

export default SignedOut
