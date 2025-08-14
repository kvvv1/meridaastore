"use client"

import { useState } from "react"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  colors: string[]
  sizes: string[]
  isNew: boolean
  inStock: boolean
  rating: number
  reviews: number
}

const mockProducts: Product[] = [
  {
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
  },
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

export interface FilterState {
  category: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  inStock: boolean
  isNew: boolean
}

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    colors: [],
    sizes: [],
    priceRange: [0, 1000],
    inStock: false,
    isNew: false,
  })

  const filteredProducts = mockProducts.filter((product) => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false
    }

    // Color filter
    if (filters.colors.length > 0 && !filters.colors.some((color) => product.colors.includes(color))) {
      return false
    }

    // Size filter
    if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
      return false
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false
    }

    // Stock filter
    if (filters.inStock && !product.inStock) {
      return false
    }

    // New filter
    if (filters.isNew && !product.isNew) {
      return false
    }

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.isNew ? 1 : -1
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl mb-4">Todos os Produtos</h1>
        <p className="text-muted-foreground">Descubra nossa coleção completa de moda feminina premium</p>
      </div>

      {/* Search and Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <ProductSort value={sortBy} onChange={setSortBy} />

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <ProductFilters filters={filters} onFiltersChange={setFilters} />
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {sortedProducts.length} produto{sortedProducts.length !== 1 ? "s" : ""} encontrado
              {sortedProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          <ProductGrid products={sortedProducts} />
        </div>
      </div>
    </div>
  )
}
