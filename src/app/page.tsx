// ✅ Archivo: /src/app/page.tsx
import { Metadata } from 'next'

// 🧠 SEO estructurado
import { JsonLdWebsite } from '@/components/seo/JsonLdWebsite'

// 🌟 Secciones de la home desde features/home
import HeroSlider from '@/features/home/HeroSlider'
import HomeIntroCTA from '@/features/home/HomeIntroCTA'
import HomeCategories from '@/features/home/HomeCategories'
import HomeBenefits from '@/features/home/HomeBenefits'
import HomeServices from '@/features/home/HomeServices'
import HomeClients from '@/features/home/HomeClients'
import HomeTestimonials from '@/features/home/HomeTestimonials'
import CallToActionBanner from '@/features/home/CallToActionBanner'
import HomeBlogPreview from '@/features/home/HomeBlogPreview'
import HomeFAQ from '@/features/home/HomeFAQ'

// 🛍️ Productos destacados (ya existente)
import HomeFeaturedProducts from '@/features/productos/HomeFeaturedProducts'

export const metadata: Metadata = {
  title: 'Krea Merch - Artículos Publicitarios Personalizados para Empresas',
  description:
    'Potencia tu marca con artículos de merchandising personalizados. Envíos a todo el Perú. Cotiza rápido y fácil por WhatsApp.',
  openGraph: {
    title: 'Krea Merch',
    description:
      'Catálogo completo de merchandising corporativo: USBs, polos, gorras, lapiceros y más. Atención para empresas.',
    url: 'https://www.kreamerch.com/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.kreamerch.com/',
  },
}

export default function HomePage() {
  return (
    <main className="space-y-20 pb-20">
      {/* JSON-LD SEO */}
      <JsonLdWebsite />

      {/* Hero principal (full width) */}
      <section aria-labelledby="hero-slider">
        <HeroSlider />
      </section>

      {/* Introducción con CTA */}
      <section aria-labelledby="intro-cta" className="container mx-auto px-4">
        <HomeIntroCTA />
      </section>

      {/* Categorías destacadas */}
      <section aria-labelledby="home-categories" className="container mx-auto px-4">
        <HomeCategories />
      </section>

      {/* Productos destacados */}
      <section aria-labelledby="home-featured-products" className="container mx-auto px-4">
        <HomeFeaturedProducts />
      </section>

      {/* Beneficios */}
      <section aria-labelledby="home-benefits" className="container mx-auto px-4">
        <HomeBenefits />
      </section>

      {/* Servicios ofrecidos */}
      <section aria-labelledby="home-services" className="container mx-auto px-4">
        <HomeServices />
      </section>

      {/* Clientes */}
      <section aria-labelledby="home-clients" className="container mx-auto px-4">
        <HomeClients />
      </section>

      {/* Testimonios */}
      <section aria-labelledby="home-testimonials" className="container mx-auto px-4">
        <HomeTestimonials />
      </section>

      {/* Llamado a la acción final */}
      <section aria-labelledby="home-call-to-action" className="container mx-auto px-4">
        <CallToActionBanner />
      </section>

      {/* Blog (opcional para SEO) */}
      <section aria-labelledby="home-blog" className="container mx-auto px-4">
        <HomeBlogPreview />
      </section>

      {/* Preguntas frecuentes */}
      <section aria-labelledby="home-faq" className="container mx-auto px-4">
        <HomeFAQ />
      </section>
    </main>
  )
}
