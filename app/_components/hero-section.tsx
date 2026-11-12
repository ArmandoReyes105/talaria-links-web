import QuickShortenForm from "./quick-shorten-form"

const HeroSection = () => {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-20">
        <p className="text-sm font-semibold tracking-widest uppercase opacity-80">
          Enlaces cortos, métricas reales
        </p>
        <h1 className="max-w-3xl text-2xl font-bold md:text-4xl">
          Acorta cualquier enlace. Descubre quién lo visita.
        </h1>
        <p className="max-w-xl text-lg opacity-80">
          Crea enlaces cortos, elige quién puede verlos y sigue cada clic desde
          un solo panel.
        </p>
        <QuickShortenForm />
      </div>
    </section>
  )
}

export default HeroSection
