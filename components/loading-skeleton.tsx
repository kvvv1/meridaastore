"use client"

interface LoadingSkeletonProps {
  className?: string
  variant?: "text" | "rectangular" | "circular" | "card" | "product"
  width?: string | number
  height?: string | number
  lines?: number
}

export function LoadingSkeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  lines = 1,
}: LoadingSkeletonProps) {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]"

  const getVariantClasses = () => {
    switch (variant) {
      case "text":
        return "h-4 rounded"
      case "circular":
        return "rounded-full"
      case "rectangular":
        return "rounded-lg"
      case "card":
        return "rounded-lg"
      case "product":
        return "rounded-lg"
      default:
        return "rounded"
    }
  }

  const getDefaultSize = () => {
    switch (variant) {
      case "text":
        return { width: "100%", height: "1rem" }
      case "circular":
        return { width: "3rem", height: "3rem" }
      case "card":
        return { width: "100%", height: "12rem" }
      case "product":
        return { width: "100%", height: "16rem" }
      default:
        return { width: "100%", height: "2rem" }
    }
  }

  const defaultSize = getDefaultSize()
  const finalWidth = width || defaultSize.width
  const finalHeight = height || defaultSize.height

  if (variant === "text" && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              width: index === lines - 1 ? "75%" : finalWidth,
              height: finalHeight,
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div className={`${className} space-y-4`}>
        <div className={`${baseClasses} ${getVariantClasses()}`} style={{ width: finalWidth, height: finalHeight }} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 rounded`} style={{ width: "75%" }} />
          <div className={`${baseClasses} h-4 rounded`} style={{ width: "50%" }} />
        </div>
      </div>
    )
  }

  if (variant === "product") {
    return (
      <div className={`${className} space-y-4`}>
        <div className={`${baseClasses} ${getVariantClasses()} aspect-[3/4]`} style={{ width: finalWidth }} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 rounded`} style={{ width: "90%" }} />
          <div className={`${baseClasses} h-4 rounded`} style={{ width: "60%" }} />
          <div className={`${baseClasses} h-6 rounded`} style={{ width: "40%" }} />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
    />
  )
}
