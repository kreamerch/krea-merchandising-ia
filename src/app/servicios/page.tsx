// ✅ app/servicios/page.tsx
import { metadata, viewport } from './metadata'
import ServiciosContent from '@/features/servicios/ServiciosContent'

export { metadata, viewport }
export default function ServiciosPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Nuestros Servicios en Lima, Perú
      </h1>
      <ServiciosContent />
    </main>
  )
}
