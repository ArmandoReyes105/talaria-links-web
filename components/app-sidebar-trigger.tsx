"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ROUTES_WITHOUT_SIDEBAR } from "@/lib/navigation"
import { usePathname } from "next/navigation"

const AppSidebarTrigger = () => {
  const pathname = usePathname()
  if (ROUTES_WITHOUT_SIDEBAR.includes(pathname)) return null
  return <SidebarTrigger />
}

export default AppSidebarTrigger
