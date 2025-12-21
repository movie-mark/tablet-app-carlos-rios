"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const sintomasFisicos = [
  "Cambios en color de piel",
  "Inflamación",
  "Aumento de volumen",
  "Dolor / ardor",
  "Dolor irradiado",
  "Sensación de temperatura elevada",
  "Erupciones cutáneas recurrentes",
  "Urticaria",
  "Prurito crónico",
  "Cambios en la textura o color de la piel",
  "Caída de cabello",
  "Fenómeno de Raynaud (manos frías, pálidas o azuladas)",
]

export default function Seccion3() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion3 || {}
  const selectedSintomas = sectionData.sintomasFisicos || []

  const handleSintomaChange = (sintoma: string, checked: boolean) => {
    const newSintomas = checked
      ? [...selectedSintomas, sintoma]
      : selectedSintomas.filter((s) => s !== sintoma)
    updateSection("seccion3", { sintomasFisicos: newSintomas })
  }

  const handleChange = (field: string, value: string) => {
    updateSection("seccion3", { [field]: value })
  }

  return (
    <div className="space-y-4 rounded-tablet-lg border border-surface-muted/60 bg-surface p-5 animate-fade-up">
      <div className="space-y-4">
        <div className="space-y-2.5">
          <Label className="text-sm">
            Selecciona los síntomas físicos que has experimentado
            <span className="text-xs text-foreground/50 font-normal ml-2">(Puedes seleccionar varios)</span>
          </Label>
          <div className="space-y-1.5">
            {sintomasFisicos.map((sintoma) => (
              <div key={sintoma} className="flex items-center space-x-2.5 rounded-md border p-2.5 hover:bg-surface-muted/30 transition-colors">
                <Checkbox
                  id={sintoma}
                  checked={selectedSintomas.includes(sintoma)}
                  onCheckedChange={(checked) =>
                    handleSintomaChange(sintoma, checked === true)
                  }
                  className="h-4 w-4"
                />
                <label
                  htmlFor={sintoma}
                  className="text-xs font-normal leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {sintoma}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales3" className="text-sm">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales3"
            placeholder="Describe síntomas o detalles adicionales no listados..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[100px] text-sm"
          />
        </div>
      </div>
    </div>
  )
}
