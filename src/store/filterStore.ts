'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useSearchStore } from './searchStore'

/**
 * 📦 Zustand Store: Filtros de categoría y subcategoría
 * - Soporta categoría y subcategoría con referencia cruzada
 * - Limpia el estado de búsqueda al cambiar filtros
 */
type FilterState = {
  categoria: string | null
  subcategoria: string | null
  subcategoriaCategoria: string | null
  setCategoria: (slug: string | null) => void
  setSubcategoria: (slug: string | null, categoriaSlug?: string) => void
  forceResetSubcategoria: () => void
  clearFiltros: () => void
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => {
      const clearSearch = () => {
        useSearchStore.getState().setSearch('')
      }

      return {
        categoria: null,
        subcategoria: null,
        subcategoriaCategoria: null,

        setCategoria: (slug) => {
          if (slug !== null) clearSearch()
          set({ categoria: slug, subcategoria: null, subcategoriaCategoria: null })
        },

        setSubcategoria: (slug, categoriaSlug) => {
          if (slug !== null) clearSearch()

          const { subcategoria, subcategoriaCategoria } = get()
          const isSame = slug === subcategoria && categoriaSlug === subcategoriaCategoria

          set({
            subcategoria: isSame ? null : slug,
            subcategoriaCategoria: isSame ? null : categoriaSlug ?? null,
          })
        },

        forceResetSubcategoria: () => {
          set({ subcategoria: null, subcategoriaCategoria: null })
        },

        clearFiltros: () => {
          set({ categoria: null, subcategoria: null, subcategoriaCategoria: null })
          clearSearch()
        },
      }
    },
    {
      name: 'filter-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
