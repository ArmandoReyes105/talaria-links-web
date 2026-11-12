import { linkService } from "@/services/link-service"
import { LinkListResponse, LinkVisibility } from "@/types/link.types"
import { useCallback, useEffect, useState } from "react"

const PAGE_SIZE = 10

export function useMyLinks() {
  const [data, setData] = useState<LinkListResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [visibility, setVisibility] = useState<LinkVisibility>("All")
  const [page, setPage] = useState(1)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let ignore = false

    const fetchLinks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await linkService.getUserLinks({
          visibility,
          page,
          pageSize: PAGE_SIZE,
        })
        if (!ignore) setData(response)
      } catch {
        if (!ignore) setError("No se pudieron cargar tus enlaces.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchLinks()

    return () => {
      ignore = true
    }
  }, [visibility, page, reloadKey])

  const changeVisibility = useCallback((v: LinkVisibility) => {
    setVisibility(v)
    setPage(1)
  }, [])

  const deleteLink = useCallback(async (id: number) => {
    await linkService.deleteLink(id)
    
    const wasLastItemOnPage = data?.items.length === 1 && page > 1
    if (wasLastItemOnPage) setPage((p) => p - 1)
    else setReloadKey((k) => k + 1)
  }, [data, page])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  return {
    links: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    visibility,
    isLoading,
    error,
    setPage,
    changeVisibility,
    deleteLink,
    refetch,
  }
}
