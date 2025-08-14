"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, Heart, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { SmartSearch } from "@/components/smart-search"
import { NotificationSystem } from "@/components/notification-system"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { state: cartState, toggleCart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const categories = ["Vestidos", "Blusas", "Calças", "Saias", "Acessórios", "Sapatos", "Lingerie"]

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/mf-store-logo.jpg"
                      alt="MF Store Girls"
                      width={120}
                      height={120}
                      className="rounded-lg"
                    />
                  </Link>
                  <nav className="flex flex-col space-y-3">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/categoria/${category.toLowerCase()}`}
                        className="text-lg hover:text-primary transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </nav>
                  <Button variant="outline" onClick={() => setIsSearchOpen(true)} className="justify-start gap-2 mt-4">
                    <Search className="h-4 w-4" />
                    Buscar produtos...
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center">
              <Image
                src="/mf-store-logo.jpg"
                alt="MF Store Girls"
                width={60}
                height={60}
                className="md:w-16 md:h-16 rounded-lg hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category}
                  href={`/categoria/${category.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="hover:bg-primary/10">
                <Search className="h-5 w-5" />
              </Button>

              {/* NotificationSystem */}
              <NotificationSystem />

              {/* Wishlist */}
              <Button variant="ghost" size="icon" asChild>
                <Link href={isAuthenticated ? "/conta?tab=wishlist" : "/login"}>
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/conta">Minha Conta</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/conta?tab=orders">Meus Pedidos</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/conta?tab=wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/login">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}

              {/* Cart */}
              <Button variant="ghost" size="icon" className="relative" onClick={toggleCart}>
                <ShoppingBag className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartState.itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <SmartSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* CartSidebar component */}
      <CartSidebar />
    </>
  )
}
