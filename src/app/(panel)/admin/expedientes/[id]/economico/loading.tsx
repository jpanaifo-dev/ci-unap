import { Skeleton } from '@nextui-org/react'

export default function Loading() {
  return (
    <main className="flex flex-col items-center">
      <section className="w-full max-w-5xl border p-6 rounded-xl flex flex-col gap-5">
        <Skeleton className="w-full h-28 rounded-xl" />
        <Skeleton className="w-full h-96 rounded-xl" />
      </section>
    </main>
  )
}
