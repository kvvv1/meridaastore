"use client"

import { useEffect } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { EmailService } from "@/lib/email-service"
import { WhatsAppService } from "@/lib/whatsapp-service"

export function CartAbandonmentTracker() {
  const { state } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    if (!user || state.items.length === 0) return

    // Set timer for cart abandonment (15 minutes)
    const abandonmentTimer = setTimeout(
      () => {
        if (state.items.length > 0) {
          // Trigger cart abandonment automation
          EmailService.triggerAutomation("cart_abandoned", {
            userId: user.id,
            userEmail: user.email,
            userName: user.name,
            userPhone: user.phone,
            cartItems: state.items,
            cartTotal: state.total,
            abandonedAt: new Date().toISOString(),
          })
        }
      },
      15 * 60 * 1000,
    ) // 15 minutes

    return () => clearTimeout(abandonmentTimer)
  }, [state.items, user])

  useEffect(() => {
    if (!user || state.items.length === 0) return

    // Set timer for WhatsApp reminder (30 minutes)
    const whatsappTimer = setTimeout(
      () => {
        if (state.items.length > 0 && user.phone) {
          WhatsAppService.sendCartAbandonedMessage(user.phone, user.name, state.items)
        }
      },
      30 * 60 * 1000,
    ) // 30 minutes

    return () => clearTimeout(whatsappTimer)
  }, [state.items, user])

  return null // This component doesn't render anything
}
