import { CheckoutPage } from "@/components/checkout-page"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Checkout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CheckoutPage />
      </main>
      <Footer />
    </div>
  )
}
