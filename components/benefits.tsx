import { Truck, RefreshCw, CreditCard, Shield } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "Acima de R$ 199 para todo Brasil",
  },
  {
    icon: RefreshCw,
    title: "Troca Garantida",
    description: "30 dias para trocar ou devolver",
  },
  {
    icon: CreditCard,
    title: "Parcele sem Juros",
    description: "Em até 12x no cartão de crédito",
  },
  {
    icon: Shield,
    title: "Compra Segura",
    description: "Seus dados protegidos",
  },
]

export function Benefits() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{benefit.title}</h3>
              <p className="text-xs text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
