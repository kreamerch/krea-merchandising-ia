import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

// ✅ Tipo de subcategoría con múltiples categorías padre
export type Subcategoria = {
  title: string
  slug: string
  categorias: {
    title: string
    slug: string
  }[]
}

// 🔎 Query GROQ: incluye las categorías padre referenciadas
const subcategoriasQuery = groq`
  *[_type == "subcategoria"] | order(title asc) {
    title,
    "slug": slug.current,
    categorias[]->{
      title,
      "slug": slug.current
    }
  }
`

// ✅ Hook React Query
export function useSubcategorias(options?: UseQueryOptions<Subcategoria[]>) {
  return useQuery<Subcategoria[]>({
    queryKey: ['subcategorias'],
    queryFn: () => sanityClient.fetch(subcategoriasQuery),
    staleTime: 60 * 1000, // 1 minuto de caché
    ...options,
  })
}
