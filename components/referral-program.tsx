"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Gift, Users, Copy, Share2, DollarSign, Trophy, MessageCircle, Instagram } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

interface Referral {
  id: string
  friendName: string
  friendEmail: string
  status: "pending" | "completed"
  reward: number
  date: Date
}

const mockReferrals: Referral[] = [
  {
    id: "1",
    friendName: "Ana Silva",
    friendEmail: "ana@email.com",
    status: "completed",
    reward: 25,
    date: new Date("2024-01-15"),
  },
  {
    id: "2",
    friendName: "Carla Santos",
    friendEmail: "carla@email.com",
    status: "pending",
    reward: 25,
    date: new Date("2024-01-20"),
  },
]

export function ReferralProgram() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals)
  const [friendEmail, setFriendEmail] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const totalEarned = referrals.filter((r) => r.status === "completed").reduce((sum, r) => sum + r.reward, 0)

  const pendingRewards = referrals.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.reward, 0)

  const referralCode = user ? `FRIEND${user.id.slice(-4).toUpperCase()}` : ""
  const referralLink = `${window.location.origin}?ref=${referralCode}`

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Link copiado!",
      description: "Compartilhe com suas amigas para ganhar recompensas",
    })
  }

  const shareToWhatsApp = () => {
    const message = `Oi! 😍 Descobri uma loja incrível de moda feminina e quero compartilhar com você! Use meu link e ganhe R$ 15 de desconto na primeira compra: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`)
  }

  const shareToInstagram = () => {
    const text = `Minhas amigas, descobri essa loja incrível! 😍✨ Use meu link e ganhe desconto especial: ${referralLink} #mfstoregirls #modafeminina`

    if (navigator.share) {
      navigator.share({
        title: "MF Store Girls",
        text: text,
        url: referralLink,
      })
    } else {
      navigator.clipboard.writeText(text)
      toast({
        title: "Texto copiado!",
        description: "Cole no seu Instagram Stories ou post",
      })
    }
  }

  const inviteFriend = async () => {
    if (!friendEmail) return

    setIsInviting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newReferral: Referral = {
      id: Date.now().toString(),
      friendName: friendEmail.split("@")[0],
      friendEmail,
      status: "pending",
      reward: 25,
      date: new Date(),
    }

    setReferrals((prev) => [newReferral, ...prev])
    setFriendEmail("")
    setIsInviting(false)

    toast({
      title: "Convite enviado!",
      description: "Sua amiga receberá um e-mail com o desconto especial",
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold mb-2">Programa Indique e Ganhe</h1>
        <p className="text-muted-foreground">
          Convide suas amigas e ganhem juntas! Você ganha R$ 25 e ela ganha R$ 15 de desconto
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ganho</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalEarned.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Em recompensas recebidas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {pendingRewards.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Aguardando primeira compra</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Amigas Indicadas</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
            <p className="text-xs text-muted-foreground">
              {referrals.filter((r) => r.status === "completed").length} compraram
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>Como Funciona</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">1. Compartilhe</h3>
              <p className="text-sm text-muted-foreground">Envie seu link personalizado para suas amigas</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">2. Ela Ganha</h3>
              <p className="text-sm text-muted-foreground">Sua amiga ganha R$ 15 de desconto na primeira compra</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">3. Você Ganha</h3>
              <p className="text-sm text-muted-foreground">Você recebe R$ 25 de crédito quando ela comprar</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Share Section */}
      <Card>
        <CardHeader>
          <CardTitle>Compartilhe seu Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="flex-1" />
            <Button onClick={copyReferralLink} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              Copiar
            </Button>
          </div>

          <div className="flex gap-2">
            <Button onClick={shareToWhatsApp} variant="outline" className="flex-1 bg-transparent">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
            <Button onClick={shareToInstagram} variant="outline" className="flex-1 bg-transparent">
              <Instagram className="h-4 w-4 mr-2" />
              Instagram
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Seu Código: {referralCode}</h4>
            <p className="text-sm text-muted-foreground">Suas amigas também podem usar este código no checkout</p>
          </div>
        </CardContent>
      </Card>

      {/* Invite by Email */}
      <Card>
        <CardHeader>
          <CardTitle>Convidar por E-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="E-mail da sua amiga"
              value={friendEmail}
              onChange={(e) => setFriendEmail(e.target.value)}
              type="email"
              className="flex-1"
            />
            <Button onClick={inviteFriend} disabled={!friendEmail || isInviting}>
              {isInviting ? "Enviando..." : "Convidar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referrals History */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Indicações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {referrals.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Você ainda não indicou nenhuma amiga. Comece agora!
              </p>
            ) : (
              referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{referral.friendName}</p>
                    <p className="text-sm text-muted-foreground">{referral.friendEmail}</p>
                    <p className="text-xs text-muted-foreground">Indicada em {referral.date.toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">R$ {referral.reward.toFixed(2)}</p>
                    <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                      {referral.status === "completed" ? "Pago" : "Pendente"}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
