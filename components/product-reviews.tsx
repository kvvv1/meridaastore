"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ThumbsUp } from "lucide-react"

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface ProductReviewsProps {
  reviews: Review[]
  rating: number
  totalReviews: number
}

export function ProductReviews({ reviews, rating, totalReviews }: ProductReviewsProps) {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-2xl">Avaliações dos Clientes</h2>
        <Button variant="outline">Escrever Avaliação</Button>
      </div>

      {/* Rating Summary */}
      <div className="flex items-center gap-6 mb-8 p-6 bg-secondary/20 rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">{rating}</div>
          <div className="flex justify-center mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{totalReviews} avaliações</div>
        </div>

        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = reviews.filter((r) => Math.floor(r.rating) === stars).length
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
            return (
              <div key={stars} className="flex items-center gap-2 mb-1">
                <span className="text-sm w-8">{stars}★</span>
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                </div>
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.user}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Compra Verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(review.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Útil
                </Button>
              </div>
              <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline">Ver Mais Avaliações</Button>
      </div>
    </div>
  )
}
