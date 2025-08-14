"use client"

import { useState, useEffect } from "react"
import { Truck, Gift } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

const FREE_SHIPPING_THRESHOLD = 199

export function FreeShippingBar() {
  const { state } = useCart()
  const [progress, setProgress] = useState(0)
  const [remaining, setRemaining] = useState(FREE_SHIPPING_THRESHOLD)

  useEffect(() => {
    const currentTotal = state.total
    const newRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - currentTotal)
    const newProgress = Math.min(100, (currentTotal / FREE_SHIPPING_THRESHOLD) * 100)

    setRemaining(newRemaining)
    setProgress(newProgress)
  }, [state.total])

  if (state.items.length === 0) return null

  const hasReachedThreshold = remaining === 0

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        {hasReachedThreshold ? (
          <Gift className="h-5 w-5 text-green-600" />
        ) : (
          <Truck className="h-5 w-5 text-green-600" />
        )}
        <div className="flex-1">
          {hasReachedThreshold ? (
            <p className="text-green-700 font-medium">
              🎉 Parabéns! Você ganhou <strong>frete grátis</strong>!
            </p>
          ) : (
            <p className="text-green-700">
              Faltam apenas <strong>R$ {remaining.toFixed(2).replace(".", ",")}</strong> para ganhar{" "}
              <strong>frete grátis</strong>!
            </p>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-green-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {progress > 0 && <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />}
          </div>
        </div>
        <div className="flex justify-between text-xs text-green-600 mt-1">
          <span>R$ 0</span>
          <span className="font-medium">R$ {FREE_SHIPPING_THRESHOLD}</span>
        </div>
      </div>

      {!hasReachedThreshold && (
        <p className="text-xs text-green-600 mt-2 text-center">Continue comprando e economize na entrega! 📦</p>
      )}
    </div>
  )
}
