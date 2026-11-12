"use client"

import { linkService } from "@/services/link-service"
import { LinkListResponse, PublicLinkSort } from "@/types/link.types"
import { useCallback, useEffect, useState } from "react"

const PAGE_SIZE = 5

export function usePublicLinks() {
  const [data, setData] = useState<LinkListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sort, setSort] = useState<PublicLinkSort>("MostClicked")
  const [page, setPage] = useState(1)

  useEffect(() => {
    let ignore = false

    const fetchLinks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await linkService.getPublicLinks({ sort, page, pageSize: PAGE_SIZE })
        if (!ignore) setData(response)
      } catch {
        if (!ignore) setError("No se pudieron cargar los enlaces públicos.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchLinks()

    return () => {
      ignore = true
    }
  }, [sort, page])

   const changeSort = useCallback((s: PublicLinkSort) => {
    setSort(s)
    setPage(1)
  }, [])

  return {
    links: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    pageSize: PAGE_SIZE,
    sort,
    isLoading,
    error,
    setPage,
    changeSort,
  }
}
