
'use client'

import { useProductos } from '@/queries/productos'
import {ProductCard} from './ProductCard'
import { useSearchStore } from '@/store/searchStore'
import { useFilterStore } from '@/store/filterStore'

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

  if (isLoading)
    return <p className="text-muted-foreground">Cargando productos...</p>

  if (isError)
    return <p className="text-destructive">Error al cargar productos.</p>

  if (!productosFiltrados || productosFiltrados.length === 0)
    return <p className="text-muted-foreground">No se encontraron productos.</p>

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productosFiltrados.map((producto) => (
        <ProductCard
          key={producto._id}
          id={producto._id}
          nombre={producto.title}
          slug={producto.slug}
          precio={producto.precio}
          imagen={producto.imagen}
        />
      ))}
    </section>
  )
}
