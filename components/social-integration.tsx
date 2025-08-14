"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Instagram, Facebook, MessageCircle, Share2, Camera, Video, Users, TrendingUp, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialPost {
  id: string
  platform: "instagram" | "facebook" | "whatsapp"
  content: string
  image?: string
  engagement: number
  createdAt: Date
}

interface SocialStats {
  followers: number
  engagement: number
  reach: number
  clicks: number
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    platform: "instagram",
    content: "Novo look chegando! 😍✨ #mfstoregirls",
    image: "/placeholder.svg?height=200&width=200",
    engagement: 245,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    platform: "facebook",
    content: "Promoção especial para nossas seguidoras! 💕",
    engagement: 89,
    createdAt: new Date("2024-01-14"),
  },
]

const mockStats: SocialStats = {
  followers: 15420,
  engagement: 8.5,
  reach: 45230,
  clicks: 1250,
}

export function SocialIntegration() {
  const [posts] = useState<SocialPost[]>(mockPosts)
  const [stats] = useState<SocialStats>(mockStats)
  const [newPost, setNewPost] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"])
  const { toast } = useToast()

  const shareProduct = (productId: string, platform: string) => {
    const productUrl = `${window.location.origin}/produto/${productId}`
    const text = "Olha que peça incrível! 😍✨"

    switch (platform) {
      case "instagram":
        if (navigator.share) {
          navigator.share({ title: "MF Store Girls", text, url: productUrl })
        } else {
          navigator.clipboard.writeText(`${text} ${productUrl}`)
          toast({ title: "Texto copiado!", description: "Cole no seu Instagram" })
        }
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`)
        break
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${productUrl}`)}`)
        break
    }
  }

  const createPost = () => {
    if (!newPost.trim()) return

    toast({
      title: "Post agendado!",
      description: "Seu post será publicado nas plataformas selecionadas",
    })
    setNewPost("")
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-heading font-bold mb-2">Central Social</h1>
        <p className="text-muted-foreground">Gerencie suas redes sociais e compartilhe produtos</p>
      </div>

      {/* Social Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagement}%</div>
            <p className="text-xs text-muted-foreground">Taxa média</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alcance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cliques</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Para o site</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Post */}
      <Card>
        <CardHeader>
          <CardTitle>Criar Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              placeholder="O que você quer compartilhar?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px]"
            />

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Foto
              </Button>
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Vídeo
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Publicar em:</p>
            <div className="flex gap-2">
              <Button
                variant={selectedPlatforms.includes("instagram") ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("instagram")}
              >
                <Instagram className="h-4 w-4 mr-2" />
                Instagram
              </Button>
              <Button
                variant={selectedPlatforms.includes("facebook") ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("facebook")}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant={selectedPlatforms.includes("whatsapp") ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform("whatsapp")}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>

          <Button onClick={createPost} className="w-full">
            Publicar Agora
          </Button>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Posts Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex gap-4 p-4 border rounded-lg">
                {post.image && (
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-16 h-16 object-cover rounded" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {post.platform === "instagram" && <Instagram className="h-4 w-4" />}
                    {post.platform === "facebook" && <Facebook className="h-4 w-4" />}
                    {post.platform === "whatsapp" && <MessageCircle className="h-4 w-4" />}
                    <Badge variant="outline" className="text-xs">
                      {post.platform}
                    </Badge>
                  </div>
                  <p className="text-sm mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{post.engagement} interações</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Share */}
      <Card>
        <CardHeader>
          <CardTitle>Compartilhamento Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => shareProduct("featured", "instagram")}
            >
              <Instagram className="h-6 w-6 mb-2" />
              Produto em Destaque
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => shareProduct("new", "facebook")}
            >
              <Facebook className="h-6 w-6 mb-2" />
              Novo Lançamento
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col bg-transparent"
              onClick={() => shareProduct("sale", "whatsapp")}
            >
              <MessageCircle className="h-6 w-6 mb-2" />
              Promoção
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
