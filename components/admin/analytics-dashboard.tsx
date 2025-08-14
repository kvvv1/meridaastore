"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, ShoppingCart, DollarSign, Percent } from "lucide-react"

interface AnalyticsData {
  revenue: { date: string; value: number }[]
  visitors: { date: string; value: number }[]
  conversions: { date: string; rate: number }[]
  topProducts: { name: string; sales: number; revenue: number }[]
  customerSegments: { segment: string; count: number; value: number }[]
  trafficSources: { source: string; visitors: number; conversions: number }[]
}

const mockData: AnalyticsData = {
  revenue: [
    { date: "Jan", value: 45000 },
    { date: "Fev", value: 52000 },
    { date: "Mar", value: 48000 },
    { date: "Abr", value: 61000 },
    { date: "Mai", value: 55000 },
    { date: "Jun", value: 67000 },
  ],
  visitors: [
    { date: "Jan", value: 12400 },
    { date: "Fev", value: 13200 },
    { date: "Mar", value: 11800 },
    { date: "Abr", value: 15600 },
    { date: "Mai", value: 14200 },
    { date: "Jun", value: 16800 },
  ],
  conversions: [
    { date: "Jan", rate: 2.4 },
    { date: "Fev", rate: 2.8 },
    { date: "Mar", rate: 2.1 },
    { date: "Abr", rate: 3.2 },
    { date: "Mai", rate: 2.9 },
    { date: "Jun", rate: 3.5 },
  ],
  topProducts: [
    { name: "Vestido Midi Elegante", sales: 245, revenue: 46455 },
    { name: "Blazer Estruturado", sales: 189, revenue: 49074 },
    { name: "Calça Wide Leg", sales: 167, revenue: 29906 },
    { name: "Blusa Seda Premium", sales: 134, revenue: 26866 },
  ],
  customerSegments: [
    { segment: "Novos Clientes", count: 1240, value: 35 },
    { segment: "Clientes Recorrentes", count: 890, value: 25 },
    { segment: "VIP", count: 450, value: 13 },
    { segment: "Inativos", count: 920, value: 27 },
  ],
  trafficSources: [
    { source: "Orgânico", visitors: 5420, conversions: 189 },
    { source: "Redes Sociais", visitors: 3240, conversions: 156 },
    { source: "Pago", visitors: 2890, conversions: 198 },
    { source: "Direto", visitors: 1890, conversions: 87 },
  ],
}

const COLORS = ["#8B6F47", "#D4B896", "#F5E6D3", "#A0845C", "#6B5B3F"]

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(mockData)
  const [timeRange, setTimeRange] = useState("6m")

  const totalRevenue = data.revenue.reduce((sum, item) => sum + item.value, 0)
  const totalVisitors = data.visitors.reduce((sum, item) => sum + item.value, 0)
  const avgConversion = data.conversions.reduce((sum, item) => sum + item.rate, 0) / data.conversions.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Insights detalhados sobre performance da loja</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="6m">Últimos 6 meses</option>
          <option value="1y">Último ano</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8.2% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversion.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+0.8% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 189,50</div>
            <p className="text-xs text-muted-foreground">+5.3% vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="traffic">Tráfego</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Receita ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Receita"]} />
                    <Area type="monotone" dataKey="value" stroke="#8B6F47" fill="#8B6F47" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data.conversions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Conversão"]} />
                    <Line type="monotone" dataKey="rate" stroke="#8B6F47" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8B6F47" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segmentação de Clientes</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data.customerSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ segment, value }) => `${segment}: ${value}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Tráfego</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.trafficSources.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitantes</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{source.conversions} conversões</p>
                      <p className="text-sm text-muted-foreground">
                        {((source.conversions / source.visitors) * 100).toFixed(1)}% taxa
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
