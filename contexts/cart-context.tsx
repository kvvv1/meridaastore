"use client"

import type React from "react"

import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  size: string
  quantity: number
  maxStock: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
  | { type: "REMOVE_ITEM"; payload: { id: number; color: string; size: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; color: string; size: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }

const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
  itemCount: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { quantity = 1, ...item } = action.payload
      const existingItemIndex = state.items.findIndex(
        (i) => i.id === item.id && i.color === item.color && i.size === item.size,
      )

      let newItems: CartItem[]
      if (existingItemIndex > -1) {
        newItems = state.items.map((i, index) =>
          index === existingItemIndex ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxStock) } : i,
        )
      } else {
        newItems = [...state.items, { ...item, quantity: Math.min(quantity, item.maxStock) }]
      }

      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) =>
          !(item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size),
      )
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color && item.size === action.payload.size
          ? { ...item, quantity: Math.min(Math.max(1, action.payload.quantity), item.maxStock) }
          : item,
      )
      const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { ...state, items: newItems, total, itemCount }
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0, itemCount: 0 }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: number, color: string, size: string) => void
  updateQuantity: (id: number, color: string, size: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
} | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("merida-cart")
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        cartData.items.forEach((item: CartItem) => {
          dispatch({ type: "ADD_ITEM", payload: item })
        })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("merida-cart", JSON.stringify({ items: state.items }))
  }, [state.items])

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeItem = (id: number, color: string, size: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, color, size } })
  }

  const updateQuantity = (id: number, color: string, size: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, color, size, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const openCart = () => {
    dispatch({ type: "OPEN_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
