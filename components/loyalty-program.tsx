"use client"

import type React from "react"

import { useState } from "react"
import { Star, Gift, Crown, Award, TrendingUp, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"

interface LoyaltyLevel {
  name: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  color: string
  icon: React.ReactNode
}

interface LoyaltyReward {
  id: string
  name: string
  description: string
  pointsCost: number
  type: "discount" | "freeShipping" | "product" | "exclusive"
  available: boolean
}

const loyaltyLevels: LoyaltyLevel[] = [
  {
    name: "Bronze",
    minPoints: 0,
    maxPoints: 499,
    benefits: ["5% de desconto em produtos selecionados", "Acesso a promoções exclusivas"],
    color: "text-amber-600 bg-amber-50 border-amber-200",
    icon: <Award className="h-5 w-5" />,
  },
  {
    name: "Prata",
    minPoints: 500,
    maxPoints: 1499,
    benefits: [
      "10% de desconto em produtos selecionados",
      "Frete grátis em compras acima de R$ 150",
      "Acesso antecipado a coleções",
    ],
    color: "text-gray-600 bg-gray-50 border-gray-200",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "Ouro",
    minPoints: 1500,
    maxPoints: 9999,
    benefits: [
      "15% de desconto em todos os produtos",
      "Frete grátis em todas as compras",
      "Acesso VIP a eventos e lançamentos",
      "Atendimento prioritário",
    ],
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: <Crown className="h-5 w-5" />,
  },
]

const availableRewards: LoyaltyReward[] = [
  {
    id: "discount-10",
    name: "10% OFF",
    description: "Desconto de 10% em qualquer produto",
    pointsCost: 100,
    type: "discount",
    available: true,
  },
  {
    id: "free-shipping",
    name: "Frete Grátis",
    description: "Frete grátis na próxima compra",
    pointsCost: 50,
    type: "freeShipping",
    available: true,
  },
  {
    id: "discount-20",
    name: "20% OFF",
    description: "Desconto de 20% em qualquer produto",
    pointsCost: 200,
    type: "discount",
    available: true,
  },
  {
    id: "exclusive-access",
    name: "Acesso Exclusivo",
    description: "Acesso antecipado à nova coleção",
    pointsCost: 300,
    type: "exclusive",
    available: true,
  },
]

export function LoyaltyProgram() {
  const { user } = useAuth()
  const [userPoints, setUserPoints] = useState(750) // Mock data
  const [pointsHistory, setPointsHistory] = useState([
    { date: "2024-01-15", points: 50, description: "Compra - Vestido Midi", type: "earned" },
    { date: "2024-01-10", points: -100, description: "Resgate - 10% OFF", type: "redeemed" },
    { date: "2024-01-08", points: 30, description: "Compra - Blusa Social", type: "earned" },
    { date: "2024-01-05", points: 25, description: "Avaliação de produto", type: "earned" },
  ])

  const currentLevel = loyaltyLevels.find((level) => userPoints >= level.minPoints && userPoints <= level.maxPoints)
  const nextLevel = loyaltyLevels.find((level) => level.minPoints > userPoints)

  const progressToNextLevel = nextLevel
    ? ((userPoints - (currentLevel?.minPoints || 0)) / (nextLevel.minPoints - (currentLevel?.minPoints || 0))) * 100
    : 100

  const pointsToNextLevel = nextLevel ? nextLevel.minPoints - userPoints : 0

  const handleRedeemReward = (reward: LoyaltyReward) => {
    if (userPoints >= reward.pointsCost) {
      setUserPoints((prev) => prev - reward.pointsCost)
      setPointsHistory((prev) => [
        {
          date: new Date().toISOString().split("T")[0],
          points: -reward.pointsCost,
          description: `Resgate - ${reward.name}`,
          type: "redeemed",
        },
        ...prev,
      ])
      // In a real app, this would generate a coupon or apply the reward
      alert(`Recompensa "${reward.name}" resgatada com sucesso!`)
    }
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Programa de Fidelidade MF Store Girls
          </CardTitle>
          <CardDescription>Ganhe pontos a cada compra e troque por recompensas exclusivas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Points Balance */}
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{userPoints}</div>
              <p className="text-sm text-muted-foreground">Pontos disponíveis</p>
            </div>

            {/* Current Level */}
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${currentLevel?.color}`}>
                {currentLevel?.icon}
                <span className="font-medium">{currentLevel?.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Nível atual</p>
            </div>

            {/* Progress to Next Level */}
            <div className="text-center">
              {nextLevel ? (
                <>
                  <div className="text-lg font-semibold mb-2">{pointsToNextLevel}</div>
                  <p className="text-sm text-muted-foreground">pontos para {nextLevel.name}</p>
                </>
              ) : (
                <>
                  <div className="text-lg font-semibold mb-2">Máximo</div>
                  <p className="text-sm text-muted-foreground">Nível máximo atingido!</p>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {nextLevel && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{currentLevel?.name}</span>
                <span>{nextLevel.name}</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Level Benefits */}
      {currentLevel && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentLevel.icon}
              Benefícios do Nível {currentLevel.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentLevel.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Available Rewards */}
      <Card>
        <CardHeader>
          <CardTitle>Recompensas Disponíveis</CardTitle>
          <CardDescription>Troque seus pontos por benefícios exclusivos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableRewards.map((reward) => (
              <div key={reward.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">{reward.name}</h4>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                  <Badge variant="outline">{reward.pointsCost} pts</Badge>
                </div>
                <Button
                  onClick={() => handleRedeemReward(reward)}
                  disabled={userPoints < reward.pointsCost || !reward.available}
                  className="w-full"
                  size="sm"
                >
                  {userPoints >= reward.pointsCost ? "Resgatar" : "Pontos insuficientes"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pontos</CardTitle>
          <CardDescription>Suas últimas atividades de pontos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pointsHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div>
                  <p className="font-medium">{entry.description}</p>
                  <p className="text-sm text-muted-foreground">{entry.date}</p>
                </div>
                <div className={`font-semibold ${entry.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                  {entry.type === "earned" ? "+" : ""}
                  {entry.points} pts
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Points */}
      <Card>
        <CardHeader>
          <CardTitle>Como Ganhar Pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Compras</p>
                <p className="text-sm text-muted-foreground">1 ponto a cada R$ 10 gastos</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Avaliações</p>
                <p className="text-sm text-muted-foreground">25 pontos por avaliação</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Indicações</p>
                <p className="text-sm text-muted-foreground">100 pontos por amigo indicado</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Aniversário</p>
                <p className="text-sm text-muted-foreground">50 pontos de presente</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
