'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { useAnimation, motion } from 'framer-motion'
import { useScroll } from 'framer-motion'
import { MobileMenu } from './MobileMenu'
import { NavLinks } from './NavLinks'
import ProductSearch from '@/features/buscador/ProductSearch'
import { MiniCart } from '@/components/cart/MiniCart'
import { MiniWishlist } from '@/components/cart/MiniWishlist'

export function Header() {
  const controls = useAnimation()
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      if (y > 20) {
        controls.start({ y: 0, opacity: 1 })
      }
    })

    return () => unsubscribe()
  }, [scrollY, controls])

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={controls}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="sticky top-0 z-50 w-full min-h-16 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm transition-all duration-500"
    >
      <div className="container mx-auto px-4 py-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        {/* Logo + Acciones */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <Link
            href="/"
            aria-label="Ir a inicio"
            className="flex items-center gap-2"
          >
            <Image
              src="/logo-krea-merchandising.svg"
              alt="Logo Krea Merch"
              width={140}
              height={40}
              priority
              className="transition-opacity duration-300 hover:opacity-80 dark:invert dark:brightness-95 max-h-10 w-auto h-auto"
            />
            <span className="sr-only">Inicio - Krea Merch</span>
          </Link>

          <div className="flex items-center gap-3 md:hidden ml-auto">
            <MiniWishlist />
            <MiniCart />
            <MobileMenu />
          </div>
        </div>

        {/* Buscador */}
        <div className="w-full md:max-w-lg md:mx-auto">
          <ProductSearch />
        </div>

        {/* Navegación Desktop */}
        <div className="hidden md:flex items-center justify-end gap-6">
          <nav
            role="navigation"
            aria-label="Navegación principal"
            className="flex items-center gap-6 text-sm font-medium"
          >
            <NavLinks />
          </nav>

          <div className="flex items-center gap-3">
            <MiniWishlist />
            <MiniCart />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
