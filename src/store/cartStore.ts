// src/store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ProductoCarrito = {
  id: string
  nombre: string
  slug: string
  precio: number
  cantidad: number
}

type CartStore = {
  items: ProductoCarrito[]
  addItem: (item: ProductoCarrito) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        const existing = get().items.find((item) => item.id === newItem.id)

        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === newItem.id
                ? { ...item, cantidad: item.cantidad + newItem.cantidad }
                : item
            ),
          })
        } else {
          set({ items: [...get().items, newItem] })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.cantidad, 0),

      getTotalPrice: () =>
        get().items.reduce((total, item) => total + item.precio * item.cantidad, 0),
    }),
    {
      name: 'krea-cart-storage',
    }
  )
)
