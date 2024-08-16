import { FrmPublicationFileTypeEditor } from '@/modules/admin'
import { IPublicationFileType } from '@/types'
import { fetchPublicationFileTypeById } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let data: IPublicationFileType = {} as IPublicationFileType

  try {
    const res = await fetchPublicationFileTypeById(Number(id))

    if (!res.ok) {
      return <div>Error</div>
    } else {
      data = (await res.json()) as IPublicationFileType
    }
  } catch (error) {
    console.error(error)
  }

  return <FrmPublicationFileTypeEditor dataDeafult={data} />
}
