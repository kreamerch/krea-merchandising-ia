'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useProductoBySlug } from '@/queries/productos'
import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { useState } from 'react'

export default function ProductoPage() {
  const { slug } = useParams()
  const { data: producto, isLoading, isError } = useProductoBySlug(slug as string)
  const addItem = useCartStore((state) => state.addItem)

  const [color, setColor] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const handleAddToCart = () => {
    if (!producto) return
    addItem({
      id: producto._id,
      nombre: producto.title,
      slug: producto.slug,
      precio: producto.precio,
      imagen: producto.imagen || '',
      cantidad,
      color,
      mensaje,
    })
  }

  const handleWhatsApp = () => {
    if (!producto) return
    const phone = '51987654321'
    const text = `Hola, quiero cotizar este producto:\n\n🛍 *${producto.title}*\n💵 S/ ${producto.precio.toFixed(
      2
    )}\n🎨 Color: ${color || 'Ninguno'}\n🔢 Cantidad: ${cantidad}\n📝 Nota: ${mensaje || 'Ninguna'}\n🔗 https://kreamerch.com/productos/${producto.slug}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  if (isLoading) return <p className="text-muted-foreground">Cargando producto...</p>
  if (isError || !producto) return <p className="text-destructive">No se pudo cargar el producto.</p>

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagen */}
        <div className="relative aspect-square rounded-xl overflow-hidden shadow-md border">
          <Image
            src={producto.imagen || '/placeholder.webp'}
            alt={producto.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Info + Personalización */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{producto.title}</h1>
            <p className="text-primary text-xl font-semibold mt-1">
              S/ {producto.precio.toFixed(2)}
            </p>
            {producto.categoria?.title && (
              <p className="text-sm text-muted-foreground mt-1">
                Categoría: {producto.categoria.title}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Input
              placeholder="Color (opcional)"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium">Cantidad:</label>
              <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                <button
                  type="button"
                  onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                  className="text-lg font-bold px-2"
                >
                  −
                </button>
                <span className="w-6 text-center">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => setCantidad((c) => c + 1)}
                  className="text-lg font-bold px-2"
                >
                  +
                </button>
              </div>
            </div>
            <Textarea
              placeholder="Mensaje adicional o nota para la cotización..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={handleAddToCart} variant="outline" className="w-full sm:w-auto">
              Agregar al carrito
            </Button>
            <Button onClick={handleWhatsApp} className="w-full sm:w-auto">
              Cotizar ahora
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
