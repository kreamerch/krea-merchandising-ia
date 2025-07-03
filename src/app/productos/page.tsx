import CategorySidebar from '@/features/productos/CategorySidebar'
import SidebarDrawer from '@/features/productos/SidebarDrawer'
import ProductosWrapper from '@/features/productos/ProductosWrapper'

// ✅ SEO metadata (solo en Server Component)
export const metadata = {
  title: 'Catálogo de productos | Krea Merch',
  description: 'Explora nuestro catálogo de productos promocionales personalizados. Gorras, lapiceros, polos y más.',
  alternates: { canonical: '/productos' },
  openGraph: {
    title: 'Catálogo de productos | Krea Merch',
    description: 'Productos publicitarios para empresas. Calidad, personalización y variedad.',
    url: 'https://www.kreamerch.com/productos',
    siteName: 'Krea Merch',
    type: 'website',
    images: [
      {
        url: 'https://www.kreamerch.com/og-productos.jpg',
        alt: 'Catálogo de productos promocionales - Krea Merch',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo de productos | Krea Merch',
    description: 'Encuentra gorras, tazas, lapiceros y más con tu marca. Cotiza ahora en Krea Merch.',
    images: ['https://www.kreamerch.com/og-productos.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function ProductosPage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto pb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary my-6">
        Catálogo de productos
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        <aside
          className="hidden lg:block sticky top-24 self-start pr-2 border-r border-border max-h-screen overflow-y-auto"
          aria-label="Filtrar productos por categoría"
        >
          <CategorySidebar />
        </aside>

        <section className="flex flex-col gap-6">
          <SidebarDrawer />
          <ProductosWrapper />
        </section>
      </div>
    </main>
  )
}
