'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, MessageSquareText } from 'lucide-react'
import { toast } from 'sonner'

import { JsonLdProduct } from '@/components/seo/JsonLdProduct'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Stepper from '@/components/ui/Stepper'
import ExpandableText from '@/components/ui/ExpandableText'
import Miniaturas from '@/features/productos/Miniaturas'
import ProductDetailSkeleton from '@/features/productos/ProductDetailSkeleton'
import { useDetalleProducto } from '@/hooks/useDetalleProducto'
import { useIsMobile } from '@/hooks/useIsMobile'
import { generarTextoWhatsApp } from '@/utils/whatsapp'

export default function ProductoPage() {
  const {
    producto,
    isLoading,
    isError,
    color,
    setColor,
    cantidad,
    setCantidad,
    mensaje,
    setMensaje,
    handleAddToCart,
  } = useDetalleProducto()

  const [imagenIndex, setImagenIndex] = useState(0)
  const isMobile = useIsMobile()

  const imagenPrincipal =
    producto?.imagenes?.[imagenIndex] || producto?.imagen || '/placeholder.webp'

  // ⛔ Estado de carga
  if (isLoading)
    return (
      <ProductDetailSkeleton
        showMiniaturas={
          Array.isArray(producto?.imagenes) && producto.imagenes.length > 1
        }
      />
    )

  // ⛔ Error de carga
  if (isError || !producto)
    return (
      <p className="text-center text-destructive text-sm py-6" role="alert">
        No se pudo cargar el producto.
      </p>
    )

  // ✅ Agregar al carrito
  const onAdd = () => {
    const ok = handleAddToCart()
    if (ok) {
      toast.success('Producto agregado a tu cotización', {
        description: producto.title,
        icon: <ShoppingCart className="w-5 h-5 text-primary" />,
      })
    }
  }

  // ✅ Enviar a WhatsApp
  const onCotizar = () => {
    if (cantidad < 1) {
      return toast.error('Selecciona una cantidad válida')
    }

    const texto = generarTextoWhatsApp({
      title: producto.title,
      cantidad,
      precio: producto.precio,
      color,
      mensaje,
    })

    const url = `https://wa.me/51955876887?text=${encodeURIComponent(texto)}`

    toast.info('Redirigiendo a WhatsApp...', {
      description: producto.title,
      icon: <MessageSquareText className="w-5 h-5 text-accent" />,
    })

    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <JsonLdProduct
        id={producto._id}
        title={producto.title}
        imagen={imagenPrincipal}
        precio={producto.precio}
        slug={producto.slug}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-12 items-start"
      >
        {/* 🔍 Vista principal */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-2xl mx-auto aspect-square sm:aspect-video overflow-hidden rounded-2xl border border-border bg-white/90 dark:bg-muted/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300">
            <Image
              src={imagenPrincipal}
              alt={`Imagen del producto: ${producto.title}`}
              fill
              className="object-contain p-4 transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              priority
            />

            {!!producto.imagenes?.length && producto.imagenes.length > 1 && (
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
                <Miniaturas
                  imagenes={producto.imagenes}
                  imagenIndex={imagenIndex}
                  setImagenIndex={setImagenIndex}
                  small={isMobile}
                />
              </div>
            )}
          </div>
        </div>

        {/* 🔧 Detalles del producto */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              {producto.title}
            </h1>

            <p className="text-primary text-2xl font-semibold mt-1">
              S/ {producto.precio.toFixed(2)}
            </p>

            {producto.categoria?.title && (
              <p className="text-sm text-muted-foreground mt-1">
                Categoría: {producto.categoria.title}
              </p>
            )}

            {producto.descripcion && (
              <div className="mt-4">
                <ExpandableText text={producto.descripcion} maxChars={80} />
              </div>
            )}
          </div>

          {/* 🎯 Opciones de personalización */}
          <div className="flex flex-col gap-4 rounded-3xl border border-border/20 bg-background/80 p-6 shadow-sm backdrop-blur-md">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Color (opcional)
              </label>
              <Input
                placeholder="Ej. rojo, azul..."
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="text-sm font-medium text-foreground">
                Cantidad:
              </label>
              <Stepper value={cantidad} onChange={setCantidad} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Mensaje para la cotización
              </label>
              <Textarea
                placeholder="Ej. Incluir logo al frente, bordado, etc."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="min-h-[90px]"
              />
            </div>
          </div>

          {/* 🛒 Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <motion.button
              aria-label="Agregar producto al carrito de cotización"
              onClick={onAdd}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-primary/60 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar al carrito
            </motion.button>

            <motion.button
              aria-label="Cotizar producto por WhatsApp"
              onClick={onCotizar}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[color:var(--whatsapp)] bg-[color:var(--whatsapp)]/10 px-4 py-2 text-sm font-medium text-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp)]/20 transition-colors"
            >
              <MessageSquareText className="w-4 h-4" />
              Cotizar por WhatsApp
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
