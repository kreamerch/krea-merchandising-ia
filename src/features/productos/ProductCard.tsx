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

export default function ProductCard({
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
      className="border border-border rounded-xl overflow-hidden bg-background shadow-sm"
    >
      <Link href={`/productos/${slug}`}>
        <Image
          src={imagen || '/placeholder.png'}
          alt={nombre}
          width={500}
          height={500}
          className="aspect-square w-full object-cover"
        />
      </Link>

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-1">{nombre}</h2>
        <p className="text-sm text-muted-foreground mb-2">S/ {precio.toFixed(2)}</p>

        <Button onClick={() => addItem({ id, nombre, slug, precio, cantidad: 1 })} size="sm" className="w-full">
          Añadir al carrito
        </Button>
      </div>
    </motion.article>
  )
}
