import { ProductCard } from './ProductCard'

type Product = {
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
  color?: string
  mensaje?: string
  destacado?: boolean
  etiqueta?: 'nuevo' | 'oferta' | null
}

export function ProductGrid({ productos }: { productos: Product[] }) {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 py-6 max-w-screen-xl mx-auto"
      aria-label="Lista de productos"
    >
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          id={producto.id}
          nombre={producto.nombre}
          slug={producto.slug}
          precio={producto.precio}
          imagen={producto.imagen}
          color={producto.color ?? ''}
          mensaje={producto.mensaje ?? ''}
          destacado={producto.destacado ?? false}
          etiqueta={producto.etiqueta ?? null}
        />
      ))}
    </section>
  )
}
