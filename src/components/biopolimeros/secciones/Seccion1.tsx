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

export default function Seccion1() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion1 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion1", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="anosAplicacion">¿Hace cuántos años le aplicaron la sustancia?</Label>
          <Input
            id="anosAplicacion"
            type="text"
            placeholder="Ej: 5 años"
            value={sectionData.anosAplicacion || ""}
            onChange={(e) => handleChange("anosAplicacion", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quienAplico">¿Quién la aplicó?</Label>
          <Select
            value={sectionData.quienAplico || ""}
            onValueChange={(value) => handleChange("quienAplico", value)}
          >
            <SelectTrigger id="quienAplico" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medico">Médico</SelectItem>
              <SelectItem value="esteticista">Esteticista</SelectItem>
              <SelectItem value="otro-profesional">Otro profesional</SelectItem>
              <SelectItem value="no-se">No estoy seguro/a</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombrePersonaAplico">Nombre de la persona que aplicó la sustancia</Label>
          <Input
            id="nombrePersonaAplico"
            type="text"
            placeholder="Ej: Dr. Juan Pérez"
            value={sectionData.nombrePersonaAplico || ""}
            onChange={(e) => handleChange("nombrePersonaAplico", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dondeFue">¿Dónde fue?</Label>
          <Input
            id="dondeFue"
            type="text"
            placeholder="Ej: Ciudad, país"
            value={sectionData.dondeFue || ""}
            onChange={(e) => handleChange("dondeFue", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nombreLugar">¿Recuerda el nombre del lugar?</Label>
          <Input
            id="nombreLugar"
            type="text"
            placeholder="Nombre del consultorio o clínica"
            value={sectionData.nombreLugar || ""}
            onChange={(e) => handleChange("nombreLugar", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sustancia">¿Qué sustancia te dijeron que era?</Label>
          <Input
            id="sustancia"
            type="text"
            placeholder="Ej: Ácido hialurónico, silicona, etc."
            value={sectionData.sustancia || ""}
            onChange={(e) => handleChange("sustancia", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cantidadAplicada">
            ¿Recuerda la cantidad aplicada?
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="cantidadAplicada"
            type="text"
            placeholder="Ej: 10ml, 2cc, o escriba 'No recuerdo'"
            value={sectionData.cantidadAplicada || ""}
            onChange={(e) => handleChange("cantidadAplicada", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sesiones">¿Cuántas sesiones recibió?</Label>
          <Input
            id="sesiones"
            type="text"
            placeholder="Ej: 2 sesiones"
            value={sectionData.sesiones || ""}
            onChange={(e) => handleChange("sesiones", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tratamientosPosteriores">¿Hubo tratamientos posteriores?</Label>
          <Input
            id="tratamientosPosteriores"
            type="text"
            placeholder="Describe cualquier tratamiento adicional"
            value={sectionData.tratamientosPosteriores || ""}
            onChange={(e) => handleChange("tratamientosPosteriores", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales1">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales1"
            placeholder="Agrega cualquier información adicional que consideres importante..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor1">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor1"
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

