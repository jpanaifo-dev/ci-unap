import { FrmFilesTypeEditor } from '@/modules/admin'
import { IPortalFileType } from '@/types'
import { fetchTipoById } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let data: IPortalFileType = {} as IPortalFileType

  try {
    const res = await fetchTipoById(Number(id))

    if (!res.ok) {
      return <div>Error</div>
    } else {
      data = (await res.json()) as IPortalFileType
    }
  } catch (error) {
    console.error(error)
  }

  return <FrmFilesTypeEditor dataDeafult={data} />
}
