'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductosDestacados } from '@/lib/queries'
import { ProductCard } from '@/components/ui/ProductCard'

export function FeaturedProducts() {
  const { data: productos, isLoading, isError } = useQuery({
    queryKey: ['productos', 'destacados'],
    queryFn: getProductosDestacados,
  })

  if (isLoading) return <p className="text-muted">Cargando productos...</p>
  if (isError || !productos) return <p className="text-destructive">Error al cargar productos.</p>

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-6">Productos Destacados</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <ProductCard key={producto._id} {...producto} />
        ))}
      </div>
    </section>
  )
}
