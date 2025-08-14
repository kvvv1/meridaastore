import { ProductDetail } from "@/components/product-detail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RelatedProducts } from "@/components/related-products"
import { RecentlyViewed } from "@/components/recently-viewed"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductDetail productId={params.id} />
        <RelatedProducts />
        <RecentlyViewed />
      </main>
      <Footer />
    </div>
  )
}
