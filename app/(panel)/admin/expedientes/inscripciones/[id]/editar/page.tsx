import { fetchCore } from '@/api'
import { FrmInscriptionEditor } from '@/modules/admin'
import { IInscriptions, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`gestor/InscripcionList/?id=${id}`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IInscriptions> =
    (await res.json()) as IResApi<IInscriptions>

  return (
    <>
      <FrmInscriptionEditor defaulData={data?.results[0]} />
    </>
  )
}
