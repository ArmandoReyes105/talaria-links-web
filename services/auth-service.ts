import { apiClient } from "@/lib/api/client"
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "@/types/auth.types"

export const authService = {
  register: async (data: RegisterRequest): Promise<User> => {
    const res = await apiClient.post<LoginResponse>("/api/auth/register", data)
    return res.user
  },

  login: async (data: LoginRequest): Promise<User> => {
    const res = await apiClient.post<LoginResponse>("/api/auth/login", data)
    return res.user
  },

  me: () => apiClient.get<User>("/api/auth/me"),

  logout: () => apiClient.post<void>("/api/auth/logout"),
}
