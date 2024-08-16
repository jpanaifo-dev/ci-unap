import { fetchCore } from '@/api'
import { FrmAsistenciaList } from '@/modules/teacher'
import { IAlumno } from '@/types'
interface IProps {
  params: {
    date: string
    id: string
  }
}

function convertDate(date: string) {
  const [day, month, year] = date.split('-')
  return `${year}-${month}-${day}`
}
export default async function Page(props: IProps) {
  const { date, id } = props.params

  const grupo_id = id || ''
  const fecha = convertDate(date) || ''
  console.log(grupo_id, fecha)

  const response = await fetchCore(
    `gestor/get_asistencias/?fecha=${fecha}&grupo_id=${grupo_id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )

  if (!response.ok) {
    return <></>
  }

  const data: IAlumno[] = (await response.json()) as IAlumno[]

  return (
    <>
      <FrmAsistenciaList
        asistencias={data}
        isView
      />
    </>
  )
}
