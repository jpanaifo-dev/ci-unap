import { fetchPublicationsList } from '@/api'
import { OthersPublications } from '@/modules/client'
import { IPublicationList, IResApi } from '@/types'
import { Divider } from '@nextui-org/react'

export default async function Page() {
  const res = await fetchPublicationsList({
    is_active: true,
  })

  if (!res.ok) {
    return (
      <main>
        <header className="flex flex-col gap-1">
          <h1 className="text-lg font-bold uppercase">
            También te puede interesar
          </h1>
          <Divider
            aria-label="divider"
            className="bg-warning-500 pt-1"
          />
        </header>
        <article>
          <p className="text-center">No hay publicaciones relacionadas</p>
        </article>
      </main>
    )
  }

  const publications: IResApi<IPublicationList> =
    (await res.json()) as IResApi<IPublicationList>

  return (
    <>
      <main className="flex flex-col gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-bold uppercase">
            También te puede interesar
          </h1>
          <Divider className="bg-warning-500 pt-1 max-w-xs" />
        </header>
        <article>
          <OthersPublications publications={publications} />
        </article>
      </main>
    </>
  )
}
