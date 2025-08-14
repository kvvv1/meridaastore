"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { TrendingUp, AlertTriangle, Package, Target } from "lucide-react"

interface ForecastData {
  period: string
  historical: number
  predicted: number
  confidence: number
  trend: "up" | "down" | "stable"
}

interface ProductForecast {
  id: string
  name: string
  category: string
  currentStock: number
  predictedDemand: number
  recommendedOrder: number
  riskLevel: "low" | "medium" | "high"
  seasonality: number
}

const demandForecast: ForecastData[] = [
  { period: "Jan", historical: 1200, predicted: 1350, confidence: 85, trend: "up" },
  { period: "Fev", historical: 1100, predicted: 1280, confidence: 82, trend: "up" },
  { period: "Mar", historical: 1300, predicted: 1420, confidence: 88, trend: "up" },
  { period: "Abr", historical: 1450, predicted: 1580, confidence: 90, trend: "up" },
  { period: "Mai", historical: 1200, predicted: 1320, confidence: 85, trend: "stable" },
  { period: "Jun", historical: 0, predicted: 1400, confidence: 78, trend: "up" },
  { period: "Jul", historical: 0, predicted: 1520, confidence: 75, trend: "up" },
  { period: "Ago", historical: 0, predicted: 1480, confidence: 72, trend: "stable" },
]

const productForecasts: ProductForecast[] = [
  {
    id: "1",
    name: "Vestido Midi Elegante",
    category: "Vestidos",
    currentStock: 45,
    predictedDemand: 120,
    recommendedOrder: 100,
    riskLevel: "high",
    seasonality: 1.2,
  },
  {
    id: "2",
    name: "Blazer Estruturado",
    category: "Blazers",
    currentStock: 78,
    predictedDemand: 95,
    recommendedOrder: 50,
    riskLevel: "medium",
    seasonality: 0.9,
  },
  {
    id: "3",
    name: "Calça Wide Leg",
    category: "Calças",
    currentStock: 120,
    predictedDemand: 85,
    recommendedOrder: 0,
    riskLevel: "low",
    seasonality: 1.1,
  },
  {
    id: "4",
    name: "Blusa Seda Premium",
    category: "Blusas",
    currentStock: 25,
    predictedDemand: 110,
    recommendedOrder: 90,
    riskLevel: "high",
    seasonality: 1.3,
  },
]

export function DemandForecasting() {
  const [selectedPeriod, setSelectedPeriod] = useState("3m")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "medium":
        return <TrendingUp className="h-4 w-4 text-yellow-500" />
      case "low":
        return <Target className="h-4 w-4 text-green-500" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const totalPredictedDemand = productForecasts.reduce((sum, product) => sum + product.predictedDemand, 0)
  const totalRecommendedOrder = productForecasts.reduce((sum, product) => sum + product.recommendedOrder, 0)
  const highRiskProducts = productForecasts.filter((product) => product.riskLevel === "high").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Previsão de Demanda</h1>
          <p className="text-muted-foreground">Análise preditiva para otimização de estoque</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="1m">Próximo mês</option>
            <option value="3m">Próximos 3 meses</option>
            <option value="6m">Próximos 6 meses</option>
            <option value="1y">Próximo ano</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Todas Categorias</option>
            <option value="vestidos">Vestidos</option>
            <option value="blusas">Blusas</option>
            <option value="calcas">Calças</option>
            <option value="blazers">Blazers</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demanda Prevista</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPredictedDemand}</div>
            <p className="text-xs text-muted-foreground">Unidades próximos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedido Recomendado</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecommendedOrder}</div>
            <p className="text-xs text-muted-foreground">Unidades a comprar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos em Risco</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highRiskProducts}</div>
            <p className="text-xs text-muted-foreground">Risco de ruptura</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acurácia Modelo</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Precisão das previsões</p>
          </CardContent>
        </Card>
      </div>

      {/* Demand Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Previsão de Demanda - Próximos Meses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={demandForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [`${value} unidades`, name === "historical" ? "Histórico" : "Previsto"]}
              />
              <Area
                type="monotone"
                dataKey="historical"
                stackId="1"
                stroke="#8B6F47"
                fill="#8B6F47"
                fillOpacity={0.8}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="2"
                stroke="#D4B896"
                fill="#D4B896"
                fillOpacity={0.6}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Product Forecasts */}
      <Card>
        <CardHeader>
          <CardTitle>Previsão por Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productForecasts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getRiskIcon(product.riskLevel)}
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Estoque Atual</p>
                    <p className="font-bold">{product.currentStock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Demanda Prevista</p>
                    <p className="font-bold">{product.predictedDemand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pedido Recomendado</p>
                    <p className="font-bold">{product.recommendedOrder}</p>
                  </div>
                  <div>
                    <Badge className={getRiskColor(product.riskLevel)}>
                      {product.riskLevel === "high" && "Alto Risco"}
                      {product.riskLevel === "medium" && "Médio Risco"}
                      {product.riskLevel === "low" && "Baixo Risco"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seasonality Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Sazonalidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productForecasts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}x`, "Fator Sazonal"]} />
              <Bar dataKey="seasonality" fill="#8B6F47" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Action Items */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">🚨 Ação Urgente</h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Reabastecer "Vestido Midi Elegante" - Risco de ruptura em 7 dias</li>
                <li>• Reabastecer "Blusa Seda Premium" - Demanda alta prevista</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">⚠️ Monitorar</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• "Blazer Estruturado" - Estoque adequado por mais 2 semanas</li>
                <li>• Preparar campanha de marketing para produtos sazonais</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">✅ Situação Controlada</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• "Calça Wide Leg" - Estoque suficiente para próximos 30 dias</li>
                <li>• Modelo de previsão funcionando com 87% de acurácia</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
