import { fetchCore } from '@/api'
import { FrmContentEditor, FrmContentForPublication } from '@/modules/admin'
import { IPublication, IResApi } from '@/types'
interface IProps {
  params: {
    id: string
  }
}

export default async function Page(props: IProps) {
  const { id } = props.params

  const res = await fetchCore(`portal/PublicacionList/?id=${id}`, {
    method: 'GET',
    cache: 'no-cache',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: IResApi<IPublication> =
    (await res.json()) as IResApi<IPublication>

  return (
    <>
      <FrmContentForPublication publication={data.results[0]} />
    </>
  )
}
