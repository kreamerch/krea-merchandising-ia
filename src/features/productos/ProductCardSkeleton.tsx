'use client'

import Skeleton from '@/components/ui/Skeleton'

export default function ProductCardSkeleton() {
  return (
    <div
      className="flex flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-sm animate-pulse"
      role="status"
      aria-label="Cargando producto"
    >
      {/* Imagen simulada */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-white dark:bg-muted">
        <Skeleton className="absolute inset-0 w-full h-full object-contain p-4" />
      </div>

      {/* Texto simulado */}
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-4/5 rounded-md" />
        <Skeleton className="h-3 w-1/3 rounded-md" />
      </div>

      {/* Botones simulados */}
      <div className="mt-auto pt-4 flex items-center justify-between gap-2">
        <Skeleton className="w-9 h-9 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
    </div>
  )
}
