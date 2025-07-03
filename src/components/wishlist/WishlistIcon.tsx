'use client'

import { Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'


export function WishlistIcon() {
  const router = useRouter()

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => router.push('/guardados')}
      aria-label="Ver productos guardados"
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-foreground/5 transition-colors"
    >
      <Heart className="w-5 h-5 text-pink-500" />
    </motion.button>
  )
}
