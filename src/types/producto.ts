// src/types/producto.ts
export type Producto = {
  _id: string
  title: string
  slug: string
  precio: number
  color?: string
  imagen?: string
  categoria?: {
    title: string
    slug: string
  }
}
