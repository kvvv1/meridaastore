"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Expand, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const imageRef = useRef<HTMLDivElement>(null)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div
          ref={imageRef}
          className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary/20 cursor-zoom-in"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt={`${productName} - Imagem ${currentImage + 1}`}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isZoomed ? "scale-150" : "scale-100"
            }`}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : {}
            }
          />

          {/* Zoom Indicator */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <ZoomIn className="h-3 w-3" />
              Passe o mouse para ampliar
            </div>
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Expand className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="relative">
                <img
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={`${productName} - Imagem ${currentImage + 1}`}
                  className="w-full h-auto"
                />
                {/* Navigation in modal */}
                {images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentImage ? "bg-primary" : "bg-primary/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImage ? "border-primary" : "border-transparent hover:border-primary/50"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
