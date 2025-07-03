'use client'

import Skeleton from '@/components/ui/Skeleton'

type Props = {
  className?: string
}

export default function CategorySidebarSkeleton({ className = '' }: Props) {
  return (
    <nav className={className} aria-label="Cargando categorías">
      {/* Título */}
      <Skeleton className="h-5 w-32 mb-4 ml-3 rounded-md" />

      <ul className="space-y-1 px-1">
        {/* Simulamos 3 categorías principales */}
        {[...Array(3)].map((_, i) => (
          <li key={`cat-${i}`} className="space-y-1">
            {/* Botón de categoría principal */}
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-md" /> {/* Simula "+" o "-" */}
            </div>

            {/* Subcategorías abiertas (simuladas) */}
            <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
              {[...Array(2)].map((_, j) => (
                <li key={`sub-${i}-${j}`}>
                  <Skeleton className="h-3 w-24 rounded-md py-1" />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}
