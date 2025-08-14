"use client"

import type React from "react"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Smartphone, Building, Lock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShippingCalculator } from "@/components/shipping-calculator"
import { CorreiosAPI, type ShippingOption } from "@/lib/shipping-api"
import { MercadoPagoGateway, StripeGateway } from "@/lib/payment-gateways"
import { Analytics } from "@/lib/analytics"
import { SmartUpsell } from "@/components/smart-upsell"

export function CheckoutPage() {
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    cpf: "",
    zipCode: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    saveAddress: false,
  })

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleZipCodeChange = async (zipCode: string) => {
    handleInputChange("zipCode", zipCode)

    if (zipCode.replace(/\D/g, "").length === 8) {
      try {
        const address = await CorreiosAPI.getAddressByZipCode(zipCode)
        setFormData((prev) => ({
          ...prev,
          address: address.street,
          neighborhood: address.neighborhood,
          city: address.city,
          state: address.state,
        }))
      } catch (error) {
        console.error("Erro ao buscar endereço:", error)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      Analytics.trackBeginCheckout(
        state.total + (selectedShipping?.price || 15.9),
        state.items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      )

      const gateway =
        paymentMethod === "credit-card"
          ? new StripeGateway(process.env.NEXT_PUBLIC_STRIPE_KEY || "")
          : new MercadoPagoGateway(process.env.NEXT_PUBLIC_MP_ACCESS_TOKEN || "")

      const paymentData = {
        amount: state.total + (selectedShipping?.price || 15.9),
        currency: "BRL",
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          document: formData.cpf,
        },
        items: state.items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shipping: {
          address: `${formData.address}, ${formData.number}`,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      }

      let result
      if (paymentMethod === "pix") {
        result = await gateway.createPixPayment(paymentData)
      } else if (paymentMethod === "boleto") {
        result = await gateway.createBoletoPayment(paymentData)
      } else {
        result = await gateway.processPayment(paymentData)
      }

      if (result.success) {
        Analytics.trackPurchase(result.transactionId || "unknown", paymentData.amount, paymentData.items)

        clearCart()
        router.push(`/checkout/sucesso?transaction=${result.transactionId}`)
      } else {
        throw new Error(result.error || "Erro no pagamento")
      }
    } catch (error) {
      console.error("Erro no checkout:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-3xl mb-4">Carrinho Vazio</h1>
          <p className="text-muted-foreground mb-8">
            Você precisa adicionar produtos ao carrinho antes de finalizar a compra.
          </p>
          <Button asChild size="lg">
            <Link href="/produtos">Continuar Comprando</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl mb-2">Finalizar Compra</h1>
        <p className="text-muted-foreground">Complete seus dados para finalizar o pedido</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      required
                      value={formData.cpf}
                      onChange={(e) => handleInputChange("cpf", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Endereço de Entrega</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="zipCode">CEP *</Label>
                  <Input
                    id="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleZipCodeChange(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço *</Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="number">Número *</Label>
                    <Input
                      id="number"
                      required
                      value={formData.number}
                      onChange={(e) => handleInputChange("number", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      value={formData.complement}
                      onChange={(e) => handleInputChange("complement", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      required
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange("neighborhood", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Estado *</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveAddress"
                    checked={formData.saveAddress}
                    onCheckedChange={(checked) => handleInputChange("saveAddress", checked as boolean)}
                  />
                  <Label htmlFor="saveAddress" className="text-sm">
                    Salvar este endereço para próximas compras
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opções de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <ShippingCalculator
                  weight={state.items.reduce((acc, item) => acc + item.quantity * 0.5, 0)}
                  onShippingSelect={setSelectedShipping}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Cartão de Crédito
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer">
                      <Smartphone className="h-4 w-4" />
                      PIX (5% de desconto)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="boleto" id="boleto" />
                    <Label htmlFor="boleto" className="flex items-center gap-2 cursor-pointer">
                      <Building className="h-4 w-4" />
                      Boleto Bancário
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SmartUpsell context="checkout" currentProducts={state.items.map((item) => item.id)} />

                <Separator />

                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {item.color} • {item.size} • Qtd: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(state.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>{formatPrice(selectedShipping?.price || 15.9)}</span>
                  </div>
                  {paymentMethod === "pix" && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto PIX (5%)</span>
                      <span>-{formatPrice(state.total * 0.05)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {formatPrice(
                      state.total +
                        (selectedShipping?.price || 15.9) -
                        (paymentMethod === "pix" ? state.total * 0.05 : 0),
                    )}
                  </span>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                  <Lock className="h-4 w-4 mr-2" />
                  {isProcessing ? "Processando..." : "Finalizar Compra"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Seus dados estão protegidos com criptografia SSL
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
