"use client"

import { cn } from "@/lib/utils"

type ProgressIndicatorProps = {
  current: number
  total: number
  className?: string
}

export function ProgressIndicator({ current, total, className }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100

  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground/70">Progreso</span>
        <span className="font-medium text-foreground">
          {current} de {total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted/60">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}


