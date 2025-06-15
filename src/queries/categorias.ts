import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

export type Categoria = {
  title: string
  slug: string
}

// GROQ - Categorías disponibles
const categoriasQuery = groq`*[_type == "categoria"]{
  title,
  "slug": slug.current
} | order(title asc)`

// 🧠 React Query: Obtener categorías
export function useCategorias(options?: UseQueryOptions<Categoria[]>) {
  return useQuery<Categoria[]>({
    queryKey: ['categorias'],
    queryFn: () => sanityClient.fetch(categoriasQuery),
    staleTime: 60 * 1000,
    ...options,
  })
}
