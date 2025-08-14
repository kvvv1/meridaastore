"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Mail, MessageCircle, Clock, Users, TrendingUp } from "lucide-react"
import type { AutomationRule } from "@/lib/email-service"

export function EmailAutomationManager() {
  const [automations, setAutomations] = useState<AutomationRule[]>([
    {
      id: "1",
      name: "Carrinho Abandonado",
      trigger: "cart_abandoned",
      conditions: [],
      actions: [
        { type: "send_email", templateId: "cart_abandoned", delay: 15 },
        { type: "send_whatsapp", delay: 30 },
      ],
      isActive: true,
    },
    {
      id: "2",
      name: "Boas-vindas",
      trigger: "welcome",
      conditions: [],
      actions: [
        { type: "send_email", templateId: "welcome", delay: 0 },
        { type: "add_tag", data: { tag: "new_customer" } },
      ],
      isActive: true,
    },
    {
      id: "3",
      name: "Pós-compra",
      trigger: "purchase_followup",
      conditions: [],
      actions: [
        { type: "send_email", templateId: "order_confirmation", delay: 0 },
        { type: "send_email", templateId: "review_request", delay: 10080 }, // 7 days
      ],
      isActive: true,
    },
    {
      id: "4",
      name: "Reestoque",
      trigger: "restock",
      conditions: [],
      actions: [{ type: "send_email", templateId: "restock", delay: 0 }],
      isActive: true,
    },
  ])

  const toggleAutomation = (id: string) => {
    setAutomations((prev) =>
      prev.map((automation) => (automation.id === id ? { ...automation, isActive: !automation.isActive } : automation)),
    )
  }

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case "cart_abandoned":
        return <Clock className="h-4 w-4" />
      case "welcome":
        return <Users className="h-4 w-4" />
      case "purchase_followup":
        return <TrendingUp className="h-4 w-4" />
      case "restock":
        return <Mail className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  const getTriggerLabel = (trigger: string) => {
    switch (trigger) {
      case "cart_abandoned":
        return "Carrinho Abandonado"
      case "welcome":
        return "Novo Usuário"
      case "purchase_followup":
        return "Pós-compra"
      case "restock":
        return "Reestoque"
      default:
        return trigger
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl mb-2">Automações de Email</h2>
        <p className="text-muted-foreground">
          Gerencie suas automações de marketing para engajar clientes automaticamente
        </p>
      </div>

      <div className="grid gap-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTriggerIcon(automation.trigger)}
                  <div>
                    <CardTitle className="text-lg">{automation.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Disparado por: {getTriggerLabel(automation.trigger)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={automation.isActive ? "default" : "secondary"}>
                    {automation.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                  <Switch checked={automation.isActive} onCheckedChange={() => toggleAutomation(automation.id)} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Ações configuradas:</h4>
                  <div className="space-y-2">
                    {automation.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {action.type === "send_email" && <Mail className="h-3 w-3" />}
                        {action.type === "send_whatsapp" && <MessageCircle className="h-3 w-3" />}
                        <span>
                          {action.type === "send_email" && `Enviar email (${action.templateId})`}
                          {action.type === "send_whatsapp" && "Enviar WhatsApp"}
                          {action.type === "add_tag" && `Adicionar tag: ${action.data?.tag}`}
                        </span>
                        {action.delay && action.delay > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {action.delay < 60 ? `${action.delay}min` : `${Math.floor(action.delay / 60)}h`}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
