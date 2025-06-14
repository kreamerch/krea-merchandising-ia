// src/app/layout.tsx
import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import Topbar from '@/components/layout/Topbar'
import { Header } from '@/components/layout/Header'
import { Providers } from '@/components/layout/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Krea Merchandising | Artículos promocionales personalizados',
  description: 'Catálogo digital de merchandising publicitario y regalos empresariales personalizados en Perú.',
  authors: [{ name: 'Krea Merchandising' }],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>
          <Topbar />
          <Header />
          <main className="container mx-auto px-4 py-4">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
