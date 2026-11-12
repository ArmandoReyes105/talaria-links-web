import { Role } from "@/types/auth.types"
import {
  Globe,
  Home,
  Link2,
  LogIn,
  LucideIcon,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export type NavAudience = "Guest" | Role

export const ROUTES_WITHOUT_SIDEBAR = ["/login", "/register"]

const EXPLORE_GROUP: NavGroup = {
  label: "Explorar",
  items: [
    { title: "Inicio", href: "/", icon: Home },
    { title: "Enlaces públicos", href: "/#explore", icon: Globe },
  ],
}

const MY_LINKS_GROUP: NavGroup = {
  label: "Mi cuenta",
  items: [{ title: "Mis enlaces", href: "/dashboard", icon: Link2 }],
}

export const NAV_GROUPS: Record<NavAudience, NavGroup[]> = {
  Guest: [
    {
      ...EXPLORE_GROUP,
      items: [
        ...EXPLORE_GROUP.items,
        { title: "Roles", href: "/#plans", icon: ShieldCheck },
      ],
    },
    {
      label: "Cuenta",
      items: [
        { title: "Iniciar sesión", href: "/login", icon: LogIn },
        { title: "Crear cuenta", href: "/register", icon: UserPlus },
      ],
    },
  ],
  User: [MY_LINKS_GROUP, EXPLORE_GROUP],
  Admin: [
    MY_LINKS_GROUP,
    {
      label: "Administración",
      items: [
        { title: "Usuarios", href: "/admin/users", icon: Users },
        { title: "Todos los enlaces", href: "/admin/links", icon: Link2 },
      ],
    },
    EXPLORE_GROUP,
  ],
}
