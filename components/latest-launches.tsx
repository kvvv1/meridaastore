"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: 1,
    name: "Vestido Midi Elegante",
    price: 189.9,
    originalPrice: 249.9,
    discount: 24,
    image: "/elegant-midi-dress-woman.png",
    isNew: true,
    installments: "12x de R$ 15,83",
  },
  {
    id: 2,
    name: "Conjunto Blazer Estruturado",
    price: 299.9,
    originalPrice: 399.9,
    discount: 25,
    image: "/elegant-structured-blazer.png",
    isNew: true,
    installments: "12x de R$ 24,99",
  },
  {
    id: 3,
    name: "Vestido Longo Festa",
    price: 349.9,
    originalPrice: 449.9,
    discount: 22,
    image: "/elegant-long-party-dress.png",
    isNew: true,
    installments: "12x de R$ 29,16",
  },
  {
    id: 4,
    name: "Blusa Sofisticada",
    price: 129.9,
    originalPrice: 179.9,
    discount: 28,
    image: "/sophisticated-blouse.png",
    isNew: true,
    installments: "12x de R$ 10,83",
  },
]

export function LatestLaunches() {
  const [wishlist, setWishlist] = useState<number[]>([])

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Últimos Lançamentos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra as novidades que acabaram de chegar. Peças exclusivas com desconto especial de lançamento.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && <Badge className="bg-secondary text-secondary-foreground">NOVO</Badge>}
                  <Badge variant="destructive">-{product.discount}%</Badge>
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Quick add to cart */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" className="w-full">
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Comprar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Link href={`/produto/${product.id}`} className="block hover:text-primary transition-colors">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">ou {product.installments}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/produtos">Ver Todos os Lançamentos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
