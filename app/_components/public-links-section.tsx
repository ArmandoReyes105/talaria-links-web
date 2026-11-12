"use client"

import { usePublicLinks } from "@/hooks/usePublicLinks"
import { PublicLinkSort } from "@/types/link.types"
import PublicLinkCard from "./public-link-card"
import { Button } from "@/components/ui/button"

const SORTS: { value: PublicLinkSort; label: string }[] = [
  { value: "MostClicked", label: "Más visitados" },
  { value: "Newest", label: "Más recientes" },
]

const PublicLinksSection = () => {
  const {
    links,
    totalCount,
    totalPages,
    page,
    pageSize,
    sort,
    isLoading,
    error,
    setPage,
    changeSort,
  } = usePublicLinks()

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  let content: React.ReactNode
  if (error) {
    content = (
      <p role="alert" className="text-sm text-destructive">
        {error}
      </p>
    )
  } else if (isLoading && links.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Cargando enlaces...
      </p>
    )
  } else if (links.length === 0) {
    content = (
      <p className="py-6 text-center text-sm text-muted-foreground">
        Aún no hay enlaces públicos.
      </p>
    )
  } else {
    content = (
      <div className={`flex flex-col gap-2 ${isLoading ? "opacity-60" : ""}`}>
        {links.map((link) => (
          <PublicLinkCard key={link.id} link={link} />
        ))}
      </div>
    )
  }

  return (
    <section
      id="explore"
      className="mx-auto max-w-7xl min-w-0 flex-col gap-5 px-4"
    >
      <div className="flex flex-col gap-1">
        <h2 id="public-links-title" className="text-3xl font-bold">
          Enlaces públicos
        </h2>
        <p className="text-muted-foreground">
          Enlaces que la comunidad hizo públicos.
        </p>
      </div>

      <div role="group" className="flex flex-wrap gap-2">
        {SORTS.map((s) => (
          <Button
            key={s.value}
            type="button"
            variant={sort === s.value ? "secondary" : "outline"}
            onClick={() => changeSort(s.value)}
          >
            {s.label}
          </Button>
        ))}
      </div>

      {content}

      {totalCount > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Mostrando {from}–{to} de {totalCount} enlaces
          </p>
          {totalPages > 1 && (
            <nav className="flex items-center gap-2">
              <Button
                type="button"
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
                variant="outline"
                disabled={page >= totalPages || isLoading}
                onClick={() => setPage(page + 1)}
              >
                Siguiente
              </Button>
            </nav>
          )}
        </div>
      )}
    </section>
  )
}

export default PublicLinksSection
