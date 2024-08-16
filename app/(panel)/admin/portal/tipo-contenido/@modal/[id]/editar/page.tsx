import { FrmPublicationTypeEditor } from '@/modules/admin'
import { IPublicationType } from '@/types'
import { fetchPublicationTypeById } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let data: IPublicationType = {} as IPublicationType

  try {
    const res = await fetchPublicationTypeById(Number(id))

    if (!res.ok) {
      return <div>Error</div>
    } else {
      data = (await res.json()) as IPublicationType
    }
  } catch (error) {
    console.error(error)
  }

  return <FrmPublicationTypeEditor dataDeafult={data} />
}
