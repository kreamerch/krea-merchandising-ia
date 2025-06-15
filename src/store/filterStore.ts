import { create } from 'zustand'

type FilterState = {
  categoria: string | null
  setCategoria: (slug: string | null) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  categoria: null,
  setCategoria: (slug) => set({ categoria: slug }),
}))
