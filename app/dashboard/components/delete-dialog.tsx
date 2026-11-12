import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ShortUrlResponse } from "@/types/link.types"

interface DeleteLinkDialogProps {
  linkToDelete: ShortUrlResponse | null
  isDeleting: boolean
  setLinkToDelete: (link: ShortUrlResponse | null) => void
  handleConfirmDelete: () => Promise<void>
}

const DeleteLinkDialog = ({
  linkToDelete,
  isDeleting,
  setLinkToDelete,
  handleConfirmDelete,
}: DeleteLinkDialogProps) => {
  return (
    <AlertDialog
      open={linkToDelete !== null}
      onOpenChange={(open) => {
        if (!open && !isDeleting) setLinkToDelete(null)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar este enlace?</AlertDialogTitle>
          <AlertDialogDescription>
            Se eliminará <strong>{linkToDelete?.shortUrl}</strong> de forma
            permanente. Quien tenga este enlace ya no podrá usarlo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleConfirmDelete}
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteLinkDialog
