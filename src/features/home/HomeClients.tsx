'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const clientesMock = [
  {
    nombre: 'Claro',
    logo: '/clientes/claro.svg',
    alt: 'Logo de Claro',
  },
  {
    nombre: 'Entel',
    logo: '/clientes/entel.svg',
    alt: 'Logo de Entel',
  },
  {
    nombre: 'BCP',
    logo: '/clientes/bcp.svg',
    alt: 'Logo del BCP',
  },
  {
    nombre: 'Bitel',
    logo: '/clientes/bitel.svg',
    alt: 'Logo de Bitel',
  },
  {
    nombre: 'San Marcos',
    logo: '/clientes/unmsm.svg',
    alt: 'Logo de Universidad Nacional Mayor de San Marcos',
  },
  {
    nombre: 'PUCP',
    logo: '/clientes/pucp.svg',
    alt: 'Logo de Pontificia Universidad Católica del Perú',
  },
]

export default function HomeClients() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section
      ref={ref}
      aria-labelledby="clients-title"
      className="space-y-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center"
      >
        <h2
          id="clients-title"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-primary"
        >
          Empresas que confiaron en nosotros
        </h2>
        <p className="text-muted max-w-2xl mx-auto mt-2">
          Estas marcas ya han confiado en nuestros productos y servicios.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 place-items-center"
      >
        {clientesMock.map((cliente) => (
          <div
            key={cliente.nombre}
            className="grayscale hover:grayscale-0 transition duration-300"
          >
            <Image
              src={cliente.logo}
              alt={cliente.alt}
              title={cliente.nombre}
              width={100}
              height={50}
              className="object-contain h-12"
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
          </div>
        ))}
      </motion.div>
    </section>
  )
}
