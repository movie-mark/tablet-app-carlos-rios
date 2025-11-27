"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import ProcedureCard from "@/components/ProcedureCard"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        <div className="flex justify-center animate-scale-in">
          <Image
            src="/brand/logo-blanco-car.png"
            alt="Logotipo Consultorio Carlos Rios"
            width={100}
            height={100}
            className="pointer-events-none w-[100px] opacity-70"
            priority
          />
        </div>

        <section className="flex flex-1 flex-col gap-6 animate-fade-up">
          <ProcedureCard
            label="Acción"
            title="Prepara tu cita"
            description="Completa el cuestionario para que podamos preparar tu consulta de manera personalizada."
            image={{
              src: "/procedures/biopolimeros.jpeg",
              alt: "Preparar cita",
              sizes: "(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 420px",
            }}
            onClick={() => router.push("/preparar-cita")}
          />

          <ProcedureCard
            label="Información"
            title="Conoce los procedimientos"
            description="Explora información detallada sobre los diferentes procedimientos que ofrecemos."
            image={{
              src: "/procedures/biopolimeros.jpeg",
              alt: "Conocer procedimientos",
              sizes: "(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 420px",
            }}
            onClick={() => router.push("/procedimientos")}
          />
        </section>
      </div>
    </main>
  )
}
