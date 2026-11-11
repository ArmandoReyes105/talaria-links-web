import { ApiError } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export interface RequestOptions extends Omit<RequestInit, "body"> {
    params?: Record<string, string | number | boolean | undefined>
    body?: unknown
}

let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler
}

async function send(path: string, options: RequestOptions): Promise<Response> {
  const { params, headers, body, ...rest } = options

  const url = new URL(path, BASE_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value))
    })
  }

  const res = await fetch(url.toString(), {
    ...rest,
    credentials: "include",
    headers: {
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    if (res.status === 401) unauthorizedHandler?.()
    const errorBody = await res.json().catch(() => undefined)
    throw new ApiError(res.status, res.statusText, errorBody)
  }

  return res
}

async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const res = await send(path, options)

  if (res.status === 204) return undefined as T

  const text = await res.text()
  if (!text) return undefined as T

  return JSON.parse(text) as T
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),

  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", body }),

  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", body }),

  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", body }),

  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
}