"use client"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
  photos?: string[]
  size?: string
  color?: string
}

interface EnhancedReviewsProps {
  reviews: Review[]
  rating: number
  totalReviews: number
  onAddReview: (review: Omit<Review, "id" | "date" | "helpful">) => void
}

export function EnhancedReviews({ reviews, rating, totalReviews, onAddReview }: EnhancedReviewsProps) {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 5,
    comment: "",
    verified: false,
    size: "",
    color: "",
    photos: [] as string[],
  })

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true
    if (filter === "verified") return review.verified
    if (filter === "photos") return review.photos && review.photos.length > 0
    return review.rating === Number.parseInt(filter)
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful
      case "rating-high":
        return b.rating - a.rating
      case "rating-low":
        return a.rating - b.rating
      case "recent":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    percentage: (reviews.filter((r) => r.rating === stars).length / reviews.length) * 100,
  }))

  const handleSubmitReview = () => {
    if (newReview.user && newReview.comment) {
      onAddReview(newReview)
      setNewReview({
        user: "",
        rating: 5,
        comment: "",
        verified: false,
        size: "",
        color: "",
        photos: [],
      })
      setShowWriteReview(false)
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    // In a real app, you would upload these files and get URLs
    const photoUrls = files.map((file) => URL.createObjectURL(file))
    setNewReview((prev) => ({ ...prev, photos: [...prev.photos, ...photoUrls] }))
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <div className="bg-secondary/20 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">{rating.toFixed(1)}</div>
            <div className="flex items-center justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">Baseado em {totalReviews} avaliações</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count, percentage }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todas ({reviews.length})
          </Button>
          <Button
            variant={filter === "verified" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("verified")}
          >
            Verificadas ({reviews.filter((r) => r.verified).length})
          </Button>
          <Button variant={filter === "photos" ? "default" : "outline"} size="sm" onClick={() => setFilter("photos")}>
            Com fotos ({reviews.filter((r) => r.photos && r.photos.length > 0).length})
          </Button>
          {[5, 4, 3, 2, 1].map((stars) => (
            <Button
              key={stars}
              variant={filter === stars.toString() ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(stars.toString())}
            >
              {stars}★ ({reviews.filter((r) => r.rating === stars).length})
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="helpful">Mais úteis</SelectItem>
              <SelectItem value="rating-high">Maior nota</SelectItem>
              <SelectItem value="rating-low">Menor nota</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => setShowWriteReview(true)}>Escrever avaliação</Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{review.user}</span>
                  {review.verified && <Badge variant="secondary">Compra verificada</Badge>}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  {review.size && <Badge variant="outline">Tamanho {review.size}</Badge>}
                  {review.color && <Badge variant="outline">{review.color}</Badge>}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>

            <p className="text-foreground mb-4">{review.comment}</p>

            {/* Review Photos */}
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.photos.map((photo, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <button className="w-16 h-16 rounded-lg overflow-hidden border hover:border-primary transition-colors">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <img src={photo || "/placeholder.svg"} alt={`Foto ${index + 1}`} className="w-full h-auto" />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="h-4 w-4 mr-1" />
                Útil ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Dialog */}
      <Dialog open={showWriteReview} onOpenChange={setShowWriteReview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Escrever Avaliação</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome</label>
              <Input
                value={newReview.user}
                onChange={(e) => setNewReview((prev) => ({ ...prev, user: e.target.value }))}
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Avaliação</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Tamanho comprado</label>
                <Select
                  value={newReview.size}
                  onValueChange={(value) => setNewReview((prev) => ({ ...prev, size: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PP">PP</SelectItem>
                    <SelectItem value="P">P</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="G">G</SelectItem>
                    <SelectItem value="GG">GG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Cor comprada</label>
                <Input
                  value={newReview.color}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, color: e.target.value }))}
                  placeholder="Ex: Preto"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Comentário</label>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                placeholder="Conte sua experiência com o produto..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fotos (opcional)</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-muted rounded-lg p-4 hover:border-primary transition-colors">
                  <Camera className="h-5 w-5" />
                  <span>Adicionar fotos</span>
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {newReview.photos.length > 0 && (
                  <div className="flex gap-2">
                    {newReview.photos.map((photo, index) => (
                      <div key={index} className="w-16 h-16 rounded-lg overflow-hidden border">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmitReview} className="flex-1">
                Publicar Avaliação
              </Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
