"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign, BarChart3 } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Vendas Hoje",
    value: "R$ 12.847",
    change: "+12%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    name: "Pedidos Pendentes",
    value: "23",
    change: "+3",
    changeType: "neutral",
    icon: ShoppingCart,
  },
  {
    name: "Produtos em Estoque",
    value: "1.247",
    change: "-5%",
    changeType: "negative",
    icon: Package,
  },
  {
    name: "Novos Clientes",
    value: "89",
    change: "+18%",
    changeType: "positive",
    icon: Users,
  },
]

const recentOrders = [
  {
    id: "MER001234",
    customer: "Maria Silva",
    total: "R$ 299,90",
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "MER001235",
    customer: "Ana Costa",
    total: "R$ 189,90",
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "MER001236",
    customer: "Carla Santos",
    total: "R$ 459,90",
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "MER001237",
    customer: "Julia Oliveira",
    total: "R$ 329,90",
    status: "delivered",
    date: "2024-01-14",
  },
]

const lowStockProducts = [
  { name: "Vestido Midi Elegante", stock: 3, sku: "VES001" },
  { name: "Blusa Seda Premium", stock: 1, sku: "BLU002" },
  { name: "Calça Wide Leg", stock: 2, sku: "CAL003" },
]

const getStatusBadge = (status: string) => {
  const statusMap = {
    pending: { label: "Pendente", variant: "secondary" as const },
    processing: { label: "Processando", variant: "default" as const },
    shipped: { label: "Enviado", variant: "outline" as const },
    delivered: { label: "Entregue", variant: "secondary" as const },
  }
  return statusMap[status as keyof typeof statusMap] || statusMap.pending
}

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua loja</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs ${
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change} em relação a ontem
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pedidos Recentes</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/pedidos">Ver Todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status)
                return (
                  <div key={order.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.customer}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">{order.total}</p>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              Estoque Baixo
            </CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/produtos">Gerenciar</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.sku} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{product.stock} restantes</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col">
              <Link href="/admin/produtos/novo">
                <Package className="h-6 w-6 mb-2" />
                Adicionar Produto
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/admin/pedidos">
                <ShoppingCart className="h-6 w-6 mb-2" />
                Ver Pedidos
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/admin/analytics">
                <BarChart3 className="h-6 w-6 mb-2" />
                Analytics Avançado
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
              <Link href="/admin/relatorios">
                <TrendingUp className="h-6 w-6 mb-2" />
                Relatórios
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Novo pedido #MER001234 recebido</p>
                <p className="text-xs text-muted-foreground">há 5 minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Produto "Vestido Midi Elegante" com estoque baixo</p>
                <p className="text-xs text-muted-foreground">há 1 hora</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm">Pedido #MER001230 foi enviado</p>
                <p className="text-xs text-muted-foreground">há 2 horas</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
