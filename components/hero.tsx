"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

const carouselSlides = [
  {
    id: 1,
    title: "Nova Coleção Outono",
    subtitle: "Elegância em cada detalhe",
    description: "Descubra peças únicas que celebram sua feminilidade com sofisticação e estilo atemporal.",
    image: "/elegant-autumn-woman.png",
    cta: "Ver Coleção",
    ctaLink: "/produtos?categoria=outono",
  },
  {
    id: 2,
    title: "Vestidos Exclusivos",
    subtitle: "Para momentos especiais",
    description: "Peças cuidadosamente selecionadas para mulheres que valorizam qualidade e design único.",
    image: "/sophisticated-woman-dress.png",
    cta: "Explorar Vestidos",
    ctaLink: "/produtos?categoria=vestidos",
  },
  {
    id: 3,
    title: "Acessórios Premium",
    subtitle: "Detalhes que fazem a diferença",
    description: "Complete seu look com nossa seleção exclusiva de acessórios e joias artesanais.",
    image: "/earthy-luxury-accessories.png",
    cta: "Ver Acessórios",
    ctaLink: "/produtos?categoria=acessorios",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const currentSlideData = carouselSlides[currentSlide]

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-gradient-to-br from-secondary/50 to-background">
      {/* Carousel Container */}
      <div className="relative h-full w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentSlideData.image || "/placeholder.svg"}
            alt={currentSlideData.title}
            fill
            className="object-cover object-center opacity-30 sm:opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/30 sm:from-background/80 sm:via-background/40 sm:to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-full sm:max-w-2xl animate-fade-in text-center sm:text-left">
            <div className="mb-3 sm:mb-4">
              <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4">
                {currentSlideData.subtitle}
              </span>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 sm:mb-6 text-foreground leading-tight">
              {currentSlideData.title}
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-sm sm:max-w-xl mx-auto sm:mx-0 leading-relaxed">
              {currentSlideData.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center sm:justify-start">
              <Button asChild size="lg" className="hover-lift bg-primary hover:bg-primary/90 w-full sm:w-auto">
                <Link href={currentSlideData.ctaLink}>{currentSlideData.cta}</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover-lift border-primary/20 hover:border-primary/40 bg-transparent w-full sm:w-auto"
                asChild
              >
                <Link href="/sobre">Nossa História</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-background/80 hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl hidden sm:block"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-background/80 hover:bg-background transition-all duration-300 shadow-lg hover:shadow-xl hidden sm:block"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl animate-pulse hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse delay-1000 hidden lg:block"></div>
    </section>
  )
}
