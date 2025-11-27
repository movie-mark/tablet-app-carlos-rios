"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Player from "@vimeo/player"

// Tipos para YouTube IFrame API
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          videoId: string
          events: {
            onStateChange: (event: { data: number }) => void
            onReady?: (event: { target: unknown }) => void
            onError?: (event: { data: number }) => void
          }
          playerVars?: {
            autoplay?: number
            controls?: number
            modestbranding?: number
            rel?: number
            enablejsapi?: number
          }
        }
      ) => void
      PlayerState: {
        ENDED: number
        PLAYING: number
        PAUSED: number
        BUFFERING: number
        CUED: number
      }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

type VideoPlayerProps = {
  url: string // URL de YouTube o Vimeo
  title?: string
  description?: string
  className?: string
  hideControls?: boolean // Ocultar controles del reproductor
  onVideoEnd?: () => void // Callback cuando el video termina
}

type EmbedInfo = {
  provider: "youtube" | "vimeo"
  videoId: string
  embedUrl: string
}

function extractEmbedInfo(url: string, hideControls: boolean): EmbedInfo | null {
  const trimmedUrl = url.trim()

  const youtubePatterns = [
    /youtu\.be\/([^?&#]+)/,
    /youtube\.com\/watch\?v=([^?&#]+)/,
    /youtube\.com\/embed\/([^?&#]+)/,
  ]
  for (const pattern of youtubePatterns) {
    const match = trimmedUrl.match(pattern)
    if (match?.[1]) {
      const videoId = match[1]
      const controlsParam = hideControls ? "&controls=0" : ""
      return {
        provider: "youtube",
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1&enablejsapi=1${controlsParam}`,
      }
    }
  }

  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/video\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ]
  for (const pattern of vimeoPatterns) {
    const match = trimmedUrl.match(pattern)
    if (match?.[1]) {
      const videoId = match[1]
      const controlsParam = hideControls ? "&controls=0" : ""
      return {
        provider: "vimeo",
        videoId,
        embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1${controlsParam}`,
      }
    }
  }

  return null
}

export function VideoPlayer({
  url,
  title,
  description,
  className,
  hideControls = false,
  onVideoEnd,
}: VideoPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  const [youtubeApiReady, setYoutubeApiReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const vimeoPlayerRef = useRef<Player | null>(null)
  const youtubePlayerRef = useRef<unknown>(null)
  const playerIdRef = useRef(`video-player-${Math.random().toString(36).substr(2, 9)}`)

  const embedInfo = useMemo(
    () => extractEmbedInfo(url, hideControls),
    [url, hideControls]
  )

  // Cargar YouTube IFrame API
  useEffect(() => {
    if (!showPlayer || !embedInfo || embedInfo.provider !== "youtube") return

    // Si ya está cargada, marcar como lista
    if (window.YT?.Player) {
      setYoutubeApiReady(true)
      return
    }

    // Cargar el script de YouTube IFrame API
    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    script.async = true

    window.onYouTubeIframeAPIReady = () => {
      setYoutubeApiReady(true)
    }

    document.body.appendChild(script)

    return () => {
      // Limpiar
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [showPlayer, embedInfo])

  // Inicializar YouTube Player cuando la API esté lista
  useEffect(() => {
    if (
      !showPlayer ||
      !embedInfo ||
      embedInfo.provider !== "youtube" ||
      !youtubeApiReady ||
      !iframeRef.current ||
      youtubePlayerRef.current
    )
      return

    try {
      youtubePlayerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: embedInfo.videoId,
        events: {
          onReady: () => {
            console.log("YouTube player ready")
          },
          onStateChange: (event) => {
            // YT.PlayerState.ENDED = 0
            if (event.data === 0 && onVideoEnd) {
              onVideoEnd()
            }
          },
          onError: (event) => {
            console.error("YouTube player error:", event)
          },
        },
        playerVars: {
          autoplay: 1,
          controls: hideControls ? 0 : 1,
          modestbranding: 1,
          rel: 0,
          enablejsapi: 1,
        },
      })
    } catch (error) {
      console.error("Error initializing YouTube player:", error)
    }

    return () => {
      if (youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.destroy()
        } catch (error) {
          console.error("Error destroying YouTube player:", error)
        }
        youtubePlayerRef.current = null
      }
    }
  }, [showPlayer, embedInfo, youtubeApiReady, hideControls, onVideoEnd])

  // Inicializar Vimeo Player
  useEffect(() => {
    if (
      !showPlayer ||
      !embedInfo ||
      embedInfo.provider !== "vimeo" ||
      !iframeRef.current ||
      vimeoPlayerRef.current
    )
      return

    try {
      vimeoPlayerRef.current = new Player(iframeRef.current, {
        id: parseInt(embedInfo.videoId),
        autoplay: true,
        controls: !hideControls,
      })

      vimeoPlayerRef.current.on("ended", () => {
        if (onVideoEnd) {
          onVideoEnd()
        }
      })

      vimeoPlayerRef.current.on("error", (error) => {
        console.error("Vimeo player error:", error)
      })
    } catch (error) {
      console.error("Error initializing Vimeo player:", error)
    }

    return () => {
      if (vimeoPlayerRef.current) {
        try {
          vimeoPlayerRef.current.destroy()
        } catch (error) {
          console.error("Error destroying Vimeo player:", error)
        }
        vimeoPlayerRef.current = null
      }
    }
  }, [showPlayer, embedInfo, hideControls, onVideoEnd])

  // Limpiar al cerrar el player
  useEffect(() => {
    if (!showPlayer) {
      if (youtubePlayerRef.current) {
        try {
          youtubePlayerRef.current.destroy()
        } catch (error) {
          console.error("Error destroying YouTube player:", error)
        }
        youtubePlayerRef.current = null
      }
      if (vimeoPlayerRef.current) {
        try {
          vimeoPlayerRef.current.destroy()
        } catch (error) {
          console.error("Error destroying Vimeo player:", error)
        }
        vimeoPlayerRef.current = null
      }
    }
  }, [showPlayer])

  if (!showPlayer) {
    return (
      <div
        className={cn(
          "group relative overflow-hidden rounded-tablet-lg border border-surface-muted/60 bg-surface p-6 transition-all duration-300 hover:border-accent/40 animate-fade-up",
          className
        )}
      >
        <div className="flex items-start gap-4">
          <button
            onClick={() => setShowPlayer(true)}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent transition-all duration-300 hover:scale-110 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Reproducir video"
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
          <div className="flex-1 space-y-2">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm leading-relaxed text-foreground/70">
                {description}
              </p>
            )}
            <p className="text-xs text-accent/80">Haz clic para ver el video</p>
          </div>
        </div>
      </div>
    )
  }

  if (!embedInfo) {
    return (
      <div
        className={cn(
          "rounded-tablet-lg border border-destructive/40 bg-destructive/10 p-4 text-destructive animate-fade-up",
          className
        )}
      >
        <p className="text-sm font-medium">
          No pudimos cargar el video. Verifica la URL proporcionada.
        </p>
        <p className="text-xs text-destructive/80">
          Formatos admitidos: YouTube (watch/embed/youtu.be) y Vimeo.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-3"
          onClick={() => setShowPlayer(false)}
        >
          Intentar de nuevo
        </Button>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-tablet-lg border border-surface-muted/60 bg-surface p-4 animate-fade-up",
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        {title && (
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowPlayer(false)}
          className="h-8 w-8"
          aria-label="Cerrar video"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          ref={iframeRef}
          id={playerIdRef.current}
          src={embedInfo.embedUrl}
          title={title ?? "Video informativo"}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {description && (
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          {description}
        </p>
      )}
    </div>
  )
}
