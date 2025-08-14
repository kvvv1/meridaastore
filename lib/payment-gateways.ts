export interface PaymentGateway {
  processPayment(data: PaymentData): Promise<PaymentResult>
  createPixPayment(data: PaymentData): Promise<PixPaymentResult>
  createBoletoPayment(data: PaymentData): Promise<BoletoPaymentResult>
}

export interface PaymentData {
  amount: number
  currency: string
  customer: {
    name: string
    email: string
    phone: string
    document: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shipping: {
    address: string
    city: string
    state: string
    zipCode: string
  }
}

export interface PaymentResult {
  success: boolean
  transactionId?: string
  error?: string
  redirectUrl?: string
}

export interface PixPaymentResult extends PaymentResult {
  pixCode?: string
  qrCode?: string
  expiresAt?: Date
}

export interface BoletoPaymentResult extends PaymentResult {
  boletoUrl?: string
  barCode?: string
  expiresAt?: Date
}

// Stripe Integration
export class StripeGateway implements PaymentGateway {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      // Stripe payment processing
      const response = await fetch("/api/payments/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return { success: false, error: "Erro ao processar pagamento" }
    }
  }

  async createPixPayment(data: PaymentData): Promise<PixPaymentResult> {
    // PIX not supported by Stripe directly
    return { success: false, error: "PIX não suportado pelo Stripe" }
  }

  async createBoletoPayment(data: PaymentData): Promise<BoletoPaymentResult> {
    // Boleto not supported by Stripe directly
    return { success: false, error: "Boleto não suportado pelo Stripe" }
  }
}

// Mercado Pago Integration
export class MercadoPagoGateway implements PaymentGateway {
  private accessToken: string

  constructor(accessToken: string) {
    this.accessToken = accessToken
  }

  async processPayment(data: PaymentData): Promise<PaymentResult> {
    try {
      const response = await fetch("/api/payments/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return { success: false, error: "Erro ao processar pagamento" }
    }
  }

  async createPixPayment(data: PaymentData): Promise<PixPaymentResult> {
    try {
      const response = await fetch("/api/payments/mercadopago/pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return { success: false, error: "Erro ao gerar PIX" }
    }
  }

  async createBoletoPayment(data: PaymentData): Promise<BoletoPaymentResult> {
    try {
      const response = await fetch("/api/payments/mercadopago/boleto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      return { success: false, error: "Erro ao gerar boleto" }
    }
  }
}
