import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag } from "lucide-react"
import Link from "next/link"

const featuredProducts = [
  {
    id: 1,
    name: "Vestido Midi Elegante",
    price: "R$ 299,90",
    originalPrice: "R$ 399,90",
    image: "/elegant-midi-dress-woman.png",
    isNew: true,
    discount: "25%",
  },
  {
    id: 2,
    name: "Blusa Seda Premium",
    price: "R$ 189,90",
    image: "/woman-silk-blouse.png",
    isNew: false,
  },
  {
    id: 3,
    name: "Calça Wide Leg",
    price: "R$ 249,90",
    image: "/wide-leg-pants-fashion.png",
    isNew: true,
  },
  {
    id: 4,
    name: "Saia Plissada",
    price: "R$ 159,90",
    originalPrice: "R$ 199,90",
    image: "/pleated-skirt-fashion.png",
    discount: "20%",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Produtos em Destaque</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Peças cuidadosamente selecionadas para compor looks únicos e sofisticados
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover-lift border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                        Novo
                      </span>
                    )}
                    {product.discount && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full font-medium">
                        -{product.discount}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="h-8 w-8">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick add to cart */}
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button className="w-full" size="sm">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/produto/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ou 3x de R${" "}
                    {(Number.parseFloat(product.price.replace("R$ ", "").replace(",", ".")) / 3)
                      .toFixed(2)
                      .replace(".", ",")}{" "}
                    sem juros
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="hover-lift bg-transparent">
            <Link href="/produtos">Ver Todos os Produtos</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
