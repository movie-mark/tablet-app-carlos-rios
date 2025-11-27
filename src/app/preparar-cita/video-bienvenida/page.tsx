import { VideoScreen } from "@/components/biopolimeros/VideoScreen"

export default function VideoBienvenidaPage() {
  return (
    <VideoScreen
      videoUrl="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
      title="Bienvenida del Doctor"
      description="El doctor te da la bienvenida y explica cómo funcionará este proceso."
      tag="Bienvenida"
      nextRoute="/preparar-cita/seleccionar-procedimiento"
      backRoute="/preparar-cita"
    />
  )
}

