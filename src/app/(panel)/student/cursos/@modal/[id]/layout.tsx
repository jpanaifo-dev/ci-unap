import { fetchCore } from '@/api'
import { LayoutCourseModal } from '@/modules/student'
import { IGroup, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
  children: React.ReactNode
}

export default async function Layout(props: IProps) {
  const { params, children } = props
  const { id } = params

  const response = await fetchCore(`gestor/GrupoList/?id=${id}`, {
    method: 'GET',
    next: { tags: ['student', 'courses', 'modal', 'layout'] },
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
      <LayoutCourseModal dataGroup={data?.results[0]}>
        {children}
      </LayoutCourseModal>
    </>
  )
}
