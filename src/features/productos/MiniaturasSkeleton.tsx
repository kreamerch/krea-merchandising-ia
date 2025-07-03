export default function MiniaturasSkeleton() {
  return (
    <div className="flex gap-3 mt-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-[56px] h-[56px] rounded-xl bg-muted border border-border animate-pulse"
        />
      ))}
    </div>
  )
}
