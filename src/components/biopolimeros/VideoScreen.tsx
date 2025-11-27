"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/ui/video-player"
import ProcedureHeader from "@/components/ProcedureHeader"

type VideoScreenProps = {
  videoUrl: string
  title: string
  description: string
  tag?: string
  nextRoute: string
  backRoute?: string
}

export function VideoScreen({
  videoUrl,
  title,
  description,
  tag = "Video",
  nextRoute,
  backRoute,
}: VideoScreenProps) {
  const router = useRouter()
  const [videoEnded, setVideoEnded] = useState(false)

  return (
    <main className="flex min-h-[100vh] w-full flex-col items-center bg-transparent px-4 py-5 sm:px-6 md:min-h-[100dvh]">
      <div className="relative flex h-full w-full max-w-[760px] flex-1 flex-col gap-6 sm:gap-8">
        {backRoute && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backRoute)}
            className="mb-2 -ml-2 h-auto p-2 text-foreground/70 hover:text-foreground self-start"
          >
            ← Volver
          </Button>
        )}

        <ProcedureHeader tag={tag} title={title} description={description} />

        <div className="flex-1 flex flex-col gap-6">
          <VideoPlayer
            url={videoUrl}
            title={title}
            hideControls={true}
            onVideoEnd={() => setVideoEnded(true)}
            className="animate-fade-up"
          />

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => router.push(nextRoute)}
              // TODO: Restaurar disabled cuando termine el video para producción
              // disabled={!videoEnded}
              className="h-14 text-base"
            >
              Continuar
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

