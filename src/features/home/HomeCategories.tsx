'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { PackageSearch } from 'lucide-react'

const categorias = [
  { id: 'gorras', nombre: 'Gorras Personalizadas', icono: '🧢' },
  { id: 'lapiceros', nombre: 'Lapiceros Corporativos', icono: '🖊️' },
  { id: 'polos', nombre: 'Polos Publicitarios', icono: '👕' },
  { id: 'usb', nombre: 'USBs con Logo', icono: '💾' },
]

export default function HomeCategories() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} aria-labelledby="categorias-title" className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2
          id="categorias-title"
          className="text-3xl font-extrabold text-primary tracking-tight"
        >
          Explora nuestras categorías
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-xl mx-auto">
          Selecciona una línea de productos y descubre sus posibilidades.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {categorias.map((cat) => (
          <a
            key={cat.id}
            href={`/productos?categoria=${cat.id}`}
            className="group block relative overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.3)] to-[rgba(255,255,255,0.1)] backdrop-blur-lg border border-transparent hover:border-accent transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Ver productos de ${cat.nombre}`}
          >
            <div className="flex h-52 flex-col items-center justify-center gap-4 p-6">
              <div className="rounded-full bg-background/50 p-5 text-5xl group-hover:scale-110 transition-transform duration-300">
                {cat.icono}
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {cat.nombre}
              </h3>
            </div>
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PackageSearch className="w-6 h-6 text-accent" />
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  )
}
