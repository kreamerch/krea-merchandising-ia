'use client'

import dynamic from 'next/dynamic'
import Skeleton from '@/components/ui/Skeleton'

// ⏳ Dinámicamente importa ProductosCliente SOLO en cliente
const ProductosCliente = dynamic(
  () => import('./ProductosCliente'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px]" />
  }
)

export default function ProductosWrapper() {
  return <ProductosCliente />
}
