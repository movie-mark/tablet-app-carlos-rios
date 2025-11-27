"use client"

import { useMemo, useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type VideoPlayerProps = {
  url: string // URL de YouTube o Vimeo
  title?: string
  description?: string
  className?: string
}

type EmbedInfo = {
  provider: "youtube" | "vimeo"
  embedUrl: string
}

function extractEmbedInfo(url: string): EmbedInfo | null {
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
      return {
        provider: "youtube",
        embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`,
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
      return {
        provider: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      }
    }
  }

  return null
}

export function VideoPlayer({ url, title, description, className }: VideoPlayerProps) {
  const [showPlayer, setShowPlayer] = useState(false)
  const embedInfo = useMemo(() => extractEmbedInfo(url), [url])

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

