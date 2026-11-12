import { ShortUrlResponse } from "@/types/link.types"

interface LinksTableProps {
  links: ShortUrlResponse[]
}

const dateFormatter = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
})

const LinksTable = ({ links }: LinksTableProps) => {
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LinksTable
