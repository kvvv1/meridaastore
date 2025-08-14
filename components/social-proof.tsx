"use client"

import { useState, useEffect } from "react"
import { Eye, ShoppingBag, Users, TrendingUp } from "lucide-react"

interface SocialProofProps {
  productId?: string
  variant?: "viewing" | "purchased" | "stock" | "trending"
}

export function SocialProof({ productId, variant = "viewing" }: SocialProofProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Simulate real-time data
    const generateCount = () => {
      switch (variant) {
        case "viewing":
          return Math.floor(Math.random() * 15) + 5 // 5-20 people viewing
        case "purchased":
          return Math.floor(Math.random() * 8) + 2 // 2-10 people purchased
        case "stock":
          return Math.floor(Math.random() * 5) + 1 // 1-6 items left
        case "trending":
          return Math.floor(Math.random() * 50) + 20 // 20-70 views today
        default:
          return 0
      }
    }

    setCount(generateCount())
    setIsVisible(true)

    // Update count periodically for viewing/purchased
    if (variant === "viewing" || variant === "purchased") {
      const interval = setInterval(
        () => {
          setCount(generateCount())
        },
        10000 + Math.random() * 20000,
      ) // 10-30 seconds

      return () => clearInterval(interval)
    }
  }, [variant, productId])

  const getContent = () => {
    switch (variant) {
      case "viewing":
        return {
          icon: <Eye className="h-4 w-4" />,
          text: `${count} pessoas vendo agora`,
          color: "text-blue-600 bg-blue-50 border-blue-200",
        }
      case "purchased":
        return {
          icon: <ShoppingBag className="h-4 w-4" />,
          text: `${count} pessoas compraram hoje`,
          color: "text-green-600 bg-green-50 border-green-200",
        }
      case "stock":
        return {
          icon: <Users className="h-4 w-4" />,
          text: `Apenas ${count} unidades restantes`,
          color: "text-red-600 bg-red-50 border-red-200",
        }
      case "trending":
        return {
          icon: <TrendingUp className="h-4 w-4" />,
          text: `${count} visualizações hoje`,
          color: "text-orange-600 bg-orange-50 border-orange-200",
        }
      default:
        return {
          icon: <Eye className="h-4 w-4" />,
          text: "",
          color: "",
        }
    }
  }

  if (!isVisible) return null

  const content = getContent()

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium animate-fade-in ${content.color}`}
    >
      {content.icon}
      <span>{content.text}</span>
    </div>
  )
}
