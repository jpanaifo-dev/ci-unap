import { fetchCore } from '@/api'
import { PublicationsList } from '@/modules/client'
import { IPublicationFile, IResApi } from '@/types'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: IProps) {
  const {
    searchParams: { search, date },
  } = props

  const query = search ? `&publicacion__titulo__icontains=${search}` : ''

  const res = await fetchCore(
    `portal/PublicacionFileList/?id=${query}&tipo=&fecha=&is_portada=true&publicacion__fecha=${date}&is_active=true&is_banner=`,
    {
      method: 'GET',
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
