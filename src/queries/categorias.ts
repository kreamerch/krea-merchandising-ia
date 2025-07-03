import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

// ✅ Tipos para categoría y subcategoría
export type Subcategoria = {
  title: string
  slug: string
}

export type Categoria = {
  title: string
  slug: string
  subcategorias: Subcategoria[]
}

// 🔎 GROQ: categorías con sus subcategorías asociadas (por referencia inversa)
const categoriasQuery = groq`
  *[_type == "categoria"] | order(title asc) {
    title,
    "slug": slug.current,
    "subcategorias": *[
      _type == "subcategoria" &&
      references(^._id)
    ] | order(title asc) {
      title,
      "slug": slug.current
    }
  }
`

// ✅ Hook: Obtener categorías con subcategorías anidadas
export function useCategorias(options?: UseQueryOptions<Categoria[]>) {
  return useQuery<Categoria[]>({
    queryKey: ['categorias'],
    queryFn: () => sanityClient.fetch(categoriasQuery),
    staleTime: 60 * 1000,
    ...options,
  })
}
