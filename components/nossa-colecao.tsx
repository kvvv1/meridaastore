"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Eye, ShoppingCart, Grid3X3, Grid2X2, SlidersHorizontal, Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  rating: number
  reviewCount: number
  colors: string[]
  sizes: string[]
  isNew?: boolean
  category: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Vestido Midi Elegante",
    price: 189.9,
    originalPrice: 249.9,
    image: "/elegant-midi-dress-woman.png",
    hoverImage: "/elegant-midi-dress-hover.png",
    rating: 4.8,
    reviewCount: 124,
    colors: ["#8D7B68", "#A8B5A1", "#E5D3C8"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    category: "Vestidos",
  },
  {
    id: "2",
    name: "Blusa Sofisticada",
    price: 129.9,
    originalPrice: 159.9,
    image: "/sophisticated-woman-dress.png",
    rating: 4.6,
    reviewCount: 89,
    colors: ["#2C2C2C", "#8D7B68", "#FFFFFF"],
    sizes: ["P", "M", "G"],
    category: "Blusas",
  },
  {
    id: "3",
    name: "Conjunto Terroso",
    price: 299.9,
    image: "/earthy-luxury-accessories.png",
    rating: 4.9,
    reviewCount: 156,
    colors: ["#8D7B68", "#A8B5A1"],
    sizes: ["P", "M", "G", "GG"],
    isNew: true,
    category: "Conjuntos",
  },
  // Adicionar mais produtos conforme necessário
]

const categories = [
  { name: "Todos", count: 124, active: true },
  { name: "Vestidos", count: 32 },
  { name: "Blusas", count: 28 },
  { name: "Conjuntos", count: 18 },
  { name: "Calças", count: 24 },
  { name: "Saias", count: 22 },
]

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div
      className="group bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Imagem com Overlay */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">Novo</Badge>}
          {discount > 0 && <Badge className="bg-destructive text-destructive-foreground">-{discount}%</Badge>}
        </div>

        {/* Botões de Ação */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 p-0 rounded-full"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current text-destructive" : ""}`} />
          </Button>
          <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button className="w-full bg-primary hover:bg-primary/90">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
        </div>

        {/* Nome */}
        <h3 className="font-medium text-foreground mb-2 line-clamp-2">{product.name}</h3>

        {/* Cores */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Cor:</span>
          <div className="flex gap-1">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedColor === color ? "border-primary scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        {/* Tamanhos */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-muted-foreground">Tamanho:</span>
          <div className="flex gap-1">
            {product.sizes.map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </div>

        {/* Preço */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-foreground">R$ {product.price.toFixed(2).replace(".", ",")}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        {/* Parcelamento */}
        <p className="text-sm text-muted-foreground">
          ou 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")} sem juros
        </p>
      </div>
    </div>
  )
}

export function NossaColecao() {
  const [viewType, setViewType] = useState<"grid-2" | "grid-3">("grid-3")
  const [sortBy, setSortBy] = useState("featured")
  const [activeCategory, setActiveCategory] = useState("Todos")

  const filteredProducts =
    activeCategory === "Todos" ? mockProducts : mockProducts.filter((product) => product.category === activeCategory)

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">Nossa Coleção</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Peças cuidadosamente selecionadas para mulheres que valorizam qualidade, elegância e estilo em cada detalhe.
          </p>
        </div>

        {/* Filtro de Categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Toolbar de Controles */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          {/* Lado Esquerdo */}
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <span className="text-sm text-muted-foreground">{filteredProducts.length} produtos encontrados</span>
          </div>

          {/* Lado Direito */}
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destaques</SelectItem>
                <SelectItem value="price-low">Menor preço</SelectItem>
                <SelectItem value="price-high">Maior preço</SelectItem>
                <SelectItem value="newest">Mais novos</SelectItem>
                <SelectItem value="rating">Melhor avaliados</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg">
              <Button
                variant={viewType === "grid-2" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setViewType("grid-2")}
              >
                <Grid2X2 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewType === "grid-3" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewType("grid-3")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Grid de Produtos */}
        <div
          className={`grid gap-6 ${
            viewType === "grid-2"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Botão Ver Mais */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Ver Mais Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
