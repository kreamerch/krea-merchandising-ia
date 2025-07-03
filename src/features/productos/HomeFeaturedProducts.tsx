import { getProductosDestacados } from '@/queries/productos'
import { Suspense } from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'
import { ProductosDestacadosSlider } from './ProductosDestacadosSlider'

export default async function ProductosDestacadosInicio() {
  const productos = await getProductosDestacados()

  return (
    <section aria-label="Productos destacados" className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">
        Productos destacados
      </h2>

      <Suspense
        fallback={
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductosDestacadosSlider productos={productos} />
      </Suspense>
    </section>
  )
}
