import { apiClient } from "@/lib/api/client"
import { CreateShortUrlRequest, LinkListResponse, LinksParams, ShortUrlResponse } from "@/types/link.types"

export const linkService = {
    createShortLink: (data: CreateShortUrlRequest) => 
        apiClient.post<ShortUrlResponse>("/api/link", data),

    getUserLinks: (params?: LinksParams) => 
        apiClient.get<LinkListResponse>("/api/link/mine", {params: {...params}}), 
}