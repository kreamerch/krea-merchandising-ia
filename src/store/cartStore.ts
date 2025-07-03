import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ProductoCarrito = {
  uid: string
  id: string
  nombre: string
  slug: string
  precio: number
  cantidad: number
  imagen?: string
  color?: string
  mensaje?: string
}

type CartStore = {
  items: ProductoCarrito[]
  addItem: (item: ProductoCarrito) => void
  removeItem: (uid: string) => void
  clearCart: () => void
  getTotalItems: () => number // ← ahora cuenta items únicos
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const existing = get().items.find((item) => item.uid === newItem.uid)

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.uid === newItem.uid
                ? { ...item, cantidad: item.cantidad + newItem.cantidad }
                : item
            ),
          })
        } else {
          set({ items: [...get().items, newItem] })
        }
      },

      removeItem: (uid) => {
        set({
          items: get().items.filter((item) => item.uid !== uid),
        })
      },

      clearCart: () => set({ items: [] }),

      // ✅ Ahora cuenta solo la cantidad de ítems únicos
      getTotalItems: () => get().items.length,

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.precio * item.cantidad,
          0
        ),
    }),
    {
      name: 'krea-cart-storage',
    }
  )
)
