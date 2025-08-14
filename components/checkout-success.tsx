"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail, PhoneIcon as WhatsApp } from "lucide-react"
import Link from "next/link"

export function CheckoutSuccess() {
  const orderNumber = "MER" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h1 className="font-heading text-3xl mb-4">Pedido Confirmado!</h1>
          <p className="text-muted-foreground text-lg">
            Obrigada por escolher a Merida Store. Seu pedido foi processado com sucesso.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Número do Pedido</h3>
                <p className="text-2xl font-bold text-primary">#{orderNumber}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-sm">Confirmação por E-mail</p>
                    <p className="text-xs text-muted-foreground">Enviado agora</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <WhatsApp className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-sm">Atualizações via WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Em breve</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-sm">Prazo de Entrega</p>
                    <p className="text-xs text-muted-foreground">5-7 dias úteis</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Que tal completar o look?</h3>
          <p className="text-muted-foreground">
            Aproveite 15% de desconto na sua próxima compra com o cupom <strong>OBRIGADA15</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/produtos">Continuar Comprando</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent">
              <Link href="/conta/pedidos">Acompanhar Pedido</Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 p-6 bg-secondary/20 rounded-lg">
          <h4 className="font-medium mb-3">Precisa de Ajuda?</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Nossa equipe está pronta para ajudar com qualquer dúvida sobre seu pedido.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm" className="bg-transparent">
              <WhatsApp className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Mail className="h-4 w-4 mr-2" />
              E-mail
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
