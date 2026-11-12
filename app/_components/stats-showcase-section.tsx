import ClicksBarChart from "@/components/clicks-bar-chart"
import SignedIn from "@/components/signed-in"
import SignedOut from "@/components/signed-out"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import React from "react"

const SAMPLE_CLICKS = [
  { day: "Lun", clicks: 72 },
  { day: "Mar", clicks: 95 },
  { day: "Mié", clicks: 81 },
  { day: "Jue", clicks: 118 },
  { day: "Vie", clicks: 146 },
  { day: "Sáb", clicks: 104 },
  { day: "Dom", clicks: 82 },
]

const TOTAL_CLICKS = SAMPLE_CLICKS.reduce((sum, d) => sum + d.clicks, 0)

const StatsShowcaseSection = () => {
  return (
    <div className="bg-secondary text-secondary-foreground md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-around px-4 py-4 sm:flex-row">
        <div className="flex max-w-lg flex-1 flex-col justify-center gap-5">
          <h2 className="text-4xl leading-tight font-bold">
            Cada clic cuenta una historia.
          </h2>
          <p className="text-lg opacity-80">
            Mira los clics por día, de dónde llegan tus visitantes en cada
            enlace que creas.
          </p>

          <SignedIn>
            <Link href="/dashboard">
              <Button>Ver mis estadísticas</Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/login" className="h-12 self-start px-6">
              <Button>Inicia sesión para ver tus estadísticas</Button>
            </Link>
          </SignedOut>
        </div>

        <div className="flex flex-1 items-center px-6 py-14 md:px-12">
          <figure className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-card p-6 text-card-foreground">
            <figcaption className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">
                Últimos 7 días{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  · ejemplo
                </span>
              </span>
              <span className="text-2xl font-bold">{TOTAL_CLICKS}</span>
            </figcaption>
            <ClicksBarChart data={SAMPLE_CLICKS} />
          </figure>
        </div>
      </div>
    </div>
  )
}

export default StatsShowcaseSection
