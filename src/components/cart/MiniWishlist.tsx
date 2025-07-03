'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, HeartOff, ShoppingCart, X } from 'lucide-react'
import { toast } from 'sonner'

export function MiniWishlist() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)

  const hasItems = useMemo(() => items.length > 0, [items])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  const handleAgregarACotizacion = (item: any) => {
    addItem({
      ...item,
      cantidad: 1,
      color: item.color || '',
      mensaje: item.mensaje || '',
    })
    removeItem(item.uid)

    toast.success('Agregado a tu cotización', {
      description: item.nombre,
      icon: <ShoppingCart className="text-primary w-4 h-4" />,
    })
  }

  return (
    <div className="relative" ref={ref}>
      {/* Botón visible siempre */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir guardados"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-sm transition hover:shadow-md dark:bg-muted dark:hover:bg-muted/80"
      >
        <Heart className="h-[18px] w-[18px] text-muted-foreground transition-transform group-hover:scale-105" />
        {hasItems && (
          <span
            style={{ backgroundColor: 'var(--wishlist)' }}
            className="absolute -top-1.5 -right-1.5 z-10 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold text-white shadow"
          >
            {items.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && hasMounted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] rounded-2xl border border-border bg-background shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Guardados</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar guardados">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {!hasItems ? (
              <p className="text-muted-foreground text-sm">No hay productos guardados.</p>
            ) : (
              <ul role="list" className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <li
                    key={item.uid}
                    role="listitem"
                    className="group relative flex items-start gap-3 py-2 border-b border-border/50 last:border-none"
                  >
                    <div className="relative w-14 h-14 rounded-md overflow-hidden border border-border bg-white">
                      <Image
                        src={item.imagen || '/placeholder.png'}
                        alt={item.nombre}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 text-sm pr-6">
                      <p className="font-semibold text-foreground leading-tight line-clamp-2">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        S/ {item.precio.toFixed(2)}
                      </p>
                    </div>

                    <motion.button
                      onClick={() => handleAgregarACotizacion(item)}
                      whileTap={{ scale: 0.95 }}
                      title="Agregar a cotización"
                      aria-label={`Agregar ${item.nombre} a cotización`}
                      className="absolute top-2 right-8 w-7 h-7 rounded-full border border-primary text-primary hover:bg-primary/10 flex items-center justify-center transition"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        removeItem(item.uid)
                        toast('Eliminado de guardados', {
                          description: item.nombre,
                          icon: <HeartOff className="text-destructive w-4 h-4" />,
                        })
                      }}
                      whileTap={{ scale: 0.95 }}
                      title="Eliminar"
                      aria-label={`Quitar ${item.nombre} de guardados`}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full border border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition"
                    >
                      <HeartOff className="w-4 h-4" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
