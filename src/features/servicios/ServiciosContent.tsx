// ✅ components/ServiciosContent.tsx
'use client'

import { useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Sparkles as IconSublimado,
  Paintbrush2 as IconSerigrafia,
  BadgePercent as IconLaser,
  Layers as IconDTF,
  PenTool as IconTampografia,
  Sun as IconUV,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

const servicios = [
  { title: 'Serigrafía', Icon: IconSerigrafia, desc: 'Para grandes volúmenes...' },
  { title: 'Sublimado', Icon: IconSublimado, desc: 'Full color sobre telas...' },
  { title: 'DTF', Icon: IconDTF, desc: 'Transfer digital directo...' },
  { title: 'Tampografía', Icon: IconTampografia, desc: 'Precisión en objetos pequeños...' },
  { title: 'Grabado Láser', Icon: IconLaser, desc: 'High precision en madera/metal...' },
  { title: 'Grabado UV', Icon: IconUV, desc: 'Impresión duradera sobre plásticos...' },
]

export default function ServiciosContent() {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnMouseEnter: true }))
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section aria-label="Carrusel de servicios" className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-6 px-4">
          {servicios.map(({ title, Icon, desc }, i) => (
            <motion.div
              key={i}
              className="min-w-[80%] sm:min-w-[48%] lg:min-w-[30%]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="p-6 bg-white/80 dark:bg-gray-800 rounded-2xl border border-border shadow hover:shadow-md transition">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                  <Icon className="text-primary w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                <p className="text-muted-foreground mb-4">{desc}</p>
                <Button variant="primary" className="w-full" aria-label={`Cotizar ${title}`}>
  Solicitar cotización
</Button>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        aria-label="Anterior servicio"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 p-2 rounded-full shadow hover:bg-background"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        aria-label="Siguiente servicio"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 p-2 rounded-full shadow hover:bg-background"
      >
        ›
      </button>
    </section>
  )
}
