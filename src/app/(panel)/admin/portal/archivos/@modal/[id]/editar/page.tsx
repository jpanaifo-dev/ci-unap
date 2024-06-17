import { fetchCore } from '@/api'
import { FrmFileEditor } from '@/modules/admin'
import { IPortalFile } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/File/${id}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IPortalFile = (await res.json()) as IPortalFile

  return (
    <>
      <FrmFileEditor data={data} />
    </>
  )
}
