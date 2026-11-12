import HeroSection from "./_components/hero-section"
import PublicLinksSection from "./_components/public-links-section"
import RolesSection from "./_components/roles-section"
import StatsShowcaseSection from "./_components/stats-showcase-section"

export default function Page() {
  return (
    <main>
      <HeroSection />
      <PublicLinksSection />
      <StatsShowcaseSection />
      <RolesSection />
    </main>
  )
}
