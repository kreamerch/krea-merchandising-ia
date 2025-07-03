'use client'

import { useWishlistStore } from '@/store/wishlistStore'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  return (
    <section className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Guardados para después</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No has guardado productos.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.uid} className="relative rounded-xl border border-border p-4">
              <Link href={`/productos/${item.slug}`} className="block mb-3">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={item.imagen || '/placeholder.webp'}
                    alt={item.nombre}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mt-2 font-medium text-foreground">{item.nombre}</h3>
                <p className="text-sm text-primary">S/ {item.precio.toFixed(2)}</p>
              </Link>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  removeItem(item.uid)
                  toast('Producto eliminado de guardados', {
                    description: item.nombre,
                    icon: <Trash2 />,
                  })
                }}
                aria-label="Eliminar"
                className="absolute top-2 right-2 rounded-full border border-border bg-white p-1 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
