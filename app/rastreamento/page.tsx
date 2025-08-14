"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Package, Truck, Search } from "lucide-react"

export default function RastreamentoPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingCode.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        code: trackingCode,
        status: "Em trânsito",
        events: [
          {
            date: "2024-01-15 14:30",
            status: "Pedido confirmado",
            location: "São Paulo, SP",
            description: "Seu pedido foi confirmado e está sendo preparado",
          },
          {
            date: "2024-01-16 09:15",
            status: "Produto separado",
            location: "São Paulo, SP",
            description: "Produto separado e embalado para envio",
          },
          {
            date: "2024-01-16 16:45",
            status: "Enviado",
            location: "São Paulo, SP",
            description: "Produto enviado via Correios",
          },
          {
            date: "2024-01-17 08:20",
            status: "Em trânsito",
            location: "Centro de Distribuição - SP",
            description: "Produto em trânsito para sua cidade",
          },
        ],
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Package className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Rastrear Pedido</h1>
            <p className="text-lg text-muted-foreground">
              Acompanhe seu pedido em tempo real digitando o código de rastreamento.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Digite o Código de Rastreamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Ex: BR123456789BR"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleTrack} disabled={loading}>
                  {loading ? (
                    "Buscando..."
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Rastrear
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {trackingData && (
            <Card>
              <CardHeader>
                <CardTitle>Status do Pedido: {trackingData.code}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">Status Atual: {trackingData.status}</h3>
                      <p className="text-muted-foreground">
                        Última atualização: {trackingData.events[trackingData.events.length - 1].date}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Histórico de Movimentação</h4>
                    <div className="space-y-4">
                      {trackingData.events.map((event: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-4 h-4 rounded-full ${
                                index === trackingData.events.length - 1 ? "bg-primary" : "bg-green-500"
                              }`}
                            />
                            {index < trackingData.events.length - 1 && <div className="w-0.5 h-8 bg-border mt-2" />}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex justify-between items-start mb-1">
                              <h5 className="font-semibold">{event.status}</h5>
                              <span className="text-sm text-muted-foreground">{event.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{event.location}</p>
                            <p className="text-sm">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-12">
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">Precisa de Ajuda?</h3>
                <p className="text-muted-foreground mb-6">
                  Se você não conseguir encontrar seu código de rastreamento ou tiver alguma dúvida, entre em contato
                  conosco.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="/contato"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Contato
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
