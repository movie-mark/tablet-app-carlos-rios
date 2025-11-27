"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Seccion2() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion2 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion2", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>
            Tiempo entre procedimiento y síntomas
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <RadioGroup
            value={sectionData.tiempoEntreProcedimientoYSintomas || ""}
            onValueChange={(value) => handleChange("tiempoEntreProcedimientoYSintomas", value)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="inmediato" id="inmediato" />
              <label
                htmlFor="inmediato"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Inmediato
              </label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="semanas" id="semanas" />
              <label
                htmlFor="semanas"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Semanas
              </label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="meses" id="meses" />
              <label
                htmlFor="meses"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Meses
              </label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="anos" id="anos" />
              <label
                htmlFor="anos"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Años
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="haceCuantoComenzaron">¿Hace cuánto comenzaron los síntomas?</Label>
          <Input
            id="haceCuantoComenzaron"
            type="text"
            placeholder="Ej: Hace 2 años"
            value={sectionData.haceCuantoComenzaron || ""}
            onChange={(e) => handleChange("haceCuantoComenzaron", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales2">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales2"
            placeholder="Agrega cualquier información adicional..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor2">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor2"
            placeholder="Escribe cualquier duda o pregunta que tengas..."
            value={sectionData.preguntasDoctor || ""}
            onChange={(e) => handleChange("preguntasDoctor", e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  )
}

