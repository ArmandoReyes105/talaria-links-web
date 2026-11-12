"use client"

import { useAuth } from "@/providers/auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/loading"
import MyLinks from "./components/my-links"

const DashboardPage = () => {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.replace("/login")
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) return <Loading />

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col justify-center gap-4 p-4">
      <div>
        <h1 className="font-mono text-xl font-bold">Mis Enlaces</h1>
        <span className="text-sm text-muted-foreground">
          Crea, modifica y elimina tus enlaces cortos
        </span>
      </div>
      <MyLinks />
    </div>
  )
}

export default DashboardPage
