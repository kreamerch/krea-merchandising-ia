'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { MobileMenu } from './MobileMenu'
import ProductSearch from '@/features/buscador/ProductSearch'
import { ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'

export function Header() {
  const totalItems = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.cantidad, 0)
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          Krea Merch
        </Link>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/productos" className="hover:text-primary transition">
            Catálogo
          </Link>
          <Link href="/servicios" className="hover:text-primary transition">
            Servicios
          </Link>
          <Link href="/contacto" className="hover:text-primary transition">
            Contacto
          </Link>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <ProductSearch />

          {/* Carrito */}
          <Link href="/carrito" className="relative">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </motion.div>
          </Link>

          {/* Menú móvil */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
