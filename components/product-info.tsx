"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Share } from "lucide-react"
import type { Product } from "@/components/product-catalog"
import { useCart } from "@/contexts/cart-context"

interface ProductInfoProps {
  product: Product & {
    description: string
    shipping: string
    variants: Array<{
      color: string
      sizes: Array<{ size: string; stock: number }>
    }>
  }
  selectedColor: string
  selectedSize: string
  selectedSizeStock: number
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
}

export function ProductInfo({
  product,
  selectedColor,
  selectedSize,
  selectedSizeStock,
  onColorChange,
  onSizeChange,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [zipCode, setZipCode] = useState("")
  const { addItem, openCart } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const currentVariant = product.variants.find((v) => v.color === selectedColor)
  const availableSizes = currentVariant?.sizes.filter((s) => s.stock > 0) || []

  const colorMap: Record<string, string> = {
    preto: "#000000",
    branco: "#FFFFFF",
    azul: "#1E40AF",
    vermelho: "#DC2626",
    verde: "#059669",
    camel: "#D2691E",
    nude: "#F5DEB3",
    marinho: "#1E3A8A",
  }

  const handleAddToCart = async () => {
    if (!selectedSize || selectedSizeStock === 0) return

    setIsAddingToCart(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      maxStock: selectedSizeStock,
      quantity,
    })

    setIsAddingToCart(false)
    openCart()
  }

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.isNew && <Badge className="bg-accent text-accent-foreground">Novo</Badge>}
          {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
        </div>
        <h1 className="font-heading text-2xl md:text-3xl mb-3">{product.name}</h1>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews} avaliações)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="font-heading text-3xl text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>
        <p className="text-muted-foreground">
          ou 3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros
        </p>
        <p className="text-sm text-green-600 font-medium">{product.shipping}</p>
      </div>

      <Separator />

      {/* Color Selection */}
      <div>
        <h3 className="font-medium mb-3">
          Cor: <span className="font-normal capitalize">{selectedColor}</span>
        </h3>
        <div className="flex gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => onColorChange(variant.color)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === variant.color ? "border-primary scale-110" : "border-border hover:border-primary/50"
              }`}
              style={{ backgroundColor: colorMap[variant.color] || "#ccc" }}
              title={variant.color}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="font-medium mb-3">
          Tamanho: {selectedSize && <span className="font-normal">{selectedSize}</span>}
        </h3>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {currentVariant?.sizes.map((sizeOption) => (
            <button
              key={sizeOption.size}
              onClick={() => onSizeChange(sizeOption.size)}
              disabled={sizeOption.stock === 0}
              className={`p-3 text-sm border rounded transition-all ${
                selectedSize === sizeOption.size
                  ? "border-primary bg-primary text-primary-foreground"
                  : sizeOption.stock === 0
                    ? "border-border bg-muted text-muted-foreground cursor-not-allowed"
                    : "border-border hover:border-primary"
              }`}
            >
              {sizeOption.size}
            </button>
          ))}
        </div>
        <Button variant="link" className="p-0 h-auto text-sm">
          Guia de Medidas
        </Button>
      </div>

      {/* Stock Info */}
      {selectedSize && (
        <div className="text-sm">
          {selectedSizeStock > 0 ? (
            <span className="text-green-600">
              {selectedSizeStock <= 3 ? `Últimas ${selectedSizeStock} peças!` : "Em estoque"}
            </span>
          ) : (
            <span className="text-red-600">Esgotado neste tamanho</span>
          )}
        </div>
      )}

      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= selectedSizeStock}
            >
              +
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {selectedSizeStock > 0 ? `${selectedSizeStock} disponíveis` : ""}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            size="lg"
            disabled={!selectedSize || selectedSizeStock === 0 || isAddingToCart}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isAddingToCart ? "Adicionando..." : "Adicionar ao Carrinho"}
          </Button>
          <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
          </Button>
          <Button variant="outline" size="lg">
            <Share className="h-4 w-4" />
          </Button>
        </div>

        {selectedSizeStock === 0 && selectedSize && (
          <Button variant="outline" className="w-full bg-transparent">
            Avise-me quando chegar
          </Button>
        )}
      </div>

      <Separator />

      {/* Shipping Calculator */}
      <div>
        <h3 className="font-medium mb-3">Calcular Frete</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Digite seu CEP"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="flex-1"
          />
          <Button variant="outline">Calcular</Button>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-primary" />
          <span>Frete grátis para compras acima de R$ 199</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-4 w-4 text-primary" />
          <span>Troca grátis em até 30 dias</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span>Compra 100% segura</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>
    </div>
  )
}
