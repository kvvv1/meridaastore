"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EmailService } from "@/lib/email-service"
import { useToast } from "@/hooks/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    try {
      const result = await EmailService.subscribeNewsletter(email, ["newsletter", "promotions"])

      if (result.success) {
        // Send welcome email
        await EmailService.sendEmail(email, "welcome", {
          customerName: email.split("@")[0],
          siteUrl: window.location.origin,
        })

        toast({
          title: "Inscrição realizada!",
          description: "Você receberá nossas novidades em primeira mão ✨",
        })
        setEmail("")
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Erro na inscrição",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl mb-4">Fique por Dentro das Novidades</h2>
          <p className="text-lg mb-8 opacity-90">
            Receba em primeira mão nossos lançamentos, promoções exclusivas e dicas de estilo
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="bg-white text-foreground border-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button variant="secondary" type="submit" className="hover-lift" disabled={isLoading}>
              {isLoading ? "Inscrevendo..." : "Inscrever-se"}
            </Button>
          </form>

          <p className="text-sm mt-4 opacity-75">Ao se inscrever, você concorda com nossa política de privacidade</p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm opacity-75">
            <span>✨ Promoções exclusivas</span>
            <span>🎯 Lançamentos em primeira mão</span>
            <span>💡 Dicas de estilo</span>
          </div>
        </div>
      </div>
    </section>
  )
}
