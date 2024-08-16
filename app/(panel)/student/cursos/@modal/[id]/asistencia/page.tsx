import { fetchInscripcionList } from '@/api'
import { AttendanceList } from '@/modules/student'
import { IInscriptionsList, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let dataInscriptions: IResApi<IInscriptionsList> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const response = await fetchInscripcionList({
      id: Number(id),
    })

    if (response.status !== 200) {
      return <div>Error</div>
    } else {
      dataInscriptions = await response.json()
    }
  } catch (error) {
    console.error('Error al obtener la data de inscripciones', error)
  }
  return <AttendanceList dataInscriptions={dataInscriptions.results[0]} />
}
