'use client'

import { Search } from 'lucide-react'
import { useSearchStore } from '@/store/searchStore'
import { useState } from 'react'

export function ProductSearch() {
  const [input, setInput] = useState('')
  const setSearch = useSearchStore((state) => state.setSearch)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInput(value)
    setSearch(value)
  }

  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input
        type="search"
        placeholder="Buscar productos..."
        value={input}
        onChange={handleChange}
        className="w-56 rounded-md border bg-background py-2 pl-10 pr-3 text-sm placeholder-muted-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  )
}
