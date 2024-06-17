'use client'
import { IPublication, IPublicationFile, IResApi } from '@/types'
import { converDate } from '@/utils'
import { BreadcrumbItem, Breadcrumbs, Chip, Image } from '@nextui-org/react'
import { ImagesSection } from './ImagesSection'
import { usePathname } from 'next/navigation'
import { renderContent } from '@/modules/core'

interface IProps {
  publicationFiles: IResApi<IPublicationFile>
  publication?: IPublication
}

const generateBreadcrumbs = (pathname: string) => {
  const paths = pathname.split('/').filter(Boolean) // Filtrar elementos vacíos
  return paths.map((path, index) => {
    return {
      name: path,
      path: paths.slice(0, index + 1).join('/'),
    }
  })
}

export const PublicationDetails = (props: IProps) => {
  const { publicationFiles, publication } = props

  const pathname = usePathname()

  return (
    <>
      {/* breadcrumb section */}
      <section className="py-3">
        <Breadcrumbs>
          <BreadcrumbItem
            href="/"
            key="home"
            classNames={{
              item: ' capitalize',
            }}
          >
            Inicio
          </BreadcrumbItem>
          {generateBreadcrumbs(pathname).map((breadcrumb, index) => (
            <BreadcrumbItem
              key={index}
              href={'/' + breadcrumb.path}
              classNames={{
                item: 'capitalize',
              }}
            >
              {breadcrumb.name.toLowerCase().trim().replace(/\s/g, '')}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </section>
      {/* body section */}
      <section className="flex flex-col gap-3">
        <header className="flex flex-col gap-3">
          <Chip
            size="sm"
            radius="sm"
            variant="flat"
            color="warning"
          >
            {publication?.tipo?.nombre || 'Tipo'}
          </Chip>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold">
            {publication?.titulo || 'Título'}
          </h1>
        </header>

        <main className="">
          <article className="w-full flex flex-col gap-3">
            <ImagesSection publicationFiles={publicationFiles} />
            <section
              id="date-section"
              className="flex gap-3 items-center"
            >
              <div className="">
                <Image
                  src="https://enlinea.unapiquitos.edu.pe/unap/descargas/descargas/isotipoUNAP.jpg"
                  alt="logo-unap"
                  removeWrapper
                  className="h-16 shadow-lg p-2 rounded-lg"
                />
              </div>
              <div>
                <h2 className="font-bold">Autor: Centro de idiomas - CIUNAP</h2>
                <p className="text-gray-500">
                  Fecha de publicación:{' '}
                  {converDate(publication?.fecha) || 'Fecha'}
                </p>
              </div>
            </section>
            <section id="content-section">
              <div
                className="custom-quill"
                dangerouslySetInnerHTML={renderContent(
                  publication?.contenido || 'Contenido'
                )}
              />
            </section>
          </article>
        </main>
      </section>
    </>
  )
}
