export interface CreateShortUrlRequest {
    originalUrl: string
    title: string
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