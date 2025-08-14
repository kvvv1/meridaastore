"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ABTestingService, type ABVariant } from "@/lib/ab-testing"

interface ABTestWrapperProps {
  testId: string
  children: (variant: ABVariant | null) => React.ReactNode
  fallback?: React.ReactNode
}

export function ABTestWrapper({ testId, children, fallback }: ABTestWrapperProps) {
  const [variant, setVariant] = useState<ABVariant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadVariant = async () => {
      try {
        const userVariant = ABTestingService.getVariantForUser(testId)
        setVariant(userVariant)

        // Track view
        if (userVariant) {
          ABTestingService.trackView(testId, userVariant.id)
        }
      } catch (error) {
        console.error("Error loading AB test variant:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadVariant()
  }, [testId])

  if (isLoading) {
    return fallback || null
  }

  return <>{children(variant)}</>
}
