"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Seccion7() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion7 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion7", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-3">
          <Label>¿Ha consultado médicos?</Label>
          <RadioGroup
            value={sectionData.haConsultadoMedicos || ""}
            onValueChange={(value) => handleChange("haConsultadoMedicos", value)}
            className="flex flex-col space-y-3"
          >
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="si" id="si-consulta" />
              <label
                htmlFor="si-consulta"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Sí
              </label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="no" id="no-consulta" />
              <label
                htmlFor="no-consulta"
                className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                No
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vecesConsultoEPS">
            ¿Cuántas veces ha consultado a su EPS?
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Input
            id="vecesConsultoEPS"
            type="text"
            placeholder="Ej: 5 veces, o escriba 'Ninguna'"
            value={sectionData.vecesConsultoEPS || ""}
            onChange={(e) => handleChange("vecesConsultoEPS", e.target.value)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="leNegaronAtencion">
            ¿Le han negado la atención?
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Select
            value={sectionData.leNegaronAtencion || ""}
            onValueChange={(value) => handleChange("leNegaronAtencion", value)}
          >
            <SelectTrigger id="leNegaronAtencion" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="si">Sí</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="a-veces">A veces</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="queRespuestaTuvo">¿Qué respuesta tuvo?</Label>
          <Textarea
            id="queRespuestaTuvo"
            placeholder="Describe la respuesta que recibiste de los médicos consultados..."
            value={sectionData.queRespuestaTuvo || ""}
            onChange={(e) => handleChange("queRespuestaTuvo", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales7">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales7"
            placeholder="Agrega información complementaria..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor7">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor7"
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

