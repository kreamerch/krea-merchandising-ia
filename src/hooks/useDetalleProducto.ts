'use client'

import { useParams } from 'next/navigation'
import { useProductoPorSlug } from '@/queries/productos'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { generateUid } from '@/lib/cart/generateUid'

export function useDetalleProducto() {
  const { slug } = useParams()
  const { data: producto, isLoading, isError } = useProductoPorSlug(slug as string)

  const addItem = useCartStore((state) => state.addItem)

  const [color, setColor] = useState('')
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const [imagenIndex, setImagenIndex] = useState(0)

  const imagenActual = producto?.imagenes?.[imagenIndex] || producto?.imagen || ''

  const handleAddToCart = (): boolean => {
    if (!producto || cantidad <= 0) return false

    addItem({
      uid: generateUid(producto._id, color, mensaje),
      id: producto._id,
      nombre: producto.title,
      slug: producto.slug,
      precio: producto.precio,
      imagen: imagenActual,
      cantidad,
      color,
      mensaje,
    })

    return true
  }

  const handleWhatsApp = (): boolean => {
    if (!producto || cantidad <= 0) return false

    const phone = '51987654321'
    const url = `https://kreamerch.com/productos/${producto.slug}`
    const text = [
      'Hola, quiero cotizar este producto:',
      '',
      `🛍 *${producto.title}*`,
      `💵 S/ ${producto.precio.toFixed(2)}`,
      `🎨 Color: ${color || 'Ninguno'}`,
      `🔢 Cantidad: ${cantidad}`,
      `📝 Nota: ${mensaje || 'Ninguna'}`,
      `🖼 Imagen: ${imagenActual}`,
      `🔗 ${url}`,
    ].join('\n')

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
    }

    return true
  }

  return {
    producto,
    isLoading,
    isError,
    color,
    setColor,
    cantidad,
    setCantidad,
    mensaje,
    setMensaje,
    imagenIndex,
    setImagenIndex,
    handleAddToCart,
    handleWhatsApp,
  }
}
