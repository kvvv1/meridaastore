"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { X, Gift, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ABTestingService } from "@/lib/ab-testing"

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [hasTriggered, setHasTriggered] = useState(false)
  const { toast } = useToast()

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the page
      if (e.clientY <= 0 && !hasTriggered) {
        const hasSeenExitPopup = localStorage.getItem("exit-popup-seen")
        const lastSeen = localStorage.getItem("exit-popup-last-seen")
        const now = Date.now()

        // Show if never seen or after 24 hours
        if (!hasSeenExitPopup || (lastSeen && now - Number.parseInt(lastSeen) > 24 * 60 * 60 * 1000)) {
          setIsVisible(true)
          setHasTriggered(true)

          // Track AB test view
          const variant = ABTestingService.getVariantForUser("popup-timing-test")
          if (variant) {
            ABTestingService.trackView("popup-timing-test", variant.id)
          }
        }
      }
    },
    [hasTriggered],
  )

  useEffect(() => {
    // Check AB test variant
    const variant = ABTestingService.getVariantForUser("popup-timing-test")
    if (variant?.config.exitIntent) {
      document.addEventListener("mouseleave", handleMouseLeave)
      return () => document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseLeave])

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
      localStorage.setItem("exit-popup-seen", "true")
      localStorage.setItem("exit-popup-last-seen", Date.now().toString())
      localStorage.setItem("exit-discount-email", email)

      // Track conversion
      const variant = ABTestingService.getVariantForUser("popup-timing-test")
      if (variant) {
        ABTestingService.trackConversion("popup-timing-test", variant.id, 25) // $25 estimated value
      }

      toast({
        title: "Não vá embora ainda! 🎉",
        description: "Seu cupom de 20% OFF foi aplicado: VOLTEI20. Válido por 15 minutos!",
      })

      setIsVisible(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem("exit-popup-seen", "true")
    localStorage.setItem("exit-popup-last-seen", Date.now().toString())
    setIsVisible(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background border rounded-2xl shadow-2xl max-w-lg w-full relative overflow-hidden animate-in slide-in-from-top-4 duration-500">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fillOpacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
          <div className="relative">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-6 w-6 animate-pulse" />
              <h2 className="text-xl font-bold">ESPERA! Não vá embora!</h2>
            </div>
            <p className="text-sm opacity-90">Oferta especial só para você</p>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-red-600 mb-2">20% OFF</div>
            <p className="text-muted-foreground mb-4">
              Última chance! Ganhe desconto exclusivo + frete grátis em qualquer compra
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600">
              <Clock className="h-4 w-4" />
              <span className="font-medium">Expira em: {formatTime(timeLeft)}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Digite seu e-mail para receber o cupom"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-center text-lg py-3"
            />
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg font-semibold">
              <Gift className="h-5 w-5 mr-2" />
              QUERO MEU DESCONTO AGORA!
            </Button>
          </form>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>✅ Sem taxa de entrega</span>
              <span>✅ Troca grátis</span>
              <span>✅ Pagamento seguro</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Cupom válido apenas para esta sessão. Não perca esta oportunidade única!
          </p>
        </div>
      </div>
    </div>
  )
}
