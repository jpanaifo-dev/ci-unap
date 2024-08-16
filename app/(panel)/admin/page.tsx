import { ListCount } from '@/modules/admin'
import { fetchCore } from '@/api'
import { ICount } from '@/types'

export default async function Page() {
  const res = await fetchCore(`gestor/get_dashboard/`, {
    method: 'GET',
  })

  if (!res.ok) {
    return <div>Error</div>
  }

  const data: ICount = (await res.json()) as ICount

  return (
    <>
      <ListCount data={data} />
    </>
  )
}
