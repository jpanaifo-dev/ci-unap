import { fetchCore } from '@/api'
import { FrmAsistenciaList } from '@/modules/teacher'
import { IGroupData, IResCookie } from '@/types'
import { getCookie } from '@/utils'
interface IProps {
  params: {
    id: string
  }
}

const appname = process.env.APP_NAME

export default async function Page(props: IProps) {
  const { id } = props.params
  const grupo_id = id || ''

  const resCookie: IResCookie = (await getCookie(
    `${appname}_persona_id`
  )) as IResCookie

  const id_persona = resCookie.value

  const response = await fetchCore(
    `gestor/get_alumnos_grupo/?persona_id=${id_persona}&grupo_id=${grupo_id}`,
    {
      method: 'GET',
    }
  )

  if (!response.ok) {
    return <></>
  }

  const data: IGroupData = (await response.json()) as IGroupData

  return (
    <>
      <FrmAsistenciaList dataAsistencias={data} />
    </>
  )
}
