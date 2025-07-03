'use client'

import { useState, useRef, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'
import { ShoppingCart, X, MessageSquareText, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export function MiniCart() {
  const { items, removeItem, getTotalPrice } = useCartStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)

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
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleWhatsApp = () => {
    if (items.length === 0) {
      toast.error('No tienes productos en tu cotización')
      return
    }

    const resumen = items
      .map((item) => {
        const detalles: string[] = []

        detalles.push(`• ${item.nombre}`)
        detalles.push(`  Cantidad: ${item.cantidad}`)
        detalles.push(`  Subtotal: S/ ${(item.precio * item.cantidad).toFixed(2)}`)

        if (item.color) detalles.push(`  Color: ${item.color}`)
        if (item.mensaje) detalles.push(`  Nota: ${item.mensaje}`)

        return detalles.join('\n')
      })
      .join('\n\n')

    const texto = `¡Hola! Me gustaría cotizar los siguientes productos:\n\n${resumen}`
    const url = `https://wa.me/51955876887?text=${encodeURIComponent(texto)}`
    if (typeof window !== 'undefined') window.open(url, '_blank')
  }

  return (
    <div className="relative" ref={ref}>
      {/* ✅ Botón visible siempre */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir cotización"
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white shadow-sm transition hover:shadow-md dark:bg-muted dark:hover:bg-muted/80"
      >
        <ShoppingCart className="h-[18px] w-[18px] text-muted-foreground transition-transform group-hover:scale-105" />
        {items.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-semibold text-white shadow-md cart-badge-pulse">
            {items.length}
          </span>
        )}
      </button>

      {/* ✅ Mostrar popup solo si open y ya montado */}
      <AnimatePresence>
        {open && hasMounted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-border bg-background shadow-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-foreground">Mi Cotización</h2>
              <button onClick={() => setOpen(false)} aria-label="Cerrar cotización">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-muted-foreground text-sm">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-4">
                <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li
                      key={item.uid}
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
                        <p className="font-semibold text-foreground leading-tight">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Cantidad: {item.cantidad} • S/ {item.precio.toFixed(2)}
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.1 }}
                        onClick={() => {
                          removeItem(item.uid)
                          toast('Producto eliminado de tu cotización.', {
                            description: item.nombre,
                            icon: <Trash2 className="text-[#334155]" />,
                            style: {
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              border: '1px solid #cbd5e1',
                            },
                          })
                        }}
                        title="Eliminar"
                        aria-label={`Eliminar ${item.nombre}`}
                        className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full border border-border bg-transparent text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border/50 pt-3">
                  <p className="text-sm flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-semibold text-primary">
                      S/ {getTotalPrice().toFixed(2)}
                    </span>
                  </p>

                  <motion.button
                    onClick={handleWhatsApp}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="mt-3 w-full flex items-center justify-center gap-2 rounded-lg border border-[color:var(--whatsapp)] bg-[color:var(--whatsapp)]/10 px-4 py-2 text-sm font-medium text-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp)]/15 transition-colors"
                  >
                    <MessageSquareText className="w-4 h-4" />
                    Cotizar por WhatsApp
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
