"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Seccion8() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion8 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion8", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loMasImportante" className="text-lg">
            Cuéntanos lo más importante para ti en este momento
          </Label>
          <Textarea
            id="loMasImportante"
            placeholder="Escribe libremente sobre lo que más te preocupa o lo que consideras más relevante..."
            value={sectionData.loMasImportante || ""}
            onChange={(e) => handleChange("loMasImportante", e.target.value)}
            className="min-h-[200px] text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condicionesMedicasPreexistentes">
            Condiciones médicas preexistentes
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="condicionesMedicasPreexistentes"
            placeholder="Ej: Síndrome de intestino irritable (colon irritable), diabetes, hipertensión, etc."
            value={sectionData.condicionesMedicasPreexistentes || ""}
            onChange={(e) => handleChange("condicionesMedicasPreexistentes", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales8">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales8"
            placeholder="Agrega cualquier información adicional..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor8">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor8"
            placeholder="Escribe cualquier duda o pregunta final que tengas..."
            value={sectionData.preguntasDoctor || ""}
            onChange={(e) => handleChange("preguntasDoctor", e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </div>
    </div>
  )
}

