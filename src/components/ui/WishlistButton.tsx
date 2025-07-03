"use client"

import { useWishlistStore } from '@/store/wishlistStore'
import { Heart, HeartOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useMemo } from 'react'

type Props = {
  uid: string
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
}

export function WishlistButton({ uid, id, nombre, slug, precio, imagen }: Props) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()

  const activo = useMemo(() => isInWishlist(uid), [uid, isInWishlist])

  const handleClick = () => {
    if (activo) {
      removeItem(uid)
      toast(
        'Eliminado de guardados',
        {
          description: nombre,
          icon: <HeartOff className="text-red-400" />,
        }
      )
    } else {
      addItem({ uid, id, nombre, slug, precio, imagen: imagen || '' })
      toast(
        'Guardado para después',
        {
          description: nombre,
          icon: <Heart className="text-pink-500" />,
        }
      )
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-pink-500 hover:border-pink-300 transition"
      aria-label={activo ? 'Quitar de guardados' : 'Guardar para después'}
    >
      {activo ? (
        <HeartOff className="w-4 h-4 text-pink-600" />
      ) : (
        <Heart className="w-4 h-4" />
      )}
    </motion.button>
  )
}
