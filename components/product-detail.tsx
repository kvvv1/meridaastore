"use client"

import { useState } from "react"
import { ProductGallery } from "@/components/product-gallery"
import { ProductInfo } from "@/components/product-info"
import { ProductTabs } from "@/components/product-tabs"
import { ProductReviews } from "@/components/product-reviews"
import type { Product } from "@/components/product-catalog"

// Mock product data - in real app this would come from API
const mockProduct: Product & {
  description: string
  details: string[]
  care: string[]
  shipping: string
  reviews: Array<{
    id: number
    user: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }>
  gallery: string[]
  variants: Array<{
    color: string
    sizes: Array<{ size: string; stock: number }>
  }>
} = {
  id: 1,
  name: "Vestido Midi Elegante",
  price: 299.9,
  originalPrice: 399.9,
  image: "/elegant-midi-dress-woman.png",
  category: "vestidos",
  colors: ["preto", "azul", "vermelho"],
  sizes: ["P", "M", "G", "GG"],
  isNew: true,
  inStock: true,
  rating: 4.8,
  reviews: 124,
  description:
    "Vestido midi elegante confeccionado em tecido premium com caimento perfeito. Ideal para ocasiões especiais e eventos sociais. O design atemporal combina sofisticação e conforto, proporcionando um visual impecável.",
  details: [
    "Tecido: 95% Poliéster, 5% Elastano",
    "Modelagem: Ajustada no busto, solta na cintura",
    "Comprimento: Midi (altura do joelho)",
    "Fechamento: Zíper invisível nas costas",
    "Forro: Sim, em tecido acetinado",
  ],
  care: [
    "Lavar à mão ou máquina no ciclo delicado",
    "Usar água fria (máx. 30°C)",
    "Não usar alvejante",
    "Secar à sombra",
    "Passar com ferro morno se necessário",
  ],
  shipping: "Frete grátis para compras acima de R$ 199",
  gallery: [
    "/elegant-midi-dress-woman.png",
    "/elegant-midi-dress-detail-1.png",
    "/elegant-midi-dress-detail-2.png",
    "/elegant-midi-dress-back.png",
  ],
  variants: [
    {
      color: "preto",
      sizes: [
        { size: "P", stock: 5 },
        { size: "M", stock: 8 },
        { size: "G", stock: 3 },
        { size: "GG", stock: 0 },
      ],
    },
    {
      color: "azul",
      sizes: [
        { size: "P", stock: 2 },
        { size: "M", stock: 6 },
        { size: "G", stock: 4 },
        { size: "GG", stock: 1 },
      ],
    },
    {
      color: "vermelho",
      sizes: [
        { size: "P", stock: 0 },
        { size: "M", stock: 3 },
        { size: "G", stock: 7 },
        { size: "GG", stock: 2 },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Maria Silva",
      rating: 5,
      comment: "Vestido lindo! O tecido é de excelente qualidade e o caimento é perfeito. Recebi muitos elogios.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: 2,
      user: "Ana Costa",
      rating: 4,
      comment: "Muito elegante, mas achei que poderia ter mais opções de cores. No geral, estou satisfeita.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: 3,
      user: "Carla Santos",
      rating: 5,
      comment: "Superou minhas expectativas! O vestido é ainda mais bonito pessoalmente. Recomendo!",
      date: "2024-01-08",
      verified: false,
    },
  ],
}

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(mockProduct.variants[0].color)
  const [selectedSize, setSelectedSize] = useState("")

  const currentVariant = mockProduct.variants.find((v) => v.color === selectedColor)
  const selectedSizeStock = currentVariant?.sizes.find((s) => s.size === selectedSize)?.stock || 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <span>Home</span> / <span>Vestidos</span> / <span className="text-foreground">{mockProduct.name}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={mockProduct.gallery} productName={mockProduct.name} />
        <ProductInfo
          product={mockProduct}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          selectedSizeStock={selectedSizeStock}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
        />
      </div>

      {/* Product Details Tabs */}
      <ProductTabs product={mockProduct} />

      {/* Reviews Section */}
      <ProductReviews reviews={mockProduct.reviews} rating={mockProduct.rating} totalReviews={mockProduct.reviews} />
    </div>
  )
}
