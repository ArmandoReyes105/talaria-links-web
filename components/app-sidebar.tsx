"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  NAV_GROUPS,
  NavAudience,
  ROUTES_WITHOUT_SIDEBAR,
} from "@/lib/navigation"
import { useAuth } from "@/providers/auth-provider"
import { Link2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SKELETON_WIDTHS = ["70%", "55%", "80%"]

const AppSidebar = () => {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  if (ROUTES_WITHOUT_SIDEBAR.includes(pathname)) return null

  const audience: NavAudience = user?.role ?? "Guest"
  const closeOnMobile = () => setOpenMobile(false)

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          onClick={closeOnMobile}
          className="flex items-center gap-2 px-2 py-1.5 font-bold"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Link2 className="size-4" />
          </span>
          Talaria Links
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {isLoading ? (
          <SidebarGroup>
            <SidebarMenu>
              {SKELETON_WIDTHS.map((width) => (
                <SidebarMenuItem key={width}>
                  <div className="flex h-8 items-center gap-2 rounded-md px-2">
                    <Skeleton className="size-4 rounded-md" />
                    <Skeleton className="h-4" style={{ width }} />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          NAV_GROUPS[audience].map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={pathname === item.href}
                        tooltip={item.title}
                        onClick={closeOnMobile}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}
      </SidebarContent>

      {user && (
        <SidebarFooter>
          <div className="flex flex-col px-2 py-1.5 text-sm">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-muted-foreground">
              {user.role === "Admin" ? "Administrador" : "Usuario"}
            </span>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  )
}

export default AppSidebar
