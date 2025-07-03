'use client'

import Skeleton from '@/components/ui/Skeleton'

interface ProductDetailSkeletonProps {
  showMiniaturas?: boolean
  small?: boolean
}

export default function ProductDetailSkeleton({
  showMiniaturas = false,
  small = false,
}: ProductDetailSkeletonProps) {
  const size = small ? 48 : 64

  return (
    <div className="container mx-auto px-4 py-10 animate-pulse">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagen principal con miniaturas embebidas */}
        <div className="relative w-full max-w-2xl aspect-square sm:aspect-video overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-sm">
          {/* Miniaturas en la esquina inferior */}
          {showMiniaturas && (
            <div className="absolute bottom-3 left-3 flex gap-2 z-10">
              {[...Array(3)].map((_, i) => (
                <Skeleton
                  key={i}
                  className={`rounded-xl ${small ? 'w-[48px] h-[48px]' : 'w-[64px] h-[64px]'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Detalle del producto */}
        <div className="flex flex-col gap-6">
          {/* Título, precio y categoría */}
          <div className="space-y-2">
            <Skeleton className="h-9 w-3/4 rounded" />
            <Skeleton className="h-6 w-1/4 rounded" />
            <Skeleton className="h-4 w-1/3 rounded" />
          </div>

          {/* Descripción */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Formulario de cotización */}
          <div className="flex flex-col gap-4 rounded-3xl border border-border/20 bg-muted/30 p-6 shadow-sm backdrop-blur-md">
            <div>
              <Skeleton className="h-4 w-1/3 mb-1" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="mt-4">
              <Skeleton className="h-4 w-1/3 mb-1" />
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>

            <div className="mt-4">
              <Skeleton className="h-4 w-1/2 mb-1" />
              <Skeleton className="h-[90px] w-full rounded-md" />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Skeleton className="h-10 w-full sm:w-40 rounded-xl" />
            <Skeleton className="h-10 w-full sm:w-48 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
