'use client'

import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Producto } from '@/types/producto'
import { ProductCard } from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Props {
  productos: Producto[]
}

export function ProductosDestacadosSlider({ productos }: Props) {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: productos.length > 4,
      align: 'start',
      dragFree: true,
      containScroll: 'trimSnaps',
    },
    [autoplay.current]
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }

    emblaApi.on('select', update)
    update()
  }, [emblaApi])

  const scrollPrev = () => {
    autoplay.current?.reset()
    emblaApi?.scrollPrev()
  }

  const scrollNext = () => {
    autoplay.current?.reset()
    emblaApi?.scrollNext()
  }

  if (!productos || productos.length === 0) {
    return (
      <p role="alert" className="text-muted-foreground text-center py-6">
        No se encontraron productos destacados.
      </p>
    )
  }

  return (
    <div className="relative group px-2" aria-roledescription="carousel">
      {/* Carrusel */}
      <div ref={emblaRef} className="overflow-hidden">
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {productos.map((producto) => (
            <div
              key={producto._id}
              className="min-w-[85%] sm:min-w-[47%] md:min-w-[31%] lg:min-w-[24%]"
            >
              <ProductCard
                id={producto._id}
                nombre={producto.title}
                slug={producto.slug}
                precio={producto.precio}
                imagen={producto.imagen}
                color={producto.color}
                destacado={producto.destacado}
                etiqueta={producto.etiqueta}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botón izquierda */}
      <button
        onClick={scrollPrev}
        aria-label="Producto anterior"
        disabled={!canScrollPrev}
        className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-white/90 dark:bg-muted text-primary shadow transition hover:scale-105
        ${!canScrollPrev ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <ChevronLeft className="w-5 h-5 mx-auto" />
      </button>

      {/* Botón derecha */}
      <button
        onClick={scrollNext}
        aria-label="Siguiente producto"
        disabled={!canScrollNext}
        className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-border bg-white/90 dark:bg-muted text-primary shadow transition hover:scale-105
        ${!canScrollNext ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <ChevronRight className="w-5 h-5 mx-auto" />
      </button>
    </div>
  )
}
