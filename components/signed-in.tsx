"use client"

import { useAuth } from "@/providers/auth-provider"
import { Role } from "@/types/auth.types"

interface SignedInProps {
  children: React.ReactNode
  role?: Role | Role[]
}

const SignedIn = ({ role, children }: SignedInProps) => {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading || !user || !isAuthenticated) return

  const allowedRoles = role ? (Array.isArray(role) ? role : [role]) : null
  if (allowedRoles && !allowedRoles.includes(user.role)) return

  return children
}

export default SignedIn
