'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { generateUid } from '@/lib/cart/generateUid'
import {
  ShoppingCart,
  Sparkles,
  Tag,
  CheckCircle,
  Heart,
  HeartOff,
} from 'lucide-react'
import { toast } from 'sonner'
import clsx from 'clsx'

export type ProductCardProps = {
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
  color?: string
  mensaje?: string
  destacado?: boolean
  etiqueta?: 'nuevo' | 'oferta' | null
}

export function ProductCard({
  id,
  nombre,
  slug,
  precio,
  imagen,
  color,
  mensaje,
  destacado,
  etiqueta,
}: ProductCardProps) {
  const uid = useMemo(() => generateUid(id, color, mensaje), [id, color, mensaje])

  const { addItem: addCartItem } = useCartStore()
  const {
    addItem: addWishlist,
    removeItem: removeWishlist,
    isInWishlist,
  } = useWishlistStore()

  const [isAdded, setIsAdded] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const handleAdd = () => {
    addCartItem({
      uid,
      id,
      nombre,
      slug,
      precio,
      imagen: imagen || '',
      cantidad: 1,
      color,
      mensaje,
    })

    toast.success('Producto agregado a tu cotización', {
      description: nombre,
      icon: <ShoppingCart className="w-5 h-5 text-primary" aria-hidden="true" />,
    })

    setIsAdded(true)
    setIsDisabled(true)

    setTimeout(() => {
      setIsAdded(false)
      setIsDisabled(false)
    }, 2500)
  }

  const handleWishlist = () => {
    if (isInWishlist(uid)) {
      removeWishlist(uid)
      toast('Eliminado de guardados', {
        description: nombre,
        icon: <HeartOff className="text-[--wishlist] w-4 h-4" aria-hidden="true" />,
      })
    } else {
      addWishlist({ uid, id, nombre, slug, precio, imagen })
      toast.success('Guardado para después', {
        description: nombre,
        icon: <Heart className="text-[--wishlist] w-4 h-4" aria-hidden="true" />,
      })
    }
  }

  const renderEtiqueta = (etiqueta: 'nuevo' | 'oferta') => {
    const base =
      'absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full text-[11px] font-medium px-2.5 py-1 shadow-sm backdrop-blur-md'

    if (etiqueta === 'nuevo') {
      return (
        <div
          className={`${base} bg-emerald-100/70 text-emerald-800 dark:bg-emerald-200/80 dark:text-emerald-900`}
          aria-label="Producto nuevo"
        >
          <Tag className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
          Nuevo
        </div>
      )
    }

    if (etiqueta === 'oferta') {
      return (
        <div
          className={`${base} bg-orange-100/70 text-orange-800 dark:bg-orange-200/80 dark:text-orange-900`}
          aria-label="Producto en oferta"
        >
          <motion.span
            className="text-base"
            animate={{ scale: [1, 1.1, 1], rotate: [0, -2, 2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          >
            🔥
          </motion.span>
          Oferta
        </div>
      )
    }

    return null
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col justify-between rounded-xl border border-border bg-background p-4 shadow-sm hover:shadow-md transition-shadow group"
    >
      <Link
        href={`/productos/${slug}`}
        aria-label={`Ver detalles de ${nombre}`}
        className="mb-4 block"
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-white dark:bg-muted">
          {destacado && (
            <div
              className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-full bg-yellow-100/70 text-yellow-800 text-[11px] font-medium px-2.5 py-1 shadow-sm backdrop-blur-md dark:bg-yellow-200/80 dark:text-yellow-900"
              aria-label="Producto destacado"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-600" aria-hidden="true" />
              Destacado
            </div>
          )}

          {etiqueta && renderEtiqueta(etiqueta)}

          <Image
            src={imagen || '/placeholder.webp'}
            alt={`Imagen del producto: ${nombre}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4 transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        <h3 className="mt-3 text-base font-semibold text-foreground line-clamp-1">
          {nombre}
        </h3>
        <p className="text-primary text-sm font-medium mt-1">
          S/ {precio.toFixed(2)}
        </p>
      </Link>

      <div className="mt-auto flex items-center justify-between gap-2">
        {hasMounted && (
          <button
            type="button"
            onClick={handleWishlist}
            title={isInWishlist(uid) ? 'Quitar de guardados' : 'Guardar para después'}
            aria-label={isInWishlist(uid) ? 'Quitar de guardados' : 'Guardar para después'}
            className={clsx(
              'w-9 h-9 rounded-full border border-border bg-transparent flex items-center justify-center transition hover:bg-[--wishlist]/10',
              isInWishlist(uid) && 'bg-[--wishlist]/15 border-[--wishlist]/40'
            )}
          >
            {isInWishlist(uid) ? (
              <HeartOff className="w-[17px] h-[17px] text-[--wishlist]" aria-hidden="true" />
            ) : (
              <Heart className="w-[17px] h-[17px] text-[--wishlist]" aria-hidden="true" />
            )}
          </button>
        )}

        <motion.button
          onClick={handleAdd}
          disabled={isDisabled}
          title={isAdded ? 'Agregado' : 'Agregar a cotización'}
          aria-label={isAdded ? `Producto ${nombre} agregado` : `Agregar ${nombre} a cotización`}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2 rounded-lg border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 dark:border-primary/40 dark:bg-primary/10 dark:hover:bg-primary/20',
            isDisabled && 'opacity-60 cursor-not-allowed pointer-events-none'
          )}
        >
          {isAdded ? (
            <>
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              Cotizar
            </>
          )}
        </motion.button>
      </div>
    </motion.article>
  )
}
