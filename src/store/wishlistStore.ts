// ✅ src/store/wishlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type WishlistItem = {
  uid: string
  id: string
  nombre: string
  slug: string
  precio: number
  imagen?: string
}

type WishlistState = {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (uid: string) => void
  isInWishlist: (uid: string) => boolean
  clear: () => void
  getTotalItems: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set({ items: [...get().items, item] }),
      removeItem: (uid) => set({ items: get().items.filter((item) => item.uid !== uid) }),
      isInWishlist: (uid) => get().items.some((item) => item.uid === uid),
      clear: () => set({ items: [] }),
      getTotalItems: () => get().items.length,
    }),
    { name: 'wishlist-storage' }
  )
)
