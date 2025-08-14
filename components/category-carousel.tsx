"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Vestidos",
    image: "/elegant-dress-category.png",
    href: "/categoria/vestidos",
  },
  {
    name: "Blusas",
    image: "/stylish-blouse-category.png",
    href: "/categoria/blusas",
  },
  {
    name: "Calças",
    image: "/trendy-pants.png",
    href: "/categoria/calcas",
  },
  {
    name: "Saias",
    image: "/fashionable-skirts.png",
    href: "/categoria/saias",
  },
  {
    name: "Conjuntos",
    image: "/matching-set-category.png",
    href: "/categoria/conjuntos",
  },
  {
    name: "Acessórios",
    image: "/placeholder-njhph.png",
    href: "/categoria/acessorios",
  },
  {
    name: "Calçados",
    image: "/women-shoes-category.png",
    href: "/categoria/calcados",
  },
  {
    name: "Bolsas",
    image: "/handbags-category.png",
    href: "/categoria/bolsas",
  },
]

export function CategoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, categories.length - itemsPerView)

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">Categorias</h2>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="icon" onClick={prev} disabled={currentIndex === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={next} disabled={currentIndex === maxIndex}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {categories.map((category, index) => (
              <Link key={index} href={category.href} className="flex-shrink-0 w-1/2 md:w-1/4 group">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted group-hover:scale-105 transition-transform">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile navigation dots */}
        <div className="flex justify-center mt-6 md:hidden">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
