'use client'

import { useSearchStore } from '@/store/searchStore'
import { Search } from 'lucide-react'

export default function ProductSearch() {
  const search = useSearchStore((state) => state.search)
  const setSearch = useSearchStore((state) => state.setSearch)

  return (
    <div className="relative w-full max-w-md mx-auto">
      <label htmlFor="search" className="sr-only">
        Buscar productos
      </label>
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" aria-hidden="true" />
      <input
        id="search"
        type="search"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
