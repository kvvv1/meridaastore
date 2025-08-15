"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const promos = [
  "🔥 FRETE GRÁTIS para todo Brasil em compras acima de R$ 199",
  "✨ 5 anos de Merida Store - ATÉ 70% OFF em toda loja",
  "💳 Parcele em até 12x sem juros no cartão de crédito",
]

export function PromoBar() {
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-2 px-4 relative overflow-hidden">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center text-sm font-medium animate-fade-in">{promos[currentPromo]}</div>
        <button onClick={() => setIsVisible(false)} className="absolute right-4 hover:opacity-70 transition-opacity">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
