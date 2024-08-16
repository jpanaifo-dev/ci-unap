import { fetchCore } from '@/api'
import { FrmTeacherEditor } from '@/modules/admin'
import { IResApi, ITeach } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/DocenteList/?id=${id}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<ITeach> = (await res.json()) as IResApi<ITeach>

  return (
    <>
      <FrmTeacherEditor defaulData={data?.results[0]} />
    </>
  )
}
