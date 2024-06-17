import { CourseScore } from '@/modules/student'
import { fetchCore } from '@/api'
import { IResApi, IInscriptions } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const response = await fetchCore(
    `gestor/InscripcionList/?matricula__expediente__id=&grupo__modulo__id=&grupo__modulo__nivel__id=&matricula__expediente__persona__numero_documento__icontains=&id=${id}&grupo__modulo__nombre__icontains=&grupo__id=/`,
    {
      method: 'GET',
    }
  )

  if (response.status !== 200) {
    return <div>Error</div>
  }

  const inscriptions: IResApi<IInscriptions> = await response.json()

  return (
    <>
      <CourseScore dataInscriptions={inscriptions.results[0]} />
    </>
  )
}
