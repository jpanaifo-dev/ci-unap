import { fetchCore } from '@/api'
import { CourseRange } from '@/modules/teacher'
import { IGroup, IResApi } from '@/types'

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
      <CourseRange groupData={data.results[0]} />
    </>
  )
}
