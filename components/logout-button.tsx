"use client"

import { useAuth } from "@/providers/auth-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "./ui/button"

const LogoutButton = () => {
  const { logout } = useAuth()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logout().catch(() => null)
    setIsLoggingOut(false)
    router.replace("/")
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
    </Button>
  )
}

export default LogoutButton
