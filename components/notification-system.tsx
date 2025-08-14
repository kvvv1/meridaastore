"use client"

import { useState, useEffect } from "react"
import { Bell, X, ShoppingBag, Heart, Percent, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "sale" | "stock" | "wishlist" | "order"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem("notifications")
    if (saved) {
      const parsed = JSON.parse(saved).map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp),
      }))
      setNotifications(parsed)
      setUnreadCount(parsed.filter((n: Notification) => !n.read).length)
    }

    // Simulate receiving notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 30 seconds
        addNotification(generateRandomNotification())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const generateRandomNotification = (): Notification => {
    const types = ["sale", "stock", "wishlist"] as const
    const type = types[Math.floor(Math.random() * types.length)]

    const notifications = {
      sale: {
        title: "Promoção Flash!",
        message: "50% OFF em vestidos selecionados por tempo limitado",
        actionUrl: "/produtos?categoria=vestidos&promocao=flash",
      },
      stock: {
        title: "Produto em estoque!",
        message: "O vestido midi que você queria já está disponível",
        actionUrl: "/produto/1",
      },
      wishlist: {
        title: "Item da wishlist em promoção",
        message: "Blazer estruturado com 30% de desconto",
        actionUrl: "/conta?tab=wishlist",
      },
    }

    return {
      id: Date.now().toString(),
      type,
      ...notifications[type],
      timestamp: new Date(),
      read: false,
    }
  }

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => {
      const updated = [notification, ...prev].slice(0, 20) // Keep only last 20
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
    setUnreadCount((prev) => prev + 1)

    // Show toast for important notifications
    if (notification.type === "sale") {
      toast({
        title: notification.title,
        description: notification.message,
      })
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id)
      localStorage.setItem("notifications", JSON.stringify(updated))
      return updated
    })
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <Percent className="h-4 w-4 text-red-500" />
      case "stock":
        return <Package className="h-4 w-4 text-green-500" />
      case "wishlist":
        return <Heart className="h-4 w-4 text-pink-500" />
      case "order":
        return <ShoppingBag className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `${days}d atrás`
    if (hours > 0) return `${hours}h atrás`
    if (minutes > 0) return `${minutes}min atrás`
    return "Agora"
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative hover:bg-primary/10">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Notificações</h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Marcar todas como lidas
              </Button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b hover:bg-secondary/50 cursor-pointer ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => {
                    markAsRead(notification.id)
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{formatTime(notification.timestamp)}</p>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full mt-1" />}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
