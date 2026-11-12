import { apiClient } from "@/lib/api/client"
import {
  AdminSearchParams,
  AdminUser,
  AdminUserListResponse,
  UpdateUserRoleRequest,
} from "@/types/admin.types"
import { LinkListResponse } from "@/types/link.types"

export const adminService = {
  getUsers: (params?: AdminSearchParams) =>
    apiClient.get<AdminUserListResponse>("/api/admin/users", {
      params: { ...params },
    }),

  updateUserRole: (id: string, data: UpdateUserRoleRequest) =>
    apiClient.put<AdminUser>(`/api/admin/users/${id}/role`, data),

  getLinks: (params?: AdminSearchParams) =>
    apiClient.get<LinkListResponse>("/api/admin/links", {
      params: { ...params },
    }),
}
