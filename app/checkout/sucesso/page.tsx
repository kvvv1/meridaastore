import { CheckoutSuccess } from "@/components/checkout-success"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CheckoutSuccess />
      </main>
      <Footer />
    </div>
  )
}
