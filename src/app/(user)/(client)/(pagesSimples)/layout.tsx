import { Banner } from '@/modules/client'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <main className="container">{children}</main>
    </>
  )
}
