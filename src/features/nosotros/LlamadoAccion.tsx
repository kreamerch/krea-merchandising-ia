'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircleMore } from 'lucide-react'

export default function LlamadoAccion() {
  return (
    <section
      id="llamado-accion"
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background/70 to-muted/40 backdrop-blur-md p-10 text-center shadow-lg"
      aria-labelledby="cta-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-2xl mx-auto"
      >
        <MessageCircleMore className="w-10 h-10 mx-auto text-primary" />
        <h2
          id="cta-title"
          className="text-3xl md:text-4xl font-extrabold text-foreground"
        >
          ¿Listo para potenciar tu marca?
        </h2>
        <p className="text-muted-foreground text-sm">
          En Krea Merchandising S.A.C., transformamos ideas en artículos publicitarios impactantes. Conversemos sobre cómo podemos ayudarte a destacar.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link
            href="/contacto"
            className="px-6 py-2 rounded-xl border border-primary/50 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            Escríbenos
          </Link>

          <a
            href="https://wa.me/51955876887"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-xl border border-[color:var(--whatsapp)] bg-[color:var(--whatsapp)]/10 text-[color:var(--whatsapp)] text-sm font-medium hover:bg-[color:var(--whatsapp)]/20 transition-colors"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </motion.div>
    </section>
  )
}
