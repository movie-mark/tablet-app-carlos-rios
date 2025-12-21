"use client"

import { useState } from "react"
import { useBiopolimerosForm } from "@/contexts/BiopolimerosFormContext"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { VideoPlayer } from "@/components/ui/video-player"
import { Button } from "@/components/ui/button"

// Dividimos los síntomas en 3 páginas
const sintomasPagina1 = [
  // Síntomas generales
  "Fatiga crónica intensa (no mejora con el descanso)",
  "Sensación persistente de malestar general",
  "Fiebre baja recurrente o sensación febril",
  "Debilidad física marcada",
  "Intolerancia al ejercicio",
  "Sudoración nocturna",
  "Pérdida de peso no intencional",
  // Síntomas neurológicos y cognitivos
  "Niebla mental (dificultad para concentrarse o pensar con claridad)",
  "Pérdida de memoria reciente",
  "Cefaleas frecuentes o migrañas nuevas",
  "Mareos o vértigo",
  "Parestesias (hormigueo, adormecimiento)",
  "Sensación de corriente eléctrica en extremidades",
  "Trastornos del sueño (insomnio o sueño no reparador)",
]

const sintomasPagina2 = [
  // Síntomas musculoesqueléticos
  "Dolor muscular generalizado (mialgias)",
  "Dolor articular (artralgias) sin causa mecánica clara",
  "Rigidez matutina prolongada",
  "Sensación de inflamación articular sin hallazgos radiológicos",
  "Calambres musculares frecuentes",
  // Síntomas inmunológicos / autoinmunes
  "Adenopatías (ganglios inflamados)",
  "Infecciones recurrentes",
  "Exacerbación de enfermedades autoinmunes previas",
  "Aparición de autoanticuerpos (ANA, ENA, etc.)",
  "Hipersensibilidad a medicamentos o alimentos",
  // Síntomas psicológicos y emocionales
  "Ansiedad de nueva aparición",
  "Depresión reactiva o persistente",
  "Irritabilidad",
  "Labilidad emocional",
  "Sensación de despersonalización",
]

const sintomasPagina3 = [
  // Otros síntomas asociados
  "Palpitaciones",
  "Intolerancia al calor o al frío",
  "Alteraciones gastrointestinales (distensión, diarrea, estreñimiento)",
  "Boca seca u ojos secos",
  "Disnea subjetiva",
]

const frecuenciaOptions = [
  { value: "a-veces", label: "A veces" },
  { value: "frecuente", label: "Frecuente" },
  { value: "todo-tiempo", label: "Todo el tiempo" },
]

export default function Seccion5() {
  const [paginaActual, setPaginaActual] = useState(1)
  const { formData, updateSection } = useBiopolimerosForm()
  const sectionData = formData.seccion5 || {}
  const selectedSintomas = sectionData.sintomasSistemicos || []
  const detallesSintomas = sectionData.detallesSintomas || {}

  const totalPaginas = 3
  const sintomasPorPagina = [sintomasPagina1, sintomasPagina2, sintomasPagina3]
  const sintomasActuales = sintomasPorPagina[paginaActual - 1]

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
      {paginaActual === 1 && (
        <VideoPlayer
          url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
          title="Importancia de los síntomas sistémicos"
          description="El doctor explica por qué es importante conocer estos síntomas."
          hideControls={true}
        />
      )}

      <div className="space-y-4 rounded-tablet-lg border border-surface-muted/60 bg-surface p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">
              Selecciona los síntomas sistémicos que has experimentado
              <span className="text-xs text-foreground/50 font-normal ml-2">(Puedes seleccionar varios)</span>
            </Label>
            <span className="text-xs text-foreground/50">
              Página {paginaActual} de {totalPaginas}
            </span>
          </div>
          <div className="space-y-2">
            {sintomasActuales.map((sintoma) => {
              const isSelected = selectedSintomas.includes(sintoma)
              const detalles = detallesSintomas[sintoma] || { frecuencia: "", medicamento: "" }
              
              return (
                <div key={sintoma} className="space-y-2">
                  <div className="flex items-center space-x-3 rounded-md border p-3 hover:bg-surface-muted/30 transition-colors">
                    <Checkbox
                      id={sintoma}
                      checked={isSelected}
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
                  
                  {isSelected && (
                    <div className="ml-6 space-y-2.5 pl-3 border-l-2 border-accent/30">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-foreground/80">
                          Frecuencia del síntoma
                        </Label>
                        <RadioGroup
                          value={detalles.frecuencia || ""}
                          onValueChange={(value) => handleFrecuenciaChange(sintoma, value)}
                          className="flex flex-col space-y-1"
                        >
                          {frecuenciaOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={option.value} id={`${sintoma}-${option.value}`} className="h-3 w-3" />
                              <label
                                htmlFor={`${sintoma}-${option.value}`}
                                className="text-xs font-normal leading-none cursor-pointer"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-1.5">
                        <Label htmlFor={`${sintoma}-medicamento`} className="text-xs text-foreground/80">
                          ¿Toma algún medicamento para este síntoma?
                          <span className="text-xs text-foreground/50 font-normal ml-1">(Opcional)</span>
                        </Label>
                        <Input
                          id={`${sintoma}-medicamento`}
                          type="text"
                          placeholder="Ej: Paracetamol, Ibuprofeno, o escriba 'No'"
                          value={detalles.medicamento || ""}
                          onChange={(e) => handleMedicamentoChange(sintoma, e.target.value)}
                          className="h-9 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Solo mostrar notas y preguntas en la última página */}
        {paginaActual === totalPaginas && (
          <>
            <div className="space-y-2 pt-2 border-t border-surface-muted/40">
              <Label htmlFor="notasAdicionales5" className="text-sm">
                Notas adicionales del paciente
                <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
              </Label>
              <Textarea
                id="notasAdicionales5"
                placeholder="Describe síntomas o historia adicional..."
                value={sectionData.notasAdicionales || ""}
                onChange={(e) => handleChange("notasAdicionales", e.target.value)}
                className="min-h-[100px] text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preguntasDoctor5" className="text-sm">
                Preguntas del paciente para el doctor
                <span className="text-xs text-foreground/50 font-normal ml-2">(Opcional)</span>
              </Label>
              <Textarea
                id="preguntasDoctor5"
                placeholder="Escribe cualquier duda o pregunta que tengas..."
                value={sectionData.preguntasDoctor || ""}
                onChange={(e) => handleChange("preguntasDoctor", e.target.value)}
                className="min-h-[100px] text-sm"
              />
            </div>
          </>
        )}

        {/* Navegación entre páginas */}
        <div className="flex items-center justify-between pt-3 border-t border-surface-muted/40">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPaginaActual(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="h-10 px-4 text-sm"
          >
            Anterior
          </Button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPaginaActual(num)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  paginaActual === num
                    ? "bg-accent"
                    : "bg-surface-muted hover:bg-surface-muted/70"
                }`}
                aria-label={`Ir a página ${num}`}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setPaginaActual(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="h-10 px-4 text-sm"
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}

