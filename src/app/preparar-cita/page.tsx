"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProcedureHeader from "@/components/ProcedureHeader"
import Image from "next/image"

export default function PrepararCitaPage() {
  const router = useRouter()

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col items-center justify-center gap-8 animate-fade-up">
        <div className="flex justify-center animate-scale-in">
          <Image
            src="/brand/logo-blanco-car.png"
            alt="Logotipo Consultorio Carlos Rios"
            width={120}
            height={120}
            className="pointer-events-none w-[120px] opacity-80"
            priority
          />
        </div>

        <div className="space-y-6 text-center">
          <ProcedureHeader
            tag="Bienvenido"
            title="Estamos aquí para ayudarte"
            description="Este cuestionario nos permitirá conocerte mejor y preparar tu consulta de manera personalizada. Tómate tu tiempo, no hay prisa."
          />

          <div className="mt-8 space-y-4">
            <p className="text-base leading-relaxed text-foreground/80 max-w-[42ch] mx-auto">
              Tu información es confidencial y será utilizada únicamente para brindarte la mejor atención médica.
            </p>
          </div>
        </div>

        <Button
          onClick={() => router.push("/preparar-cita/video-bienvenida")}
          className="h-16 w-full max-w-[400px] text-lg font-semibold rounded-tablet-lg animate-fade-up"
          size="lg"
        >
          Comenzar
        </Button>
      </div>
    </main>
  )
}


