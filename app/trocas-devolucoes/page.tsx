import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Package, RefreshCw } from "lucide-react"

export default function TrocasDevolucoesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Trocas e Devoluções</h1>
            <p className="text-lg text-muted-foreground">
              Sua satisfação é nossa prioridade. Conheça nossa política de trocas e devoluções.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">30 Dias</h3>
                <p className="text-sm text-muted-foreground">Para solicitar troca ou devolução</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Produto Íntegro</h3>
                <p className="text-sm text-muted-foreground">Com etiquetas e embalagem original</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Troca Grátis</h3>
                <p className="text-sm text-muted-foreground">Primeira troca sem custo adicional</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Processo Simples</h3>
                <p className="text-sm text-muted-foreground">Solicitação online rápida e fácil</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Como Solicitar Troca ou Devolução</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Acesse sua conta</h4>
                    <p className="text-muted-foreground">Entre na sua conta e vá em "Meus Pedidos"</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Selecione o produto</h4>
                    <p className="text-muted-foreground">Escolha o item que deseja trocar ou devolver</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Informe o motivo</h4>
                    <p className="text-muted-foreground">Selecione o motivo da troca ou devolução</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Aguarde a coleta</h4>
                    <p className="text-muted-foreground">Enviaremos uma etiqueta de postagem gratuita</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Política de Trocas e Devoluções</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Prazo</h4>
                  <p className="text-muted-foreground">
                    Você tem até 30 dias corridos, a partir da data de recebimento do produto, para solicitar troca ou
                    devolução.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Condições do Produto</h4>
                  <p className="text-muted-foreground">
                    O produto deve estar em perfeitas condições, sem uso, com todas as etiquetas originais e na
                    embalagem original.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Produtos Não Aceitos</h4>
                  <p className="text-muted-foreground">
                    Lingerie, biquínis, produtos personalizados e itens em promoção com desconto acima de 50% não podem
                    ser trocados ou devolvidos por questões de higiene e política comercial.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Reembolso</h4>
                  <p className="text-muted-foreground">
                    O reembolso será processado em até 5 dias úteis após recebermos o produto. O valor será creditado na
                    mesma forma de pagamento utilizada na compra.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
