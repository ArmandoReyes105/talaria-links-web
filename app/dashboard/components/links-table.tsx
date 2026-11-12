import CopyButton from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import { ShortUrlResponse } from "@/types/link.types"
import { Pencil, Trash2 } from "lucide-react"

interface LinksTableProps {
  links: ShortUrlResponse[]
  onDelete: (link: ShortUrlResponse) => void
  onEdit: (link: ShortUrlResponse) => void
}

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const LinksTable = ({ links, onDelete, onEdit }: LinksTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-170 border-collapse text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Enlace corto
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Destino
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Visibilidad
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Clicks
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Creado
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id} className="border-b last:border-0">
              <td className="px-2 py-2.5 font-semibold whitespace-nowrap">
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {link.shortUrl}
                </a>
                {link.title && (
                  <span className="block text-xs font-normal text-muted-foreground">
                    {link.title}
                  </span>
                )}
              </td>
              <td
                className="max-w-60 truncate px-2 py-2.5 text-muted-foreground"
                title={link.originalUrl}
              >
                {link.originalUrl}
              </td>
              <td className="px-2 py-2.5">
                {link.isPublic ? "Público" : "Privado"}
              </td>
              <td className="px-2 py-2.5 text-right font-semibold">
                {link.clickCount.toLocaleString("es")}
              </td>
              <td className="px-2 py-2.5 whitespace-nowrap text-muted-foreground">
                {dateFormatter.format(new Date(link.createdAt))}
              </td>
              <td className="px-2 py-1.5 text-right">
                <CopyButton value={link.shortUrl} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(link)}
                >
                  <Pencil />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(link)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinksTable
