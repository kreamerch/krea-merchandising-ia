'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import type { EmblaOptionsType } from 'embla-carousel'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MotionImage = motion.create(Image) // ✅


interface Slide {
  title: string
  subtitle?: string
  image: string
  cta?: string
  bgColor: string
}

const slides: Slide[] = [
  {
    title: 'Personaliza tu marca',
    subtitle: 'Artículos promocionales únicos',
    image: '/bolso-pack.webp',
    cta: 'Ver productos',
    bgColor: 'bg-[oklch(0.65_0.10_150)]',
  },
  {
    title: 'Regalos corporativos',
    subtitle: 'Haz que tu marca destaque',
    image: '/images/hero2.jpg',
    cta: 'Cotizar ahora',
    bgColor: 'bg-[oklch(0.63_0.21_35)]',
  },
  {
    title: 'Calidad y creatividad',
    subtitle: 'Merchandising con propósito',
    image: '/images/hero3.jpg',
    cta: 'Contáctanos',
    bgColor: 'bg-[oklch(0.3_0.05_240)]',
  },
]

const delayMs = 6000
const options: EmblaOptionsType = { loop: true, align: 'start' }
const autoplayPlugin = Autoplay({
  delay: delayMs,
  stopOnInteraction: false,
  stopOnFocusIn: false,
  stopOnMouseEnter: true,
})

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayPlugin])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const progress = useAnimation()

  const resetProgress = useCallback(() => {
    progress.set({ scaleX: 0 })
    progress.start({
      scaleX: 1,
      transition: { duration: delayMs / 1000, ease: 'linear' },
    })
  }, [progress])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    resetProgress()
  }, [emblaApi, resetProgress])

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.plugins()?.autoplay?.reset();
    resetProgress();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect, resetProgress]);

  const scrollTo = (i: number) => emblaApi?.scrollTo(i)
  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <section
      ref={emblaRef}
      className="relative overflow-hidden"
      role="region"
      aria-label="Slider principal"
    >
      <ul className="flex">
        {slides.map((slide, i) => (
          <li
            key={i}
            className={`min-w-full ${slide.bgColor} text-white relative`}
            aria-label={`Slide ${i + 1}`}
          >
            <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-6 lg:px-8 gap-4 py-4">
              {/* Texto */}
              <div className="z-10 flex flex-col gap-2">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    i === selectedIndex
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.6 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold"
                >
                  {slide.title}
                </motion.h2>
                {slide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      i === selectedIndex
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 10 }
                    }
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl opacity-90"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
                {slide.cta && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={i === selectedIndex ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <Link
                      href="/productos"
                      className="inline-block mt-2 bg-foreground text-background font-semibold px-6 py-2 rounded-full hover:opacity-90 transition"
                    >
                      {slide.cta}
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Imagen */}
              <div className="relative w-full h-[45vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] flex justify-center items-center px-2">
                <MotionImage
                  key={`img-${i}`}
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-contain aspect-[16/9] w-full h-auto transition duration-700 ease-out"
                  initial={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
                  animate={
                    i === selectedIndex
                      ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
                <Image
                  src="/krea-logo-blanco.webp"
                  alt=""
                  width={200}
                  height={200}
                  aria-hidden="true"
                  className="absolute bottom-6 right-6 opacity-10 pointer-events-none select-none"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Flechas */}
      <button
        onClick={scrollPrev}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-3 h-3 rounded-full transition duration-300 ${
              i === selectedIndex ? 'bg-white' : 'bg-white/40'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          className="h-full bg-white origin-left scale-x-0"
          animate={progress}
        />
      </div>
    </section>
  )
}
