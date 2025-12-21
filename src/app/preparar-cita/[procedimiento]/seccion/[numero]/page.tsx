"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { ProgressIndicator } from "@/components/biopolimeros/ProgressIndicator"
import { FormNavigation } from "@/components/biopolimeros/FormNavigation"
import ProcedureHeader from "@/components/ProcedureHeader"
import Seccion1 from "@/components/biopolimeros/secciones/Seccion1"
import Seccion2 from "@/components/biopolimeros/secciones/Seccion2"
import Seccion3 from "@/components/biopolimeros/secciones/Seccion3"
import Seccion4 from "@/components/biopolimeros/secciones/Seccion4"
import Seccion5 from "@/components/biopolimeros/secciones/Seccion5"
import Seccion6 from "@/components/biopolimeros/secciones/Seccion6"
import Seccion7 from "@/components/biopolimeros/secciones/Seccion7"
import Seccion8 from "@/components/biopolimeros/secciones/Seccion8"

const TOTAL_SECTIONS = 8

export default function SeccionPage() {
  const params = useParams()
  const router = useRouter()
  const procedimiento = params.procedimiento as string
  const numero = parseInt(params.numero as string)

  // Validar que el número de sección sea válido
  useEffect(() => {
    if (isNaN(numero) || numero < 1 || numero > TOTAL_SECTIONS) {
      router.push(`/preparar-cita/${procedimiento}/seccion/1`)
    }
  }, [numero, procedimiento, router])

  if (isNaN(numero) || numero < 1 || numero > TOTAL_SECTIONS) {
    return null
  }

  const getPreviousRoute = () => {
    if (numero === 1) {
      return `/preparar-cita/${procedimiento}/datos-basicos`
    }
    return `/preparar-cita/${procedimiento}/seccion/${numero - 1}`
  }

  const getNextRoute = () => {
    if (numero === TOTAL_SECTIONS) {
      return `/preparar-cita/${procedimiento}/video-final`
    }
    return `/preparar-cita/${procedimiento}/seccion/${numero + 1}`
  }

  const renderSection = () => {
    switch (numero) {
      case 1:
        return <Seccion1 />
      case 2:
        return <Seccion2 />
      case 3:
        return <Seccion3 />
      case 4:
        return <Seccion4 />
      case 5:
        return <Seccion5 />
      case 6:
        return <Seccion6 />
      case 7:
        return <Seccion7 />
      case 8:
        return <Seccion8 />
      default:
        return null
    }
  }

  const getSectionTitle = () => {
    const titles = {
      1: "Procedimiento original",
      2: "Inicio de síntomas",
      3: "Síntomas físicos",
      4: "Limitación funcional",
      5: "Síntomas sistémicos",
      6: "Impacto emocional y social",
      7: "Atención médica previa",
      8: "Pregunta final",
    }
    return titles[numero as keyof typeof titles] || ""
  }

  const getSectionDescription = () => {
    const descriptions = {
      1: "Comparte información sobre el procedimiento original que recibiste.",
      2: "Cuéntanos cuándo comenzaron los síntomas.",
      3: "Describe los síntomas físicos que has experimentado.",
      4: "Indica cómo esto ha afectado tu funcionalidad diaria.",
      5: "Menciona síntomas sistémicos que puedas tener.",
      6: "Comparte cómo esto ha impactado tu vida emocional y social.",
      7: "Cuéntanos sobre consultas médicas previas.",
      8: "Déjanos saber lo más importante para ti en este momento.",
    }
    return descriptions[numero as keyof typeof descriptions] || ""
  }

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        <ProgressIndicator current={numero} total={TOTAL_SECTIONS} className="animate-fade-up" />

        <ProcedureHeader
          tag={`Sección ${numero}`}
          title={getSectionTitle()}
          description={getSectionDescription()}
        />

        <div className="flex-1 space-y-6 pb-8">
          {renderSection()}

          <FormNavigation
            currentSection={numero}
            totalSections={TOTAL_SECTIONS}
            previousRoute={getPreviousRoute()}
            nextRoute={getNextRoute()}
          />
        </div>
      </div>
    </main>
  )
}


