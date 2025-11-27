"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type DatosBasicosPaciente = {
  nombre: string
  apellido: string
  tipoDocumento: string
  numeroDocumento: string
  correo: string
  whatsapp: string
}

export type BiopolimerosFormData = {
  // Datos básicos del paciente
  datosBasicos?: DatosBasicosPaciente
  // Sección 1: Procedimiento original
  seccion1?: {
    anosAplicacion?: string
    quienAplico?: string
    nombrePersonaAplico?: string
    dondeFue?: string
    nombreLugar?: string
    sustancia?: string
    cantidadAplicada?: string
    sesiones?: string
    tratamientosPosteriores?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 2: Inicio de síntomas
  seccion2?: {
    tiempoEntreProcedimientoYSintomas?: string
    haceCuantoComenzaron?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 3: Síntomas físicos
  seccion3?: {
    sintomasFisicos?: string[]
    detallesColorPiel?: string
    localizacionEspecifica?: string
    sensacionTemperatura?: string
    irradiacionHormigueo?: string
    calambres?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 4: Limitación funcional
  seccion4?: {
    sentadoMuchoTiempo?: string
    dormirBien?: string
    dejarTrabajarEstudiar?: string
    vecesIncapacitado?: string
    dolorArticulaciones?: string
    dolorMuscular?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 5: Síntomas sistémicos
  seccion5?: {
    sintomasSistemicos?: string[]
    detallesSintomas?: Record<
      string,
      {
        frecuencia?: string
        medicamento?: string
      }
    >
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 6: Impacto emocional y social
  seccion6?: {
    evitaPlayaGimnasioPiscina?: string
    afectaVidaSocial?: string
    afectaVidaSexual?: string
    afectaAutoestima?: string
    verguenzaExamenMedico?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 7: Atención médica previa
  seccion7?: {
    haConsultadoMedicos?: string
    vecesConsultoEPS?: string
    leNegaronAtencion?: string
    queRespuestaTuvo?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
  // Sección 8: Pregunta final
  seccion8?: {
    loMasImportante?: string
    condicionesMedicasPreexistentes?: string
    notasAdicionales?: string
    preguntasDoctor?: string
  }
}

type BiopolimerosFormContextType = {
  formData: BiopolimerosFormData
  updateSection: (section: keyof BiopolimerosFormData, data: Record<string, unknown>) => void
  clearForm: () => void
  updateDatosBasicos: (datos: DatosBasicosPaciente) => void
  getFormDataForSubmission: (procedimientoNombre?: string) => {
    informacionGeneral: {
      procedimiento: string
      fechaEnvio: string
      fechaEnvioFormateada: string
    }
    datosBasicosPaciente: {
      nombre: string
      apellido: string
      tipoDocumento: string
      numeroDocumento: string
      correoElectronico: string
      numeroWhatsApp: string
    } | null
    procedimientoOriginal: Record<string, string | undefined> | null
    inicioSintomas: Record<string, string | undefined> | null
    sintomasFisicos: Record<string, string | string[] | undefined> | null
    limitacionFuncional: Record<string, string | undefined> | null
    sintomasSistemicos: Record<string, unknown> | null
    impactoEmocionalSocial: Record<string, string | undefined> | null
    atencionMedicaPrevia: Record<string, string | undefined> | null
    informacionFinal: Record<string, string | undefined> | null
  }
}

const BiopolimerosFormContext = createContext<BiopolimerosFormContextType | undefined>(
  undefined
)

const STORAGE_KEY = "preparar-cita-form-data"

export function BiopolimerosFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<BiopolimerosFormData>({})

  // Cargar datos del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (error) {
        console.error("Error loading form data:", error)
      }
    }
  }, [])

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const updateSection = (section: keyof BiopolimerosFormData, data: Record<string, unknown>) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const updateDatosBasicos = (datos: DatosBasicosPaciente) => {
    setFormData((prev) => ({
      ...prev,
      datosBasicos: datos,
    }))
  }

  const clearForm = () => {
    setFormData({})
    localStorage.removeItem(STORAGE_KEY)
  }

  const getFormDataForSubmission = (procedimientoNombre?: string) => {
    // Mapeo de slugs a nombres formales
    const procedimientoMap: Record<string, string> = {
      biopolimeros: "Extracción de Biopolímeros",
      // Agregar más procedimientos aquí cuando se implementen
    }

    const procedimiento = procedimientoNombre
      ? procedimientoMap[procedimientoNombre] || procedimientoNombre
      : "Procedimiento"

    // Transformar los datos a un JSON bien estructurado con nombres descriptivos
    const datosTransformados = {
      // Información del procedimiento y fecha
      informacionGeneral: {
        procedimiento,
        fechaEnvio: new Date().toISOString(),
        fechaEnvioFormateada: new Date().toLocaleString("es-CO", {
          dateStyle: "long",
          timeStyle: "short",
        }),
      },

      // Datos básicos del paciente
      datosBasicosPaciente: formData.datosBasicos
        ? {
            nombre: formData.datosBasicos.nombre,
            apellido: formData.datosBasicos.apellido,
            tipoDocumento: formData.datosBasicos.tipoDocumento,
            numeroDocumento: formData.datosBasicos.numeroDocumento,
            correoElectronico: formData.datosBasicos.correo,
            numeroWhatsApp: formData.datosBasicos.whatsapp,
          }
        : null,

      // Sección 1: Procedimiento original
      procedimientoOriginal: formData.seccion1
        ? {
            anosDesdeAplicacion: formData.seccion1.anosAplicacion,
            quienAplico: formData.seccion1.quienAplico,
            nombrePersonaAplico: formData.seccion1.nombrePersonaAplico,
            dondeFue: formData.seccion1.dondeFue,
            nombreLugar: formData.seccion1.nombreLugar,
            sustanciaAplicada: formData.seccion1.sustancia,
            cantidadAplicada: formData.seccion1.cantidadAplicada,
            numeroSesiones: formData.seccion1.sesiones,
            tratamientosPosteriores: formData.seccion1.tratamientosPosteriores,
            notasAdicionales: formData.seccion1.notasAdicionales,
            preguntasParaDoctor: formData.seccion1.preguntasDoctor,
          }
        : null,

      // Sección 2: Inicio de síntomas
      inicioSintomas: formData.seccion2
        ? {
            tiempoEntreProcedimientoYSintomas: formData.seccion2.tiempoEntreProcedimientoYSintomas,
            haceCuantoComenzaron: formData.seccion2.haceCuantoComenzaron,
            notasAdicionales: formData.seccion2.notasAdicionales,
            preguntasParaDoctor: formData.seccion2.preguntasDoctor,
          }
        : null,

      // Sección 3: Síntomas físicos
      sintomasFisicos: formData.seccion3
        ? {
            sintomasSeleccionados: formData.seccion3.sintomasFisicos || [],
            detallesColorPiel: formData.seccion3.detallesColorPiel,
            localizacionEspecifica: formData.seccion3.localizacionEspecifica,
            sensacionTemperatura: formData.seccion3.sensacionTemperatura,
            irradiacionHormigueo: formData.seccion3.irradiacionHormigueo,
            calambres: formData.seccion3.calambres,
            notasAdicionales: formData.seccion3.notasAdicionales,
            preguntasParaDoctor: formData.seccion3.preguntasDoctor,
          }
        : null,

      // Sección 4: Limitación funcional
      limitacionFuncional: formData.seccion4
        ? {
            puedeEstarSentadoMuchoTiempo: formData.seccion4.sentadoMuchoTiempo,
            puedeDormirBien: formData.seccion4.dormirBien,
            haDejadoTrabajarEstudiar: formData.seccion4.dejarTrabajarEstudiar,
            vecesIncapacitado: formData.seccion4.vecesIncapacitado,
            dolorArticulaciones: formData.seccion4.dolorArticulaciones,
            dolorMuscular: formData.seccion4.dolorMuscular,
            notasAdicionales: formData.seccion4.notasAdicionales,
            preguntasParaDoctor: formData.seccion4.preguntasDoctor,
          }
        : null,

      // Sección 5: Síntomas sistémicos
      sintomasSistemicos: formData.seccion5
        ? {
            sintomasSeleccionados: formData.seccion5.sintomasSistemicos || [],
            detallesPorSintoma: formData.seccion5.detallesSintomas
              ? Object.entries(formData.seccion5.detallesSintomas).map(([sintoma, detalles]) => ({
                  sintoma,
                  frecuencia: detalles.frecuencia,
                  medicamento: detalles.medicamento,
                }))
              : [],
            notasAdicionales: formData.seccion5.notasAdicionales,
            preguntasParaDoctor: formData.seccion5.preguntasDoctor,
          }
        : null,

      // Sección 6: Impacto emocional y social
      impactoEmocionalSocial: formData.seccion6
        ? {
            evitaPlayaGimnasioPiscina: formData.seccion6.evitaPlayaGimnasioPiscina,
            afectaVidaSocial: formData.seccion6.afectaVidaSocial,
            afectaVidaSexual: formData.seccion6.afectaVidaSexual,
            afectaAutoestima: formData.seccion6.afectaAutoestima,
            verguenzaExamenMedico: formData.seccion6.verguenzaExamenMedico,
            notasAdicionales: formData.seccion6.notasAdicionales,
            preguntasParaDoctor: formData.seccion6.preguntasDoctor,
          }
        : null,

      // Sección 7: Atención médica previa
      atencionMedicaPrevia: formData.seccion7
        ? {
            haConsultadoMedicos: formData.seccion7.haConsultadoMedicos,
            vecesConsultoEPS: formData.seccion7.vecesConsultoEPS,
            leNegaronAtencion: formData.seccion7.leNegaronAtencion,
            queRespuestaTuvo: formData.seccion7.queRespuestaTuvo,
            notasAdicionales: formData.seccion7.notasAdicionales,
            preguntasParaDoctor: formData.seccion7.preguntasDoctor,
          }
        : null,

      // Sección 8: Pregunta final
      informacionFinal: formData.seccion8
        ? {
            loMasImportante: formData.seccion8.loMasImportante,
            condicionesMedicasPreexistentes: formData.seccion8.condicionesMedicasPreexistentes,
            notasAdicionales: formData.seccion8.notasAdicionales,
            preguntasParaDoctor: formData.seccion8.preguntasDoctor,
          }
        : null,
    }

    return datosTransformados
  }

  return (
    <BiopolimerosFormContext.Provider
      value={{ formData, updateSection, updateDatosBasicos, clearForm, getFormDataForSubmission }}
    >
      {children}
    </BiopolimerosFormContext.Provider>
  )
}

export function useBiopolimerosForm() {
  const context = useContext(BiopolimerosFormContext)
  if (context === undefined) {
    throw new Error("useBiopolimerosForm must be used within BiopolimerosFormProvider")
  }
  return context
}

