"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, ShoppingBag, TrendingUp, Crown, Star, Heart } from "lucide-react"

interface CustomerSegment {
  id: string
  name: string
  description: string
  count: number
  avgOrderValue: number
  totalRevenue: number
  frequency: number
  lastPurchase: number
  growthRate: number
  characteristics: string[]
  recommendations: string[]
}

const customerSegments: CustomerSegment[] = [
  {
    id: "vip",
    name: "Clientes VIP",
    description: "Clientes de alto valor com compras frequentes",
    count: 245,
    avgOrderValue: 450.0,
    totalRevenue: 110250,
    frequency: 8.5,
    lastPurchase: 15,
    growthRate: 12.5,
    characteristics: [
      "Compram produtos premium",
      "Alta frequência de compra",
      "Baixa sensibilidade a preço",
      "Engajamento alto com a marca",
    ],
    recommendations: [
      "Oferecer acesso antecipado a novos produtos",
      "Programa de fidelidade exclusivo",
      "Atendimento personalizado",
      "Eventos VIP e lançamentos",
    ],
  },
  {
    id: "frequent",
    name: "Compradores Frequentes",
    description: "Clientes que compram regularmente",
    count: 892,
    avgOrderValue: 220.0,
    totalRevenue: 196240,
    frequency: 4.2,
    lastPurchase: 30,
    growthRate: 8.3,
    characteristics: [
      "Compras regulares mensais",
      "Conhecem bem os produtos",
      "Respondem a promoções",
      "Recomendam para amigas",
    ],
    recommendations: [
      "Programa de pontos e recompensas",
      "Descontos por volume",
      "Newsletter com novidades",
      "Programa de indicação",
    ],
  },
  {
    id: "occasional",
    name: "Compradores Ocasionais",
    description: "Clientes que compram esporadicamente",
    count: 1456,
    avgOrderValue: 180.0,
    totalRevenue: 262080,
    frequency: 2.1,
    lastPurchase: 90,
    growthRate: 3.2,
    characteristics: [
      "Compras sazonais",
      "Sensíveis a promoções",
      "Pesquisam antes de comprar",
      "Precisam de incentivos",
    ],
    recommendations: [
      "Campanhas de reativação",
      "Ofertas especiais sazonais",
      "Conteúdo educativo",
      "Lembretes de carrinho abandonado",
    ],
  },
  {
    id: "new",
    name: "Novos Clientes",
    description: "Clientes que fizeram primeira compra recentemente",
    count: 634,
    avgOrderValue: 150.0,
    totalRevenue: 95100,
    frequency: 1.0,
    lastPurchase: 45,
    growthRate: 25.8,
    characteristics: [
      "Primeira experiência com a marca",
      "Ainda formando opinião",
      "Potencial de crescimento",
      "Precisam de onboarding",
    ],
    recommendations: [
      "Sequência de boas-vindas",
      "Desconto na segunda compra",
      "Conteúdo de onboarding",
      "Pesquisa de satisfação",
    ],
  },
  {
    id: "at-risk",
    name: "Em Risco",
    description: "Clientes que podem abandonar a marca",
    count: 387,
    avgOrderValue: 200.0,
    totalRevenue: 77400,
    frequency: 1.8,
    lastPurchase: 180,
    growthRate: -15.2,
    characteristics: [
      "Não compram há muito tempo",
      "Diminuição na frequência",
      "Podem ter encontrado concorrentes",
      "Precisam de reengajamento",
    ],
    recommendations: [
      "Campanha de win-back",
      "Pesquisa de feedback",
      "Ofertas especiais de retorno",
      "Contato personalizado",
    ],
  },
]

export function CustomerSegmentation() {
  const [selectedSegment, setSelectedSegment] = useState<CustomerSegment>(customerSegments[0])

  const totalCustomers = customerSegments.reduce((sum, segment) => sum + segment.count, 0)
  const totalRevenue = customerSegments.reduce((sum, segment) => sum + segment.totalRevenue, 0)

  const getSegmentIcon = (segmentId: string) => {
    switch (segmentId) {
      case "vip":
        return <Crown className="h-5 w-5 text-yellow-500" />
      case "frequent":
        return <Star className="h-5 w-5 text-blue-500" />
      case "occasional":
        return <ShoppingBag className="h-5 w-5 text-green-500" />
      case "new":
        return <Heart className="h-5 w-5 text-pink-500" />
      case "at-risk":
        return <TrendingUp className="h-5 w-5 text-red-500" />
      default:
        return <Users className="h-5 w-5" />
    }
  }

  const getGrowthColor = (rate: number) => {
    if (rate > 10) return "text-green-600"
    if (rate > 0) return "text-blue-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Segmentação de Clientes</h1>
        <p className="text-muted-foreground">Análise detalhada dos diferentes perfis de clientes</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Base ativa de clientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Receita de todos os segmentos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio Geral</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {(totalRevenue / totalCustomers).toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">Valor médio por cliente</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Segments List */}
        <div className="space-y-4">
          <h3 className="font-semibold">Segmentos de Clientes</h3>
          {customerSegments.map((segment) => (
            <Card
              key={segment.id}
              className={`cursor-pointer transition-all ${
                selectedSegment.id === segment.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedSegment(segment)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  {getSegmentIcon(segment.id)}
                  <h4 className="font-medium">{segment.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{segment.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Clientes:</span>
                    <p className="font-medium">{segment.count}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Receita:</span>
                    <p className="font-medium">R$ {segment.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <Badge variant={segment.growthRate > 0 ? "default" : "destructive"} className="text-xs">
                    {segment.growthRate > 0 ? "+" : ""}
                    {segment.growthRate}% crescimento
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Segment Details */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                {getSegmentIcon(selectedSegment.id)}
                <div>
                  <CardTitle>{selectedSegment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedSegment.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSegment.count}</div>
                  <p className="text-xs text-muted-foreground">Clientes</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">R$ {selectedSegment.avgOrderValue.toFixed(0)}</div>
                  <p className="text-xs text-muted-foreground">Ticket Médio</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSegment.frequency.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">Compras/Ano</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{selectedSegment.lastPurchase}</div>
                  <p className="text-xs text-muted-foreground">Dias Última Compra</p>
                </div>
              </div>

              <Tabs defaultValue="characteristics" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="characteristics">Características</TabsTrigger>
                  <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
                </TabsList>

                <TabsContent value="characteristics">
                  <div className="space-y-2">
                    <h4 className="font-medium">Características do Segmento</h4>
                    <ul className="space-y-2">
                      {selectedSegment.characteristics.map((characteristic, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          {characteristic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="recommendations">
                  <div className="space-y-2">
                    <h4 className="font-medium">Estratégias Recomendadas</h4>
                    <ul className="space-y-2">
                      {selectedSegment.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
