'use client'

import { useProductos } from '@/queries/productos'
import { ProductCard } from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import { useSearchStore } from '@/store/searchStore'
import { useFilterStore } from '@/store/filterStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeaturedProducts() {
  const { data: productos, isLoading, isError } = useProductos()
  const search = useSearchStore((state) => state.search.toLowerCase().trim())
  const categoriaSeleccionada = useFilterStore((state) => state.categoria)

  const productosFiltrados = productos?.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(search)
    const coincideCategoria =
      !categoriaSeleccionada || producto.categoria?.slug === categoriaSeleccionada
    return coincideBusqueda && coincideCategoria
  })

  const formatearCategoria = (slug?: string) =>
    slug ? slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase() : ''

  const titulo = categoriaSeleccionada
    ? `Productos: ${formatearCategoria(categoriaSeleccionada)}`
    : 'Explora nuestros productos destacados'

  if (isLoading) {
    return (
      <section
        aria-label="Cargando productos"
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </section>
    )
  }

  if (isError) {
    return (
      <p role="alert" className="text-destructive text-center py-6">
        Error al cargar productos.
      </p>
    )
  }

  if (!productosFiltrados || productosFiltrados.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-6">
        No se encontraron productos.
      </p>
    )
  }

  return (
    <section aria-label="Productos disponibles" className="py-6">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl font-semibold text-center text-foreground mb-6"
      >
        {titulo}
      </motion.h2>

      <motion.div
        key={`${categoriaSeleccionada}-${search}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence initial={false}>
          {productosFiltrados.map((producto) => (
            <motion.div
              key={producto._id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard
                id={producto._id}
                nombre={producto.title}
                slug={producto.slug}
                precio={producto.precio}
                imagen={producto.imagen}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
