"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
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
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-4">
          <Label>
            Selecciona los síntomas físicos que has experimentado
            <span className="text-xs text-foreground/50 font-normal ml-2">(Puedes seleccionar varios)</span>
          </Label>
          <div className="space-y-3">
            {sintomasFisicos.map((sintoma) => (
              <div key={sintoma} className="flex items-center space-x-3 rounded-md border p-4">
                <Checkbox
                  id={sintoma}
                  checked={selectedSintomas.includes(sintoma)}
                  onCheckedChange={(checked) =>
                    handleSintomaChange(sintoma, checked === true)
                  }
                />
                <label
                  htmlFor={sintoma}
                  className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {sintoma}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="detallesColorPiel">
            Detalles sobre cambios de color en la piel
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="detallesColorPiel"
            type="text"
            placeholder="Ej: Piel oscura y a veces muy roja"
            value={sectionData.detallesColorPiel || ""}
            onChange={(e) => handleChange("detallesColorPiel", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="localizacionEspecifica">
            Localización específica de los síntomas
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="localizacionEspecifica"
            type="text"
            placeholder="Ej: Glúteos y región lumbar"
            value={sectionData.localizacionEspecifica || ""}
            onChange={(e) => handleChange("localizacionEspecifica", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sensacionTemperatura">
            Sensación de temperatura
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="sensacionTemperatura"
            type="text"
            placeholder="Ej: Sensación de calor como plancha caliente"
            value={sectionData.sensacionTemperatura || ""}
            onChange={(e) => handleChange("sensacionTemperatura", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="irradiacionHormigueo">
            Irradiación de hormigueo
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="irradiacionHormigueo"
            type="text"
            placeholder="Ej: Hormigueo que se irradia a las piernas hasta las rodillas"
            value={sectionData.irradiacionHormigueo || ""}
            onChange={(e) => handleChange("irradiacionHormigueo", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calambres">
            Calambres
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="calambres"
            type="text"
            placeholder="Ej: Calambres en toda la pierna"
            value={sectionData.calambres || ""}
            onChange={(e) => handleChange("calambres", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales3">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales3"
            placeholder="Describe síntomas o detalles adicionales no listados..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor3">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor3"
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

