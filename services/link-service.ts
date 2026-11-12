import { apiClient } from "@/lib/api/client"
import { CreateShortUrlRequest, LinkListResponse, LinksParams, PublicLinksParams, ShortUrlResponse, UpdateShortUrlRequest } from "@/types/link.types"

export const linkService = {
    createShortLink: (data: CreateShortUrlRequest) => 
        apiClient.post<ShortUrlResponse>("/api/link", data),

    getUserLinks: (params?: LinksParams) => 
        apiClient.get<LinkListResponse>("/api/link/mine", {params: {...params}}), 

    deleteLink: (id: number) => 
        apiClient.delete<void>(`/api/link/${id}`),

    updateLink: (id: number, data: UpdateShortUrlRequest) => 
        apiClient.put<ShortUrlResponse>(`/api/link/${id}`, data),

    getPublicLinks: (params?: PublicLinksParams) => 
        apiClient.get<LinkListResponse>("/api/link/public", {params: {...params}}), 
}