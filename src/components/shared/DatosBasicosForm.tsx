"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const datosBasicosSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellido: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  tipoDocumento: z.string().min(1, "Debes seleccionar un tipo de documento"),
  numeroDocumento: z.string().min(3, "El número de documento es requerido"),
  correo: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Debes ingresar un correo electrónico válido. Incluye el símbolo '@' en la dirección."),
  whatsapp: z.string().min(10, "El número de WhatsApp debe tener al menos 10 dígitos"),
})

export type DatosBasicosFormData = z.infer<typeof datosBasicosSchema>

type DatosBasicosFormProps = {
  defaultValues?: Partial<DatosBasicosFormData>
  onSubmit: (data: DatosBasicosFormData) => void
  onCancel?: () => void
  submitLabel?: string
  cancelLabel?: string
  showCancel?: boolean
}

export function DatosBasicosForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Continuar",
  cancelLabel = "Cancelar",
  showCancel = false,
}: DatosBasicosFormProps) {
  const form = useForm<DatosBasicosFormData>({
    resolver: zodResolver(datosBasicosSchema),
    defaultValues: {
      nombre: defaultValues?.nombre || "",
      apellido: defaultValues?.apellido || "",
      tipoDocumento: defaultValues?.tipoDocumento || "",
      numeroDocumento: defaultValues?.numeroDocumento || "",
      correo: defaultValues?.correo || "",
      whatsapp: defaultValues?.whatsapp || "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="space-y-6 rounded-tablet-lg border border-surface-muted/60 bg-surface p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu nombre" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa tu apellido" {...field} className="h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="tipoDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecciona el tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="cedula">Cédula</SelectItem>
                      <SelectItem value="pasaporte">Pasaporte</SelectItem>
                      <SelectItem value="cedula-extranjeria">Cédula de extranjería</SelectItem>
                      <SelectItem value="tarjeta-identidad">Tarjeta de identidad</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numeroDocumento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de documento</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingresa el número"
                      {...field}
                      className="h-12"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="correo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="correo@ejemplo.com"
                    {...field}
                    className="h-12"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+57 300 123 4567"
                    {...field}
                    className="h-12"
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          {showCancel && onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="h-14 text-base"
            >
              {cancelLabel}
            </Button>
          )}
          <Button type="submit" className="h-14 text-base">
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

