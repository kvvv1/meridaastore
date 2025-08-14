"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  phone?: string
  cpf?: string
  birthDate?: string
  addresses: Address[]
  orders: Order[]
  wishlist: string[]
}

interface Address {
  id: string
  name: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  isDefault: boolean
}

interface Order {
  id: string
  date: string
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  total: number
  items: any[]
  shippingAddress: Address
  paymentMethod: string
  trackingCode?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  addAddress: (address: Omit<Address, "id">) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  removeAddress: (id: string) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("merida-user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      name: "Maria Silva",
      email,
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      addresses: [],
      orders: [
        {
          id: "ORD-001",
          date: "2024-01-15",
          status: "delivered",
          total: 299.9,
          items: [
            {
              id: "1",
              name: "Vestido Midi Elegante",
              price: 299.9,
              quantity: 1,
              image: "/elegant-midi-dress-woman.png",
            },
          ],
          shippingAddress: {
            id: "1",
            name: "Casa",
            street: "Rua das Flores",
            number: "123",
            neighborhood: "Centro",
            city: "São Paulo",
            state: "SP",
            zipCode: "01234-567",
            isDefault: true,
          },
          paymentMethod: "Cartão de Crédito",
          trackingCode: "BR123456789",
        },
      ],
      wishlist: [],
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("merida-user", JSON.stringify(mockUser))
    return true
  }

  const register = async (userData: any): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      addresses: [],
      orders: [],
      wishlist: [],
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("merida-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("merida-user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  const addToWishlist = (productId: string) => {
    if (user && !user.wishlist.includes(productId)) {
      const updatedUser = {
        ...user,
        wishlist: [...user.wishlist, productId],
      }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  const removeFromWishlist = (productId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        wishlist: user.wishlist.filter((id) => id !== productId),
      }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  const isInWishlist = (productId: string): boolean => {
    return user?.wishlist.includes(productId) || false
  }

  const addAddress = (address: Omit<Address, "id">) => {
    if (user) {
      const newAddress: Address = {
        ...address,
        id: Date.now().toString(),
      }
      const updatedUser = {
        ...user,
        addresses: [...user.addresses, newAddress],
      }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  const updateAddress = (id: string, addressData: Partial<Address>) => {
    if (user) {
      const updatedUser = {
        ...user,
        addresses: user.addresses.map((addr) => (addr.id === id ? { ...addr, ...addressData } : addr)),
      }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  const removeAddress = (id: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        addresses: user.addresses.filter((addr) => addr.id !== id),
      }
      setUser(updatedUser)
      localStorage.setItem("merida-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateUser,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addAddress,
        updateAddress,
        removeAddress,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
