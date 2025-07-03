'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brush, Handshake, PackageCheck, Megaphone } from 'lucide-react'

const servicios = [
  {
    titulo: 'Diseño personalizado',
    descripcion: 'Adaptamos tu marca a cada producto con máxima calidad visual.',
    icono: Brush,
  },
  {
    titulo: 'Asesoría corporativa',
    descripcion: 'Te guiamos en la elección de productos según tu campaña o evento.',
    icono: Handshake,
  },
  {
    titulo: 'Producción garantizada',
    descripcion: 'Impresión profesional, acabados nítidos y materiales duraderos.',
    icono: PackageCheck,
  },
  {
    titulo: 'Promociones efectivas',
    descripcion: 'Impulsa tu visibilidad con artículos útiles que dejan huella.',
    icono: Megaphone,
  },
]

export default function HomeServices() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })

  return (
    <section
      ref={ref}
      aria-labelledby="services-title"
      className="space-y-12"
    >
      {/* Título principal */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2
          id="services-title"
          className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight"
        >
          Servicios que impulsan tu marca
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Te acompañamos en todo el proceso para lograr el mayor impacto publicitario.
        </p>
      </motion.div>

      {/* Cards de servicios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {servicios.map((servicio, index) => {
          const Icono = servicio.icono
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-6 text-center border border-border rounded-2xl bg-background/80 backdrop-blur-md shadow-sm hover:shadow-md transition"
            >
              <Icono className="w-8 h-8 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">
                {servicio.titulo}
              </h3>
              <p className="text-sm text-muted-foreground">{servicio.descripcion}</p>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
