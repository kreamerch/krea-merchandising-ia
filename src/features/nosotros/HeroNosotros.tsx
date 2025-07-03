// ✅ Archivo: /features/nosotros/HeroNosotros.tsx
'use client'

import { motion } from 'framer-motion'

export default function HeroNosotros() {
  return (
    <section className="text-center py-12 md:py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-primary mb-4"
      >
        Somos KREA MERCHANDISING
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-muted-foreground max-w-2xl mx-auto text-lg"
      >
        Desde 2013 hemos trabajado con pasión para convertirnos en una de las empresas de merchandising más reconocidas del Perú.
      </motion.p>
    </section>
  )
}
