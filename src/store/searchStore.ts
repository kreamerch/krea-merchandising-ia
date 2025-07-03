// ✅ src/store/searchStore.ts
import { create } from 'zustand'
import { useFilterStore } from './filterStore'

export type SearchState = {
  search: string
  setSearch: (value: string) => void
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  setSearch: (value) => {
    if (value.length > 0) {
      useFilterStore.getState().setCategoria(null)
    }
    set({ search: value })
  },
}))
