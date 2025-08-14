"use client"

import { useState } from "react"
import { X, Plus, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/components/product-catalog"

interface ProductComparisonProps {
  products: Product[]
  onRemoveProduct: (productId: number) => void
  onAddToCart: (product: Product) => void
}

export function ProductComparison({ products, onRemoveProduct, onAddToCart }: ProductComparisonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (products.length === 0) return null

  const maxProducts = 3

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4 z-40 shadow-lg bg-transparent">
          Comparar ({products.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Comparar Produtos</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 relative">
              <button
                onClick={() => onRemoveProduct(product.id)}
                className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-4">
                {/* Product Image */}
                <div className="aspect-square bg-secondary/20 rounded-lg overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-primary">
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Features Comparison */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Categoria:</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cores:</span>
                      <span className="font-medium">{product.colors?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tamanhos:</span>
                      <span className="font-medium">{product.sizes?.length || 0}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Disponibilidade:</span>
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "Em estoque" : "Indisponível"}
                      </Badge>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button onClick={() => onAddToCart(product)} disabled={!product.inStock} className="w-full">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={`/produto/${product.id}`}>Ver Detalhes</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add More Products */}
          {products.length < maxProducts && (
            <div className="border-2 border-dashed border-muted rounded-lg p-4 flex flex-col items-center justify-center min-h-[400px]">
              <Plus className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Adicione mais produtos para comparar
                <br />
                <span className="text-sm">Máximo {maxProducts} produtos</span>
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
