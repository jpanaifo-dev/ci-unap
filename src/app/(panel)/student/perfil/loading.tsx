'use client'
import { Skeleton } from '@nextui-org/react'

export default function Loading() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col gap-2 w-full max-w-5xl">
        <Skeleton className="w-1/2 h-6 rounded-lg" />
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className="w-1/2 h-8 rounded-md" />
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
        </div>
      </div>
    </main>
  )
}
