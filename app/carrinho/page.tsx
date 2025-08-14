import { CartPage } from "@/components/cart-page"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ShoppingCartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
