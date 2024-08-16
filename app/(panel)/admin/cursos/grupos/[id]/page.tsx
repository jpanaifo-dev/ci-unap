import { DetailsGroup, FrmGroupEditor } from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IGroup, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const data = await fetchGestor(`GrupoList/?id=${id}`, { method: 'GET' })

  if (data?.detail) {
    console.error('Error al cargar el grupo')
    return
  }
  const dataProgram: IResApi<IGroup> = data as IResApi<IGroup>

  return (
    <main className="flex flex-col gap-2 items-center">
      <DetailsGroup defaultData={dataProgram?.results[0]} />
    </main>
  )
}
