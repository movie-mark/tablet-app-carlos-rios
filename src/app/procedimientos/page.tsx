"use client"

import Image from "next/image"
import ProcedureHeader from "@/components/ProcedureHeader"

export default function ProcedimientosPage() {
  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col items-center justify-center gap-8 animate-fade-up">
        <div className="flex justify-center animate-scale-in">
          <Image
            src="/brand/logo-blanco-car.png"
            alt="Logotipo Consultorio Carlos Rios"
            width={76}
            height={76}
            className="pointer-events-none w-[76px] opacity-70"
            priority
          />
        </div>

        <ProcedureHeader
          tag="Información"
          title="Conoce los procedimientos"
          description="Esta sección estará disponible próximamente. Aquí podrás explorar información detallada sobre todos nuestros procedimientos."
        />
      </div>
    </main>
  )
}


