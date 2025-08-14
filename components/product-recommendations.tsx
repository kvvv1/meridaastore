"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Product } from "@/components/product-catalog"

interface ProductRecommendationsProps {
  title: string
  type: "similar" | "viewed" | "purchased" | "trending" | "personalized"
  currentProductId?: number
  userId?: string
  category?: string
}

// Mock recommendation data - in real app this would come from AI/ML service
const mockRecommendations: Product[] = [
  {
    id: 1,
    name: "Vestido Midi Elegante",
    price: 189.9,
    originalPrice: 249.9,
    image: "/elegant-midi-dress-woman.png",
    category: "vestidos",
    colors: ["preto", "azul", "vermelho"],
    sizes: ["P", "M", "G", "GG"],
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Blazer Estruturado Premium",
    price: 259.9,
    image: "/elegant-structured-blazer.png",
    category: "blazers",
    colors: ["preto", "bege", "azul"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Vestido Longo Festa",
    price: 329.9,
    image: "/elegant-long-party-dress.png",
    category: "vestidos",
    colors: ["preto", "dourado", "prata"],
    sizes: ["P", "M", "G"],
    isNew: false,
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Blusa Social Feminina",
    price: 129.9,
    originalPrice: 159.9,
    image: "/elegant-midi-dress-woman.png",
    category: "blusas",
    colors: ["branco", "preto", "azul"],
    sizes: ["P", "M", "G", "GG"],
    isNew: false,
    inStock: true,
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    name: "Calça Wide Leg Premium",
    price: 199.9,
    image: "/elegant-structured-blazer.png",
    category: "calcas",
    colors: ["preto", "bege", "marrom"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviews: 67,
  },
]

export function ProductRecommendations({
  title,
  type,
  currentProductId,
  userId,
  category,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get recommendations
    const fetchRecommendations = async () => {
      setIsLoading(true)

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Filter recommendations based on type
      let filteredRecommendations = [...mockRecommendations]

      switch (type) {
        case "similar":
          // Filter by same category, exclude current product
          filteredRecommendations = mockRecommendations.filter(
            (product) => product.category === category && product.id !== currentProductId,
          )
          break
        case "viewed":
          // Recently viewed products (mock data)
          filteredRecommendations = mockRecommendations.slice(0, 4)
          break
        case "purchased":
          // Frequently bought together
          filteredRecommendations = mockRecommendations.slice(1, 5)
          break
        case "trending":
          // Trending products (highest rated)
          filteredRecommendations = mockRecommendations.sort((a, b) => b.rating - a.rating).slice(0, 4)
          break
        case "personalized":
          // Personalized based on user history
          filteredRecommendations = mockRecommendations.slice(0, 5)
          break
      }

      setRecommendations(filteredRecommendations)
      setIsLoading(false)
    }

    fetchRecommendations()
  }, [type, currentProductId, userId, category])

  const itemsPerView = 4
  const maxIndex = Math.max(0, recommendations.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-[3/4] bg-secondary rounded-lg mb-4" />
                <div className="h-4 bg-secondary rounded mb-2" />
                <div className="h-4 bg-secondary rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{title}</h3>
        {recommendations.length > itemsPerView && (
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {recommendations.map((product) => (
            <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
              <Card className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-secondary/20">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <Badge variant="destructive">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <ShoppingBag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link href={`/produto/${product.id}`} className="block">
                      <h4 className="font-medium text-sm hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h4>
                    </Link>

                    {/* Rating */}
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

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{
                              backgroundColor:
                                color === "preto"
                                  ? "#000"
                                  : color === "branco"
                                    ? "#fff"
                                    : color === "azul"
                                      ? "#3b82f6"
                                      : color === "vermelho"
                                        ? "#ef4444"
                                        : color === "bege"
                                          ? "#d4b896"
                                          : "#6b7280",
                            }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{product.colors.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
