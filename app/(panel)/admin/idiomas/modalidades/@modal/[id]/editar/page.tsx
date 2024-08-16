import { fetchCore } from '@/api'
import { FrmAddModality } from '@/modules/admin'
import { IModality, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/ModalidadList/?id=${id}`, {
    method: 'GET',
    cache: 'reload',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IModality> = (await res.json()) as IResApi<IModality>

  return (
    <>
      <FrmAddModality defaulData={data.results[0]} />
    </>
  )
}
