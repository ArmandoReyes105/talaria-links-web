"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { setUnauthorizedHandler } from "@/lib/api/client"
import { authService } from "@/services/auth-service"
import { LoginRequest, RegisterRequest, User } from "@/types/auth.types"

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  hasRole: (role: User["role"]) => boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null))

    authService
      .me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false))

    return () => setUnauthorizedHandler(null)
  }, [])

  const login = useCallback(async (data: LoginRequest) => {
    setUser(await authService.login(data))
  }, [])

  const register = useCallback(async (data: RegisterRequest) => {
    setUser(await authService.register(data))
  }, [])

  const logout = useCallback(async () => {
    try {
      await authService.logout()
    } finally {
      setUser(null)
    }
  }, [])

  const hasRole = useCallback((role: User["role"]) => user?.role === role, [user])

  const value = useMemo(
    () => ({ user, isLoading, isAuthenticated: !!user, hasRole, login, register, logout }),
    [user, isLoading, hasRole, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}