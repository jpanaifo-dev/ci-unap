import { fetchCore } from '@/api'
import { BannerSection, PublicationsList } from '@/modules/core'
import { IPublicationFile, IResApi } from '@/types'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, date, page },
  } = props

  const query = search ? `&publicacion__titulo__icontains=${search}` : ''
  const currentPage = page ? `&page=${page}` : ''

  let publications: IResApi<IPublicationFile> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  const res = await fetchCore(
    `portal/PublicacionFileList/?id=${query}&tipo=&fecha=&is_portada=true&publicacion__fecha=${date}&is_active=true&is_banner=${currentPage}`,
    {
      method: 'GET',

      cache: 'no-cache',
    }
  )

  if (res.status === 200) {
    publications = (await res.json()) as IResApi<IPublicationFile>
  }

  return (
    <>
      <BannerSection />
      {<PublicationsList publications={publications} />}
    </>
  )
}
