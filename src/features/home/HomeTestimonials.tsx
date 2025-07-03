'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const testimoniosMock = [
  {
    nombre: 'María López',
    empresa: 'Marketing Pro SAC',
    mensaje:
      'Krea Merch ha sido un aliado clave en todas nuestras campañas. La calidad y puntualidad son excelentes.',
  },
  {
    nombre: 'Carlos Gómez',
    empresa: 'InnovaTech Perú',
    mensaje:
      'Muy buena atención y excelente variedad de productos. Sin duda volveremos a trabajar juntos.',
  },
  {
    nombre: 'Lucía Fernández',
    empresa: 'Eventos Elite',
    mensaje:
      '¡Gracias por ayudarnos con los regalos corporativos! Todo quedó impecable y los tiempos fueron perfectos.',
  },
]

export default function HomeTestimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const autoplay = useRef(Autoplay({ delay: 6000 }))
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current])

  useEffect(() => {
    if (inView) autoplay.current?.play()
  }, [inView])

  return (
    <section
      ref={ref}
      aria-labelledby="testimonials-title"
      className="space-y-12"
    >
      {/* Título de la sección */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2
          id="testimonials-title"
          className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight"
        >
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-2 text-base text-muted-foreground">
          Nuestra reputación se construye con cada entrega exitosa.
        </p>
      </motion.div>

      {/* Carrusel */}
      <motion.div
        ref={emblaRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="embla overflow-hidden"
      >
        <div className="embla__container flex gap-6">
          {testimoniosMock.map((t, i) => (
            <div
              key={i}
              className="embla__slide min-w-[90%] sm:min-w-[50%] md:min-w-[33%] p-4"
            >
              <div className="h-full flex flex-col justify-between gap-4 border border-border rounded-2xl bg-background/80 backdrop-blur-md shadow-sm p-6 transition hover:shadow-md">
                <p className="text-sm italic text-muted-foreground leading-relaxed">
                  “{t.mensaje}”
                </p>
                <div className="mt-4">
                  <p className="text-foreground font-semibold">{t.nombre}</p>
                  <p className="text-sm text-muted-foreground">{t.empresa}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
