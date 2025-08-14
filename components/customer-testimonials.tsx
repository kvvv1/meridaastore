import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ana Carolina",
    location: "São Paulo, SP",
    rating: 5,
    comment:
      "Simplesmente apaixonada pelas peças! A qualidade é excepcional e o atendimento é nota 10. Já sou cliente fiel!",
    image: "/placeholder.svg?height=80&width=80",
    purchase: "Vestido Midi Elegante",
  },
  {
    id: 2,
    name: "Mariana Silva",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    comment: "Recebi meu pedido super rápido e a peça veio exatamente como na foto. Recomendo demais a MF Store Girls!",
    image: "/placeholder.svg?height=80&width=80",
    purchase: "Conjunto Blazer Estruturado",
  },
  {
    id: 3,
    name: "Juliana Costa",
    location: "Belo Horizonte, MG",
    rating: 5,
    comment:
      "Melhor loja online que já comprei! As roupas são lindas, de qualidade e chegam super bem embaladas. Amei!",
    image: "/placeholder.svg?height=80&width=80",
    purchase: "Vestido Longo Festa",
  },
]

export function CustomerTestimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">O que Nossas Clientes Dizem</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de 50.000 mulheres já se apaixonaram pelas nossas peças. Veja alguns depoimentos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-background p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4 italic">"{testimonial.comment}"</p>

              <div className="text-xs text-primary font-medium">Comprou: {testimonial.purchase}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.9/5</span>
            <span className="text-sm text-muted-foreground">• Mais de 2.500 avaliações</span>
          </div>
        </div>
      </div>
    </section>
  )
}
