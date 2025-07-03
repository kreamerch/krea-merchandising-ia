'use client'

import { useProductos } from '@/queries/productos'
import { useSearchStore } from '@/store/searchStore'
import { useFilterStore } from '@/store/filterStore'
import { ProductCard } from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

export default function ProductList() {
  const { data: productos, isLoading, isError } = useProductos()
  const search = useSearchStore((state) => state.search.toLowerCase().trim())
  const categoria = useFilterStore((state) => state.categoria)

  const productosFiltrados = productos?.filter((producto) => {
    const coincideBusqueda = producto.title.toLowerCase().includes(search)
    const coincideCategoria = !categoria || producto.categoria?.slug === categoria
    return coincideBusqueda && coincideCategoria
  }) ?? []

  const productosLimitados = productosFiltrados.slice(0, 12)

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </section>
    )
  }

  if (isError) {
    return <p className="text-destructive">Error al cargar productos.</p>
  }

  if (productosLimitados.length === 0) {
    return <p className="text-muted-foreground">No se encontraron productos.</p>
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {productosLimitados.map((producto) => (
        <ProductCard
          key={producto._id}
          id={producto._id}
          nombre={producto.title}
          slug={producto.slug}
          precio={producto.precio}
          imagen={producto.imagen}
          color={producto.color}
          destacado={producto.destacado}
          etiqueta={producto.etiqueta}
        />
      ))}
    </section>
  )
}
