"use client"

import { useParams, useRouter } from "next/navigation"
import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { DatosBasicosForm, type DatosBasicosFormData } from "@/components/shared/DatosBasicosForm"
import ProcedureHeader from "@/components/ProcedureHeader"

export default function DatosBasicosPage() {
  const params = useParams()
  const router = useRouter()
  const procedimiento = params.procedimiento as string
  const { formData, updateDatosBasicos } = useBiopolimerosForm()

  const handleSubmit = (data: DatosBasicosFormData) => {
    updateDatosBasicos(data)
    router.push(`/preparar-cita/${procedimiento}/seccion/1`)
  }

  const handleCancel = () => {
    router.push("/preparar-cita/seleccionar-procedimiento")
  }

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        <ProcedureHeader
          tag="Información personal"
          title="Datos básicos"
          description="Necesitamos algunos datos básicos para poder contactarte y preparar tu consulta de manera personalizada."
        />

        <DatosBasicosForm
          defaultValues={formData.datosBasicos}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          showCancel={true}
          submitLabel="Continuar"
          cancelLabel="Volver"
        />
      </div>
    </main>
  )
}


