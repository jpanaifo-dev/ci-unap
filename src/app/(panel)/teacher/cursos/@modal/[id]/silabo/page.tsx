import { fetchCore } from '@/api'
import { LayoutCourseModal } from '@/modules/teacher'
import { IGroup, IResApi } from '@/types'
import { FrmUploadSilabo } from '@/modules/teacher'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { id } = params

  const response = await fetchCore(`gestor/GrupoList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!response.ok) {
    return (
      <>
        <h1 className="text-3xl font bold">Error</h1>
      </>
    )
  }
  const data: IResApi<IGroup> = (await response.json()) as IResApi<IGroup>

  return (
    <>
      <section className="pb-4">
        <h1 className="text-xl font-bold text-gray-800">Silabo</h1>
        <p className="text-xs text-gray-500">
          Sube el silabo del curso o modifica el actual
        </p>
      </section>
      <FrmUploadSilabo defaulData={data.results[0]} />
    </>
  )
}
