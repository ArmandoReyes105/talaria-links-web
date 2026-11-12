import { Button } from "@/components/ui/button"
import { ShortUrlResponse } from "@/types/link.types"
import { Trash2 } from "lucide-react"

interface AdminLinksTableProps {
  links: ShortUrlResponse[]
  onDelete: (link: ShortUrlResponse) => void
}

const AdminLinksTable = ({ links, onDelete }: AdminLinksTableProps) => {
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
              Dueño
            </th>
            <th scope="col" className="px-2 py-2.5 font-semibold">
              Visibilidad
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Clics
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-semibold">
              Eliminar
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
                  {link.shortUrl.replace(/^https?:\/\//, "")}
                </a>
              </td>
              <td
                className="max-w-60 truncate px-2 py-2.5 text-muted-foreground"
                title={link.originalUrl}
              >
                {link.originalUrl}
              </td>
              <td className="px-2 py-2.5">{link.ownerName}</td>
              <td className="px-2 py-2.5">
                {link.isPublic ? "Público" : "Privado"}
              </td>
              <td className="px-2 py-2.5 text-right font-semibold">
                {link.clickCount.toLocaleString("es")}
              </td>
              <td className="px-2 py-1.5 text-right">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(link)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminLinksTable
