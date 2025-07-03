'use client'

import { useDebounce } from 'use-debounce'
import { useQuery } from '@tanstack/react-query'
import { getProductosPorTexto } from '@/queries/productos'
import type { Producto } from '@/types/producto'

/**
 * Hook reutilizable para buscar productos por texto con debounce y React Query.
 * @param texto Término de búsqueda ingresado por el usuario.
 */
export function useProductSearch(texto: string) {
  const [debounced] = useDebounce(texto, 300)

  const {
    data: productos,
    isLoading,
    isError,
    isFetching,
  } = useQuery<Producto[]>({
    queryKey: ['busqueda', debounced],
    queryFn: () => getProductosPorTexto(debounced),
    enabled: debounced.length > 1,
    staleTime: 60 * 1000, // ✅ Cache válido por 1 minuto
  })

  return {
    productos: productos ?? [],
    isLoading,
    isFetching,
    isError,
  }
}
