import ProcedureCard from "@/components/ProcedureCard";
import ProcedureFooter from "@/components/ProcedureFooter";
import ProcedureHeader from "@/components/ProcedureHeader";

export default function Home() {
  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-5 py-8 sm:px-10 md:min-h-[100dvh]">
      <div className="flex h-full w-full max-w-[760px] flex-1 flex-col">
        <ProcedureHeader
          tag="Sala de espera"
          title="Selecciona el procedimiento"
          description="Responde este cuestionario para personalizar tu atención y confirmar que estás listo para comenzar."
        />

        <section className="mt-10 flex flex-1 flex-col gap-8">
          <ProcedureCard
            label="Procedimiento"
            title="Extracción de biopolímeros"
            description="Inicia el cuestionario de anamnesis y confirmación específica para el procedimiento de extracción."
            image={{
              src: "/procedures/biopolimeros.jpeg",
              alt: "Ilustración extracción de biopolímeros",
              sizes: "(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 420px",
            }}
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
