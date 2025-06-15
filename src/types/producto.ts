// src/types/producto.ts

export type Producto = {
  _id: string
  title: string
  slug: string
  precio: number
  color?: string
  imagen?: string // URL directa desde imagen[0].asset->url en GROQ
  categoria?: {
    title: string
    slug: string
  }
}
