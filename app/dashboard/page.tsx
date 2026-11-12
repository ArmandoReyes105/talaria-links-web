"use client"

import { useAuth } from "@/providers/auth-provider"
import CreateShortUrlForm from "./components/create-short-url-form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Loading from "@/components/loading"

const DashboardPage = () => {
  const { isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) router.replace("/login")
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) return <Loading />

  return (
    <div className="mx-auto max-w-7xl pt-4">
      <h1>Mis Enlaces</h1>
      <span>Crea, modifica y elimina tus enlaces cortos</span>
      <CreateShortUrlForm />
    </div>
  )
}

export default DashboardPage
