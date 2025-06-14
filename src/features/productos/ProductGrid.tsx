import ProductCard from './ProductCard'

type Product = {
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
}

export function ProductGrid({ productos }: { productos: Product[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos.map((producto) => (
        <ProductCard key={producto.id} {...producto} />
      ))}
    </section>
  )
}
