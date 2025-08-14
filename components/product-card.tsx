"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Star } from "lucide-react"
import type { Product } from "@/components/product-catalog"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group hover-lift border-0 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/produto/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <Badge className="bg-accent text-accent-foreground">Novo</Badge>}
            {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
            {!product.inStock && <Badge variant="secondary">Esgotado</Badge>}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Quick add to cart */}
          {product.inStock && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button className="w-full" size="sm" onClick={handleAddToCart} disabled={isLoading}>
                <ShoppingBag className="h-4 w-4 mr-2" />
                {isLoading ? "Adicionando..." : "Adicionar"}
              </Button>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link href={`/produto/${product.id}`}>
            <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
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

          {/* Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
          </p>

          {/* Available colors */}
          <div className="flex items-center gap-1 mt-3">
            <span className="text-xs text-muted-foreground mr-2">Cores:</span>
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 rounded-full border border-border"
                style={{
                  backgroundColor:
                    color === "preto"
                      ? "#000"
                      : color === "branco"
                        ? "#fff"
                        : color === "azul"
                          ? "#1E40AF"
                          : color === "vermelho"
                            ? "#DC2626"
                            : color === "verde"
                              ? "#059669"
                              : color === "camel"
                                ? "#D2691E"
                                : color === "nude"
                                  ? "#F5DEB3"
                                  : color === "marinho"
                                    ? "#1E3A8A"
                                    : "#ccc",
                }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
