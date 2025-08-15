"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, DollarSign, Instagram, Heart, Star, CheckCircle } from "lucide-react"
import { AffiliateDashboard } from "@/components/affiliate-dashboard"
import { AffiliateService, type Affiliate } from "@/lib/affiliate-system"
import { useToast } from "@/hooks/use-toast"

export default function AfiliadosPage() {
  const [isAffiliate, setIsAffiliate] = useState(false)
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    motivation: "",
  })
  const { toast } = useToast()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)

    try {
      const result = await AffiliateService.registerAffiliate({
        ...formData,
        commissionRate: 0.15, // 15%
        status: "pending",
        totalEarnings: 0,
        totalSales: 0,
        createdAt: new Date(),
      })

      if (result.success) {
        toast({
          title: "Cadastro enviado!",
          description: "Analisaremos sua solicitação e entraremos em contato em breve",
        })

        // Simulate approval for demo
        setTimeout(() => {
          const mockAffiliate: Affiliate = {
            id: "demo-affiliate",
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            instagram: formData.instagram,
            code: `AF${Date.now().toString().slice(-6)}`,
            commissionRate: 0.15,
            status: "active",
            totalEarnings: 0,
            totalSales: 0,
            createdAt: new Date(),
          }
          setAffiliate(mockAffiliate)
          setIsAffiliate(true)
        }, 2000)
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  if (isAffiliate && affiliate) {
    return (
      <div className="container mx-auto px-4 py-8">
        <AffiliateDashboard affiliate={affiliate} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Programa de Afiliados Merida Store</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Monetize sua influência e ganhe até 15% de comissão em cada venda
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Comissões altas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Materiais exclusivos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Suporte dedicado</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Até 15% de Comissão</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Ganhe até R$ 45 por venda com nossos produtos premium</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Instagram className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Materiais Exclusivos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Templates, fotos e conteúdo pronto para suas redes sociais</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Suporte Dedicado</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">Equipe especializada para ajudar você a vender mais</p>
            </CardContent>
          </Card>
        </div>

        {/* Requirements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Requisitos para Participar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Perfil Ideal:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    Paixão por moda feminina
                  </li>
                  <li className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-primary" />
                    Presença ativa nas redes sociais
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Engajamento com o público feminino
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    Comprometimento com qualidade
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">Benefícios Exclusivos:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Desconto especial em produtos para uso próprio</li>
                  <li>• Acesso antecipado a novos lançamentos</li>
                  <li>• Convites para eventos exclusivos</li>
                  <li>• Programa de bonificação por performance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Cadastre-se como Afiliada</CardTitle>
            <p className="text-muted-foreground">Preencha o formulário abaixo e nossa equipe entrará em contato</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="@seuinstagram"
                    value={formData.instagram}
                    onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="motivation">Por que quer ser nossa afiliada? *</Label>
                <Textarea
                  id="motivation"
                  required
                  rows={4}
                  placeholder="Conte um pouco sobre você, seu público e por que gostaria de divulgar nossos produtos..."
                  value={formData.motivation}
                  onChange={(e) => setFormData((prev) => ({ ...prev, motivation: e.target.value }))}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isRegistering}>
                {isRegistering ? "Enviando Cadastro..." : "Quero ser Afiliada"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
