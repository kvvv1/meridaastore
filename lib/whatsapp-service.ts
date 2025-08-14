export interface WhatsAppMessage {
  to: string
  message: string
  type: "text" | "template" | "media"
  templateName?: string
  templateParams?: string[]
  mediaUrl?: string
}

export class WhatsAppService {
  private static readonly API_BASE = "/api/whatsapp"

  static async sendMessage(data: WhatsAppMessage) {
    try {
      const response = await fetch(`${this.API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao enviar WhatsApp:", error)
      return { success: false, error: "Erro ao enviar mensagem" }
    }
  }

  static async sendCartAbandonedMessage(phone: string, customerName: string, cartItems: any[]) {
    const message = `Olá ${customerName}! 👋\n\nVi que você esqueceu alguns itens incríveis no seu carrinho na MF Store Girls! 🛍️\n\nQue tal finalizar sua compra? Temos:\n${cartItems.map((item) => `• ${item.name}`).join("\n")}\n\nFinalize agora e ganhe 10% OFF com o cupom: VOLTA10\n\n🔗 Finalizar compra: ${process.env.NEXT_PUBLIC_SITE_URL}/carrinho`

    return this.sendMessage({
      to: phone,
      message,
      type: "text",
    })
  }

  static async sendOrderConfirmation(phone: string, customerName: string, orderId: string) {
    const message = `🎉 Pedido confirmado, ${customerName}!\n\nSeu pedido #${orderId} foi recebido com sucesso!\n\n📦 Você receberá o código de rastreamento em breve\n💳 Pagamento processado\n\nObrigada por escolher a MF Store Girls! ✨`

    return this.sendMessage({
      to: phone,
      message,
      type: "text",
    })
  }

  static async sendShippingUpdate(phone: string, customerName: string, trackingCode: string) {
    const message = `📦 Seu pedido saiu para entrega, ${customerName}!\n\nCódigo de rastreamento: ${trackingCode}\n\n🔍 Acompanhe: https://rastreamento.correios.com.br\n\nEm breve você estará arrasando com seu novo look! 💅✨`

    return this.sendMessage({
      to: phone,
      message,
      type: "text",
    })
  }
}
