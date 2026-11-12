"use client"

import SignedIn from "@/components/signed-in"
import SignedOut from "@/components/signed-out"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/toast"
import { linkService } from "@/services/link-service"
import { ShortUrlResponse } from "@/types/link.types"
import Link from "next/link"
import { useState } from "react"

const QuickShortenForm = () => {
  const [url, setUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ShortUrlResponse | null>(null)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const created = await linkService.createShortLink({
        originalUrl: url,
        isPublic: false,
      })
      setResult(created)
      setUrl("")
    } catch {
      toast.add({
        type: "error",
        description: "No se pudo acortar el enlace, inténtelo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-3 flex max-w-3xl flex-col gap-3">
      <SignedIn>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
          <label htmlFor="hero-url" className="sr-only">
            URL larga
          </label>
          <Input
            id="hero-url"
            type="url"
            required
            placeholder="https://tu-enlace-muy-largo.com/va/aqui"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 min-w-0 flex-1 basis-80 bg-background text-foreground"
          />
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="h-12 px-8"
          >
            {isSubmitting ? "Acortando..." : "Acortar"}
          </Button>
        </form>
        {result && (
          <p className="text-sm">
            Tu enlace:{" "}
            <a
              href={result.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              {result.shortUrl}
            </a>{" "}
            ·{" "}
            <Link href="/dashboard" className="underline">
              Ver en mis enlaces
            </Link>
          </p>
        )}
      </SignedIn>

      <SignedOut>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/login" className="text-sm underline">
            {" "}
            Inicia sesión para acortar
          </Link>
          <Link href="/register">
            <Button>¿No tienes cuenta? Regístrate gratis</Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  )
}

export default QuickShortenForm
