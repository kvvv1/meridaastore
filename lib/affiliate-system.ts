export interface Affiliate {
  id: string
  name: string
  email: string
  phone: string
  instagram?: string
  code: string
  commissionRate: number
  status: "pending" | "active" | "suspended"
  totalEarnings: number
  totalSales: number
  createdAt: Date
  bankInfo?: {
    bank: string
    agency: string
    account: string
    accountType: "corrente" | "poupanca"
    cpf: string
  }
}

export interface AffiliateLink {
  id: string
  affiliateId: string
  productId?: string
  url: string
  clicks: number
  conversions: number
  earnings: number
  createdAt: Date
}

export interface Commission {
  id: string
  affiliateId: string
  orderId: string
  amount: number
  rate: number
  status: "pending" | "approved" | "paid"
  createdAt: Date
  paidAt?: Date
}

export class AffiliateService {
  private static readonly API_BASE = "/api/affiliate"

  static async registerAffiliate(data: Partial<Affiliate>) {
    try {
      const response = await fetch(`${this.API_BASE}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao registrar afiliado:", error)
      return { success: false, error: "Erro ao registrar afiliado" }
    }
  }

  static async generateAffiliateLink(affiliateId: string, productId?: string) {
    try {
      const baseUrl = window.location.origin
      const affiliateCode = await this.getAffiliateCode(affiliateId)

      if (productId) {
        return `${baseUrl}/produto/${productId}?ref=${affiliateCode}`
      } else {
        return `${baseUrl}?ref=${affiliateCode}`
      }
    } catch (error) {
      console.error("Erro ao gerar link de afiliado:", error)
      return null
    }
  }

  static async getAffiliateCode(affiliateId: string): Promise<string> {
    // In real app, this would fetch from API
    return `AF${affiliateId.slice(-6).toUpperCase()}`
  }

  static async trackClick(affiliateCode: string, productId?: string) {
    try {
      await fetch(`${this.API_BASE}/track-click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateCode, productId }),
      })
    } catch (error) {
      console.error("Erro ao rastrear clique:", error)
    }
  }

  static async getAffiliateStats(affiliateId: string) {
    try {
      const response = await fetch(`${this.API_BASE}/stats/${affiliateId}`)
      return await response.json()
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error)
      return { success: false }
    }
  }
}
