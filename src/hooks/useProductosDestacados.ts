// src/hooks/useProductosDestacados.ts
import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/sanityClient'
import { productosDestacadosQuery } from '@/queries/productosDestacados'
import { productosFallbackQuery } from '@/queries/productosFallback'
import { Producto } from '@/types/producto'

export function useProductosDestacados() {
  return useQuery<Producto[]>({
    queryKey: ['productos-destacados'],
    queryFn: async () => {
      const destacados = await client.fetch(productosDestacadosQuery)
      if (destacados.length > 0) return destacados

      // Si no hay destacados, usa productos al azar
      const fallback = await client.fetch(productosFallbackQuery)
      return fallback
    },
  })
}
