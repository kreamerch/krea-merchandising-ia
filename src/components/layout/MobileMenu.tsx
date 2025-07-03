'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavLinks } from './NavLinks'

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => setHasMounted(true), [])

  useEffect(() => {
    if (!hasMounted) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, hasMounted])

  if (!hasMounted) return null

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:text-primary transition"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-[52px] right-2 w-[180px] z-50 rounded-xl border border-border
              bg-gradient-to-br from-white/80 to-white/90 dark:from-neutral-900/90 dark:to-neutral-800/90
              backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            role="menu"
            aria-label="Navegación móvil"
          >
            <ul className="flex flex-col py-2 px-2 gap-1">
              <NavLinks onClick={() => setOpen(false)} />
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}
