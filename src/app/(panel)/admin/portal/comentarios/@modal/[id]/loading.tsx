import { Skeleton } from '@nextui-org/react'

export default function Loading() {
  return (
    <main className="flex flex-col gap-4 section-panel">
      <header className="flex flex-col justify-start gap-1">
        <Skeleton className="w-full h-20 rounded-md" />
        <Skeleton className="w-full h-14 rounded-md" />
      </header>
      <main>
        <Skeleton className="w-full h-64 rounded-md" />
      </main>
    </main>
  )
}
