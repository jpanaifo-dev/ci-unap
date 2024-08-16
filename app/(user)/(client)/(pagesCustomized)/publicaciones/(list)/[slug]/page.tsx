import { fetchCore } from '@/api'
import { PublicationsList } from '@/modules/client'
import { IPublicationFile, IResApi } from '@/types'

interface IProps {
  params: {
    slug: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: IProps) {
  const {
    params: { slug },
    searchParams: { search, date },
  } = props

  const query = search ? `&publicacion__titulo__icontains=${search}` : ''

  const querySlug = slug
    ? `&publicacion__tipo__nombre=${slug.toUpperCase()}`
    : ''

  const res = await fetchCore(
    `portal/PublicacionFileList/?id=${query}${querySlug}&is_portada=true&tipo=&publicacion__fecha=${date}=&is_active=true&is_banner=`,
    {
      method: 'GET',
      next: {
        revalidate: 1,
        tags: ['PublicacionFileList'],
      },
      cache: 'no-cache',
    }
  )

  if (res.status !== 200) {
    return <div>error</div>
  }

  const publications: IResApi<IPublicationFile> =
    (await res.json()) as IResApi<IPublicationFile>

  return (
    <>
      <PublicationsList publications={publications} />
    </>
  )
}
