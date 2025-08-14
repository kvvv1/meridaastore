"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Mock data - em produção viria de uma API
const searchSuggestions = [
  "vestido midi",
  "blusa social",
  "calça jeans",
  "saia plissada",
  "blazer feminino",
  "vestido festa",
  "cropped",
  "conjunto",
]

const trendingSearches = ["vestido outono", "blazer estruturado", "calça wide leg", "conjunto tricot"]

const mockProducts = [
  {
    id: 1,
    name: "Vestido Midi Elegante",
    price: 189.9,
    image: "/elegant-midi-dress-woman.png",
    category: "Vestidos",
  },
  {
    id: 2,
    name: "Blazer Estruturado Premium",
    price: 259.9,
    image: "/elegant-structured-blazer.png",
    category: "Blazers",
  },
  {
    id: 3,
    name: "Vestido Longo Festa",
    price: 329.9,
    image: "/elegant-long-party-dress.png",
    category: "Vestidos",
  },
]

interface SmartSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function SmartSearch({ isOpen, onClose }: SmartSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [products, setProducts] = useState<typeof mockProducts>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)
      // Simular busca com delay
      const timer = setTimeout(() => {
        const filteredSuggestions = searchSuggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(query.toLowerCase()),
        )
        setSuggestions(filteredSuggestions.slice(0, 5))

        const filteredProducts = mockProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase()),
        )
        setProducts(filteredProducts.slice(0, 3))
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setProducts([])
      setIsLoading(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      window.location.href = `/produtos?busca=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 pt-4">
        <div className="max-w-2xl mx-auto">
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(query)
                  }
                  if (e.key === "Escape") {
                    onClose()
                  }
                }}
                placeholder="Buscar produtos, marcas, categorias..."
                className="pl-12 pr-12 h-14 text-lg border-2 border-primary/20 focus:border-primary"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Results */}
          <div className="bg-background border rounded-lg shadow-lg max-h-[70vh] overflow-y-auto">
            {query.length === 0 ? (
              // Trending searches when no query
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Buscas em alta</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend) => (
                    <button
                      key={trend}
                      onClick={() => handleSearch(trend)}
                      className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 rounded-full text-sm transition-colors"
                    >
                      {trend}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="border-b">
                    <div className="p-4">
                      <h3 className="font-semibold mb-3 text-sm text-muted-foreground">SUGESTÕES</h3>
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => handleSearch(suggestion)}
                          className="flex items-center gap-3 w-full p-2 hover:bg-secondary rounded-lg transition-colors"
                        >
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {products.length > 0 && (
                  <div className="p-4">
                    <h3 className="font-semibold mb-3 text-sm text-muted-foreground">PRODUTOS</h3>
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/produto/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <div className="relative w-12 h-12 bg-secondary rounded-lg overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                        </div>
                      </Link>
                    ))}

                    <Button onClick={() => handleSearch(query)} variant="outline" className="w-full mt-3">
                      Ver todos os resultados para "{query}"
                    </Button>
                  </div>
                )}

                {/* No results */}
                {!isLoading && query.length > 0 && suggestions.length === 0 && products.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">Nenhum resultado encontrado para "{query}"</p>
                    <Button onClick={() => handleSearch(query)} variant="outline">
                      Buscar mesmo assim
                    </Button>
                  </div>
                )}

                {/* Loading */}
                {isLoading && (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Buscando...</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
