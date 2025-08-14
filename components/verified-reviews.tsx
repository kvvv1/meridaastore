"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star, Camera, CheckCircle, ThumbsUp, ThumbsDown, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  photos: string[]
  isVerified: boolean
  isPurchaseVerified: boolean
  size: string
  color: string
  fit: "pequeno" | "perfeito" | "grande"
  quality: number
  comfort: number
  createdAt: Date
  helpfulCount: number
  notHelpfulCount: number
  response?: {
    text: string
    date: Date
    author: string
  }
}

const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Maria S.",
    userAvatar: "/user-avatar-1.jpg",
    rating: 5,
    title: "Perfeito! Superou minhas expectativas",
    comment:
      "Vestido lindo, tecido de qualidade excelente e o caimento é perfeito. Recebi muitos elogios quando usei. A cor é exatamente como na foto.",
    photos: ["/review-photo-1.jpg", "/review-photo-2.jpg"],
    isVerified: true,
    isPurchaseVerified: true,
    size: "M",
    color: "Azul",
    fit: "perfeito",
    quality: 5,
    comfort: 5,
    createdAt: new Date("2024-01-20"),
    helpfulCount: 12,
    notHelpfulCount: 0,
    response: {
      text: "Muito obrigada pelo feedback, Maria! Ficamos felizes que tenha gostado ❤️",
      date: new Date("2024-01-21"),
      author: "MF Store Girls",
    },
  },
  {
    id: "2",
    userId: "user2",
    userName: "Ana Clara R.",
    rating: 4,
    title: "Muito bom, mas poderia ser melhor",
    comment: "Gostei muito do vestido, mas achei que poderia ter mais elasticidade no tecido. No geral, recomendo!",
    photos: ["/review-photo-3.jpg"],
    isVerified: true,
    isPurchaseVerified: true,
    size: "P",
    color: "Preto",
    fit: "pequeno",
    quality: 4,
    comfort: 3,
    createdAt: new Date("2024-01-18"),
    helpfulCount: 8,
    notHelpfulCount: 1,
  },
]

interface VerifiedReviewsProps {
  productId: string
  averageRating: number
  totalReviews: number
}

