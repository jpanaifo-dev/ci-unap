import { BannerSection, PublicationsList } from '@/modules/core'
import { IPublicationFile, IResApi } from '@/types'
import { fetchPublicationsFileList } from '@/api'

interface IProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function page(props: IProps) {
  const {
    searchParams: { search, page },
  } = props

  let publications: IResApi<IPublicationFile> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchPublicationsFileList({
      page: Number(page) || undefined,
      publicacion__titulo__icontains: search ? search.toString() : '',
      is_portada: true,
    })

    if (res?.ok) {
      publications = await res.json()
    } else {
      console.error('Error fetching publications')
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <main>
      <BannerSection />
      {<PublicationsList publications={publications} />}
    </main>
  )
}
