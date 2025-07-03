export type Producto = {
  _id: string
  title: string
  slug: string
  precio: number
  color?: string
  imagen?: string
  imagenes?: string[] // ✅ Para productos con múltiples imágenes
  categoria?: {
    title: string
    slug: string
  }
  subcategoria?: {
    title: string
    slug: string
  }
  destacado?: boolean
  etiqueta?: 'nuevo' | 'oferta' | null
  meta_titulo?: string
  meta_descripcion?: string
  descripcion?: string
  mensaje?: string // ✅ Agrega esta línea para evitar el error ts(2339)
}
