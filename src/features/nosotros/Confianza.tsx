'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, BadgeCheck, Award, Briefcase } from 'lucide-react'

const items = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Más de 10 años de experiencia',
    description:
      'Desde 2013, brindando soluciones creativas y efectivas en merchandising para marcas peruanas e internacionales.',
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-primary" />,
    title: 'Clientes que confían',
    description:
      'Hemos trabajado con más de 500 empresas en distintos rubros, entregando siempre calidad y compromiso.',
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: 'Calidad garantizada',
    description:
      'Nos enfocamos en entregar productos duraderos, funcionales y alineados a la identidad de cada cliente.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-primary" />,
    title: 'Atención personalizada',
    description:
      'Asesoramos a cada empresa para lograr campañas promocionales efectivas con productos que impactan.',
  },
]

export default function Confianza() {
  return (
    <section
      id="confianza"
      aria-labelledby="confianza-title"
      className="space-y-12"
    >
      <div className="text-center">
        <h2
          id="confianza-title"
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          Por qué confiar en nosotros
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">
          Nos hemos posicionado como una empresa referente en el rubro gracias a nuestro enfoque en calidad, innovación y atención al cliente.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8">
        {items.map(({ icon, title, description }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-md shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
