export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  userId?: string
  timestamp?: Date
}

export interface ConversionFunnel {
  step: string
  users: number
  conversionRate: number
}

export interface CustomerMetrics {
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  averageOrderValue: number
  customerLifetimeValue: number
  churnRate: number
}

export class AnalyticsService {
  private static readonly API_BASE = "/api/analytics"

  // Event Tracking
  static async trackEvent(event: AnalyticsEvent) {
    try {
      const response = await fetch(`${this.API_BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...event,
          timestamp: event.timestamp || new Date(),
        }),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao rastrear evento:", error)
      return { success: false, error }
    }
  }

  // Page Views
  static async trackPageView(page: string, userId?: string) {
    return this.trackEvent({
      event: "page_view",
      properties: { page },
      userId,
    })
  }

  // E-commerce Events
  static async trackPurchase(orderId: string, value: number, items: any[], userId?: string) {
    return this.trackEvent({
      event: "purchase",
      properties: {
        orderId,
        value,
        items,
        currency: "BRL",
      },
      userId,
    })
  }

  static async trackAddToCart(productId: string, productName: string, price: number, userId?: string) {
    return this.trackEvent({
      event: "add_to_cart",
      properties: {
        productId,
        productName,
        price,
        currency: "BRL",
      },
      userId,
    })
  }

  static async trackRemoveFromCart(productId: string, productName: string, userId?: string) {
    return this.trackEvent({
      event: "remove_from_cart",
      properties: {
        productId,
        productName,
      },
      userId,
    })
  }

  static async trackBeginCheckout(value: number, items: any[], userId?: string) {
    return this.trackEvent({
      event: "begin_checkout",
      properties: {
        value,
        items,
        currency: "BRL",
      },
      userId,
    })
  }

  // User Engagement
  static async trackSearch(searchTerm: string, resultsCount: number, userId?: string) {
    return this.trackEvent({
      event: "search",
      properties: {
        searchTerm,
        resultsCount,
      },
      userId,
    })
  }

  static async trackWishlistAdd(productId: string, productName: string, userId?: string) {
    return this.trackEvent({
      event: "add_to_wishlist",
      properties: {
        productId,
        productName,
      },
      userId,
    })
  }

  static async trackShare(contentType: string, contentId: string, method: string, userId?: string) {
    return this.trackEvent({
      event: "share",
      properties: {
        contentType,
        contentId,
        method,
      },
      userId,
    })
  }

  // Analytics Queries
  static async getConversionFunnel(timeRange = "30d"): Promise<ConversionFunnel[]> {
    try {
      const response = await fetch(`${this.API_BASE}/funnel?timeRange=${timeRange}`)
      const data = await response.json()
      return data.funnel || []
    } catch (error) {
      console.error("Erro ao buscar funil de conversão:", error)
      return []
    }
  }

  static async getCustomerMetrics(timeRange = "30d"): Promise<CustomerMetrics> {
    try {
      const response = await fetch(`${this.API_BASE}/customers?timeRange=${timeRange}`)
      const data = await response.json()
      return data.metrics || {}
    } catch (error) {
      console.error("Erro ao buscar métricas de clientes:", error)
      return {
        totalCustomers: 0,
        newCustomers: 0,
        returningCustomers: 0,
        averageOrderValue: 0,
        customerLifetimeValue: 0,
        churnRate: 0,
      }
    }
  }

  static async getTopProducts(timeRange = "30d", limit = 10) {
    try {
      const response = await fetch(`${this.API_BASE}/products/top?timeRange=${timeRange}&limit=${limit}`)
      const data = await response.json()
      return data.products || []
    } catch (error) {
      console.error("Erro ao buscar produtos mais vendidos:", error)
      return []
    }
  }

  static async getRevenueData(timeRange = "30d") {
    try {
      const response = await fetch(`${this.API_BASE}/revenue?timeRange=${timeRange}`)
      const data = await response.json()
      return data.revenue || []
    } catch (error) {
      console.error("Erro ao buscar dados de receita:", error)
      return []
    }
  }

  // A/B Testing Integration
  static async trackABTestView(testId: string, variant: string, userId?: string) {
    return this.trackEvent({
      event: "ab_test_view",
      properties: {
        testId,
        variant,
      },
      userId,
    })
  }

  static async trackABTestConversion(testId: string, variant: string, conversionValue?: number, userId?: string) {
    return this.trackEvent({
      event: "ab_test_conversion",
      properties: {
        testId,
        variant,
        conversionValue,
      },
      userId,
    })
  }

  // Cohort Analysis
  static async getCohortData(startDate: string, endDate: string) {
    try {
      const response = await fetch(`${this.API_BASE}/cohorts?start=${startDate}&end=${endDate}`)
      const data = await response.json()
      return data.cohorts || []
    } catch (error) {
      console.error("Erro ao buscar dados de coorte:", error)
      return []
    }
  }

  // Real-time Analytics
  static async getRealTimeData() {
    try {
      const response = await fetch(`${this.API_BASE}/realtime`)
      const data = await response.json()
      return data.realtime || {}
    } catch (error) {
      console.error("Erro ao buscar dados em tempo real:", error)
      return {}
    }
  }

  // Custom Events for Merida Store
  static async trackLiveShoppingView(liveId: string, userId?: string) {
    return this.trackEvent({
      event: "live_shopping_view",
      properties: { liveId },
      userId,
    })
  }

  static async trackLiveShoppingPurchase(liveId: string, productId: string, value: number, userId?: string) {
    return this.trackEvent({
      event: "live_shopping_purchase",
      properties: {
        liveId,
        productId,
        value,
        currency: "BRL",
      },
      userId,
    })
  }

  static async trackAffiliateClick(affiliateId: string, productId?: string, userId?: string) {
    return this.trackEvent({
      event: "affiliate_click",
      properties: {
        affiliateId,
        productId,
      },
      userId,
    })
  }

  static async trackLoyaltyPointsEarned(points: number, action: string, userId?: string) {
    return this.trackEvent({
      event: "loyalty_points_earned",
      properties: {
        points,
        action,
      },
      userId,
    })
  }
}
