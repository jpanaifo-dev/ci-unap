'use client'
import { CardPublication } from '@/modules/client'
import { IPublicationFile, IResApi } from '@/types'
import { Button } from '@nextui-org/button'
import { useFilterFromUrl } from '@/hooks'
interface IProps {
  publications: IResApi<IPublicationFile>
}

export const PublicationsList = (props: IProps) => {
  const { publications } = props
  const { updateFilter } = useFilterFromUrl()

  //optener el page de next y previous
  const getPage = (url: string | null) => {
    if (!url) return 1
    const urlParams = new URLSearchParams(url)
    return urlParams.get('page')
  }

  const handleNext = (value: string) => {
    switch (value) {
      case 'next':
        updateFilter('page', getPage(publications.next)?.toString() || '1')
        break
      case 'prev':
        updateFilter('page', getPage(publications.previous)?.toString() || '1')
        break
      default:
        break
    }
  }

  return (
    <>
      <main className="flex flex-col gap-2 pt-10 ">
        <header></header>
        <article>
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
            <p className="font-medium">
              Página {publications.previous ? publications.previous : 1} de{' '}
              {publications.count}
            </p>
          </section>
          <Button
            color="secondary"
            radius="sm"
            isDisabled={!publications.previous}
            onPress={() => handleNext('prev')}
          >
            Prev
          </Button>
          <Button
            color="secondary"
            radius="sm"
            isDisabled={!publications.next}
            onPress={() => handleNext('next')}
          >
            Next
          </Button>
        </footer>
      </main>
    </>
  )
}
