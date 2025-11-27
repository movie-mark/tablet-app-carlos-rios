"use client"

import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { VideoPlayer } from "@/components/ui/video-player"

const sintomasSistemicos = [
  "Fatiga",
  "Insomnio",
  "Dolor muscular",
  "Dolor articular",
  "Boca seca",
  "Ojos secos",
  "Cambios de memoria",
  "Cambios de ánimo",
  "Depresión",
]

const frecuenciaOptions = [
  { value: "a-veces", label: "A veces" },
  { value: "frecuente", label: "Frecuente" },
  { value: "todo-tiempo", label: "Todo el tiempo" },
]

export default function Seccion5() {
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion5 || {}
  const selectedSintomas = sectionData.sintomasSistemicos || []
  const detallesSintomas = sectionData.detallesSintomas || {}

  const handleSintomaChange = (sintoma: string, checked: boolean) => {
    const newSintomas = checked
      ? [...selectedSintomas, sintoma]
      : selectedSintomas.filter((s) => s !== sintoma)
    
    // Si se deselecciona, eliminar sus detalles
    const newDetalles = { ...detallesSintomas }
    if (!checked) {
      delete newDetalles[sintoma]
    } else {
      // Si se selecciona, inicializar con valores vacíos
      if (!newDetalles[sintoma]) {
        newDetalles[sintoma] = { frecuencia: "", medicamento: "" }
      }
    }
    
    updateSection("seccion5", {
      sintomasSistemicos: newSintomas,
      detallesSintomas: newDetalles,
    })
  }

  const handleFrecuenciaChange = (sintoma: string, frecuencia: string) => {
    const newDetalles = {
      ...detallesSintomas,
      [sintoma]: {
        ...detallesSintomas[sintoma],
        frecuencia,
      },
    }
    updateSection("seccion5", { detallesSintomas: newDetalles })
  }

  const handleMedicamentoChange = (sintoma: string, medicamento: string) => {
    const newDetalles = {
      ...detallesSintomas,
      [sintoma]: {
        ...detallesSintomas[sintoma],
        medicamento,
      },
    }
    updateSection("seccion5", { detallesSintomas: newDetalles })
  }

  const handleChange = (field: string, value: string) => {
    updateSection("seccion5", { [field]: value })
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <VideoPlayer
        url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
        title="Importancia de los síntomas sistémicos"
        description="El doctor explica por qué es importante conocer estos síntomas."
        hideControls={true}
      />

      <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6">
        <div className="space-y-4">
          <Label>
            Selecciona los síntomas sistémicos que has experimentado
            <span className="text-xs text-foreground/50 font-normal ml-2">(Puedes seleccionar varios)</span>
          </Label>
          <div className="space-y-3">
            {sintomasSistemicos.map((sintoma) => {
              const isSelected = selectedSintomas.includes(sintoma)
              const detalles = detallesSintomas[sintoma] || { frecuencia: "", medicamento: "" }
              
              return (
                <div key={sintoma} className="space-y-3">
                  <div className="flex items-center space-x-3 rounded-md border p-4">
                    <Checkbox
                      id={sintoma}
                      checked={isSelected}
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
                  
                  {isSelected && (
                    <div className="ml-8 space-y-4 pl-4 border-l-2 border-accent/30">
                      <div className="space-y-2">
                        <Label className="text-sm text-foreground/80">
                          Frecuencia del síntoma
                        </Label>
                        <RadioGroup
                          value={detalles.frecuencia || ""}
                          onValueChange={(value) => handleFrecuenciaChange(sintoma, value)}
                          className="flex flex-col space-y-2"
                        >
                          {frecuenciaOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`${sintoma}-${option.value}`} />
                              <label
                                htmlFor={`${sintoma}-${option.value}`}
                                className="text-sm font-normal leading-none cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`${sintoma}-medicamento`} className="text-sm text-foreground/80">
                          ¿Toma algún medicamento para este síntoma?
                          <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
                        </Label>
                        <Input
                          id={`${sintoma}-medicamento`}
                          type="text"
                          placeholder="Ej: Paracetamol, Ibuprofeno, o escriba 'No'"
                          value={detalles.medicamento || ""}
                          onChange={(e) => handleMedicamentoChange(sintoma, e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notasAdicionales5">
            Notas adicionales del paciente
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="notasAdicionales5"
            placeholder="Describe síntomas o historia adicional..."
            value={sectionData.notasAdicionales || ""}
            onChange={(e) => handleChange("notasAdicionales", e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="preguntasDoctor5">
            Preguntas del paciente para el doctor
            <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
          </Label>
          <Textarea
            id="preguntasDoctor5"
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

