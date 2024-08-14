import { fetchGrupoList } from '@/api'
import { LayoutCourseModal } from '@/modules/teacher'
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

  let data: IResApi<IGroup> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }

  try {
    const res = await fetchGrupoList({ id: parseInt(id) })

    if (res.ok) {
      data = await res.json()
    }
  } catch (error) {
    console.error('Error:', error)
  }

  return (
    <>
      <LayoutCourseModal dataGroup={data.results[0]}>
        {children}
      </LayoutCourseModal>
    </>
  )
}
