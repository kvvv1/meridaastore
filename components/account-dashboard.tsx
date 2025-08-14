"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Heart, MapPin, Settings, LogOut, Eye, Truck, Gift } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoyaltyProgram } from "@/components/loyalty-program"
import { ProductRecommendations } from "@/components/product-recommendations"

export function AccountDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "confirmed":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Entregue"
      case "shipped":
        return "Enviado"
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-sage-50">
      {/* Header */}
      <div className="bg-white border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-sage-800">
              Merida Store
            </Link>
            <Button variant="ghost" onClick={handleLogout} className="text-sage-600 hover:text-sage-700">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sage-800">Minha Conta</h1>
          <p className="text-sage-600 mt-2">Olá, {user.name}! Gerencie sua conta e pedidos.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Visão Geral</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Wishlist</span>
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="hidden sm:inline">Fidelidade</span>
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Endereços</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
                  <Package className="h-4 w-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-800">{user.orders.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Itens na Wishlist</CardTitle>
                  <Heart className="h-4 w-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-800">{user.wishlist.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Endereços Salvos</CardTitle>
                  <MapPin className="h-4 w-4 text-sage-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-sage-800">{user.addresses.length}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
                <CardDescription>Seus últimos pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                {user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.slice(0, 3).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-4 border border-sage-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-sage-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-sage-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sage-800">Pedido #{order.id}</p>
                            <p className="text-sm text-sage-600">{order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                          <p className="text-sm font-medium text-sage-800 mt-1">R$ {order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sage-600">Você ainda não fez nenhum pedido.</p>
                )}
              </CardContent>
            </Card>

            <div className="space-y-6">
              <ProductRecommendations title="Recomendado para Você" type="personalized" userId={user.id} />

              <ProductRecommendations title="Produtos em Alta" type="trending" />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
                <CardDescription>Histórico completo de pedidos</CardDescription>
              </CardHeader>
              <CardContent>
                {user.orders.length > 0 ? (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <div key={order.id} className="border border-sage-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-sage-800">Pedido #{order.id}</h3>
                            <p className="text-sm text-sage-600">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                        </div>

                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sage-800">{item.name}</p>
                                <p className="text-sm text-sage-600">
                                  Quantidade: {item.quantity} • R$ {item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-sage-200">
                          <div className="flex items-center space-x-4">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Button>
                            {order.status === "shipped" && (
                              <Button variant="outline" size="sm">
                                <Truck className="w-4 h-4 mr-2" />
                                Rastrear
                              </Button>
                            )}
                          </div>
                          <p className="font-semibold text-sage-800">Total: R$ {order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <p className="text-sage-600 mb-4">Você ainda não fez nenhum pedido.</p>
                    <Button asChild>
                      <Link href="/produtos">Começar a Comprar</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Minha Wishlist</CardTitle>
                <CardDescription>Produtos que você salvou para depois</CardDescription>
              </CardHeader>
              <CardContent>
                {user.wishlist.length > 0 ? (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <p className="text-sage-600">Você tem {user.wishlist.length} itens na sua wishlist.</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <p className="text-sage-600 mb-4">Sua wishlist está vazia.</p>
                    <Button asChild>
                      <Link href="/produtos">Explorar Produtos</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-6">
            <LoyaltyProgram />
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Meus Endereços</CardTitle>
                <CardDescription>Gerencie seus endereços de entrega</CardDescription>
              </CardHeader>
              <CardContent>
                {user.addresses.length > 0 ? (
                  <div className="space-y-4">
                    {user.addresses.map((address) => (
                      <div key={address.id} className="border border-sage-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-sage-800">{address.name}</h4>
                            <p className="text-sm text-sage-600 mt-1">
                              {address.street}, {address.number}
                              {address.complement && `, ${address.complement}`}
                            </p>
                            <p className="text-sm text-sage-600">
                              {address.neighborhood}, {address.city} - {address.state}
                            </p>
                            <p className="text-sm text-sage-600">CEP: {address.zipCode}</p>
                            {address.isDefault && (
                              <Badge variant="secondary" className="mt-2">
                                Padrão
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin className="w-16 h-16 text-sage-300 mx-auto mb-4" />
                    <p className="text-sage-600 mb-4">Você ainda não tem endereços salvos.</p>
                    <Button>Adicionar Endereço</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Gerencie seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-sage-700">Nome</label>
                    <p className="text-sage-800">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-sage-700">Email</label>
                    <p className="text-sage-800">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-sage-700">Telefone</label>
                    <p className="text-sage-800">{user.phone || "Não informado"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-sage-700">CPF</label>
                    <p className="text-sage-800">{user.cpf || "Não informado"}</p>
                  </div>
                </div>
                <Button className="mt-4">Editar Informações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
