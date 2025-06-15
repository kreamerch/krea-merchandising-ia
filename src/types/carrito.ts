export type ProductoCarrito = {
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
  cantidad: number
  color?: string      // ✅ ahora permitido
  mensaje?: string    // ✅ ahora permitido
}
