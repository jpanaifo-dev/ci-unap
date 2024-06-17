import { fetchCore } from '@/api'
import { Banner, PublicationsTypes } from '@/modules/client'
import { IPublicationType, IResApi } from '@/types'
import Link from 'next/link'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const res = await fetchCore('portal/PublicacionTipo', {
    method: 'GET',
  })

  if (res.status !== 200) {
    return <div>error</div>
  }

  const typesPublications: IResApi<IPublicationType> =
    (await res.json()) as IResApi<IPublicationType>

  return (
    <>
      <Banner image="https://cdn.www.gob.pe/uploads/document/file/4025489/Talentos%20Pronabec.jpg.jpg" />
      <main className="container w-full flex gap-3 py-6">
        <aside className="w-full max-w-[254px] hidden lg:block">
          <PublicationsTypes typesPublications={typesPublications} />
        </aside>
        <section className="w-full">{children}</section>
      </main>
    </>
  )
}
