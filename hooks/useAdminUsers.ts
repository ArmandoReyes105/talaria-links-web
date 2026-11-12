"use client"

import { adminService } from "@/services/admin-service"
import { AdminUserListResponse } from "@/types/admin.types"
import { Role } from "@/types/auth.types"
import { useCallback, useEffect, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"

const PAGE_SIZE = 10
const SEARCH_DELAY_MS = 300

export function useAdminUsers() {
  const [data, setData] = useState<AdminUserListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const debouncedSearch = useDebouncedValue(search, SEARCH_DELAY_MS)

  useEffect(() => {
    let ignore = false

    const fetchUsers = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await adminService.getUsers({
          search: debouncedSearch || undefined,
          page,
          pageSize: PAGE_SIZE,
        })
        if (!ignore) setData(response)
      } catch {
        if (!ignore) setError("No se pudieron cargar los usuarios.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchUsers()

    return () => {
      ignore = true
    }
  }, [debouncedSearch, page])

  const changeSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  const updateRole = useCallback(async (id: string, role: Role) => {
    const updated = await adminService.updateUserRole(id, { role })
    setData((prev) =>
      prev
        ? {
            ...prev,
            items: prev.items.map((u) => (u.id === updated.id ? updated : u)),
          }
        : prev
    )
  }, [])

  return {
    users: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    page,
    search,
    isLoading,
    error,
    setPage,
    changeSearch,
    updateRole,
  }
}
