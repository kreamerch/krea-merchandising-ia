import CategoriaFilter from '@/features/productos/CategoryFilter'
import FeaturedProducts from '@/features/productos/FeaturedProducts'
import ProductSearch from '@/features/buscador/ProductSearch'

export const metadata = {
  title: 'Catálogo de productos | Krea Merch',
  description:
    'Explora nuestro catálogo de productos promocionales personalizados. Gorras, lapiceros, polos y más.',
  alternates: {
    canonical: '/productos',
  },
  openGraph: {
    title: 'Catálogo de productos | Krea Merch',
    description:
      'Productos publicitarios para empresas. Calidad, personalización y variedad.',
    url: 'https://www.kreamerch.com/productos',
    siteName: 'Krea Merch',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ProductosPage() {
  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-primary">Catálogo de productos</h1>

      {/* Buscador + Filtro */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <ProductSearch />
        <CategoriaFilter />
      </div>

      {/* Resultados */}
      <FeaturedProducts />
    </main>
  )
}
