'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Clock4,
  ThumbsUp,
  Truck,
  ShieldCheck,
} from 'lucide-react'

const beneficios = [
  {
    titulo: 'Entrega rápida y puntual',
    descripcion: 'Despachos en tiempo récord para tus eventos y campañas.',
    icono: Truck,
  },
  {
    titulo: 'Calidad garantizada',
    descripcion: 'Solo productos duraderos, impresos con altos estándares.',
    icono: ShieldCheck,
  },
  {
    titulo: 'Atención personalizada',
    descripcion: 'Te asesoramos en cada paso para lograr el mejor resultado.',
    icono: ThumbsUp,
  },
  {
    titulo: 'Experiencia comprobada',
    descripcion: 'Más de 10 años impulsando marcas con merchandising.',
    icono: Clock4,
  },
]

export default function HomeBenefits() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section
      ref={ref}
      aria-labelledby="benefits-title"
      className="space-y-12"
    >
      {/* Título principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2
          id="benefits-title"
          className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight"
        >
          ¿Por qué elegir Krea Merch?
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Estas son algunas razones por las que nuestros clientes confían en nosotros.
        </p>
      </motion.div>

      {/* Tarjetas de beneficios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {beneficios.map((beneficio, idx) => {
          const Icono = beneficio.icono
          return (
            <div
              key={idx}
              className="flex flex-col items-center text-center gap-3 p-6 border border-border rounded-2xl bg-background/80 backdrop-blur-md shadow-sm hover:shadow-md transition"
            >
              <Icono className="w-8 h-8 text-complement" />
              <h3 className="text-lg font-semibold text-foreground">
                {beneficio.titulo}
              </h3>
              <p className="text-sm text-muted-foreground">{beneficio.descripcion}</p>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
