import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const thematicProducts = [
  {
    id: 1,
    name: "Vestido Estampa Floral",
    price: 229.9,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 2,
    name: "Blusa Estampa Geométrica",
    price: 159.9,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 3,
    name: "Saia Estampa Animal",
    price: 189.9,
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    id: 4,
    name: "Conjunto Estampa Abstrata",
    price: 319.9,
    image: "/placeholder.svg?height=400&width=300",
  },
]

export function ThematicCollection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header with background */}
        <div className="relative mb-12 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
          <Image
            src="/placeholder.svg?height=300&width=1200"
            alt="Coleção de Estampas"
            width={1200}
            height={300}
            className="w-full h-48 md:h-64 object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading mb-4">Coleção de Estampas</h2>
              <p className="text-lg opacity-90 max-w-2xl">Desperte sua personalidade com estampas únicas e marcantes</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {thematicProducts.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="space-y-2">
                <Link href={`/produto/${product.id}`} className="block hover:text-primary transition-colors">
                  <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                </Link>

                <div className="text-lg font-bold text-primary">R$ {product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/colecao-estampas">Ver Toda a Coleção</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
