"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function DiscountPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const { toast } = useToast()

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("discount-popup-seen")
    const lastVisit = localStorage.getItem("last-visit")
    const now = Date.now()

    // Show popup if first visit or after 24 hours
    if (!hasSeenPopup || (lastVisit && now - Number.parseInt(lastVisit) > 24 * 60 * 60 * 1000)) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 5000) // Show after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isVisible, timeLeft])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Save email and mark popup as seen
      localStorage.setItem("discount-popup-seen", "true")
      localStorage.setItem("discount-email", email)
      localStorage.setItem("last-visit", Date.now().toString())

      toast({
        title: "Desconto aplicado!",
        description: "Seu cupom de 15% OFF foi enviado para seu e-mail. Use o código: PRIMEIRA15",
      })

      setIsVisible(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem("discount-popup-seen", "true")
    localStorage.setItem("last-visit", Date.now().toString())
    setIsVisible(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background border rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="h-6 w-6" />
            <h2 className="text-xl font-bold">Oferta Especial!</h2>
          </div>
          <p className="text-sm opacity-90">Primeira compra na Merida Store</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary mb-2">15% OFF</div>
            <p className="text-muted-foreground">
              Ganhe desconto na sua primeira compra + frete grátis acima de R$ 199
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-600">Oferta expira em: {formatTime(timeLeft)}</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center"
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Quero meu desconto!
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Ao continuar, você concorda em receber ofertas exclusivas por e-mail.
          </p>
        </div>
      </div>
    </div>
  )
}
