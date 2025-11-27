"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type FormNavigationProps = {
  currentSection: number
  totalSections: number
  onNext?: () => void
  onPrevious?: () => void
  nextDisabled?: boolean
  previousRoute?: string
  nextRoute?: string
}

export function FormNavigation({
  currentSection,
  totalSections,
  onNext,
  onPrevious,
  nextDisabled = false,
  previousRoute,
  nextRoute,
}: FormNavigationProps) {
  const router = useRouter()

  const handleNext = () => {
    if (onNext) {
      onNext()
    }
    if (nextRoute) {
      router.push(nextRoute)
    }
  }

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious()
    }
    if (previousRoute) {
      router.push(previousRoute)
    }
  }

  const hasPrevious = currentSection > 1
  const hasNext = currentSection < totalSections

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
      {hasPrevious && (
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="h-14 text-base sm:w-auto w-full"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Anterior
        </Button>
      )}
      {hasNext && (
        <Button
          onClick={handleNext}
          disabled={nextDisabled}
          className="h-14 text-base sm:w-auto w-full sm:ml-auto"
        >
          Siguiente
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}
      {!hasNext && (
        <Button
          onClick={handleNext}
          disabled={nextDisabled}
          className="h-14 text-base sm:w-auto w-full sm:ml-auto"
        >
          Continuar
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      )}
    </div>
  )
}

