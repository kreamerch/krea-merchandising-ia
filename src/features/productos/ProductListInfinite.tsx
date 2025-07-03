'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useProductosInfinite } from '@/queries/productos'
import { ProductCard } from '@/features/productos/ProductCard'
import ProductCardSkeleton from '@/features/productos/ProductCardSkeleton'
import { Button } from '@/components/ui/Button'
import { useFilterStore } from '@/store/filterStore'

export default function ProductListInfinite() {
  // ✅ Estado local para filtros (evita errores con SSR + Zustand persist)
  const [categoria, setCategoria] = useState<string | null>(null)
  const [subcategoria, setSubcategoria] = useState<string | null>(null)

  // ✅ Cargar filtros al montar
  useEffect(() => {
    const store = useFilterStore.getState()
    setCategoria(store.categoria || null)
    setSubcategoria(store.subcategoria || null)
  }, [])

  // ✅ Subscripción reactiva (para que cambie si el usuario filtra desde el sidebar)
  useEffect(() => {
    const unsub = useFilterStore.subscribe((state) => {
      setCategoria(state.categoria || null)
      setSubcategoria(state.subcategoria || null)
    })
    return unsub
  }, [])

  // ✅ Hook de productos con paginación infinita
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useProductosInfinite(categoria, subcategoria)

  // ✅ Scroll infinito cuando el botón entra en vista
  const { ref, inView } = useInView({ threshold: 0.3 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const productos = data?.pages.flat() ?? []

  // ✅ Skeleton mientras carga la primera vez
  if (isLoading) {
    return (
      <section
        aria-busy="true"
        aria-label="Cargando productos..."
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </section>
    )
  }

  // ⛔️ Error al cargar productos
  if (isError) {
    return (
      <div role="alert" className="text-center text-destructive font-medium">
        Ocurrió un error al cargar productos: {error.message}
      </div>
    )
  }

  // ✅ Render final con paginación
  return (
    <>
      <section
        aria-label="Lista de productos"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {productos.map((producto) => (
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

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <Button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            aria-label="Cargar más productos"
          >
            {isFetchingNextPage ? 'Cargando más...' : 'Cargar más'}
          </Button>
        </div>
      )}
    </>
  )
}
