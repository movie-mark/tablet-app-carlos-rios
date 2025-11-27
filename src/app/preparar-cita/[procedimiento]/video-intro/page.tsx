"use client"

import { useParams } from "next/navigation"
import { VideoScreen } from "@/components/biopolimeros/VideoScreen"

export default function VideoIntroPage() {
  const params = useParams()
  const procedimiento = params.procedimiento as string

  return (
    <VideoScreen
      videoUrl="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
      title="Sobre la Extracción de Biopolímeros"
      description="Conoce más sobre el procedimiento y cómo este cuestionario nos ayudará a preparar tu consulta."
      tag="Información"
      nextRoute={`/preparar-cita/${procedimiento}/datos-basicos`}
      backRoute="/preparar-cita/seleccionar-procedimiento"
    />
  )
}

