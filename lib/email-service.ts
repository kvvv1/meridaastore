export interface EmailTemplate {
  id: string
  name: string
  subject: string
  html: string
  variables: string[]
}

export interface EmailCampaign {
  id: string
  name: string
  templateId: string
  recipients: string[]
  scheduledAt?: Date
  status: "draft" | "scheduled" | "sent" | "failed"
  stats: {
    sent: number
    opened: number
    clicked: number
    bounced: number
  }
}

export interface AutomationRule {
  id: string
  name: string
  trigger: "cart_abandoned" | "welcome" | "purchase_followup" | "birthday" | "restock"
  conditions: any[]
  actions: EmailAction[]
  isActive: boolean
}

export interface EmailAction {
  type: "send_email" | "add_tag" | "remove_tag" | "send_whatsapp"
  templateId?: string
  delay?: number // minutes
  data?: any
}

export class EmailService {
  private static readonly API_BASE = "/api/email"

  static async sendEmail(to: string, templateId: string, variables: Record<string, any>) {
    try {
      const response = await fetch(`${this.API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, templateId, variables }),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao enviar email:", error)
      return { success: false, error: "Erro ao enviar email" }
    }
  }

  static async subscribeNewsletter(email: string, tags: string[] = []) {
    try {
      const response = await fetch(`${this.API_BASE}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, tags }),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao inscrever newsletter:", error)
      return { success: false, error: "Erro ao inscrever newsletter" }
    }
  }

  static async triggerAutomation(trigger: string, data: any) {
    try {
      const response = await fetch(`${this.API_BASE}/automation/trigger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trigger, data }),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao disparar automação:", error)
      return { success: false }
    }
  }

  static async createCampaign(campaign: Partial<EmailCampaign>) {
    try {
      const response = await fetch(`${this.API_BASE}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      })
      return await response.json()
    } catch (error) {
      console.error("Erro ao criar campanha:", error)
      return { success: false }
    }
  }
}
