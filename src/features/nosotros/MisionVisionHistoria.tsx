'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Target, Trophy } from 'lucide-react'

const data = [
  {
    title: 'Nuestra Misión',
    icon: <Target className="w-8 h-8 text-primary" />,
    content:
      'Proporcionar soluciones creativas y personalizadas en merchandising que impulsen el valor de marca de nuestros clientes, garantizando calidad, innovación y compromiso.',
  },
  {
    title: 'Nuestra Visión',
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    content:
      'Ser la empresa líder en artículos publicitarios del Perú, reconocida por su excelencia, profesionalismo y capacidad de transformar ideas en experiencias memorables.',
  },
  {
    title: 'Nuestra Historia',
    icon: <Trophy className="w-8 h-8 text-primary" />,
    content:
      'Iniciamos en el 2013 con una visión clara: revolucionar el sector del merchandising en el Perú. Gracias al esfuerzo, la innovación constante y la confianza de nuestros clientes, hoy somos una de las compañías más importantes del rubro a nivel nacional.',
  },
]

export default function MisionVisionHistoria() {
  return (
    <section
      id="mision-vision-historia"
      aria-labelledby="mision-vision-historia-title"
      className="space-y-12"
    >
      <div className="text-center">
        <h2
          id="mision-vision-historia-title"
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          Misión, Visión y Nuestra Historia
        </h2>
        <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">
          Conoce el propósito, los valores y la evolución de Krea Merchandising S.A.C.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {data.map(({ title, content, icon }, idx) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{content}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
