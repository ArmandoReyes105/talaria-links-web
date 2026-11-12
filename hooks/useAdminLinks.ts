"use client"

import { adminService } from "@/services/admin-service"
import { linkService } from "@/services/link-service"
import { LinkListResponse } from "@/types/link.types"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"

const PAGE_SIZE = 10
const SEARCH_DELAY_MS = 300

export function useAdminLinks() {
  const [data, setData] = useState<LinkListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS)

  useEffect(() => {
    let ignore = false

    const fetchLinks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await adminService.getLinks({
          search: debouncedSearch || undefined,
          page,
          pageSize: PAGE_SIZE,
        })
        if (!ignore) setData(response)
      } catch {
        if (!ignore) setError("No se pudieron cargar los enlaces.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchLinks()

    return () => {
      ignore = true
    }
  }, [debouncedSearch, page, reloadKey])

  const changeSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const deleteLink = useCallback(
    async (id: number) => {
      await linkService.deleteLink(id)

      const wasLastItemOnPage = data?.items.length === 1 && page > 1
      if (wasLastItemOnPage) setPage((p) => p - 1)
      else setReloadKey((k) => k + 1)
    },
    [data, page]
  )

  return {
    links: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    search,
    isLoading,
    error,
    setPage,
    changeSearch,
    deleteLink,
  }
}
