"use client"

import Link from "next/link"
import { Check, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import SignedOut from "@/components/signed-out"
import SignedIn from "@/components/signed-in"

interface Feature {
  text: string
  included: boolean
}

interface Role {
  name: string
  description: string
  features: Feature[]
  highlighted?: boolean
}

const ROLES: Role[] = [
  {
    name: "Invitado",
    description: "Sin cuenta",
    features: [
      { text: "Ver enlaces públicos", included: true },
      { text: "Ordenar por más clicados o recientes", included: true },
      { text: "Acortar enlaces", included: false },
      { text: "Editar y eliminar enlaces", included: false },
      { text: "Contador de clics", included: false },
    ],
  },
  {
    name: "Usuario",
    description: "Cuenta gratuita con email",
    highlighted: true,
    features: [
      { text: "Todo lo del invitado", included: true },
      { text: "Acortar enlaces", included: true },
      { text: "Editar y eliminar tus enlaces", included: true },
      { text: "Enlaces públicos o privados", included: true },
      { text: "Filtrar tus enlaces", included: true },
      { text: "Contador de clics por enlace", included: true },
    ],
  },
  {
    name: "Administrador",
    description: "Permisos de moderación",
    features: [
      { text: "Todo lo del usuario", included: true },
      { text: "Ver cualquier enlace", included: true },
      { text: "Eliminar cualquier enlace", included: true },
      { text: "Registro público", included: false },
    ],
  },
]

const RoleCard = ({ role }: { role: Role }) => {
  const mutedText = role.highlighted
    ? "text-primary-foreground/80"
    : "text-secondary-foreground/70"

  return (
    <Card
      className={cn(
        "w-full max-w-sm flex-1 gap-6",
        role.highlighted
          ? "bg-primary py-10 text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      )}
    >
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl font-bold">{role.name}</CardTitle>
        <CardDescription className={mutedText}>
          {role.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="space-y-3">
          {role.features.map((feature) => (
            <li
              key={feature.text}
              className={cn(
                "flex items-center gap-2.5",
                !feature.included && "opacity-60"
              )}
            >
              {feature.included ? (
                <Check className="size-4 shrink-0" aria-hidden="true" />
              ) : (
                <X className="size-4 shrink-0" aria-hidden="true" />
              )}
              <span>
                <span className="">
                  {feature.included ? "Incluido: " : "No incluido: "}
                </span>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      {role.highlighted && (
        <CardFooter className="border-0 bg-transparent pt-2">
          <SignedOut>
            <Link
              href="/register"
              className={buttonVariants({
                variant: "secondary",
                className: "h-12 w-full",
              })}
            >
              Crear cuenta gratis
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "h-12 w-full",
              })}
            >
              Ir al dashboard
            </Link>
          </SignedIn>
        </CardFooter>
      )}
    </Card>
  )
}

const RolesSection = () => {
  return (
    <section
      id="plans"
      className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20"
    >
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-3xl font-bold">Una app, tres roles</h2>
        <p className="text-muted-foreground">
          Lo que puede hacer cada tipo de cuenta.
        </p>
      </div>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
        {ROLES.map((role) => (
          <RoleCard key={role.name} role={role} />
        ))}
      </div>
    </section>
  )
}

export default RolesSection
