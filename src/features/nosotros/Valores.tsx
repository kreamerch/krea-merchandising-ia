'use client'

import { motion } from 'framer-motion'
import {
  CheckCircle,
  Lightbulb,
  Users,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

const valores = [
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: 'Compromiso',
    description: 'Nos entregamos al 100% en cada proyecto, priorizando la satisfacción de nuestros clientes.',
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: 'Creatividad',
    description: 'Convertimos ideas en productos memorables, innovando en cada solución publicitaria.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Trabajo en equipo',
    description: 'Fomentamos la colaboración constante para lograr resultados efectivos y sostenibles.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Responsabilidad',
    description: 'Cumplimos con nuestros compromisos y garantizamos la calidad en todo lo que hacemos.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: 'Excelencia',
    description: 'Buscamos superar las expectativas con productos de alto impacto y acabados profesionales.',
  },
]

export default function Valores() {
  return (
    <section
      id="valores"
      aria-labelledby="valores-title"
      className="space-y-12"
    >
      <div className="text-center">
        <h2
          id="valores-title"
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          Nuestros Valores
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">
          Los principios que guían nuestro trabajo diario y nos definen como empresa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {valores.map(({ icon, title, description }, i) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
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
