// src/app/layout.tsx
import '@/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

import Topbar from '@/components/layout/Topbar'
import { Header } from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Krea Merchandising | Artículos promocionales personalizados',
  description:
    'Catálogo digital de merchandising publicitario y regalos empresariales personalizados en Perú.',
  authors: [{ name: 'Krea Merchandising' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
        <Providers>
          <Toaster
            position="bottom-right"
            richColors
            closeButton
            expand={true}
          />

          <Topbar />
          <Header />

          {/* ✅ Mejora UX: asegura altura y estructura visible inicial */}
          <main
            id="main-content"
            role="main"
            className="flex-1 min-h-[calc(100vh-200px)] space-y-12"
          >
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  )
}
