"use client"

import Loading from "@/components/loading"
import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading, isAuthenticated, hasRole } = useAuth()
  const router = useRouter()
  const isAdmin = hasRole("Admin")

  useEffect(() => {
    if (isLoading) return
    if (!isAuthenticated) router.replace("/login")
    else if (!isAdmin) router.replace("/dashboard")
  }, [isLoading, isAuthenticated, isAdmin, router])

  if (isLoading || !user || !isAdmin) return <Loading />

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      {children}
    </div>
  )
}
