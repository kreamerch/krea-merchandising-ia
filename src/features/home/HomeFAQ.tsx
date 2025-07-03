'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'

const preguntasFrecuentes = [
  {
    pregunta: '¿Qué tipo de productos personalizan?',
    respuesta:
      'Trabajamos con una amplia variedad de artículos: gorras, polos, lapiceros, USBs, tomatodos, bolsas ecológicas y más.',
  },
  {
    pregunta: '¿Hacen entregas en todo el Perú?',
    respuesta:
      'Sí, hacemos envíos a nivel nacional. También ofrecemos entregas express dentro de Lima Metropolitana.',
  },
  {
    pregunta: '¿Cuál es el pedido mínimo?',
    respuesta:
      'Depende del producto, pero usualmente manejamos un mínimo de 50 unidades por modelo personalizado.',
  },
  {
    pregunta: '¿Pueden ayudarme con el diseño?',
    respuesta:
      'Claro que sí. Contamos con un equipo de diseño que adapta tu logo y propuesta gráfica sin costo adicional.',
  },
]

export default function HomeFAQ() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const [abierta, setAbierta] = useState<number | null>(null)

  const toggle = (index: number) =>
    setAbierta(abierta === index ? null : index)

  return (
    <section
      ref={ref}
      aria-labelledby="faq-title"
      className="space-y-12"
    >
      {/* Título */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2
          id="faq-title"
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary"
        >
          Preguntas frecuentes
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Resolvemos tus dudas antes de que hagas tu cotización.
        </p>
      </motion.div>

      {/* Acordeón */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="space-y-4 max-w-3xl mx-auto"
      >
        {preguntasFrecuentes.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-2xl bg-background/80 backdrop-blur-md shadow-sm overflow-hidden transition"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-4 text-left font-medium text-foreground"
              aria-expanded={abierta === index}
              aria-controls={`faq-${index}`}
            >
              {item.pregunta}
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  abierta === index ? 'rotate-180' : ''
                }`}
              />
            </button>

            <div
              id={`faq-${index}`}
              role="region"
              hidden={abierta !== index}
              className="px-4 pb-4 text-sm text-muted-foreground"
            >
              {item.respuesta}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
