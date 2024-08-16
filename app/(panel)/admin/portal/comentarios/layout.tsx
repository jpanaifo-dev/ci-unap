import { LayoutTestimonio } from '@/modules/admin'

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return <LayoutTestimonio aside={modal}>{children}</LayoutTestimonio>
}
