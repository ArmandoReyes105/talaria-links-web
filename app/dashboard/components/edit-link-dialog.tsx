"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { ShortUrlResponse, UpdateShortUrlRequest } from "@/types/link.types"
import { useState } from "react"

interface EditLinkDialogProps {
  link: ShortUrlResponse | null
  onClose: () => void
  onSave: (id: number, request: UpdateShortUrlRequest) => Promise<void>
}

const EditLinkDialog = ({ link, onClose, onSave }: EditLinkDialogProps) => {
  const [url, setUrl] = useState(link?.originalUrl ?? "")
  const [title, setTitle] = useState(link?.title ?? "")
  const [isPublic, setIsPublic] = useState(link?.isPublic ?? false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!link) return

    setIsSubmitting(true)
    try {
      await onSave(link.id, {
        originalUrl: url,
        title: title.trim() || undefined,
        isPublic,
      })
      toast.add({
        type: "success",
        description: "Enlace actualizado correctamente.",
      })
      onClose()
    } catch {
      toast.add({
        type: "error",
        description: "No se pudo actualizar el enlace, inténtelo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <Dialog
      open={link !== null}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar enlace</DialogTitle>
          <DialogDescription>{link?.shortUrl}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="edit-title">Título del enlace</FieldLabel>
              <Input
                id="edit-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="edit-url">Enlace original</FieldLabel>
              <Input
                id="edit-url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldLabel htmlFor="edit-is-public">
                  ¿Quieres que el enlace sea público?
                </FieldLabel>
                <FieldDescription>
                  {isPublic ? "Público" : "Privado"}
                </FieldDescription>
              </FieldContent>
              <Switch
                id="edit-is-public"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={<Button type="button" variant="outline" />}
              disabled={isSubmitting}
            >
              Cancelar
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditLinkDialog
