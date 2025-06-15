'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/Button'

type ProductCardProps = {
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
}

export function ProductCard({
  id,
  nombre,
  slug,
  precio,
  imagen,
}: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-background shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition-shadow"
    >
      <Link href={`/productos/${slug}`}>
        <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl">
          <Image
  src={imagen || '/placeholder.webp'}
  alt={`Imagen del producto: ${nombre}`}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
        </div>
        <h3 className="text-lg font-semibold line-clamp-1">{nombre}</h3>
        <p className="text-primary text-base font-medium mb-2">
          S/ {precio.toFixed(2)}
        </p>
      </Link>

      <Button
        variant="outline"
        onClick={() =>
          addItem({
            id,
            nombre,
            slug,
            precio,
            imagen: imagen || '',
            cantidad: 1,
          })
        }
      >
        Agregar a cotización
      </Button>
    </motion.article>
  )
}
