"use client"

import DeleteLinkDialog from "@/app/dashboard/components/delete-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { useAdminLinks } from "@/hooks/useAdminLinks"
import { ShortUrlResponse } from "@/types/link.types"
import { Search } from "lucide-react"
import { useState } from "react"
import AdminLinksTable from "./components/admin-links-table"

export default function AdminLinksPage() {
  const {
    links,
    totalCount,
    totalPages,
    page,
    search,
    isLoading,
    error,
    setPage,
    changeSearch,
    deleteLink,
  } = useAdminLinks()

  const [linkToDelete, setLinkToDelete] = useState<ShortUrlResponse | null>(
    null
  )
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirmDelete = async () => {
    if (!linkToDelete) return
    setIsDeleting(true)
    try {
      await deleteLink(linkToDelete.id)
      toast.add({
        type: "success",
        description: "Enlace eliminado correctamente.",
      })
      setLinkToDelete(null)
    } catch {
      toast.add({
        type: "error",
        description: "No se pudo eliminar el enlace, inténtelo de nuevo.",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  let content: React.ReactNode
  if (error) {
    content = <p className="text-sm text-destructive">{error}</p>
  } else if (isLoading && links.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Cargando enlaces...
      </p>
    )
  } else if (links.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        {search
          ? "Ningún enlace coincide con la búsqueda."
          : "Aún no hay enlaces."}
      </p>
    )
  } else {
    content = (
      <div className={isLoading ? "opacity-60 transition-opacity" : ""}>
        <AdminLinksTable links={links} onDelete={setLinkToDelete} />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Todos los enlaces</h1>
        <p className="text-muted-foreground">
          Revisa y modera los enlaces de todos los usuarios, públicos y
          privados.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle>Enlaces ({totalCount})</CardTitle>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por código o dueño"
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

      <DeleteLinkDialog
        linkToDelete={linkToDelete}
        isDeleting={isDeleting}
        setLinkToDelete={setLinkToDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  )
}
