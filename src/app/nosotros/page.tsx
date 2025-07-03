// ✅ Este archivo debe mantenerse como Server Component
import NosotrosPage from '@/features/nosotros/NosotrosPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nosotros | Krea Merchandising',
  description:
    'Conoce la historia, misión y valores de Krea Merchandising. Somos expertos en artículos publicitarios y soluciones creativas para tu marca.',
  alternates: {
    canonical: '/nosotros',
  },
  openGraph: {
    title: 'Nosotros | Krea Merchandising',
    description:
      'Conoce la historia, misión y valores de Krea Merchandising. Expertos en productos promocionales para empresas.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/nosotros`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-nosotros.webp`,
        width: 1200,
        height: 630,
        alt: 'Nosotros Krea Merchandising',
      },
    ],
  },
}

export default function Page() {
  return <NosotrosPage />
}
