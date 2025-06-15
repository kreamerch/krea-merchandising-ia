'use client'

import { useCategorias } from '@/queries/categorias'
import { useFilterStore } from '@/store/filterStore'
import { motion } from 'framer-motion'

export default function CategoriaFilter() {
  const { data: categorias, isLoading } = useCategorias()
  const { categoria, setCategoria } = useFilterStore()

  if (isLoading)
    return <p className="text-muted-foreground">Cargando categorías...</p>

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
      <motion.button
        onClick={() => setCategoria(null)}
        aria-pressed={!categoria}
        whileTap={{ scale: 0.95 }}
        className={`px-3 py-1 rounded-full text-sm font-medium border ${
          !categoria ? 'bg-primary text-white' : 'hover:bg-accent'
        }`}
      >
        Todos
      </motion.button>

      {categorias?.map((cat) => (
        <motion.button
          key={cat.slug}
          onClick={() => setCategoria(cat.slug)}
          aria-pressed={categoria === cat.slug}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1 rounded-full text-sm font-medium border ${
            categoria === cat.slug
              ? 'bg-primary text-white'
              : 'hover:bg-accent'
          }`}
        >
          {cat.title}
        </motion.button>
      ))}
    </div>
  )
}
