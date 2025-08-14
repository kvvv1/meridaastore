"use client"

import { useState, useEffect } from "react"
import { WifiOff, Wifi } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowIndicator(true)
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    setIsOnline(navigator.onLine)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (!showIndicator) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Card className={`shadow-lg ${isOnline ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
            <span className={`text-sm font-medium ${isOnline ? "text-green-700" : "text-red-700"}`}>
              {isOnline ? "Conexão restaurada" : "Você está offline"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
