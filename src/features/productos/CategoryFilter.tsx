'use client'

import { useCategorias } from '@/queries/categorias'
import { useFilterStore } from '@/store/filterStore'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import {
  Star,
  Edit3,
  Coffee,
  Tag as LucideTag,
  Box,
} from 'lucide-react'

// 🔧 Función segura para devolver íconos (NO como objeto ReactNode estático)
function getIcon(slug: string): JSX.Element {
  switch (slug) {
    case 'gorras':
      return <Star className="w-4 h-4" />
    case 'lapiceros':
      return <Edit3 className="w-4 h-4" />
    case 'tazas':
      return <Coffee className="w-4 h-4" />
    case 'ofertas':
      return <LucideTag className="w-4 h-4" />
    case 'otros':
      return <Box className="w-4 h-4" />
    default:
      return <Box className="w-4 h-4" />
  }
}

export default function CategoriaFilter() {
  const { data: categorias, isLoading, isError } = useCategorias()
  const { categoria, setCategoria } = useFilterStore()

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">Cargando categorías...</p>
  }

  if (isError || !categorias) {
    return <p className="text-destructive text-sm">Error al cargar categorías</p>
  }

  const renderButton = (
    label: string,
    slug: string | null,
    isActive: boolean,
    icon: JSX.Element
  ) => (
    <motion.button
      key={slug ?? 'todos'}
      onClick={() => setCategoria(slug)}
      aria-pressed={isActive}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 shrink-0 snap-start',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        isActive
          ? 'bg-primary text-white border-primary'
          : 'bg-background text-foreground border-border hover:bg-primary/10 hover:border-primary/40'
      )}
    >
      {icon}
      {label}
    </motion.button>
  )

  return (
    <div className="py-4 px-1" role="group" aria-label="Filtrar por categoría">
      <div className="flex overflow-x-auto gap-3 md:flex-wrap md:overflow-visible scroll-smooth scroll-px-4 snap-x">
        {renderButton('Todos', null, categoria === null, <Box className="w-4 h-4" />)}
        {categorias.map((cat) =>
          renderButton(
            cat.title,
            cat.slug,
            categoria === cat.slug,
            getIcon(cat.slug)
          )
        )}
      </div>
    </div>
  )
}
