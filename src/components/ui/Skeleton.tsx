// ✅ src/components/ui/Skeleton.tsx
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/30 dark:bg-muted/20', // solo estilos base
        className // dimensiones y forma las maneja quien lo use
      )}
    />
  )
}
