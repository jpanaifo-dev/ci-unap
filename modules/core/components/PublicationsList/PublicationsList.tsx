'use client'
import { CardPublication } from '@/modules/client'
import { IPublicationFile, IResApi } from '@/types'
import { useFilterFromUrl } from '@/hooks'
import { Pagination } from '@nextui-org/react'
interface IProps {
  publications: IResApi<IPublicationFile>
}

export const PublicationsList = (props: IProps) => {
  const { publications } = props
  const { updateFilter, getParams } = useFilterFromUrl()

  const page = getParams('page', '1')

  return (
    <main className="flex flex-col gap-2 pt-14 ">
      <header></header>
      <article className="grid grid-cols-3 gap-6">
        {publications.results.length > 0 ? (
          publications.results.map((publication) => (
            <CardPublication
              key={publication.id}
              {...publication}
            />
          ))
        ) : (
          <p>No se encontraron publicaciones</p>
        )}
      </article>
      <footer className="flex gap-3 items-center justify-end">
        <section>
          <p className="font-medium text-gray-500 text-sm">
            Página {page} de {Math.ceil(publications.count / 15)} | Total:{' '}
            {publications.count}
          </p>
        </section>
        <Pagination
          total={Math.ceil(publications.count / 15)}
          showControls
          onChange={(page) => updateFilter('page', page.toString())}
          color="success"
          radius="sm"
          classNames={{
            cursor: 'text-white',
          }}
        />
      </footer>
    </main>
  )
}
