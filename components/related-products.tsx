import { ProductCard } from "@/components/product-card"
import type { Product } from "@/components/product-catalog"

const relatedProducts: Product[] = [
  {
    id: 2,
    name: "Blusa Seda Premium",
    price: 189.9,
    image: "/woman-silk-blouse.png",
    category: "blusas",
    colors: ["branco", "nude", "preto"],
    sizes: ["P", "M", "G"],
    isNew: false,
    inStock: true,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 3,
    name: "Calça Wide Leg",
    price: 249.9,
    image: "/wide-leg-pants-fashion.png",
    category: "calcas",
    colors: ["preto", "camel", "branco"],
    sizes: ["36", "38", "40", "42"],
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 5,
    name: "Blazer Estruturado",
    price: 399.9,
    image: "/elegant-structured-blazer.png",
    category: "blazers",
    colors: ["preto", "branco", "camel"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviews: 203,
  },
]

export function RelatedProducts() {
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl mb-8 text-center">Combine com</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
