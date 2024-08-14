import { CourseRange } from '@/modules/teacher'
import { IGroup, IResApi } from '@/types'
import { fetchGrupoList } from '@/api'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
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
    <main>
      {data?.results?.length > 0 ? (
        <CourseRange groupData={data.results[0]} />
      ) : (
        <div>Grupo no encontrado</div>
      )}
    </main>
  )
}
