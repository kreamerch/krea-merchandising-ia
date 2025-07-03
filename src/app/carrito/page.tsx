'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import Skeleton from '@/components/ui/Skeleton'
import { toast } from 'sonner'
import Image from 'next/image'
import Link from 'next/link'
import { MessageSquareText, X, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CarritoPage() {
  const { items, removeItem, getTotalPrice } = useCartStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [])

  const handleEnviarWhatsApp = () => {
    if (items.length === 0) {
      toast.error('No tienes productos en tu cotización', {
        icon: <XCircle className="w-5 h-5 text-destructive" />,
      })
      return
    }

    const resumen = items
      .map(
        (item) =>
          `• ${item.nombre} x${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`
      )
      .join('\n')

    const total = getTotalPrice().toFixed(2)
    const texto = `¡Hola! Me gustaría cotizar los siguientes productos:\n\n${resumen}\n\nTotal: S/ ${total}`
    const url = `https://wa.me/51955876887?text=${encodeURIComponent(texto)}`

    toast.info('Redirigiendo a WhatsApp...', {
      icon: <MessageSquareText className="w-5 h-5 text-accent" />,
    })

    window.open(url, '_blank')
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
        Tu cotización
      </h1>

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <li
              key={i}
              className="flex gap-4 items-center bg-muted/10 p-4 rounded-lg"
            >
              <Skeleton className="w-20 h-20" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm space-y-2">
          <p>Tu carrito está vacío.</p>
          <Link
            href="/productos"
            className="inline-block underline text-primary hover:text-accent transition-colors"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <>
          <ul className="rounded-xl divide-y divide-border overflow-hidden shadow-sm">
            <AnimatePresence>
              {items.map((item) => (
                <motion.li
                  key={item.uid}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 bg-muted/10 px-4 py-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm border border-border">
                    <Image
                      src={item.imagen || '/placeholder.png'}
                      alt={`Imagen de ${item.nombre}`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1 text-sm space-y-1">
                    <h2 className="text-base font-semibold text-foreground">
                      {item.nombre}
                    </h2>
                    <div className="text-muted-foreground space-y-0.5">
                      {item.color && <p>🎨 Color: {item.color}</p>}
                      {item.mensaje && <p>📝 Nota: {item.mensaje}</p>}
                      <p>{item.cantidad} x S/ {item.precio.toFixed(2)}</p>
                      <p className="text-foreground font-medium">
                        Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeItem(item.uid)
                      toast.warning('Producto eliminado del carrito', {
                        description: item.nombre,
                        icon: <X className="w-5 h-5 text-destructive" />,
                      })
                    }}
                    className="w-10 h-10 flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-full transition"
                    aria-label={`Eliminar ${item.nombre}`}
                    title={`Eliminar ${item.nombre}`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <section className="mt-8 border-t pt-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-muted-foreground font-medium">Total:</span>
              <span className="text-primary font-bold text-xl">
                S/ {getTotalPrice().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end">
              <motion.button
                onClick={handleEnviarWhatsApp}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20 dark:border-primary/40 dark:bg-primary/10 dark:hover:bg-primary/20"
              >
                <MessageSquareText className="w-4 h-4" />
                Enviar cotización por WhatsApp
              </motion.button>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
