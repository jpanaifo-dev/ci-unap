import { DetailsEnrollment } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IEnrollment, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchGestor(`MatriculaList/?id=${id}`, {
    method: 'GET',
  })

  if (res.detail) {
    console.error('Error al cargar la matricula')
    return
  }

  const data: IResApi<IEnrollment> = res as IResApi<IEnrollment>

  return (
    <>
      <main className="py-4 flex flex-col gap-2 items-center">
        <DetailsEnrollment defaultData={data.results[0]} />
      </main>
    </>
  )
}
