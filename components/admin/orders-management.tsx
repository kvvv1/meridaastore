"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Eye, Printer, Truck } from "lucide-react"

const orders = [
  {
    id: "MER001234",
    customer: "Maria Silva",
    email: "maria@email.com",
    total: 299.9,
    status: "pending",
    date: "2024-01-15",
    items: 2,
    payment: "credit_card",
  },
  {
    id: "MER001235",
    customer: "Ana Costa",
    email: "ana@email.com",
    total: 189.9,
    status: "processing",
    date: "2024-01-15",
    items: 1,
    payment: "pix",
  },
  {
    id: "MER001236",
    customer: "Carla Santos",
    email: "carla@email.com",
    total: 459.9,
    status: "shipped",
    date: "2024-01-14",
    items: 3,
    payment: "credit_card",
  },
  {
    id: "MER001237",
    customer: "Julia Oliveira",
    email: "julia@email.com",
    total: 329.9,
    status: "delivered",
    date: "2024-01-14",
    items: 2,
    payment: "boleto",
  },
  {
    id: "MER001238",
    customer: "Fernanda Lima",
    email: "fernanda@email.com",
    total: 199.9,
    status: "cancelled",
    date: "2024-01-13",
    items: 1,
    payment: "credit_card",
  },
]

export function OrdersManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const statusMap = {
      pending: { label: "Pendente", variant: "secondary" as const },
      processing: { label: "Processando", variant: "default" as const },
      shipped: { label: "Enviado", variant: "outline" as const },
      delivered: { label: "Entregue", variant: "secondary" as const },
      cancelled: { label: "Cancelado", variant: "destructive" as const },
    }
    return statusMap[status as keyof typeof statusMap] || statusMap.pending
  }

  const getPaymentBadge = (payment: string) => {
    const paymentMap = {
      credit_card: "Cartão",
      pix: "PIX",
      boleto: "Boleto",
    }
    return paymentMap[payment as keyof typeof paymentMap] || payment
  }

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie todos os pedidos da sua loja</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">23</div>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">15</div>
            <p className="text-sm text-muted-foreground">Processando</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-muted-foreground">Enviados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">142</div>
            <p className="text-sm text-muted-foreground">Entregues</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por pedido, cliente ou e-mail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedStatus === "all" ? "default" : "outline"}
                onClick={() => setSelectedStatus("all")}
                className={selectedStatus !== "all" ? "bg-transparent" : ""}
              >
                Todos
              </Button>
              <Button
                variant={selectedStatus === "pending" ? "default" : "outline"}
                onClick={() => setSelectedStatus("pending")}
                className={selectedStatus !== "pending" ? "bg-transparent" : ""}
              >
                Pendentes
              </Button>
              <Button
                variant={selectedStatus === "processing" ? "default" : "outline"}
                onClick={() => setSelectedStatus("processing")}
                className={selectedStatus !== "processing" ? "bg-transparent" : ""}
              >
                Processando
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status)
                return (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      {order.items} {order.items === 1 ? "item" : "itens"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getPaymentBadge(order.payment)}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="mr-2 h-4 w-4" />
                            Imprimir Etiqueta
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Atualizar Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
