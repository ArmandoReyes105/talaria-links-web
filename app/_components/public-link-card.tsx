import CopyButton from "@/components/copy-button"
import { ShortUrlResponse } from "@/types/link.types"

const relativeFormatter = new Intl.RelativeTimeFormat("es", { numeric: "auto" })
const DAY_MS = 1000 * 60 * 60 * 24

function formatAge(dateString: string): string {
  const days = Math.round(
    (new Date(dateString).getTime() - Date.now()) / DAY_MS
  )
  if (days > -7) return relativeFormatter.format(days, "day")
  if (days > -30) return relativeFormatter.format(Math.round(days / 7), "week")
  return relativeFormatter.format(Math.round(days / 30), "month")
}

interface PublicLinkCardProps {
  link: ShortUrlResponse
}

const PublicLinkCard = ({ link }: PublicLinkCardProps) => {
  const domain = link.originalUrl
  return (
    <article className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-secondary px-8 py-4 text-secondary-foreground">
      <div className="flex min-w-0 flex-1 basis-72 flex-col">
        <span className="font-mono text-sm opacity-70">
          {formatAge(link.createdAt)}
        </span>
        <h3 className="font-mono font-semibold">{link.title ?? domain}</h3>
        <p className="truncate text-sm">
          <a
            href={link.shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline"
          >
            {link.shortUrl.replace(/^https?:\/\//, "")}
          </a>{" "}
          <span className="opacity-70">→ {domain}</span>
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-2xl font-bold">
            {link.clickCount.toLocaleString("es")}
          </div>
          <div className="text-xs opacity-70">clics</div>
        </div>
        <CopyButton value={link.shortUrl} />
      </div>
    </article>
  )
}

export default PublicLinkCard
