"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const escalaOptions = [
  { value: "nada", label: "Nada" },
  { value: "poco", label: "Poco" },
  { value: "moderado", label: "Moderado" },
  { value: "mucho", label: "Mucho" },
]

export default function Seccion6() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion6 || {}

  const handleChange = (field: string, value: string) => {
    updateSection("seccion6", { [field]: value })
  }

  return (
    <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="evitaPlayaGimnasioPiscina">
            ¿Evita ir a playa/gimnasio/piscina?
          </Label>
          <Select
            value={sectionData.evitaPlayaGimnasioPiscina || ""}
            onValueChange={(value) => handleChange("evitaPlayaGimnasioPiscina", value)}
          >
            <SelectTrigger id="evitaPlayaGimnasioPiscina" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {escalaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="afectaVidaSocial">¿Afecta su vida social?</Label>
          <Select
            value={sectionData.afectaVidaSocial || ""}
            onValueChange={(value) => handleChange("afectaVidaSocial", value)}
          >
            <SelectTrigger id="afectaVidaSocial" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {escalaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="afectaVidaSexual">¿Afecta su vida sexual?</Label>
          <Select
            value={sectionData.afectaVidaSexual || ""}
            onValueChange={(value) => handleChange("afectaVidaSexual", value)}
          >
            <SelectTrigger id="afectaVidaSexual" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {escalaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="afectaAutoestima">¿Afecta su autoestima?</Label>
          <Select
            value={sectionData.afectaAutoestima || ""}
            onValueChange={(value) => handleChange("afectaAutoestima", value)}
          >
            <SelectTrigger id="afectaAutoestima" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {escalaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="verguenzaExamenMedico">
            ¿Siente vergüenza de que los médicos la examinen?
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Select
            value={sectionData.verguenzaExamenMedico || ""}
            onValueChange={(value) => handleChange("verguenzaExamenMedico", value)}
          >
            <SelectTrigger id="verguenzaExamenMedico" className="h-12">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {escalaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales6">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales6"
            placeholder="Agrega explicación o contexto..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor6">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor6"
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

