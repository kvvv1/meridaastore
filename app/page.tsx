import { Header } from "@/components/header"
import { PromoBar } from "@/components/promo-bar"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { CategoryCarousel } from "@/components/category-carousel"
import { LatestLaunches } from "@/components/latest-launches"
import { ExclusiveCollection } from "@/components/exclusive-collection"
import { NossaColecao } from "@/components/nossa-colecao"
import { LastChance } from "@/components/last-chance"
import { CustomerTestimonials } from "@/components/customer-testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PromoBar />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <CategoryCarousel />
        <LatestLaunches />
        <ExclusiveCollection />
        <NossaColecao />
        <LastChance />
        <CustomerTestimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
