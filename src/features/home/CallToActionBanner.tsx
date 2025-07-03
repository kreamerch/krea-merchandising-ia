'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircleMore } from 'lucide-react'

export default function CallToActionBanner() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section
      ref={ref}
      aria-labelledby="cta-banner-title"
      className="rounded-2xl overflow-hidden border border-border bg-white/90 dark:bg-muted/80 shadow-md animate-gradient backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
      >
        <div className="text-center sm:text-left max-w-xl space-y-2">
          <h2
            id="cta-banner-title"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-primary"
          >
            ¿Listo para impulsar tu marca?
          </h2>
          <p className="text-muted text-sm sm:text-base">
            Cotiza con nosotros vía WhatsApp y recibe atención rápida y personalizada para tu empresa.
          </p>
        </div>

        <a
          href="https://wa.me/51999999999?text=Hola%20Krea%20Merch,%20deseo%20cotizar%20productos%20personalizados"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cotizar productos personalizados por WhatsApp"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-whatsapp text-white font-semibold hover:bg-whatsapp/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp transition-all duration-300"
        >
          <MessageCircleMore className="w-5 h-5" />
          Cotizar por WhatsApp
        </a>
      </motion.div>
    </section>
  )
}
