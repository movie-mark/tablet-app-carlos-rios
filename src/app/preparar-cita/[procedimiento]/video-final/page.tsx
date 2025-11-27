"use client"

import { useParams } from "next/navigation"
import { VideoScreen } from "@/components/biopolimeros/VideoScreen"

export default function VideoFinalPage() {
  const params = useParams()
  const procedimiento = params.procedimiento as string

  return (
    <VideoScreen
      videoUrl="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
      title="Gracias por tu información"
      description="El doctor te agradece y te orienta sobre los siguientes pasos."
      tag="Finalización"
      nextRoute={`/preparar-cita/${procedimiento}/cierre`}
      backRoute={`/preparar-cita/${procedimiento}/seccion/8`}
    />
  )
}

