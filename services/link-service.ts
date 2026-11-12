import { apiClient } from "@/lib/api/client"
import { CreateShortUrlRequest, ShortUrlResponse } from "@/types/link.types"

export const linkService = {
    createShortLink: async (data: CreateShortUrlRequest) => 
        apiClient.post<ShortUrlResponse>("/api/link", data),
}