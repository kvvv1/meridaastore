"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"

export function CartSidebar() {
  const { state, closeCart, removeItem, updateQuantity } = useCart()

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace(".", ",")}`

  if (state.items.length === 0) {
    return (
      <Sheet open={state.isOpen} onOpenChange={closeCart}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Seu Carrinho</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">Seu carrinho está vazio</h3>
            <p className="text-muted-foreground mb-6">Adicione produtos incríveis para começar suas compras</p>
            <Button asChild onClick={closeCart}>
              <Link href="/produtos">Continuar Comprando</Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>
            Seu Carrinho ({state.itemCount} {state.itemCount === 1 ? "item" : "itens"})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {state.items.map((item) => (
              <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-secondary/20">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {item.color} • {item.size}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-2 text-sm min-w-[40px] text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id, item.color, item.size)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {item.originalPrice && (
                        <span className="text-muted-foreground line-through mr-2">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                    <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold text-lg">{formatPrice(state.total)}</span>
          </div>

          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/checkout" onClick={closeCart}>
                Finalizar Compra
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent" onClick={closeCart}>
              <Link href="/carrinho">Ver Carrinho Completo</Link>
            </Button>
          </div>

          <div className="text-center">
            <Button variant="link" className="text-sm" onClick={closeCart}>
              <Link href="/produtos">Continuar Comprando</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
