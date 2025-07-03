// ? Componente: HomeBlogPreview (pendiente de implementaci�n)
// ✅ Componente: HomeBlogPreview.tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

const blogMock = [
  {
    slug: 'ideas-de-regalos-empresariales-2025',
    titulo: 'Ideas de regalos empresariales para 2025',
    resumen: 'Descubre productos publicitarios creativos y útiles para sorprender a tus clientes este año.',
    fecha: 'Julio 2025',
  },
  {
    slug: 'como-elegir-el-mejor-merchandising-corporativo',
    titulo: 'Cómo elegir el mejor merchandising para tu empresa',
    resumen: 'Una guía práctica para seleccionar productos efectivos y alineados a tu marca.',
    fecha: 'Junio 2025',
  },
]

export default function HomeBlogPreview() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section
      ref={ref}
      aria-labelledby="blog-title"
      className="space-y-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2
          id="blog-title"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-primary"
        >
          Últimos artículos del blog
        </h2>
        <p className="text-muted max-w-2xl mx-auto mt-2">
          Consejos y tendencias sobre merchandising y branding para empresas.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {blogMock.map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post.slug}`}
            className="block border border-border rounded-xl p-6 bg-white/90 dark:bg-muted/80 hover:shadow-md transition"
          >
            <p className="text-sm text-muted mb-2">{post.fecha}</p>
            <h3 className="text-lg font-semibold text-foreground">
              {post.titulo}
            </h3>
            <p className="text-sm text-muted mt-2">{post.resumen}</p>
            <span className="mt-4 inline-block text-sm text-primary font-medium">
              Leer más →
            </span>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}
