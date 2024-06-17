import { fetchCore } from '@/api'
import { AsistenciasList, IAsistencias } from '@/modules/teacher'
import { getCookie } from '@/utils'
import { IResCookie } from '@/types'

const appname = process.env.APP_NAME

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id: grupo_id } = props.params
  const personId: IResCookie = (await getCookie(
    `${appname}_persona_id`
  )) as IResCookie
  const id = personId.value

  const response = await fetchCore(
    `gestor/get_asistencias_docente/?persona_id=${id}&grupo_id=${grupo_id}`,
    {
      method: 'GET',
    }
  )

  const data: IAsistencias = (await response.json()) as IAsistencias

  return (
    <>
      <AsistenciasList asistencias={data} />
    </>
  )
}
