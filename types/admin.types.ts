import { Role } from "./auth.types"

export interface AdminUser {
  id: string
  username: string
  email: string
  role: Role
  linkCount: number
  createdAt: string
}

export interface AdminUserListResponse {
  items: AdminUser[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface AdminSearchParams {
  search?: string
  page?: number
  pageSize?: number
}

export interface UpdateUserRoleRequest {
  role: Role
}
