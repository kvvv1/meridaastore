"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Settings, Truck, CreditCard, Bell } from "lucide-react"

export function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "Merida Store",
    storeDescription: "Moda feminina premium que celebra a individualidade",
    email: "contato@meridastore.com.br",
    phone: "(11) 99999-9999",
    address: "São Paulo, SP",
    freeShippingThreshold: 199,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: true,
    newOrderAlert: true,
  })

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved:", settings)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua loja</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            Frete
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nome da Loja</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Principal</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição da Loja</Label>
                <Textarea
                  id="description"
                  value={settings.storeDescription}
                  onChange={(e) => setSettings({ ...settings, storeDescription: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Frete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="freeShipping">Valor Mínimo para Frete Grátis (R$)</Label>
                <Input
                  id="freeShipping"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Regiões de Entrega</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-2">Sudeste</h5>
                      <p className="text-sm text-muted-foreground mb-2">2-5 dias úteis</p>
                      <Input placeholder="Taxa fixa (R$)" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-2">Sul</h5>
                      <p className="text-sm text-muted-foreground mb-2">3-7 dias úteis</p>
                      <Input placeholder="Taxa fixa (R$)" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-2">Nordeste</h5>
                      <p className="text-sm text-muted-foreground mb-2">5-10 dias úteis</p>
                      <Input placeholder="Taxa fixa (R$)" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-2">Norte/Centro-Oeste</h5>
                      <p className="text-sm text-muted-foreground mb-2">7-12 dias úteis</p>
                      <Input placeholder="Taxa fixa (R$)" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Cartão de Crédito</h4>
                    <p className="text-sm text-muted-foreground">Visa, Mastercard, Elo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">PIX</h4>
                    <p className="text-sm text-muted-foreground">Pagamento instantâneo</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Boleto Bancário</h4>
                    <p className="text-sm text-muted-foreground">Vencimento em 3 dias</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Parcelamento</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Máximo de Parcelas</Label>
                    <Input type="number" defaultValue="12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Valor Mínimo da Parcela (R$)</Label>
                    <Input type="number" defaultValue="30" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por E-mail</h4>
                    <p className="text-sm text-muted-foreground">Receber notificações por e-mail</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificações por SMS</h4>
                    <p className="text-sm text-muted-foreground">Receber notificações por SMS</p>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alerta de Estoque Baixo</h4>
                    <p className="text-sm text-muted-foreground">Notificar quando estoque estiver baixo</p>
                  </div>
                  <Switch
                    checked={settings.lowStockAlert}
                    onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlert: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Alerta de Novos Pedidos</h4>
                    <p className="text-sm text-muted-foreground">Notificar sobre novos pedidos</p>
                  </div>
                  <Switch
                    checked={settings.newOrderAlert}
                    onCheckedChange={(checked) => setSettings({ ...settings, newOrderAlert: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
