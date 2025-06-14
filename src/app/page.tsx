// src/app/page.tsx
import { HeroSection } from '@/components/layout/HeroSection'
import { FeaturedProducts } from '@/features/productos/FeaturedProducts'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  )
}
