import { fetchCore } from '@/api'
import { FrmFilesTypeEditor } from '@/modules/admin'
import { IPortalFileType } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/tipo/${id}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IPortalFileType = (await res.json()) as IPortalFileType

  return (
    <>
      <FrmFilesTypeEditor dataDeafult={data} />
    </>
  )
}
