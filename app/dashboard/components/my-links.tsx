"use client"

import Loading from "@/components/loading"
import { useMyLinks } from "@/hooks/useMyLinks"
import CreateShortUrlForm from "./create-short-url-form"
import LinksTable from "./links-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LinkVisibility, ShortUrlResponse } from "@/types/link.types"
import { useState } from "react"
import { toast } from "@/components/ui/toast"
import DeleteLinkDialog from "./delete-dialog"

const FILTERS: { value: LinkVisibility; label: string }[] = [
  { value: "All", label: "Todos" },
  { value: "Public", label: "Públicos" },
  { value: "Private", label: "Privados" },
]

const MyLinks = () => {
  const {
    links,
    visibility,
    totalCount,
    totalPages,
    setPage,
    page,
    changeVisibility,
    error,
    isLoading,
    deleteLink,
    refetch,
  } = useMyLinks()

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

  const handleCreated = () => {
    setPage(1)
    refetch()
  }

  let content: React.ReactNode
  if (error) {
    content = (
      <p role="alert" className="text-sm text-destructive">
        {error}
      </p>
    )
  } else if (isLoading && links.length === 0) {
    content = <Loading />
  } else if (links.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        {visibility === "All"
          ? "Aún no tienes enlaces."
          : "No hay enlaces con este filtro."}
      </p>
    )
  } else {
    content = (
      <div
        aria-busy={isLoading}
        className={isLoading ? "opacity-60 transition-opacity" : ""}
      >
        <LinksTable links={links} onDelete={setLinkToDelete} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <CreateShortUrlForm onCreated={handleCreated} />

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
          <CardTitle>Todos mis enlaces ({totalCount})</CardTitle>
          <div
            role="group"
            aria-label="Filtrar por visibilidad"
            className="flex gap-1.5"
          >
            {FILTERS.map((f) => (
              <Button
                key={f.value}
                type="button"
                size="sm"
                variant={visibility === f.value ? "default" : "outline"}
                aria-pressed={visibility === f.value}
                onClick={() => changeVisibility(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {content}

          {totalPages > 1 && (
            <nav
              aria-label="Paginación"
              className="flex items-center justify-end gap-2"
            >
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
            </nav>
          )}
        </CardContent>
      </Card>

      <DeleteLinkDialog
        linkToDelete={linkToDelete}
        isDeleting={isDeleting}
        setLinkToDelete={setLinkToDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  )
}

export default MyLinks
