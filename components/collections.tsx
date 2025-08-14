import { Button } from "@/components/ui/button"
import Link from "next/link"

const collections = [
  {
    name: "Coleção Verão",
    description: "Peças leves e elegantes para os dias quentes",
    image: "/summer-fashion-elegant-women.png",
    href: "/colecao/verao",
  },
  {
    name: "Essenciais",
    description: "Básicos sofisticados para o dia a dia",
    image: "/essential-womens-wardrobe.png",
    href: "/colecao/essenciais",
  },
]

export function Collections() {
  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Nossas Coleções</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossas coleções temáticas criadas para diferentes momentos da sua vida
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {collections.map((collection) => (
            <div key={collection.name} className="relative group overflow-hidden rounded-lg hover-lift">
              <div className="aspect-[4/3] relative">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                <div className="animate-slide-up">
                  <h3 className="font-heading text-2xl md:text-3xl mb-4">{collection.name}</h3>
                  <p className="text-lg mb-6 opacity-90">{collection.description}</p>
                  <Button asChild variant="secondary" className="hover-lift">
                    <Link href={collection.href}>Explorar Coleção</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
