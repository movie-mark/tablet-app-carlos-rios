"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProcedureCard from "@/components/ProcedureCard";
import ProcedureFooter from "@/components/ProcedureFooter";
import ProcedureHeader from "@/components/ProcedureHeader";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
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
          tag="Sala de espera"
          title="Selecciona el procedimiento"
          description="Responde este cuestionario para personalizar tu atención y confirmar que estás listo para comenzar."
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
            onClick={() => router.push("/procedimientos/biopolimeros")}
          />
        </section>

        <ProcedureFooter
          ctaLabel="Consentimientos informados"
          hint="(Disponible próximamente)"
          disabled
        />
      </div>
    </main>
  );
}
