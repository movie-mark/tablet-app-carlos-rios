"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import ProcedureHeader from "@/components/ProcedureHeader"
import { VideoPlayer } from "@/components/ui/video-player"

const formSchema = z.object({
  nombreCompleto: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  fechaNacimiento: z.string().min(1, {
    message: "Por favor ingresa tu fecha de nacimiento.",
  }),
  telefono: z.string().min(10, {
    message: "El teléfono debe tener al menos 10 dígitos.",
  }),
  motivoConsulta: z.string().min(10, {
    message: "Por favor describe el motivo de tu consulta (mínimo 10 caracteres).",
  }),
  antecedentesMedicos: z.string().optional(),
  alergias: z.string().optional(),
  medicamentosActuales: z.string().optional(),
  tieneBiopolimeros: z.enum(["si", "no", "no-se"]),
  ubicacionBiopolimeros: z.string().optional(),
  tiempoTranscurrido: z.string().optional(),
  sintomas: z.array(z.string()).optional(),
  haTenidoComplicaciones: z.boolean(),
  consentimiento: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar el consentimiento informado para continuar.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function BiopolimerosFormPage() {
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreCompleto: "",
      fechaNacimiento: "",
      telefono: "",
      motivoConsulta: "",
      antecedentesMedicos: "",
      alergias: "",
      medicamentosActuales: "",
      tieneBiopolimeros: undefined,
      ubicacionBiopolimeros: "",
      tiempoTranscurrido: "",
      sintomas: [],
      haTenidoComplicaciones: false,
      consentimiento: false,
    },
  })

  function onSubmit(values: FormValues) {
    console.log("Form values:", values)
    // Aquí iría la lógica para enviar los datos
    alert("Formulario enviado correctamente. Valores en consola.")
  }

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="mb-2 -ml-2 h-auto p-2 text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Volver
        </Button>

        <ProcedureHeader
          tag="Anamnesis"
          title="Extracción de biopolímeros"
          description="Completa este cuestionario para que podamos brindarte la mejor atención personalizada."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-8">
            {/* Información básica */}
            <section className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
              <h2 className="text-xl font-semibold text-foreground">
                Información personal
              </h2>

              <VideoPlayer
                url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
                title="¿Por qué necesitamos tu información personal?"
                description="Tu información personal nos ayuda a brindarte una atención más segura y personalizada. Mantenemos la confidencialidad de todos tus datos."
                hideControls={true}
                onVideoEnd={() => {
                  console.log("Video de información personal completado")
                }}
              />

              <FormField
                control={form.control}
                name="nombreCompleto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu nombre completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fechaNacimiento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de nacimiento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono de contacto</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Ej: 300 123 4567"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* Motivo de consulta */}
            <section className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
              <h2 className="text-xl font-semibold text-foreground">
                Motivo de consulta
              </h2>

              <VideoPlayer
                url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
                title="Importancia de describir tu motivo de consulta"
                description="Conocer el motivo de tu consulta nos permite prepararnos mejor y ofrecerte la atención más adecuada desde el primer momento."
                hideControls={true}
                onVideoEnd={() => {
                  console.log("Video de motivo de consulta completado")
                }}
              />

              <FormField
                control={form.control}
                name="motivoConsulta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>¿Cuál es el motivo principal de tu consulta?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe brevemente el motivo de tu consulta..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporciónanos detalles sobre tu situación actual.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Antecedentes médicos */}
            <section className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
              <h2 className="text-xl font-semibold text-foreground">
                Antecedentes médicos
              </h2>

              <VideoPlayer
                url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
                title="¿Por qué es importante conocer tus antecedentes médicos?"
                description="Conocer tus antecedentes médicos, alergias y medicamentos actuales es fundamental para garantizar tu seguridad durante el procedimiento."
                hideControls={true}
                onVideoEnd={() => {
                  console.log("Video de antecedentes médicos completado")
                }}
              />

              <FormField
                control={form.control}
                name="antecedentesMedicos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Antecedentes médicos relevantes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enfermedades previas, cirugías, etc. (opcional)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="alergias"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alergias conocidas</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Penicilina, látex, etc. (opcional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicamentosActuales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicamentos que consumes actualmente</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lista los medicamentos y dosis (opcional)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Información sobre biopolímeros */}
            <section className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 animate-fade-up">
              <h2 className="text-xl font-semibold text-foreground">
                Información sobre biopolímeros
              </h2>

              <VideoPlayer
                url="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
                title="Importancia de conocer tus biopolímeros"
                description="Esta información es crucial para planificar el procedimiento de extracción de manera segura y efectiva. Cada detalle cuenta."
                hideControls={true}
                onVideoEnd={() => {
                  console.log("Video de biopolímeros completado")
                }}
              />

              <FormField
                control={form.control}
                name="tieneBiopolimeros"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>¿Tienes biopolímeros implantados?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="si" id="si" />
                          <label
                            htmlFor="si"
                            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sí
                          </label>
                        </div>
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="no" id="no" />
                          <label
                            htmlFor="no"
                            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            No
                          </label>
                        </div>
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="no-se" id="no-se" />
                          <label
                            htmlFor="no-se"
                            className="text-base font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            No estoy seguro/a
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("tieneBiopolimeros") === "si" && (
                <>
                  <FormField
                    control={form.control}
                    name="ubicacionBiopolimeros"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿En qué zona están ubicados?</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona la zona" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cara">Cara</SelectItem>
                              <SelectItem value="cuello">Cuello</SelectItem>
                              <SelectItem value="pecho">Pecho</SelectItem>
                              <SelectItem value="gluteos">Glúteos</SelectItem>
                              <SelectItem value="piernas">Piernas</SelectItem>
                              <SelectItem value="brazos">Brazos</SelectItem>
                              <SelectItem value="otra">Otra zona</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tiempoTranscurrido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>¿Hace cuánto tiempo fueron implantados?</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tiempo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="menos-1">Menos de 1 año</SelectItem>
                              <SelectItem value="1-3">Entre 1 y 3 años</SelectItem>
                              <SelectItem value="3-5">Entre 3 y 5 años</SelectItem>
                              <SelectItem value="mas-5">Más de 5 años</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="haTenidoComplicaciones"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            ¿Has tenido complicaciones relacionadas con los
                            biopolímeros?
                          </FormLabel>
                          <FormDescription>
                            Inflamación, dolor, migración, infecciones, etc.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </section>

            {/* Consentimiento */}
            <section className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6">
              <FormField
                control={form.control}
                name="consentimiento"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer text-base">
                        Acepto el consentimiento informado
                      </FormLabel>
                      <FormDescription>
                        He leído y comprendo la información sobre el procedimiento
                        de extracción de biopolímeros y acepto continuar.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormMessage />
            </section>

            {/* Botones de acción */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-14 text-base"
              >
                Cancelar
              </Button>
              <Button type="submit" className="h-14 text-base">
                Enviar formulario
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  )
}

