'use client'

import { motion } from 'framer-motion'
import HeroNosotros from '@/features/nosotros/HeroNosotros'
import MisionVisionHistoria from '@/features/nosotros/MisionVisionHistoria'
import Valores from '@/features/nosotros/Valores'
import Confianza from '@/features/nosotros/Confianza'
import LlamadoAccion from '@/features/nosotros/LlamadoAccion'

export default function NosotrosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-20"
      >
        <HeroNosotros />
        <MisionVisionHistoria />
        <Valores />
        <Confianza />
        <LlamadoAccion />
      </motion.div>
    </main>
  )
}
