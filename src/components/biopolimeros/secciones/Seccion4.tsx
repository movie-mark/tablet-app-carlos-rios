"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const frecuenciaOptions = [
  { value: "nunca", label: "Nunca" },
  { value: "a-veces", label: "A veces" },
  { value: "frecuente", label: "Frecuente" },
  { value: "todo-tiempo", label: "Todo el tiempo" },
]

export default function Seccion4() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion4 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion4", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="sentadoMuchoTiempo">¿Puede estar sentado por mucho tiempo?</Label>
          <Select
            value={sectionData.sentadoMuchoTiempo || ""}
            onValueChange={(value) => handleChange("sentadoMuchoTiempo", value)}
          >
            <SelectTrigger id="sentadoMuchoTiempo" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {frecuenciaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dormirBien">¿Puede dormir bien?</Label>
          <Select
            value={sectionData.dormirBien || ""}
            onValueChange={(value) => handleChange("dormirBien", value)}
          >
            <SelectTrigger id="dormirBien" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {frecuenciaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dejarTrabajarEstudiar">
            ¿Ha dejado de trabajar/estudiar por esto?
          </Label>
          <Select
            value={sectionData.dejarTrabajarEstudiar || ""}
            onValueChange={(value) => handleChange("dejarTrabajarEstudiar", value)}
          >
            <SelectTrigger id="dejarTrabajarEstudiar" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {frecuenciaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vecesIncapacitado">
            ¿Cuántas veces ha estado incapacitado/a durante este período?
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="vecesIncapacitado"
            type="text"
            placeholder="Ej: 3 veces, o escriba 'Ninguna'"
            value={sectionData.vecesIncapacitado || ""}
            onChange={(e) => handleChange("vecesIncapacitado", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dolorArticulaciones">
            Dolor en articulaciones
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="dolorArticulaciones"
            type="text"
            placeholder="Ej: Manos, hombros, rodillas"
            value={sectionData.dolorArticulaciones || ""}
            onChange={(e) => handleChange("dolorArticulaciones", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dolorMuscular">
            Dolor muscular
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="dolorMuscular"
            type="text"
            placeholder="Ej: Principalmente en la espalda"
            value={sectionData.dolorMuscular || ""}
            onChange={(e) => handleChange("dolorMuscular", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales4">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales4"
            placeholder="Agrega aclaraciones o ejemplos..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor4">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor4"
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

