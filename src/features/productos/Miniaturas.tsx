'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useIsMobile } from '@/hooks/useIsMobile'

type MiniaturasProps = {
  imagenes: string[] | undefined
  imagenIndex: number
  setImagenIndex: (index: number) => void
  small?: boolean // ✅ Nuevo prop opcional
}

export default function Miniaturas({
  imagenes,
  imagenIndex,
  setImagenIndex,
  small = false,
}: MiniaturasProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  if (!Array.isArray(imagenes) || imagenes.length === 0) return null

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current
    if (!container || !container.children[index]) return
    const target = container.children[index] as HTMLElement

    if (!isMobile) {
      container.scrollTo({
        left: target.offsetLeft - 16,
        behavior: 'smooth',
      })
    }
  }

  const handleClick = (index: number) => {
    setImagenIndex(index)
    scrollToIndex(index)
  }

  const sizeClass = small
    ? 'w-[60px] h-[60px] min-w-[60px] min-h-[60px]'
    : 'w-[84px] h-[84px] min-w-[84px] min-h-[84px]'

  return (
    <div className="w-full mt-6">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar px-1 scroll-smooth snap-x snap-mandatory"
      >
        {imagenes.map((img, index) => {
          const isActive = index === imagenIndex
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              aria-label={`Miniatura ${index + 1}`}
              className={`group flex-shrink-0 snap-center ${sizeClass} rounded-xl overflow-hidden transition-all duration-300 ${
                isActive
                  ? 'border-[1.5px] border-primary bg-white dark:bg-muted'
                  : 'border border-border hover:border-primary/30 bg-white dark:bg-muted'
              }`}
            >
              <div className="w-full h-full p-1 flex items-center justify-center">
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={small ? 60 : 84}
                  height={small ? 60 : 84}
                  className="object-contain w-full h-full transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
