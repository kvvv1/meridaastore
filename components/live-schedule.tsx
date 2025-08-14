"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Bell } from "lucide-react"

interface ScheduledLive {
  id: string
  title: string
  date: Date
  duration: number
  host: string
  description: string
  products: string[]
  subscribers: number
}

const scheduledLives: ScheduledLive[] = [
  {
    id: "1",
    title: "Looks de Festa - Reveillon 2024",
    date: new Date("2024-12-30T20:00:00"),
    duration: 60,
    host: "Maria Fernanda",
    description: "Dicas de looks para arrasar na virada do ano!",
    products: ["Vestidos de festa", "Acessórios dourados", "Sapatos de salto"],
    subscribers: 892,
  },
  {
    id: "2",
    title: "Tendências Verão 2025",
    date: new Date("2024-01-25T19:00:00"),
    duration: 45,
    host: "Ana Carolina",
    description: "As principais tendências para o verão que está chegando",
    products: ["Vestidos leves", "Shorts", "Blusas frescas"],
    subscribers: 654,
  },
]

export function LiveSchedule() {
  const [lives] = useState<ScheduledLive[]>(scheduledLives)
  const [subscribedLives, setSubscribedLives] = useState<string[]>([])

  const subscribeToLive = (liveId: string) => {
    setSubscribedLives((prev) => (prev.includes(liveId) ? prev.filter((id) => id !== liveId) : [...prev, liveId]))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold mb-2">Lives Agendadas</h1>
        <p className="text-muted-foreground">
          Não perca nossas transmissões ao vivo com dicas de moda e ofertas exclusivas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lives.map((live) => (
          <Card key={live.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{live.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">com {live.host}</p>
                </div>
                <Badge variant="outline">
                  <Calendar className="h-3 w-3 mr-1" />
                  Agendada
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{live.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {live.date.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {live.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {live.subscribers} inscritos
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Produtos em destaque:</p>
                <div className="flex flex-wrap gap-1">
                  {live.products.map((product, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                className="w-full"
                variant={subscribedLives.includes(live.id) ? "outline" : "default"}
                onClick={() => subscribeToLive(live.id)}
              >
                <Bell className="h-4 w-4 mr-2" />
                {subscribedLives.includes(live.id) ? "Inscrito - Receber Lembrete" : "Me Lembrar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
