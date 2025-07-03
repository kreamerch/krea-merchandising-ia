'use client'

import { useEffect, useState } from 'react'
import { useFilterStore } from '@/store/filterStore'
import ProductListInfinite from './ProductListInfinite'

export default function ProductosCliente() {
  const [isHydrated, setIsHydrated] = useState(false)

  // Estado local para reflejar los valores de Zustand después de hidratar
  const [categoria, setCategoria] = useState<string | null>(null)
  const [subcategoria, setSubcategoria] = useState<string | null>(null)

  // ✅ Hidratar y sincronizar estado inicial desde Zustand (sin suscripción aún)
  useEffect(() => {
    const store = useFilterStore.getState()
    setCategoria(store.categoria || null)
    setSubcategoria(store.subcategoria || null)
    setIsHydrated(true)
  }, [])

  // ✅ Subscripción para actualizar si cambian los valores (opcional pero útil)
  useEffect(() => {
    const unsub = useFilterStore.subscribe((state) => {
      setCategoria(state.categoria || null)
      setSubcategoria(state.subcategoria || null)
    })
    return unsub
  }, [])

  // ⚠️ No renderizar hasta que Zustand esté listo
  if (!isHydrated) return null

  return (
    <ProductListInfinite key={`${categoria}-${subcategoria}`} />
  )
}
