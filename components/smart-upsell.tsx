"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Star, TrendingUp } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface UpsellProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  reason: "frequently-bought" | "similar" | "trending" | "complement"
  discount?: number
}

const mockUpsellProducts: UpsellProduct[] = [
  {
    id: "upsell-1",
    name: "Cinto Couro Premium",
    price: 89.9,
    originalPrice: 119.9,
    image: "/leather-belt-premium.png",
    rating: 4.8,
    reviews: 156,
    reason: "complement",
    discount: 25,
  },
  {
    id: "upsell-2",
    name: "Brincos Dourados",
    price: 49.9,
    image: "/golden-earrings.png",
    rating: 4.9,
    reviews: 203,
    reason: "frequently-bought",
  },
  {
    id: "upsell-3",
    name: "Bolsa Estruturada",
    price: 159.9,
    originalPrice: 199.9,
    image: "/structured-handbag.png",
    rating: 4.7,
    reviews: 89,
    reason: "trending",
    discount: 20,
  },
]

interface SmartUpsellProps {
  context: "cart" | "checkout" | "product"
  currentProducts?: string[]
}

export function SmartUpsell({ context, currentProducts = [] }: SmartUpsellProps) {
  const [upsellProducts, setUpsellProducts] = useState<UpsellProduct[]>([])
  const [addedProducts, setAddedProducts] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  useEffect(() => {
    // Simulate AI-powered product recommendations
    const getRecommendations = () => {
      // Filter out products already in cart
      const filtered = mockUpsellProducts.filter((product) => !currentProducts.includes(product.id))

      // Sort by relevance based on context
      const sorted = filtered.sort((a, b) => {
        if (context === "checkout") {
          // Prioritize frequently bought together
          if (a.reason === "frequently-bought") return -1
          if (b.reason === "frequently-bought") return 1
        }
        return b.rating - a.rating
      })

      return sorted.slice(0, 3) // Show max 3 recommendations
    }

    setUpsellProducts(getRecommendations())
  }, [context, currentProducts])

  const handleAddToCart = (product: UpsellProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: "Padrão",
      size: "Único",
      maxStock: 10,
      quantity: 1,
    })

    setAddedProducts((prev) => new Set([...prev, product.id]))

    // Track upsell conversion
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "upsell_conversion", {
        item_id: product.id,
        item_name: product.name,
        value: product.price,
        context: context,
      })
    }
  }

  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case "frequently-bought":
        return "Frequentemente comprados juntos"
      case "similar":
        return "Produtos similares"
      case "trending":
        return "Em alta"
      case "complement":
        return "Combina perfeitamente"
      default:
        return "Recomendado"
    }
  }

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case "trending":
        return <TrendingUp className="h-3 w-3" />
      default:
        return <Star className="h-3 w-3" />
    }
  }

  if (upsellProducts.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Você também pode gostar</h3>
        <Badge variant="secondary" className="text-xs">
          Oferta especial
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {upsellProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="relative mb-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {product.discount && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{product.discount}%</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getReasonIcon(product.reason)}
                  <span>{getReasonLabel(product.reason)}</span>
                </div>

                <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={addedProducts.has(product.id)}
                  size="sm"
                  className="w-full"
                  variant={addedProducts.has(product.id) ? "secondary" : "default"}
                >
                  {addedProducts.has(product.id) ? (
                    "Adicionado ✓"
                  ) : (
                    <>
                      <Plus className="h-3 w-3 mr-1" />
                      Adicionar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {context === "checkout" && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">💡 Dica: Adicione estes itens agora e economize no frete!</p>
        </div>
      )}
    </div>
  )
}
