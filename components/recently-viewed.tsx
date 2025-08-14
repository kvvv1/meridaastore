import { ProductCard } from "@/components/product-card"
import type { Product } from "@/components/product-catalog"

const recentlyViewedProducts: Product[] = [
  {
    id: 4,
    name: "Saia Plissada",
    price: 159.9,
    originalPrice: 199.9,
    image: "/pleated-skirt-fashion.png",
    category: "saias",
    colors: ["preto", "marinho", "camel"],
    sizes: ["P", "M", "G"],
    isNew: false,
    inStock: false,
    rating: 4.5,
    reviews: 67,
  },
  {
    id: 6,
    name: "Vestido Longo Festa",
    price: 459.9,
    image: "/elegant-long-party-dress.png",
    category: "vestidos",
    colors: ["preto", "azul", "verde"],
    sizes: ["P", "M", "G"],
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviews: 178,
  },
]

export function RecentlyViewed() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl mb-8 text-center">Vistos Recentemente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {recentlyViewedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
