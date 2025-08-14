"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Share2,
  ShoppingBag,
  Trash2,
  Star,
  Grid3X3,
  List,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  inStock: boolean
  rating: number
  reviews: number
  addedAt: Date
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Vestido Midi Elegante",
    price: 189.9,
    originalPrice: 249.9,
    image: "/elegant-midi-dress-woman.png",
    category: "Vestidos",
    inStock: true,
    rating: 4.8,
    reviews: 124,
    addedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Blazer Estruturado",
    price: 259.9,
    image: "/elegant-structured-blazer.png",
    category: "Blazers",
    inStock: false,
    rating: 4.9,
    reviews: 89,
    addedAt: new Date("2024-01-10"),
  },
]

export function EnhancedWishlist() {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlistItems)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const { user } = useAuth()
  const { toast } = useToast()

  const removeFromWishlist = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Item removido",
      description: "O produto foi removido da sua wishlist",
    })
  }

  const shareWishlist = async (platform: "whatsapp" | "instagram" | "facebook" | "link") => {
    const wishlistUrl = `${window.location.origin}/wishlist/${user?.id}`
    const text = `Olha minha wishlist da MF Store Girls! 😍 Tem peças incríveis que estou desejando: ${wishlistUrl}`

    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`)
        break
      case "instagram":
        if (navigator.share) {
          navigator.share({ title: "Minha Wishlist", text, url: wishlistUrl })
        } else {
          navigator.clipboard.writeText(text)
          toast({ title: "Texto copiado!", description: "Cole no seu Instagram" })
        }
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(wishlistUrl)}`)
        break
      case "link":
        navigator.clipboard.writeText(wishlistUrl)
        toast({ title: "Link copiado!", description: "Compartilhe sua wishlist" })
        break
    }
  }

  const filteredItems = items.filter((item) => {
    if (filter === "in-stock") return item.inStock
    if (filter === "out-of-stock") return !item.inStock
    if (filter === "on-sale") return item.originalPrice && item.originalPrice > item.price
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      case "recent":
        return b.addedAt.getTime() - a.addedAt.getTime()
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold">Minha Wishlist</h1>
          <p className="text-muted-foreground">{items.length} itens salvos</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => shareWishlist("link")} variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todos
          </Button>
          <Button
            variant={filter === "in-stock" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("in-stock")}
          >
            Em Estoque
          </Button>
          <Button variant={filter === "on-sale" ? "default" : "outline"} size="sm" onClick={() => setFilter("on-sale")}>
            Em Promoção
          </Button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="recent">Mais Recentes</option>
          <option value="price-low">Menor Preço</option>
          <option value="price-high">Maior Preço</option>
          <option value="name">Nome A-Z</option>
        </select>
      </div>

      {/* Share Options */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Compartilhe sua wishlist</h3>
              <p className="text-sm text-muted-foreground">Deixe suas amigas saberem o que você está desejando</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => shareWishlist("whatsapp")} variant="outline" size="sm">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button onClick={() => shareWishlist("instagram")} variant="outline" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button onClick={() => shareWishlist("facebook")} variant="outline" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid/List */}
      {sortedItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Sua wishlist está vazia</h3>
          <p className="text-muted-foreground mb-4">Adicione produtos que você ama para não esquecer deles</p>
          <Button asChild>
            <Link href="/produtos">Explorar Produtos</Link>
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {sortedItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all">
              <CardContent className={viewMode === "grid" ? "p-4" : "p-4 flex gap-4"}>
                <div className={viewMode === "grid" ? "space-y-4" : "flex-shrink-0"}>
                  <div
                    className={`relative overflow-hidden rounded-lg ${
                      viewMode === "grid" ? "aspect-[3/4]" : "w-24 h-24"
                    }`}
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Esgotado</Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className={viewMode === "grid" ? "space-y-2" : "flex-1 space-y-2"}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link href={`/produto/${item.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(item.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">({item.reviews})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {item.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm" disabled={!item.inStock} asChild={item.inStock}>
                      {item.inStock ? (
                        <Link href={`/produto/${item.id}`}>
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Comprar
                        </Link>
                      ) : (
                        <>Avise-me</>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground">Adicionado em {item.addedAt.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
