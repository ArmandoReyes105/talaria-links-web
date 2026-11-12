"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { useAdminUsers } from "@/hooks/useAdminUsers"
import { ApiError } from "@/lib/api/errors"
import { useAuth } from "@/providers/auth-provider"
import { AdminUser } from "@/types/admin.types"
import { Search } from "lucide-react"
import { useState } from "react"
import UsersTable from "./components/users-table"

function getRoleErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return "No puedes cambiar tu propio rol."
    if (error.status === 404) return "El usuario ya no existe."
  }
  return "No se pudo cambiar el rol, inténtelo de nuevo."
}

export default function AdminUsersPage() {
  const { user } = useAuth()
  const {
    users,
    totalCount,
    totalPages,
    page,
    search,
    isLoading,
    error,
    setPage,
    changeSearch,
    updateRole,
  } = useAdminUsers()

  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleToggleRole = async (target: AdminUser) => {
    const newRole = target.role === "Admin" ? "User" : "Admin"
    setUpdatingId(target.id)
    try {
      await updateRole(target.id, newRole)
      toast.add({
        type: "success",
        description:
          newRole === "Admin"
            ? `${target.username} ahora es administrador.`
            : `${target.username} ahora es usuario.`,
      })
    } catch (err) {
      toast.add({ type: "error", description: getRoleErrorMessage(err) })
    } finally {
      setUpdatingId(null)
    }
  }

  let content: React.ReactNode
  if (error) {
    content = <p className="text-sm text-destructive">{error}</p>
  } else if (isLoading && users.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Cargando usuarios...
      </p>
    )
  } else if (users.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        {search
          ? "Ningún usuario coincide con la búsqueda."
          : "Aún no hay usuarios."}
      </p>
    )
  } else {
    content = (
      <div className={isLoading ? "opacity-60 transition-opacity" : ""}>
        <UsersTable
          users={users}
          currentUserId={user?.id ?? ""}
          updatingId={updatingId}
          onToggleRole={handleToggleRole}
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <p className="text-muted-foreground">
          Busca usuarios y gestiona quién tiene permisos de administrador.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle>Todos los usuarios ({totalCount})</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por usuario o email"
              value={search}
              onChange={(e) => changeSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {content}

          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={page <= 1 || isLoading}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Los cambios de rol se aplican la próxima vez que el usuario inicie
        sesión.
      </p>
    </>
  )
}
