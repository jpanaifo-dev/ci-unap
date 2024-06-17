import {
  DetailsGroup,
  DetailsInscriptions,
  FrmGroupEditor,
} from '@/modules/admin'
import { fetchGestor } from '@/api'
import { IInscriptions, IResApi } from '@/types'

interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const data = await fetchGestor(`InscripcionList/?id=${id}`, { method: 'GET' })

  if (data?.detail) {
    console.error('Error al cargar el grupo')
    return
  }
  const dataProgram: IResApi<IInscriptions> = data as IResApi<IInscriptions>

  return (
    <main className="flex flex-col gap-2 items-center">
      <DetailsInscriptions defaultData={dataProgram?.results[0]} />
    </main>
  )
}
