import { ClassMateList } from '@/modules/student'
import { fetchGrupoList } from '@/api'
import { IGroupList, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { params } = props
  const { id } = params

  let data: IResApi<IGroupList> = {
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
  return <ClassMateList group={data.results[0]} />
}
