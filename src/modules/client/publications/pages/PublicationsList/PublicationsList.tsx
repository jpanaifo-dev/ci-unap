'use client'
import { CardPublication } from '@/modules/client/components'
import { IPublicationFile, IResApi } from '@/types'
import { Input } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { useFilterFromUrl } from '@/hooks'
import { Suspense } from 'react'

interface IProps {
  publications: IResApi<IPublicationFile>
}

export const PublicationsList = (props: IProps) => {
  const { publications } = props
  const { getParams, updateFilter } = useFilterFromUrl()

  const search = getParams('search', '')
  const date = getParams('date', '')

  const handleSearch = (value: string) => {
    updateFilter('search', value)
  }

  const handleDate = (value: string) => {
    updateFilter('date', value)
  }

  return (
    <>
      <section className="w-full flex flex-col gap-5 py-2">
        <header className="flex flex-col lg:flex-row gap-3 items-center justify-end">
          <div>
            <Input
              radius="sm"
              type="date"
              label="F. Publicación"
              labelPlacement="outside-left"
              value={date}
              onValueChange={handleDate}
            />
          </div>
          <div className="w-full lg:max-w-sm">
            <Input
              radius="sm"
              placeholder="Buscar publicación..."
              startContent={<IconSearch size={20} />}
              value={search}
              onValueChange={handleSearch}
            />
          </div>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {publications?.results?.length > 0 && (
                <>
                  {publications.results.map((publication) => (
                    <CardPublication
                      key={publication.id}
                      {...publication}
                      link={`/publicaciones/${publication.publicacion.tipo.nombre.toLowerCase()}/${
                        publication.publicacion.id
                      }`}
                    />
                  ))}
                </>
              )}
            </section>
            {publications?.results?.length === 0 && (
              <section className="h-screen max-h-48 flex flex-col items-center justify-center">
                <div className="h-full flex flex-col justify-center">
                  <h1 className="font-bold text-xl">
                    😪 No se encontraron publicaciones
                  </h1>
                </div>
              </section>
            )}
          </Suspense>
        </main>
      </section>
    </>
  )
}
