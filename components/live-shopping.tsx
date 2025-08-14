"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Users,
  Heart,
  MessageCircle,
  Share2,
  ShoppingBag,
  Volume2,
  VolumeX,
  Maximize,
  Gift,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LiveStream {
  id: string
  title: string
  host: string
  hostAvatar: string
  viewers: number
  isLive: boolean
  startTime: Date
  products: LiveProduct[]
  streamUrl: string
}

interface LiveProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  inStock: boolean
  featured: boolean
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: Date
  isHost?: boolean
}

const mockStream: LiveStream = {
  id: "live-1",
  title: "Looks de Inverno 2024 - Tendências e Combinações",
  host: "Maria Fernanda",
  hostAvatar: "/placeholder.svg?height=40&width=40",
  viewers: 1247,
  isLive: true,
  startTime: new Date(Date.now() - 30 * 60 * 1000),
  streamUrl: "/placeholder.svg?height=400&width=600&text=Live+Stream",
  products: [
    {
      id: "1",
      name: "Casaco Longo Camel",
      price: 299.9,
      originalPrice: 399.9,
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
      featured: true,
    },
    {
      id: "2",
      name: "Bota Over the Knee",
      price: 189.9,
      image: "/placeholder.svg?height=100&width=100",
      inStock: true,
      featured: false,
    },
  ],
}

const mockMessages: ChatMessage[] = [
  { id: "1", user: "Ana", message: "Amando esse casaco! 😍", timestamp: new Date() },
  { id: "2", user: "Carla", message: "Qual o tamanho disponível?", timestamp: new Date() },
  { id: "3", user: "Maria Fernanda", message: "Temos do P ao GG! 💕", timestamp: new Date(), isHost: true },
]

export function LiveShopping() {
  const [stream] = useState<LiveStream>(mockStream)
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [likes, setLikes] = useState(892)
  const [hasLiked, setHasLiked] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "Você",
      message: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  const toggleLike = () => {
    setHasLiked(!hasLiked)
    setLikes((prev) => (hasLiked ? prev - 1 : prev + 1))
  }

  const shareStream = () => {
    const url = `${window.location.origin}/live/${stream.id}`
    const text = `Assista agora: ${stream.title} - Live na MF Store Girls! 🔴✨`

    if (navigator.share) {
      navigator.share({ title: stream.title, text, url })
    } else {
      navigator.clipboard.writeText(`${text} ${url}`)
      toast({ title: "Link copiado!", description: "Compartilhe com suas amigas" })
    }
  }

  const addToCart = (product: LiveProduct) => {
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`,
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen max-h-screen p-4">
      {/* Video Player */}
      <div className="lg:col-span-2 space-y-4">
        <Card className="relative overflow-hidden">
          <div className="relative aspect-video bg-black">
            <img
              src={stream.streamUrl || "/placeholder.svg"}
              alt="Live Stream"
              className="w-full h-full object-cover"
            />

            {/* Live Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-500 text-white animate-pulse">🔴 AO VIVO</Badge>
            </div>

            {/* Viewers Count */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1 text-white text-sm">
              <Users className="h-4 w-4 inline mr-1" />
              {stream.viewers.toLocaleString()}
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={toggleLike} className={hasLiked ? "text-red-500" : ""}>
                  <Heart className={`h-4 w-4 ${hasLiked ? "fill-current" : ""}`} />
                  {likes}
                </Button>
                <Button size="sm" variant="secondary" onClick={shareStream}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stream Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={stream.hostAvatar || "/placeholder.svg"} />
                <AvatarFallback>MF</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="font-semibold">{stream.title}</h2>
                <p className="text-sm text-muted-foreground">
                  com {stream.host} • Iniciado há {Math.floor((Date.now() - stream.startTime.getTime()) / 60000)} min
                </p>
              </div>
              <Button>Seguir</Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Produtos em Destaque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stream.products.map((product) => (
                <div key={product.id} className="border rounded-lg p-3 space-y-2">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded"
                  />
                  <h4 className="font-medium text-sm">{product.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="w-full" onClick={() => addToCart(product)} disabled={!product.inStock}>
                    <ShoppingBag className="h-3 w-3 mr-1" />
                    {product.inStock ? "Comprar" : "Esgotado"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat */}
      <div className="space-y-4">
        <Card className="flex flex-col h-[55vh] sm:h-96">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat ao Vivo
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${message.isHost ? "text-primary" : ""}`}>
                        {message.user}
                        {message.isHost && (
                          <Badge variant="secondary" className="text-xs">
                            Host
                          </Badge>
                        )}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t pb-[env(safe-area-inset-bottom)]">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} size="sm">
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Button className="w-full bg-transparent" variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Adicionar à Wishlist
            </Button>
            <Button className="w-full bg-transparent" variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar Live
            </Button>
            <Button className="w-full">
              <Gift className="h-4 w-4 mr-2" />
              Ver Todas as Ofertas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
