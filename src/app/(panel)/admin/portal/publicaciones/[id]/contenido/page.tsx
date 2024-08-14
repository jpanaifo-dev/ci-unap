import { fetchPublicationsList } from '@/api'
import { FrmContentForPublication } from '@/modules/admin'
import { IPublicationList, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let data: IResApi<IPublicationList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchPublicationsList({ id: Number(id) })

    if (!res.ok) {
      return <div>Error</div>
    } else {
      data = (await res.json()) as IResApi<IPublicationList>
    }
  } catch (error) {
    console.error(error)
  }

  return <FrmContentForPublication publication={data.results[0]} />
}
