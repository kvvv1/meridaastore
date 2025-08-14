import { ProductCatalog } from "@/components/product-catalog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  )
}
