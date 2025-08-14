import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const exclusiveProducts = [
  {
    id: 1,
    name: "Vestido Exclusivo Terra",
    price: 399.9,
    image: "/exclusive-earthy-dress.png",
    isAvailable: true,
  },
  {
    id: 2,
    name: "Conjunto Premium Outono",
    price: 549.9,
    image: "/placeholder.svg?height=400&width=300",
    isAvailable: false,
  },
  {
    id: 3,
    name: "Blazer Signature",
    price: 449.9,
    image: "/placeholder.svg?height=400&width=300",
    isAvailable: true,
  },
]

export function ExclusiveCollection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Garanta seu Novo Look</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Coleção exclusiva com peças limitadas. Designs únicos que não serão repostos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exclusiveProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary" className="text-sm">
                      ESGOTADO
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <div className="text-xl font-bold text-primary">R$ {product.price.toFixed(2)}</div>

                {product.isAvailable ? (
                  <Button asChild className="w-full">
                    <Link href={`/produto/${product.id}`}>Comprar Agora</Link>
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full bg-transparent">
                    Avise-me quando Chegar
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/colecao-exclusiva">Explorar Coleção Completa</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
