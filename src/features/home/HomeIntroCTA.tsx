'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function HomeIntroCTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section
      ref={ref}
      aria-labelledby="intro-title"
      className="relative overflow-hidden border border-border rounded-2xl bg-background/80 backdrop-blur-md shadow-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center px-6 py-12 sm:px-10 space-y-6"
      >
        <h2
          id="intro-title"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Dale vida a tu marca con artículos personalizados
        </h2>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          En Krea Merch ayudamos a empresas a destacar con productos publicitarios únicos: lapiceros, polos, USBs, gorras y más. Personalizamos, producimos y entregamos con calidad garantizada.
        </p>

        <a
          href="#productos"
          className="inline-block mt-4 px-6 py-3 rounded-xl font-semibold bg-complement text-white hover:bg-complement/90 transition-colors duration-300"
        >
          Ver productos destacados
        </a>
      </motion.div>
    </section>
  )
}
