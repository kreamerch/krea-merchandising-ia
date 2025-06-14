'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} aria-label="Abrir menú" className="p-2">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-lg p-6"
          >
            <ul className="space-y-4 text-lg font-medium">
              <li>
                <Link href="/productos" onClick={toggleMenu} className="block hover:text-primary">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/servicios" onClick={toggleMenu} className="block hover:text-primary">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/contacto" onClick={toggleMenu} className="block hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
