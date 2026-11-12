export type LinkVisibility = "All" | "Public" | "Private"

export type PublicLinkSort = "Newest" | "MostClicked"

export interface CreateShortUrlRequest {
    originalUrl: string
    title?: string
    isPublic: boolean
}

export interface ShortUrlResponse {
    id: number
    code: string
    shortUrl: string
    originalUrl: string
    title?: string
    isPublic: boolean
    clickCount: number
    ownerName: string
    createdAt: string
    updatedAt: string
}

export interface LinkListResponse {
    items: ShortUrlResponse[],
    page: number
    pageSize: number
    totalCount: number
    totalPages: number
}

export interface LinksParams {
    visibility?: LinkVisibility
    page?: number
    pageSize?: number
}

export interface UpdateShortUrlRequest {
    originalUrl: string
    title?: string
    isPublic: boolean
}

export interface PublicLinksParams {
  sort?: PublicLinkSort
  page?: number
  pageSize?: number
}