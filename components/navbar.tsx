import Link from "next/link"
import AppSidebarTrigger from "./app-sidebar-trigger"
import LogoutButton from "./logout-button"
import SignedIn from "./signed-in"
import SignedOut from "./signed-out"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-background px-4">
      <AppSidebarTrigger />

      <div className="ml-auto flex items-center gap-4">
        <SignedIn>
          <LogoutButton />
        </SignedIn>

        <SignedOut>
          <Link className="underline" href={"/login"}>
            Iniciar sesión
          </Link>

          <Link href={"/register"}>
            <Button>Crear cuenta</Button>
          </Link>
        </SignedOut>
      </div>
    </nav>
  )
}

export default Navbar
