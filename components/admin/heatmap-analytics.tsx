"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MousePointer, Eye, Clock, Smartphone, Monitor, Tablet } from "lucide-react"

interface HeatmapData {
  page: string
  clicks: { x: number; y: number; intensity: number }[]
  scrollDepth: number
  timeOnPage: number
  bounceRate: number
  device: "desktop" | "mobile" | "tablet"
}

const mockHeatmapData: HeatmapData[] = [
  {
    page: "Homepage",
    clicks: [
      { x: 50, y: 20, intensity: 0.9 },
      { x: 30, y: 40, intensity: 0.7 },
      { x: 70, y: 60, intensity: 0.8 },
      { x: 45, y: 80, intensity: 0.6 },
    ],
    scrollDepth: 75,
    timeOnPage: 145,
    bounceRate: 35,
    device: "desktop",
  },
  {
    page: "Produtos",
    clicks: [
      { x: 25, y: 30, intensity: 0.8 },
      { x: 75, y: 30, intensity: 0.9 },
      { x: 50, y: 70, intensity: 0.7 },
    ],
    scrollDepth: 85,
    timeOnPage: 210,
    bounceRate: 28,
    device: "mobile",
  },
]

export function HeatmapAnalytics() {
  const [selectedPage, setSelectedPage] = useState("Homepage")
  const [selectedDevice, setSelectedDevice] = useState<"all" | "desktop" | "mobile" | "tablet">("all")

  const currentData = mockHeatmapData.find((data) => data.page === selectedPage)

  const getIntensityColor = (intensity: number) => {
    if (intensity > 0.8) return "bg-red-500"
    if (intensity > 0.6) return "bg-orange-500"
    if (intensity > 0.4) return "bg-yellow-500"
    return "bg-blue-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Heatmap Analytics</h1>
          <p className="text-muted-foreground">Análise de comportamento dos usuários nas páginas</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="Homepage">Homepage</option>
            <option value="Produtos">Produtos</option>
            <option value="Produto Detalhes">Produto Detalhes</option>
            <option value="Checkout">Checkout</option>
          </select>
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value as any)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Todos Dispositivos</option>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>
      </div>

      {/* Page Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profundidade de Scroll</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData?.scrollDepth}%</div>
            <p className="text-xs text-muted-foreground">Média da página</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tempo na Página</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData?.timeOnPage}s</div>
            <p className="text-xs text-muted-foreground">Tempo médio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Rejeição</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData?.bounceRate}%</div>
            <p className="text-xs text-muted-foreground">Usuários que saíram</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivo Principal</CardTitle>
            {currentData?.device === "desktop" && <Monitor className="h-4 w-4 text-muted-foreground" />}
            {currentData?.device === "mobile" && <Smartphone className="h-4 w-4 text-muted-foreground" />}
            {currentData?.device === "tablet" && <Tablet className="h-4 w-4 text-muted-foreground" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{currentData?.device}</div>
            <p className="text-xs text-muted-foreground">Mais usado</p>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Mapa de Calor - {selectedPage}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: "600px" }}>
            {/* Simulated page layout */}
            <div className="absolute inset-0 bg-white m-4 rounded shadow-sm">
              {/* Header simulation */}
              <div className="h-16 bg-primary/10 border-b"></div>

              {/* Content areas */}
              <div className="p-4 space-y-4">
                <div className="h-32 bg-gray-50 rounded"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-gray-50 rounded"></div>
                  <div className="h-24 bg-gray-50 rounded"></div>
                  <div className="h-24 bg-gray-50 rounded"></div>
                </div>
                <div className="h-48 bg-gray-50 rounded"></div>
              </div>

              {/* Click heatmap points */}
              {currentData?.clicks.map((click, index) => (
                <div
                  key={index}
                  className={`absolute w-8 h-8 rounded-full opacity-70 ${getIntensityColor(click.intensity)}`}
                  style={{
                    left: `${click.x}%`,
                    top: `${click.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-full h-full rounded-full animate-ping"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Muito clicado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm">Clicado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Pouco clicado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm">Raramente clicado</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights e Recomendações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">✅ Pontos Fortes</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Alto engajamento na seção de produtos em destaque</li>
                <li>• Boa profundidade de scroll (75%)</li>
                <li>• Tempo na página acima da média do setor</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Oportunidades de Melhoria</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Botão de CTA principal recebe poucos cliques</li>
                <li>• Seção de newsletter no rodapé é ignorada</li>
                <li>• Menu de navegação poderia ser mais visível</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">💡 Recomendações</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Mover CTA principal para área de maior cliques</li>
                <li>• Adicionar popup de newsletter com timing otimizado</li>
                <li>• Testar diferentes posições para menu de navegação</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
