"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Button } from "@/components/ui/button"
import ProcedureHeader from "@/components/ProcedureHeader"
import { sendToMakeWebhook } from "@/lib/api/make-webhook"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

export default function CierrePage() {
  const params = useParams()
  const router = useRouter()
  const procedimiento = params.procedimiento as string
  const { getFormDataForSubmission, clearForm } = useBiopolimerosForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const formData = getFormDataForSubmission(procedimiento)
      const result = await sendToMakeWebhook(formData)

      if (result.success) {
        setSubmitStatus("success")
        clearForm()
        // Redirigir a home después de 3 segundos
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Error desconocido al enviar los datos")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Error desconocido al enviar los datos"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col items-center justify-center gap-8 animate-fade-up">
        <ProcedureHeader
          tag="Finalización"
          title="Gracias por tu información"
          description="Hemos recibido todos tus datos. Esto nos ayudará a preparar tu consulta de manera personalizada."
        />

        {submitStatus === "idle" && (
          <div className="w-full space-y-6">
            <div className="rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 space-y-4">
              <p className="text-base leading-relaxed text-foreground/80">
                Al presionar &ldquo;Finalizar&rdquo;, tus respuestas serán enviadas de forma segura y
                confidencial.
              </p>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-16 w-full text-lg font-semibold rounded-tablet-lg"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Finalizar y Enviar"
              )}
            </Button>
          </div>
        )}

        {submitStatus === "success" && (
          <div className="w-full space-y-6 text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                ¡Información enviada correctamente!
              </h2>
              <p className="text-base text-foreground/70">
                Serás redirigido a la pantalla principal en unos segundos...
              </p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="w-full space-y-6">
            <div className="rounded-tablet-lg border border-destructive/40 bg-destructive/10 p-6 space-y-4">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-destructive" />
                <h3 className="text-lg font-semibold text-destructive">
                  Error al enviar los datos
                </h3>
              </div>
              <p className="text-sm text-destructive/80">{errorMessage}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => router.push(`/preparar-cita/${procedimiento}/seccion/8`)}
                className="h-14 text-base"
              >
                Volver
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="h-14 text-base">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Reintentando...
                  </>
                ) : (
                  "Reintentar"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

