"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, Truck, Tag } from "lucide-react"
import Link from "next/link"

export function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [zipCode, setZipCode] = useState("")
  const [shippingOptions, setShippingOptions] = useState<Array<{ name: string; price: number; days: string }>>([])

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      PRIMEIRA10: 10,
      DESCONTO15: 15,
      FRETE20: 20,
    }

    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount: validCoupons[couponCode as keyof typeof validCoupons],
      })
      setCouponCode("")
    }
  }

  const calculateShipping = () => {
    if (zipCode.length === 8) {
      setShippingOptions([
        { name: "Correios PAC", price: 15.9, days: "7-10 dias úteis" },
        { name: "Correios SEDEX", price: 25.9, days: "3-5 dias úteis" },
        { name: "Transportadora", price: 0, days: "5-7 dias úteis" },
      ])
    }
  }

  const subtotal = state.total
  const couponDiscount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0
  const shipping = shippingOptions.length > 0 ? shippingOptions[0].price : 0
  const total = subtotal - couponDiscount + shipping

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="font-heading text-3xl mb-4">Seu carrinho está vazio</h1>
          <p className="text-muted-foreground mb-8">
            Parece que você ainda não adicionou nenhum item ao seu carrinho. Que tal explorar nossa coleção?
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
        <h1 className="font-heading text-3xl mb-2">Carrinho de Compras</h1>
        <p className="text-muted-foreground">
          {state.itemCount} {state.itemCount === 1 ? "item" : "itens"} no seu carrinho
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={`${item.id}-${item.color}-${item.size}`}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Cor: {item.color} • Tamanho: {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id, item.color, item.size)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 p-0"
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-4 py-2 min-w-[60px] text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 w-10 p-0"
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </div>
                        )}
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                        <div className="text-sm text-muted-foreground">{formatPrice(item.price)} cada</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart} className="bg-transparent">
              Limpar Carrinho
            </Button>
            <Button asChild variant="outline" className="bg-transparent">
              <Link href="/produtos">Continuar Comprando</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Coupon */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Cupom de Desconto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <Badge variant="secondary">{appliedCoupon.code}</Badge>
                    <p className="text-sm text-green-600 mt-1">-{appliedCoupon.discount}% aplicado</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-red-600 hover:text-red-600"
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite seu cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={applyCoupon} disabled={!couponCode}>
                    Aplicar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shipping */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Calcular Frete
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite seu CEP"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
                  maxLength={8}
                />
                <Button onClick={calculateShipping} disabled={zipCode.length !== 8}>
                  Calcular
                </Button>
              </div>

              {shippingOptions.length > 0 && (
                <div className="space-y-2">
                  {shippingOptions.map((option, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-muted-foreground">{option.days}</p>
                      </div>
                      <p className="font-medium">{option.price === 0 ? "Grátis" : formatPrice(option.price)}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>
                  Subtotal ({state.itemCount} {state.itemCount === 1 ? "item" : "itens"})
                </span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              {shipping > 0 && (
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Finalizar Compra</Link>
              </Button>

              <p className="text-xs text-muted-foreground text-center">Frete grátis para compras acima de R$ 199</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
