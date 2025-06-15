'use client'

import { useCartStore } from '@/store/cartStore'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Trash } from 'lucide-react'

export default function CarritoPage() {
  const { items, removeItem, getTotalItems, getTotalPrice } = useCartStore()

  const mensajeWhatsApp = () => {
    const resumen = items
      .map(
        (item) =>
          `• ${item.nombre} x${item.cantidad} - S/ ${(
            item.precio * item.cantidad
          ).toFixed(2)}`
      )
      .join('\n')

    const total = getTotalPrice().toFixed(2)
    const texto = `¡Hola! Me gustaría cotizar los siguientes productos:\n\n${resumen}\n\nTotal: S/ ${total}`
    const url = `https://wa.me/51TU_NUMERO?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank')
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Tu carrito</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          Tu carrito está vacío. <Link href="/productos" className="underline">Ver productos</Link>
        </p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                <Image
                  src={item.imagen || '/placeholder.png'}
                  alt={item.nombre}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover aspect-square"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.nombre}</h2>
                  <p className="text-sm text-muted-foreground">
                    {item.cantidad} x S/ {item.precio.toFixed(2)}
                  </p>
                  <p className="text-sm font-medium">
                    Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="ghost"
                  size="sm"
                  aria-label="Eliminar producto"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-4">
            <p className="text-right text-lg font-semibold">
              Total: S/ {getTotalPrice().toFixed(2)}
            </p>
            <div className="mt-4 flex justify-end">
              <Button onClick={mensajeWhatsApp} size="lg" className="w-full sm:w-auto">
                Enviar cotización por WhatsApp
              </Button>
            </div>
          </div>
        </>
      )}
    </main>
  )
}
