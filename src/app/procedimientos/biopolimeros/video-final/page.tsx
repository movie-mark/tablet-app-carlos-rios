import { VideoScreen } from "@/components/biopolimeros/VideoScreen"

export default function VideoFinalPage() {
  return (
    <VideoScreen
      videoUrl="https://www.youtube.com/embed/NdcygytQlYQ?si=43EP0Qh6U3Xs9Qu_"
      title="Gracias por tu información"
      description="El doctor te agradece y te orienta sobre los siguientes pasos."
      tag="Finalización"
      nextRoute="/procedimientos/biopolimeros/cierre"
      backRoute="/procedimientos/biopolimeros/seccion/8"
    />
  )
}

