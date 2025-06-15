// src/queries/productos.ts
import { groq } from 'next-sanity'
import { sanityClient } from '@/lib/sanity/client'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { Producto } from '@/types/producto'

// 🔎 GROQ: Todos los productos
export const productosQuery = groq`*[_type == "producto"]{
  _id,
  title,
  "slug": slug.current,
  precio,
  color,
  "imagen": imagen[0].asset->url,
  categoria->{
    title,
    "slug": slug.current
  }
} | order(_createdAt desc)`

// 🔎 GROQ: Producto por slug
export const productoBySlugQuery = groq`*[_type == "producto" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  precio,
  color,
  "imagen": imagen[0].asset->url,
  categoria->{
    title,
    "slug": slug.current
  }
}`

// 🔁 React Query: Obtener todos los productos
export function useProductos(options?: UseQueryOptions<Producto[]>) {
  return useQuery<Producto[]>({
    queryKey: ['productos'],
    queryFn: async () => sanityClient.fetch(productosQuery),
    staleTime: 60 * 1000,
    ...options,
  })
}

// 🔁 React Query: Obtener producto por slug
export function useProductoBySlug(slug: string) {
  return useQuery<Producto>({
    queryKey: ['producto', slug],
    queryFn: async () =>
      sanityClient.fetch(productoBySlugQuery, { slug }),
    enabled: !!slug,
  })
}
