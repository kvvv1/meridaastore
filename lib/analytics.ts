export class Analytics {
  static gtag: any

  static init() {
    // Google Analytics 4
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []
      this.gtag = () => {
        window.dataLayer.push(arguments)
      }
      this.gtag("js", new Date())
      this.gtag("config", process.env.NEXT_PUBLIC_GA_ID)
    }
  }

  static trackEvent(eventName: string, parameters: any = {}) {
    if (this.gtag) {
      this.gtag("event", eventName, parameters)
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any).fbq("track", eventName, parameters)
    }
  }

  static trackPurchase(transactionId: string, value: number, items: any[]) {
    this.trackEvent("purchase", {
      transaction_id: transactionId,
      value: value,
      currency: "BRL",
      items: items,
    })
  }

  static trackAddToCart(item: any) {
    this.trackEvent("add_to_cart", {
      currency: "BRL",
      value: item.price,
      items: [item],
    })
  }

  static trackViewItem(item: any) {
    this.trackEvent("view_item", {
      currency: "BRL",
      value: item.price,
      items: [item],
    })
  }

  static trackBeginCheckout(value: number, items: any[]) {
    this.trackEvent("begin_checkout", {
      currency: "BRL",
      value: value,
      items: items,
    })
  }
}

declare global {
  interface Window {
    dataLayer: any[]
    fbq: any
  }
}
