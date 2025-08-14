"use client"

import { useState, useEffect } from "react"
import { Clock, Flame } from "lucide-react"

interface UrgencyTimerProps {
  endTime: Date
  label?: string
  variant?: "default" | "sale" | "flash"
}

export function UrgencyTimer({ endTime, label = "Oferta termina em", variant = "default" }: UrgencyTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = endTime.getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  if (isExpired) {
    return (
      <div className="text-center p-3 bg-red-100 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">Oferta expirada!</p>
      </div>
    )
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "sale":
        return "bg-red-50 border-red-200 text-red-700"
      case "flash":
        return "bg-orange-50 border-orange-200 text-orange-700"
      default:
        return "bg-primary/10 border-primary/20 text-primary"
    }
  }

  const getIcon = () => {
    switch (variant) {
      case "flash":
        return <Flame className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className={`p-3 border rounded-lg ${getVariantStyles()}`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        {getIcon()}
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-lg font-bold">
        {timeLeft.days > 0 && (
          <>
            <div className="text-center">
              <div className="bg-background rounded px-2 py-1 min-w-[40px]">
                {timeLeft.days.toString().padStart(2, "0")}
              </div>
              <div className="text-xs mt-1">dias</div>
            </div>
            <span>:</span>
          </>
        )}

        <div className="text-center">
          <div className="bg-background rounded px-2 py-1 min-w-[40px]">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-xs mt-1">hrs</div>
        </div>
        <span>:</span>

        <div className="text-center">
          <div className="bg-background rounded px-2 py-1 min-w-[40px]">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-xs mt-1">min</div>
        </div>
        <span>:</span>

        <div className="text-center">
          <div className="bg-background rounded px-2 py-1 min-w-[40px]">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-xs mt-1">seg</div>
        </div>
      </div>
    </div>
  )
}
