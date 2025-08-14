import Image from "next/image"
import Link from "next/link"
import { Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const lastChanceProducts = [
  {
    id: 1,
    name: "Vestido Festa Dourado",
    price: 199.9,
    originalPrice: 399.9,
    discount: 50,
    image: "/placeholder.svg?height=400&width=300",
    stock: 3,
  },
  {
    id: 2,
    name: "Conjunto Inverno Premium",
    price: 249.9,
    originalPrice: 449.9,
    discount: 44,
    image: "/placeholder.svg?height=400&width=300",
    stock: 1,
  },
  {
    id: 3,
    name: "Blazer Executivo",
    price: 179.9,
    originalPrice: 329.9,
    discount: 45,
    image: "/placeholder.svg?height=400&width=300",
    stock: 2,
  },
]

export function LastChance() {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="h-6 w-6 text-destructive" />
            <h2 className="text-3xl md:text-4xl font-heading text-foreground">Última Oportunidade</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peças com desconto imperdível que não serão repostas. Últimas unidades disponíveis!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lastChanceProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <Badge variant="destructive" className="animate-pulse">
                    -{product.discount}%
                  </Badge>
                  <Badge variant="secondary" className="bg-orange-500 text-white">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {product.stock} restante{product.stock > 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <Link href={`/produto/${product.id}`} className="block hover:text-primary transition-colors">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    ECONOMIZE R$ {(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </div>

                <div className="text-2xl font-bold text-destructive">R$ {product.price.toFixed(2)}</div>

                <Button asChild className="w-full bg-destructive hover:bg-destructive/90">
                  <Link href={`/produto/${product.id}`}>Comprar Agora - Últimas Peças!</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 p-6 bg-destructive/10 rounded-lg">
          <p className="text-destructive font-semibold mb-2">⚠️ ATENÇÃO: Essas peças não serão repostas!</p>
          <p className="text-sm text-muted-foreground">
            Aproveite os últimos dias desta promoção especial. Quando acabar, acabou!
          </p>
        </div>
      </div>
    </section>
  )
}
