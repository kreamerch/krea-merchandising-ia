import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import {
  useQuery,
  useInfiniteQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { Producto } from '@/types/producto'

export const PAGE_SIZE = 8

// 🔎 Todos los productos (sin filtros)
export const productosQuery = groq`
  *[_type == "producto"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    precio,
    descripcion,
    color,
    "imagen": imagen[0].asset->url,
    destacado,
    etiqueta,
    meta_titulo,
    meta_descripcion,
    categoria->{
      title,
      "slug": slug.current
    },
    subcategoria->{
      title,
      "slug": slug.current
    }
  }
`

// 🔎 Producto por slug
export const productoPorSlugQuery = groq`
  *[_type == "producto" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    precio,
    descripcion,
    color,
    "imagenes": imagen[].asset->url,
    destacado,
    etiqueta,
    meta_titulo,
    meta_descripcion,
    categoria->{
      title,
      "slug": slug.current
    },
    subcategoria->{
      title,
      "slug": slug.current
    }
  }
`

// 🔍 Buscar productos por texto
export async function getProductosPorTexto(texto: string): Promise<Producto[]> {
  const query = groq`
    *[_type == "producto" && title match $match]
    | order(_createdAt desc)[0...10] {
      _id,
      title,
      "slug": slug.current,
      precio,
      descripcion,
      color,
      "imagen": imagen[0].asset->url,
      destacado,
      etiqueta,
      meta_titulo,
      meta_descripcion,
      categoria->{
        title,
        "slug": slug.current
      },
      subcategoria->{
        title,
        "slug": slug.current
      }
    }
  `
  return sanityClient.fetch(query, { match: `*${texto}*` })
}

// ✅ Hook estático
export function useProductos(options?: UseQueryOptions<Producto[]>) {
  return useQuery<Producto[]>({
    queryKey: ['productos'],
    queryFn: () => sanityClient.fetch(productosQuery),
    staleTime: 60 * 1000,
    ...options,
  })
}

// ✅ Hook por slug
export function useProductoPorSlug(slug: string) {
  return useQuery<Producto>({
    queryKey: ['producto', slug],
    queryFn: () => sanityClient.fetch(productoPorSlugQuery, { slug }),
    enabled: !!slug,
  })
}

// 🔁 GROQ con paginación y filtro (prioriza subcategoría si existe)
function getProductosPaginadosQuery(
  categoria?: string | null,
  subcategoria?: string | null,
  start = 0
): string {
  let filtro = ''

  if (subcategoria) {
    // ✅ Solo filtra por subcategoría si está activa
    filtro = `subcategoria->slug.current == "${subcategoria}"`
  } else if (categoria) {
    // ✅ Si no hay subcategoría, filtra por categoría
    filtro = `categoria->slug.current == "${categoria}"`
  }

  const whereClause = filtro ? ` && ${filtro}` : ''

  return `
    *[_type == "producto"${whereClause}]
    | order(_createdAt desc)[${start}...${start + PAGE_SIZE}] {
      _id,
      title,
      "slug": slug.current,
      precio,
      descripcion,
      color,
      "imagen": imagen[0].asset->url,
      destacado,
      etiqueta,
      meta_titulo,
      meta_descripcion,
      categoria->{
        title,
        "slug": slug.current
      },
      subcategoria->{
        title,
        "slug": slug.current
      }
    }
  `
}


// ✅ Hook: paginación con filtros
export function useProductosInfinite(
  categoria?: string | null,
  subcategoria?: string | null
) {
  return useInfiniteQuery<Producto[], Error>({
    queryKey: ['productos', categoria, subcategoria],
    queryFn: async ({ pageParam }) => {
      const start = (pageParam as number) ?? 0
      const query = getProductosPaginadosQuery(categoria, subcategoria, start)
      return sanityClient.fetch(query)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length * PAGE_SIZE : undefined,
  })
}
// 🔎 Obtener productos destacados desde el servidor
export async function getProductosDestacados(): Promise<Producto[]> {
  const query = groq`
    *[_type == "producto" && destacado == true]
    | order(_createdAt desc)[0...8] {
      _id,
      title,
      "slug": slug.current,
      precio,
      color,
      "imagen": imagen[0].asset->url,
      destacado,
      etiqueta
    }
  `
  return sanityClient.fetch(query)
}
