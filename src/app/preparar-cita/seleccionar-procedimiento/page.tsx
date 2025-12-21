"use client"

import { useRouter } from "next/navigation"
import ProcedureCard from "@/components/ProcedureCard"
import ProcedureHeader from "@/components/ProcedureHeader"

export default function SeleccionarProcedimientoPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        <ProcedureHeader
          tag="Selección"
          title="Selecciona tu procedimiento"
          description="Elige el procedimiento o motivo de consulta para el cual deseas completar el cuestionario."
        />

        <section className="flex flex-1 flex-col gap-6 animate-fade-up">
          <ProcedureCard
            label="Procedimiento"
            title="Extracción de biopolímeros"
            description="Inicia el cuestionario de anamnesis y confirmación específica para el procedimiento de extracción."
            image={{
              src: "/procedures/biopolimeros.jpeg",
              alt: "Ilustración extracción de biopolímeros",
              sizes: "(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 420px",
            }}
            onClick={() => router.push("/preparar-cita/biopolimeros/video-intro")}
          />
        </section>
      </div>
    </main>
  )
}


