'use client'
import { Progress } from '@nextui-org/react'

export default function Loading() {
  return (
    <div className="fixed z-50 top-0 right-0 left-0 h-screen">
      <Progress
        aria-label="loading"
        size="sm"
        isIndeterminate
      />
    </div>
  )
}
