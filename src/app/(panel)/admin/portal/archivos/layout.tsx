'use client'
import { HeaderSection } from '@/modules/admin'
import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const pathname = usePathname()

  const path = pathname === '/admin/portal/archivos' ? true : false
  const title: string = path ? 'Archivos' : 'Tipo de archivos'
  const subtitle: string = path
    ? 'Archivos de recursos para la página web'
    : 'Tipos de archivos permitidos'

  const href: string = path
    ? '/admin/portal/archivos/nuevo'
    : '/admin/portal/archivos/tipos/nuevo'

  return (
    <>
      <main className="flex flex-col gap-3">
        <HeaderSection
          title={title}
          subtitle={subtitle}
          isButtonVisible
          href={href}
          labelButton="Añadir nuevo"
        />
        <section>
          <Tabs
            aria-label="Tabs example"
            variant="underlined"
            size="sm"
            selectedKey={pathname}
          >
            <Tab
              key="/admin/portal/archivos"
              title="Archivos"
              as={Link}
              href="/admin/portal/archivos"
            />
            <Tab
              key="/admin/portal/archivos/tipos"
              title="Tipo de archivos"
              as={Link}
              href="/admin/portal/archivos/tipos"
            />
          </Tabs>
        </section>
        {modal}
        {children}
      </main>
    </>
  )
}
