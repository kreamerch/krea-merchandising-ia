import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

// Tipos reutilizables
export type Subcategoria = {
  title: string
  slug: string
}

export type CategoriaConSubcategorias = {
  title: string
  slug: string
  subcategorias: Subcategoria[]
}

// GROQ: todas las categorías con subcategorías vinculadas
const categoriasConSubcategoriasQuery = groq`
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

// Hook: categorías con subcategorías listas para navegación o filtros
export function useCategoriasConSubcategorias(
  options?: UseQueryOptions<CategoriaConSubcategorias[]>
) {
  return useQuery<CategoriaConSubcategorias[]>({
    queryKey: ['categorias-con-subcategorias'],
    queryFn: () => sanityClient.fetch(categoriasConSubcategoriasQuery),
    staleTime: 60 * 1000,
    ...options,
  })
}