export function VerifiedReviews({ productId, averageRating, totalReviews }: VerifiedReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    size: "",
    color: "",
    fit: "perfeito" as const,
    quality: 0,
    comfort: 0,
    photos: [] as File[],
  })
  const { toast } = useToast()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + newReview.photos.length > 5) {
      toast({
        title: "Limite excedido",
        description: "Você pode adicionar no máximo 5 fotos",
        variant: "destructive",
      })
      return
    }
    setNewReview((prev) => ({ ...prev, photos: [...prev.photos, ...files] }))
  }

  const removePhoto = (index: number) => {
    setNewReview((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const submitReview = async () => {
    if (!newReview.rating || !newReview.comment) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha a avaliação e comentário",
        variant: "destructive",
      })
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Avaliação enviada!",
      description: "Sua avaliação será analisada e publicada em breve",
    })

    setShowWriteReview(false)
    setNewReview({
      rating: 0,
      title: "",
      comment: "",
      size: "",
      color: "",
      fit: "perfeito",
      quality: 0,
      comfort: 0,
      photos: [],
    })
  }

  const markHelpful = (reviewId: string, helpful: boolean) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpfulCount: helpful ? review.helpfulCount + 1 : review.helpfulCount,
              notHelpfulCount: !helpful ? review.notHelpfulCount + 1 : review.notHelpfulCount,
            }
          : review,
      ),
    )
  }

  const filteredReviews = reviews.filter((review) => {
    if (filter === "verified") return review.isPurchaseVerified
    if (filter === "photos") return review.photos.length > 0
    if (filter === "5-stars") return review.rating === 5
    if (filter === "4-stars") return review.rating === 4
    if (filter === "3-stars") return review.rating === 3
    if (filter === "2-stars") return review.rating === 2
    if (filter === "1-star") return review.rating === 1
    return true
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpfulCount - a.helpfulCount
      case "rating-high":
        return b.rating - a.rating
      case "rating-low":
        return a.rating - b.rating
      case "recent":
        return b.createdAt.getTime() - a.createdAt.getTime()
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Avaliações dos Clientes</span>
            <Button onClick={() => setShowWriteReview(true)}>Escrever Avaliação</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">{totalReviews} avaliações</div>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((r) => r.rating === rating).length
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Todas
            </Button>
            <Button
              variant={filter === "verified" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("verified")}
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Verificadas
            </Button>
            <Button variant={filter === "photos" ? "default" : "outline"} size="sm" onClick={() => setFilter("photos")}>
              <Camera className="h-3 w-3 mr-1" />
              Com Fotos
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filter === `${rating}-star${rating > 1 ? "s" : ""}` ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(`${rating}-star${rating > 1 ? "s" : ""}`)}
              >
                {rating}★
              </Button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="recent">Mais Recentes</option>
            <option value="helpful">Mais Úteis</option>
            <option value="rating-high">Maior Avaliação</option>
            <option value="rating-low">Menor Avaliação</option>
          </select>
        </CardContent>
      </Card>

      {/* Write Review Modal */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Escrever Avaliação</span>
              <Button variant="ghost" size="sm" onClick={() => setShowWriteReview(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Avaliação Geral *</Label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button key={rating} onClick={() => setNewReview((prev) => ({ ...prev, rating }))} className="p-1">
                    <Star
                      className={`h-6 w-6 ${
                        rating <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Qualidade</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview((prev) => ({ ...prev, quality: rating }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          rating <= newReview.quality ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Conforto</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview((prev) => ({ ...prev, comfort: rating }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          rating <= newReview.comfort ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="title">Título da Avaliação</Label>
              <Input
                id="title"
                value={newReview.title}
                onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Resuma sua experiência"
              />
            </div>

            <div>
              <Label htmlFor="comment">Comentário *</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Conte sobre sua experiência com o produto"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="size">Tamanho Comprado</Label>
                <Input
                  id="size"
                  value={newReview.size}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, size: e.target.value }))}
                  placeholder="P, M, G..."
                />
              </div>

              <div>
                <Label htmlFor="color">Cor Comprada</Label>
                <Input
                  id="color"
                  value={newReview.color}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, color: e.target.value }))}
                  placeholder="Azul, Preto..."
                />
              </div>

              <div>
                <Label htmlFor="fit">Caimento</Label>
                <select
                  id="fit"
                  value={newReview.fit}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, fit: e.target.value as any }))}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="pequeno">Ficou pequeno</option>
                  <option value="perfeito">Caimento perfeito</option>
                  <option value="grande">Ficou grande</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Adicionar Fotos (máximo 5)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg cursor-pointer hover:bg-secondary/50"
                >
                  <Upload className="h-4 w-4" />
                  Adicionar Fotos
                </label>
              </div>

              {newReview.photos.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {newReview.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button onClick={submitReview} className="flex-1">
                Publicar Avaliação
              </Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  {review.userAvatar ? (
                    <img
                      src={review.userAvatar || "/placeholder.svg"}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="font-medium text-primary">{review.userName[0]}</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{review.userName}</span>
                    {review.isPurchaseVerified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Compra Verificada
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">{review.createdAt.toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.size && `Tamanho: ${review.size}`}
                      {review.color && ` • Cor: ${review.color}`}
                      {review.fit && ` • Caimento: ${review.fit}`}
                    </span>
                  </div>

                  {review.title && <h4 className="font-medium mb-2">{review.title}</h4>}

                  <p className="text-muted-foreground mb-3">{review.comment}</p>

                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mb-3">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo || "/placeholder.svg"}
                          alt={`Review photo ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-80"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <button
                      onClick={() => markHelpful(review.id, true)}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Útil ({review.helpfulCount})
                    </button>
                    <button
                      onClick={() => markHelpful(review.id, false)}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <ThumbsDown className="h-4 w-4" />({review.notHelpfulCount})
                    </button>
                  </div>

                  {review.response && (
                    <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.response.author}</span>
                        <span className="text-xs text-muted-foreground">
                          {review.response.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm">{review.response.text}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
