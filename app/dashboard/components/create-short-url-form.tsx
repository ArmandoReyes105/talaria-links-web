"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/toast"
import { linkService } from "@/services/link-service"
import { CreateShortUrlRequest, ShortUrlResponse } from "@/types/link.types"
import { useState } from "react"

interface CreateShortUrlFormProps {
  onCreated?: (link: ShortUrlResponse) => void
}

const CreateShortUrlForm = ({ onCreated }: CreateShortUrlFormProps) => {
  const [url, setUrl] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isPublic, setIsPublic] = useState<boolean>(false)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const request: CreateShortUrlRequest = {
      title: title,
      originalUrl: url,
      isPublic: isPublic,
    }
    try {
      setIsSubmitting(true)
      const result = await linkService.createShortLink(request)

      setUrl("")
      setTitle("")
      setIsPublic(false)

      toast.add({
        type: "success",
        description: `Enlace creado correctamente ${result.shortUrl}`,
      })

      onCreated?.(result)
    } catch {
      toast.add({
        type: "error",
        description:
          "Lo sentimos, no se pudo crear su enlace, inténtelo de nuevo",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear enlace nuevo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="title">Título del enlace</FieldLabel>
              <Input
                id="title"
                type="text"
                required
                placeholder="github"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FieldDescription>
                Ingresa un título para tu enlace.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="url">Enlace original</FieldLabel>
              <Input
                id="url"
                type="url"
                placeholder="https://github.com"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <FieldDescription>
                Ingresa la URL que desees acortar.
              </FieldDescription>
            </Field>

            <Field orientation="horizontal" className="max-w-sm">
              <FieldContent>
                <FieldLabel htmlFor="is-public-switch">
                  ¿Quieres que el enlace sea público?
                </FieldLabel>
                <FieldDescription>
                  {isPublic ? "Público" : "Privado"}
                </FieldDescription>
              </FieldContent>
              <Switch
                id="is-public-switch"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </Field>
            <Field orientation="horizontal">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Crear enlace"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export default CreateShortUrlForm
