import Link from "next/link"
import SignedIn from "./signed-in"
import SignedOut from "./signed-out"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <nav className="flex h-12 items-center justify-between bg-secondary px-4">
      <span className="font-bold">Talaria Links</span>

      <div className="flex items-center gap-4">
        <SignedIn>
          <Link className="underline" href={"/dashboard"}>
            Ir a dashboard
          </Link>
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
