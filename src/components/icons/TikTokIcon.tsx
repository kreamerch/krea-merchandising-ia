import { cn } from '@/lib/utils'

type TikTokIconProps = {
  className?: string
}

export default function TikTokIcon({ className }: TikTokIconProps) {
  return (
    <svg
      className={cn('fill-current', className)}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M224 80.1c-17.4 0-31.5-14.1-31.5-31.5V32H160v128a32 32 0 1 1-32-32v-32a64 64 0 1 0 64 64V99c10 5.8 21.7 9.1 34 9.1v-28z" />
    </svg>
  )
}
