import { CourseScore } from '@/modules/student'
import { IResApi, IInscriptions } from '@/types'
import { fetchInscripcionList } from '@/api'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  let dataInscriptions: IResApi<IInscriptions> = {
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

  return <CourseScore dataInscriptions={dataInscriptions.results[0]} />
}
