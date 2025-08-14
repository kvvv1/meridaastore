"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Users, TrendingUp, LinkIcon, Copy, Share2, Instagram, BarChart3 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { AffiliateService, type Affiliate, type Commission } from "@/lib/affiliate-system"

interface AffiliateDashboardProps {
  affiliate: Affiliate
}

export function AffiliateDashboard({ affiliate }: AffiliateDashboardProps) {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingEarnings: 0,
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
    thisMonthEarnings: 0,
  })
  const [commissions, setCommissions] = useState<Commission[]>([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadAffiliateData()
  }, [affiliate.id])

  const loadAffiliateData = async () => {
    const result = await AffiliateService.getAffiliateStats(affiliate.id)
    if (result.success) {
      setStats(result.stats)
      setCommissions(result.commissions || [])
    }
  }

  const generateLink = async (productId?: string) => {
    const link = await AffiliateService.generateAffiliateLink(affiliate.id, productId)
    if (link) {
      navigator.clipboard.writeText(link)
      toast({
        title: "Link copiado!",
        description: "O link de afiliado foi copiado para a área de transferência",
      })
    }
  }

  const shareToInstagram = async () => {
    const link = await AffiliateService.generateAffiliateLink(affiliate.id)
    const text = `Olha que peças incríveis eu encontrei na MF Store Girls! 😍✨ Use meu link e ganhe desconto especial: ${link}`

    if (navigator.share) {
      navigator.share({
        title: "MF Store Girls",
        text: text,
        url: link,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "Texto copiado!",
        description: "Cole no seu Instagram Stories ou post",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Dashboard de Afiliado</h1>
          <p className="text-muted-foreground">Bem-vinda, {affiliate.name}!</p>
        </div>
        <Badge variant={affiliate.status === "active" ? "default" : "secondary"}>
          {affiliate.status === "active" ? "Ativo" : "Pendente"}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+R$ {stats.thisMonthEarnings.toFixed(2)} este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClicks}</div>
            <p className="text-xs text-muted-foreground">{stats.conversionRate.toFixed(1)}% taxa de conversão</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversions}</div>
            <p className="text-xs text-muted-foreground">Conversões realizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.pendingEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Aguardando aprovação</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="links" className="space-y-4">
        <TabsList>
          <TabsTrigger value="links">Meus Links</TabsTrigger>
          <TabsTrigger value="commissions">Comissões</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gerar Links de Afiliado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="product">Produto Específico (opcional)</Label>
                  <Input
                    id="product"
                    placeholder="ID do produto ou deixe vazio para link geral"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => generateLink(selectedProduct || undefined)}>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Gerar Link
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => generateLink()} variant="outline" className="flex-1">
                  <Copy className="h-4 w-4 mr-2" />
                  Link Geral
                </Button>
                <Button onClick={shareToInstagram} variant="outline" className="flex-1 bg-transparent">
                  <Instagram className="h-4 w-4 mr-2" />
                  Compartilhar no Instagram
                </Button>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Seu Código de Afiliado</h4>
                <div className="flex items-center gap-2">
                  <code className="bg-background px-2 py-1 rounded text-sm">{affiliate.code}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      navigator.clipboard.writeText(affiliate.code)
                      toast({ title: "Código copiado!" })
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Comissões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commissions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Nenhuma comissão ainda. Comece a compartilhar seus links!
                  </p>
                ) : (
                  commissions.map((commission) => (
                    <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Pedido #{commission.orderId}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(commission.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">R$ {commission.amount.toFixed(2)}</p>
                        <Badge
                          variant={
                            commission.status === "paid"
                              ? "default"
                              : commission.status === "approved"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {commission.status === "paid"
                            ? "Pago"
                            : commission.status === "approved"
                              ? "Aprovado"
                              : "Pendente"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiais de Divulgação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Stories para Instagram</h4>
                  <p className="text-sm text-muted-foreground mb-3">Templates prontos para seus stories</p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Baixar Templates
                  </Button>
                </div>

                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Posts para Feed</h4>
                  <p className="text-sm text-muted-foreground mb-3">Imagens e textos para posts</p>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Baixar Materiais
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Dicas de Divulgação</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Mostre as peças sendo usadas no dia a dia</li>
                  <li>• Compartilhe looks completos com produtos da loja</li>
                  <li>• Use hashtags relevantes: #mfstoregirls #modafeminina</li>
                  <li>• Interaja com seus seguidores nos comentários</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
