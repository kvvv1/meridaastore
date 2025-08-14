export interface ABTest {
  id: string
  name: string
  description: string
  status: "draft" | "running" | "paused" | "completed"
  startDate: Date
  endDate?: Date
  variants: ABVariant[]
  targetAudience: {
    percentage: number
    conditions?: string[]
  }
  metrics: {
    conversions: Record<string, number>
    views: Record<string, number>
    revenue: Record<string, number>
  }
}

export interface ABVariant {
  id: string
  name: string
  weight: number // percentage of traffic
  config: Record<string, any>
  isControl: boolean
}

export class ABTestingService {
  private static readonly STORAGE_KEY = "ab-test-assignments"

  static getActiveTests(): ABTest[] {
    // In real app, this would fetch from API
    return [
      {
        id: "checkout-button-test",
        name: "Checkout Button Color",
        description: "Testing different button colors for checkout conversion",
        status: "running",
        startDate: new Date("2024-01-01"),
        variants: [
          {
            id: "control",
            name: "Original Green",
            weight: 50,
            config: { buttonColor: "bg-primary", textColor: "text-primary-foreground" },
            isControl: true,
          },
          {
            id: "variant-red",
            name: "Red Button",
            weight: 50,
            config: { buttonColor: "bg-red-600", textColor: "text-white" },
            isControl: false,
          },
        ],
        targetAudience: { percentage: 100 },
        metrics: {
          conversions: { control: 45, "variant-red": 52 },
          views: { control: 1200, "variant-red": 1180 },
          revenue: { control: 12500, "variant-red": 14200 },
        },
      },
      {
        id: "popup-timing-test",
        name: "Popup Timing",
        description: "Testing different popup display timings",
        status: "running",
        startDate: new Date("2024-01-01"),
        variants: [
          {
            id: "control",
            name: "5 seconds",
            weight: 33,
            config: { delay: 5000 },
            isControl: true,
          },
          {
            id: "variant-10s",
            name: "10 seconds",
            weight: 33,
            config: { delay: 10000 },
            isControl: false,
          },
          {
            id: "variant-exit",
            name: "Exit Intent",
            weight: 34,
            config: { delay: 0, exitIntent: true },
            isControl: false,
          },
        ],
        targetAudience: { percentage: 100 },
        metrics: {
          conversions: { control: 28, "variant-10s": 31, "variant-exit": 38 },
          views: { control: 800, "variant-10s": 820, "variant-exit": 790 },
          revenue: { control: 8400, "variant-10s": 9200, "variant-exit": 11500 },
        },
      },
    ]
  }

  static getVariantForUser(testId: string, userId?: string): ABVariant | null {
    const tests = this.getActiveTests()
    const test = tests.find((t) => t.id === testId && t.status === "running")

    if (!test) return null

    // Get or create user assignment
    const assignments = this.getUserAssignments()
    const userKey = userId || this.getAnonymousUserId()

    if (assignments[testId] && assignments[testId][userKey]) {
      const variantId = assignments[testId][userKey]
      return test.variants.find((v) => v.id === variantId) || null
    }

    // Assign user to variant based on weights
    const variant = this.assignVariant(test.variants, userKey)
    this.saveUserAssignment(testId, userKey, variant.id)

    return variant
  }

  private static assignVariant(variants: ABVariant[], userKey: string): ABVariant {
    // Use hash of userKey for consistent assignment
    const hash = this.hashCode(userKey)
    const random = Math.abs(hash) % 100

    let cumulative = 0
    for (const variant of variants) {
      cumulative += variant.weight
      if (random < cumulative) {
        return variant
      }
    }

    return variants[0] // fallback
  }

  private static hashCode(str: string): number {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32bit integer
    }
    return hash
  }

  private static getUserAssignments(): Record<string, Record<string, string>> {
    if (typeof window === "undefined") return {}
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  }

  private static saveUserAssignment(testId: string, userKey: string, variantId: string) {
    if (typeof window === "undefined") return

    const assignments = this.getUserAssignments()
    if (!assignments[testId]) assignments[testId] = {}
    assignments[testId][userKey] = variantId

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assignments))
  }

  private static getAnonymousUserId(): string {
    if (typeof window === "undefined") return "anonymous"

    let userId = localStorage.getItem("anonymous-user-id")
    if (!userId) {
      userId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("anonymous-user-id", userId)
    }
    return userId
  }

  static trackConversion(testId: string, variantId: string, value?: number) {
    // In real app, this would send to analytics
    console.log(`AB Test Conversion: ${testId} - ${variantId}`, { value })

    // Track in analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "ab_test_conversion", {
        test_id: testId,
        variant_id: variantId,
        value: value || 0,
      })
    }
  }

  static trackView(testId: string, variantId: string) {
    // In real app, this would send to analytics
    console.log(`AB Test View: ${testId} - ${variantId}`)

    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "ab_test_view", {
        test_id: testId,
        variant_id: variantId,
      })
    }
  }
}
