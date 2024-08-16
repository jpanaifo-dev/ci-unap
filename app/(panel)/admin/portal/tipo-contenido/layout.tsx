'use client'
import { HeaderSection } from '@/modules/admin'
import { AlertCustom } from '@/modules/core'
import { Tab, Tabs } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const options = [
  {
    label: 'Tipo de publicaciones',
    subtitle:
      'Tipos de publicaciones permitidas. Ejemplo: Noticias, Eventos, etc.',
    value: '/admin/portal/tipo-contenido',
    hrefNew: '/admin/portal/tipo-contenido/nuevo',
    alertMessage:
      'Es recomendable no crear más de 5 tipos de publicaciones. Los usuarios podrían confundirse. Los tipos de publicaciones permitidas son: NOTICIA, EVENTO, COMUNICADO, AVISO',
  },
  {
    label: 'Tipo de multimedia',
    subtitle: 'Tipos de multimedia permitidos. Ejemplo: Imágenes, Videos, etc.',
    value: '/admin/portal/tipo-contenido/multimedia',
    hrefNew: '/admin/portal/tipo-contenido/multimedia/nuevo',
    alertMessage:
      'Los tipos de multimedia permitidos son: IMAGEN, VIDEO, AUDIO. No se recomienda crear más tipos de multimedia.',
  },
  {
    label: 'Tipo de archivos',
    subtitle:
      'Tipos de archivos permitidos. Ejemplo: Recursos, Documentos, etc.',
    value: '/admin/portal/tipo-contenido/archivo',
    hrefNew: '/admin/portal/tipo-contenido/archivo/nuevo',
    alertMessage:
      'Los tipos de archivos permitidos son: RECURSO, REGLAMENTO, DOCUMENTO. No se recomienda crear más tipos de archivos.',
  },
]

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  const pathname = usePathname()

  const { hrefNew, subtitle, alertMessage } =
    options.find((option) => option.value === pathname) || {}

  return (
    <main className="flex flex-col gap-3 section-panel">
      <HeaderSection
        title="Tipo de contenido"
        subtitle={subtitle || 'Tipos de publicaciones permitidas'}
        isButtonVisible
        href={hrefNew}
        labelButton="Añadir nuevo"
      />
      <section>
        <Tabs
          aria-label="Tabs example"
          variant="underlined"
          size="sm"
          selectedKey={pathname}
        >
          {options.map((option) => {
            return (
              <Tab
                key={option?.value}
                value={option.value}
                as={Link}
                href={option.value}
                title={option.label}
              />
            )
          })}
        </Tabs>
      </section>
      <section>
        <AlertCustom
          title="¡IMPORTANTE! Tener en cuenta"
          content={
            <p className="font-semibold">
              {alertMessage ||
                'Es recomendable no crear más de 5 tipos de publicaciones. Los usuarios podrían confundirse. Los tipos de publicaciones permitidas son: NOTICIA, EVENTO, COMUNICADO, AVISO'}
            </p>
          }
        />
      </section>
      {modal}
      <section className="flex flex-col gap-1">{children}</section>
    </main>
  )
}
