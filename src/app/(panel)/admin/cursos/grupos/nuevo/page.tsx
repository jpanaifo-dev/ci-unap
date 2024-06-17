import { Suspense } from 'react'
import dynamic from 'next/dynamic'
// import { FrmGroupEditor } from '@/modules/admin'

const FrmGroupEditor = dynamic(
  () => import('@/modules/admin').then((mod) => mod.FrmGroupEditor),
  { ssr: false }
)

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <FrmGroupEditor />
      </Suspense>
    </>
  )
}
